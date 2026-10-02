# Chọn renderer, hợp đồng determinism, bẫy HyperFrames, renderer tự viết

### 7. Chọn renderer có chủ đích

| Lựa chọn | Khi nào |
|---|---|
| **HyperFrames** (HeyGen, HTML + GSAP, Puppeteer + FFmpeg) | Mặc định cho motion graphics/explainer/MV; có skill sẵn: `npx skills add heygen-com/hyperframes`; `npx hyperframes@<pin> init/lint/check/snapshot/render` |
| **Remotion** (React, `useCurrentFrame()`, `<Sequence>`, `spring`, `random(seed)`) | Dự án đã dùng React, chuỗi video quản lý phiên bản; `npx remotion skills add` |
| **Canvas/SVG tự viết + Playwright/Puppeteer** | Clip nhỏ, tự chứa, hoặc môi trường không cài được framework (mẫu ở §9) |
| **p5.js + p5.brush** (ClaudeAnimationBase) | Hoạt hình vẽ tay, nét boil |
| **three.js / Blender / Manim** | 3D hoặc animation toán học |

Dùng hệ nhỏ nhất đủ cho phim sẽ làm lại. HeyGen ghi nhận: ràng buộc React càng nhiều thì output càng rập khuôn; HTML thuần cho lại sáng tạo (kinh nghiệm của họ, tham khảo).


### 8. Hợp đồng determinism (bắt buộc với mọi renderer)

- Cấm: `Date.now()`, `performance.now()`, timer, `requestAnimationFrame`, CSS transition/keyframes chạy theo đồng hồ riêng, `Math.random()` không seed, tải mạng lúc render, trạng thái hover/scroll, `repeat: -1`, mô phỏng tích phân từng khung. Random cần seed (PRNG như mulberry32, hoặc `hash(i)`).
- Mọi thứ là hàm thuần của t; không mang trạng thái giữa các khung → render song song, không theo thứ tự được.
- Chờ font/ảnh/WebGL sẵn sàng trước khi chụp (`document.fonts.ready`, decode ảnh). Video nhúng: tách bằng FFmpeg thành ảnh theo fps đích, hoặc re-encode keyframe dày (`-g 15`).
- Khoá phiên bản Chrome, font (file local + `@font-face`), thư viện (tải GSAP về local), kích thước canvas — seed thôi chưa đủ để giống pixel giữa các máy.
- **Seek test:** render khung A → nhảy B → quay lại A, so sánh. Khác nhau = có trạng thái tích lũy.
- Render ở fps của footage (24 fps nguồn trong timeline 30 fps → giật mỗi 4 khung).

**HyperFrames — các bẫy hay gặp:**
- Root standalone: `<div id="root" data-composition-id="main" data-width="1920" data-height="1080" data-duration="15">` nằm thẳng trong body (không bọc `<template>`); root dùng `width/height:100%`, không hardcode px. Sub-composition mới bọc `<template>` và để `<style>/<script>` bên trong template.
- Đúng **một** `gsap.timeline({paused:true})` mỗi composition, đăng ký `window.__timelines["main"] = tl` **sau khi build xong** (kể cả trong `document.fonts.ready`). Key phải khớp `data-composition-id`. Không `tl.play()`.
- Độ dài render = root `data-duration`, không phải độ dài timeline.
- Không tween `visibility/autoAlpha/display` trên `.clip` (framework sở hữu) — tween phần tử con. Không viết `visibility: visible` ở đâu cả (rò rỉ cả video). Ảnh ẩn cần cả `visibility:hidden` và `opacity:0`. Một `tl.set` cho mỗi property mỗi thời điểm (đổi pose: một set dạng hàm `autoAlpha: (i,el)=>el===show?1:0`).
- Không cặp CSS `transform` ban đầu với tween cùng property → dùng `fromTo`/`xPercent`. Ưu tiên tween transform/opacity, tránh tween `left/top/width/height/fontSize`.
- Mọi `<audio>` cần `id` (thiếu → video câm). Không `crossorigin` trên media. Không lồng `<video data-start>` trong phần tử cũng có `data-start`. ID duy nhất sau khi ghép (prefix theo scene `#s3-…`).
- Không `<br>` trong body text; phần tử transform phải block + có kích thước; decor overshoot cần chừa chỗ ở kích thước đỉnh.
- `<script src>` ngoài chạy trước DOM → chỉ chứa định nghĩa hàm; build timeline trong inline script cuối body. Kết thúc timeline bằng `tl.seek(tl.duration()); tl.seek(0);`.
- Vòng lặp: `npx hyperframes lint` → `check` (0 findings; lỗi lint làm audit layout báo "0 sample" giả sạch) → `snapshot --at t1,t2,…` → preview → `render` chỉ sau khi người dùng duyệt.


### 9. Renderer tự viết tối thiểu (đã kiểm chứng: Playwright + FFmpeg)

> Bản đầy đủ hơn nằm ở `scripts/render.mjs`: `window.seek(t)` hoặc `renderFrame(t)`, pipe ffmpeg, `--sub` blur, `--range`, `--sheet`, `--strip`, `--verify`, warm-up font. Đoạn dưới là phiên bản tối giản để hiểu cơ chế.

`index.html` expose `window.PROJECT = {w,h,fps,duration,seed}`, `window.renderFrame(t)` vẽ toàn bộ khung (cả nền) từ t, và `window.__ready` (promise font/asset).

```js
// render.mjs — node render.mjs --stills=0.5,2,4   |   node render.mjs [--audio=a.mp3]
import { chromium } from 'playwright';            // hoặc puppeteer-core + executablePath Chrome
import { spawn } from 'node:child_process'; import { mkdirSync } from 'node:fs';
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage(); await page.goto('file://' + process.cwd() + '/index.html');
await page.evaluate(() => window.__ready); const P = await page.evaluate(() => window.PROJECT);
await page.setViewportSize({ width: P.w, height: P.h });
const shot = async (t, f) => { await page.evaluate(t => window.renderFrame(t), t); await page.locator('canvas').screenshot({ path: f, type: 'jpeg', quality: 92 }); };
if (args.stills) { mkdirSync('out/check', { recursive: true }); for (const t of String(args.stills).split(',').map(Number)) await shot(t, `out/check/t${t.toFixed(2)}.jpg`); }
else { mkdirSync('out/frames', { recursive: true }); const N = Math.round(P.duration * P.fps);
  for (let n = 0; n < N; n++) await shot(n / P.fps, `out/frames/f${String(n).padStart(5, '0')}.jpg`);
  await new Promise((ok, bad) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(P.fps), '-i', 'out/frames/f%05d.jpg',
    ...(args.audio ? ['-i', args.audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest'] : []),
    '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'out/video.mp4'], { stdio: 'inherit' }).on('close', c => c ? bad(c) : ok())); }
await browser.close();
```
Helper nên có trong page: `seg(t,a,b)`, `kf(t,[[t0,v0],…],ease)`, `ease/easeIn/easeOut/backOut`, `spring(t,t0,k,w)` (dao động tắt dần giải tích), `arcPt`, `pulse(t)` theo BEAT. Trong sandbox Cowork: Chromium có sẵn ở `/opt/pw-browsers` (không chạy `playwright install`), playwright global ở `/opt/npm-tools/node_modules` (symlink vào `node_modules/` của project nếu import lỗi). Với HTML/DOM thay vì canvas: chụp `page.screenshot()` sau khi seek timeline (`tl.seek(t)`).

