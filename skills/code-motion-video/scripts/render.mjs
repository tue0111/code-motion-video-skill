// render.mjs — trang index.html expose window.seek(t) (hoặc renderFrame(t)) + window.PROJECT {w,h,fps,duration}.
//   node render.mjs                          → out/silent.mp4 (pipe thẳng vào ffmpeg, không file tạm)
//   node render.mjs --sub 4                  → motion blur: 4 sub-frame mỗi khung, trộn bằng tmix
//   node render.mjs --range 2:6              → chỉ render đoạn 2–6 s (sửa cục bộ) → out/range_2-6.mp4
//   node render.mjs --stills 0.5,2,4.25      → PNG full-res vào out/check/
//   node render.mjs --sheet 0,1,2,3 --cols 4 → contact sheet out/check/sheet.png (mỗi beat một khung)
//   node render.mjs --strip 4.1:4.5          → mọi khung trong đoạn, một hàng (bắt pop/snap)
//   node render.mjs --verify 1.5,7.25        → render các mốc theo 2 thứ tự khác nhau, so hash (determinism)
// Tuỳ chọn: --page index.html  --sel canvas (bỏ trống = chụp cả viewport)  --fps  --dur  --w 320 (ô sheet)  --out file
// Trong sandbox không có playwright cục bộ: NODE_PATH không áp dụng cho ESM → symlink node_modules/playwright.
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const A = {}; const av = process.argv.slice(2);
for (let i = 0; i < av.length; i++) if (av[i].startsWith('--')) {
  const [k, v] = av[i].slice(2).split('=');
  A[k] = v ?? (av[i + 1] !== undefined && !av[i + 1].startsWith('--') ? av[++i] : true);
}
const list = s => String(s).split(',').map(Number), span = s => String(s).split(':').map(Number);
const ffmpeg = (args, feed) => new Promise((ok, bad) => {
  const p = spawn('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: [feed ? 'pipe' : 'ignore', 'inherit', 'inherit'] });
  p.on('close', c => c ? bad(new Error('ffmpeg exited ' + c)) : ok());
  if (feed) feed(p.stdin).then(() => p.stdin.end(), bad);
});

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ deviceScaleFactor: 1 });
page.on('pageerror', e => console.error('[page error]', e.message));
await page.goto('file://' + resolve(A.page || 'index.html'));
await page.evaluate(async () => { await document.fonts.ready; if (window.__ready) await window.__ready; });
const P = await page.evaluate(() => window.PROJECT || {});
const W = P.w || 1920, H = P.h || 1080, FPS = +(A.fps || P.fps || 30), DUR = +(A.dur || P.duration || 5), SUB = Math.max(1, +(A.sub || 1));
await page.setViewportSize({ width: W, height: H });
const target = A.sel ? page.locator(A.sel) : page;
const ok = await page.evaluate(() => typeof (window.seek || window.renderFrame) === 'function');
if (!ok) { console.error('trang phải expose window.seek(t) hoặc window.renderFrame(t)'); process.exit(1); }
const grab = async t => { await page.evaluate(t => (window.seek || window.renderFrame)(t), t); return target.screenshot({ type: 'png' }); };
// Warm-up: font canvas/ảnh chỉ nạp khi được dùng lần đầu, document.fonts.ready KHÔNG chờ chúng.
// Quét toàn timeline một lượt thưa rồi chờ font lần nữa, nếu không khung đầu dùng font dự phòng.
await page.evaluate(async d => {
  const f = window.seek || window.renderFrame;
  for (let i = 0; i <= 24; i++) f(d * i / 24);
  await document.fonts.ready; await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));
}, DUR);
mkdirSync('out/check', { recursive: true });
const md5 = b => createHash('md5').update(b).digest('hex');

async function tiles(times, out, cols, w) {
  const dir = 'out/check/_tiles'; rmSync(dir, { recursive: true, force: true }); mkdirSync(dir, { recursive: true });
  for (let i = 0; i < times.length; i++) writeFileSync(`${dir}/${String(i).padStart(4, '0')}.png`, await grab(times[i]));
  const rows = Math.ceil(times.length / cols);
  await ffmpeg(['-i', `${dir}/%04d.png`, '-vf', `scale=${w}:-2,tile=${cols}x${rows}:padding=4:color=gray`, '-frames:v', '1', out]);
  rmSync(dir, { recursive: true, force: true });
  console.log(`wrote ${out} (${times.length} khung, ${cols} cột) — MỞ RA XEM`);
}

if (A.stills) {
  for (const t of list(A.stills)) { const f = `out/check/t${t.toFixed(2)}.png`; writeFileSync(f, await grab(t)); console.log('wrote', f); }
} else if (A.sheet) {
  const ts = list(A.sheet); await tiles(ts, A.out || 'out/check/sheet.png', +(A.cols || Math.min(6, ts.length)), +(A.w || 320));
} else if (A.strip) {
  const [a, b] = span(A.strip), ts = [];
  for (let n = Math.round(a * FPS); n <= Math.round(b * FPS); n++) ts.push(n / FPS);
  await tiles(ts, A.out || `out/check/strip_${a}-${b}.png`, +(A.cols || Math.min(12, ts.length)), +(A.w || 240));
} else if (A.verify) {
  const ts = list(A.verify), first = {};
  for (const t of ts) first[t] = md5(await grab(t));
  await grab(DUR * 0.97);                                     // nhảy xa rồi quay lại, thứ tự ngược
  let bad = 0;
  for (const t of [...ts].reverse()) { const h = md5(await grab(t)); if (h !== first[t]) { bad++; console.log(`KHÁC tại t=${t}: có trạng thái tích luỹ hoặc tài nguyên chưa sẵn sàng`); } }
  console.log(bad ? `verify FAIL: ${bad}/${ts.length}` : `verify OK: ${ts.length} mốc giống hệt khi seek khác thứ tự`);
  process.exitCode = bad ? 1 : 0;
} else {
  const [a, b] = A.range ? span(A.range) : [0, DUR];
  const out = A.out || (A.range ? `out/range_${a}-${b}.mp4` : 'out/silent.mp4');
  const total = Math.round((b - a) * FPS * SUB);
  const vf = SUB > 1 ? ['-vf', `tmix=frames=${SUB},select='eq(mod(n\\,${SUB})\\,${SUB - 1})',setpts=N/${FPS}/TB`] : [];
  const t0 = Date.now();                                       // chỉ để log tốc độ, không ảnh hưởng khung
  await ffmpeg(['-f', 'image2pipe', '-framerate', String(FPS * SUB), '-i', '-', ...vf, '-r', String(FPS),
    '-c:v', 'libx264', '-crf', '16', '-preset', 'medium', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', out],
    async stdin => {
      for (let i = 0; i < total; i++) {
        const png = await grab(a + i / (FPS * SUB));
        if (!stdin.write(png)) await new Promise(r => stdin.once('drain', r));
        if (i % (FPS * SUB) === 0) process.stdout.write(`\r${(i / (FPS * SUB)).toFixed(0)}s / ${(b - a).toFixed(1)}s`);
      }
    });
  console.log(`\nwrote ${out} · ${Math.round((b - a) * FPS)} khung @${FPS}fps${SUB > 1 ? ` · blur ${SUB} sub` : ''} · ${((Date.now() - t0) / 1000).toFixed(1)}s`);
}
await browser.close();
