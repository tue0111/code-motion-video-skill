# Setup studio làm phim bằng code

Nguồn: Movez "How to build motion design studio with Opus 5.5" (27/09/2026), cộng với test thật trên bộ khởi tạo của skill này.

## Vì sao cần agent có shell

App chat chỉ viết được animation. Claude Code, Codex, Cowork có shell thì mới **render, nghe và nhìn lại khung của chính mình** được. Vòng phản hồi đó là khác biệt giữa bản đầu "tạm được" và bản xuất sắc. Prompt chỉ chiếm khoảng 10% chất lượng, 90% còn lại nằm ở harness (renderer, luật nhà, vòng critic).

## Cài đặt (khoảng 10 phút)

```bash
# 1. Runtime: Node 22+, ffmpeg, Python cho phân tích audio
brew install node ffmpeg python          # Linux: apt install nodejs ffmpeg python3
pip install numpy librosa soundfile      # chỉ cần khi đo beat bài nhạc thật (~280 MB)
# 2. Project + trình duyệt headless
mkdir motion-studio && cd motion-studio && npm init -y && npm i -D playwright && npx playwright install chromium
# 3. (tuỳ chọn, route B) skill framework
npx skills add remotion-dev/skills       # /remotion-create, /remotion-render …
npx skills add heygen-com/hyperframes    # router /hyperframes + GSAP
# 4. (tuỳ chọn) bộ vẽ tay Node canvas: rig, bút, âm thanh tổng hợp
claude plugin marketplace add buildwithhanif/claude-animation-skill
claude plugin install claude-animation@claude-animation-skill
```

Hỏi người dùng trước khi tải gói lớn. Trong sandbox Cowork, Chromium và playwright đã có sẵn: symlink `node_modules/playwright` tới `/opt/npm-tools/node_modules/playwright`, không chạy `playwright install`.

## Khởi tạo một project phim từ skill

```bash
SK=<đường dẫn skill>/skills/code-motion-video
mkdir -p my-film/{docs,refs,assets,lib,out} && cd my-film
cp $SK/templates/studio/CLAUDE.md . && cp CLAUDE.md AGENTS.md     # luật nhà cho Claude + Codex
cp $SK/lib/motion.js lib/ && cp $SK/scripts/render.mjs .
cp $SK/templates/{brief,style-guide,shotlist,review}.md docs/
cp $SK/examples/minimal/index.html . && sed -i 's#../../lib/#lib/#' index.html   # khung xuất phát, thay nội dung
```

## Effort và route

- **Effort:** medium cho sửa nhỏ và render lại; **xhigh** cho phim mới; **max** khi 3 giây đầu phải gánh cả một buổi ra mắt. Các one-shot viral đều chạy xhigh hoặc max. Effort cao thì cảnh "phô" và chi tiết hơn (theo ghi nhận của ClaudeAnimationBase).
- **Route A (mặc định của Opus):** một `index.html` không dependency, `seek(t)`, Playwright chụp từng khung, ffmpeg. Opus chọn route này kể cả khi đã cài Remotion hay HyperFrames. **Muốn dùng framework thì phải nói rõ.**
- **Route B:** Remotion (React, hợp với series, template, video dữ liệu) hoặc HyperFrames (HTML + GSAP, hợp khi nghĩ theo trang web). Xem `renderers-and-determinism.md`.
- Khi đã đưa tham chiếu thì để model tự chọn kỹ thuật. Chỉ nêu look và ràng buộc, không nêu thư viện, trừ khi cần tái sử dụng framework.
- Mỗi thương hiệu một phiên làm việc: video thứ hai làm nhanh hơn vì renderer, synth âm thanh và pipeline xuất đã có sẵn.

## Bộ công cụ của skill (đã test)

| Công cụ | Việc |
|---|---|
| `lib/motion.js` | `spring` dạng đóng, preset `SPRING.snappy/default/heavy/playful`, `track` (cộng lò xo cho mỗi lần đổi đích), `indicator` (mép trước/sau khác lò xo → co giãn), `swapAlpha` (chữ trong hộp đang morph), `frameT`, `loopT`, `rng`/`hash`, `kf`, `pulse`, `project` (camera 2.5D) |
| `scripts/render.mjs` | Pipe thẳng vào ffmpeg; `--sub N` motion blur; `--range a:b` render cục bộ; `--stills`; `--sheet`; `--strip`; `--verify` (hash khi seek khác thứ tự); tự warm-up font |
| `scripts/beats.py` | Đo beat, downbeat, onset hit → `beats.json` |
| `scripts/sfx.mjs` | Tổng hợp click/tick/pop/thump/whoosh/rise/chime + nền BPM đơn giản, soft-clip, stereo |
| `scripts/qa_video.sh` | QA trên MP4: stream, khung đen, khung đầu, contact sheet, loudness |

Ghép âm: `ffmpeg -i out/silent.mp4 -i out/sfx.wav -af loudnorm=I=-14:TP=-1 -c:v copy -c:a aac -shortest out/final.mp4`

## Các bước kiểm tra nhanh bằng ffmpeg

```bash
ffmpeg -i out/final.mp4 -vf "fps=2,scale=270:-1,tile=6x5" -frames:v 1 out/contact.png      # 2 khung/giây
ffmpeg -ss 4.1 -i out/final.mp4 -vf "scale=320:-1,tile=12x1" -frames:v 1 out/strip.png     # 12 khung liên tiếp
ffmpeg -i out/final.mp4 -vf "fps=1,scale=360:-1,tile=5x3" -frames:v 1 out/phone.png        # test cỡ điện thoại
ffmpeg -stream_loop 1 -i out/final.mp4 -c copy out/loop_check.mp4                           # xem mối nối loop
```

## Bẫy đã gặp thật khi test bộ khởi tạo

| Bẫy | Triệu chứng | Sửa |
|---|---|---|
| Font canvas nạp khi dùng lần đầu, `document.fonts.ready` không chờ | `--verify` FAIL: khung đầu dùng font dự phòng | Warm-up: quét toàn timeline một lượt thưa rồi chờ font lần nữa (render.mjs đã làm) |
| Chữ trong hộp vào ở t=0.08 | Khung đầu rỗng, loop: khung cuối ≠ khung đầu | Trạng thái đầu phải đầy đủ ngay khung 0 (mở giữa hành động) |
| Chữ rời đi theo keyframe "giữ" thay vì keyframe "morph" | Thẻ rỗng đứng chết 0,6 s | Chữ ra ngay trước lúc hình **bắt đầu đổi**, không phải lúc giữ |
| Trạng thái kẹp giữa hai lần đổi quá ngắn | Dấu tích chỉ hiện 0,37 s, không đọc kịp | Mỗi read tối thiểu khoảng 0,8–1 s ở tốc độ thật |
| Lò xo quay về chưa kịp ổn định trước khi loop | Mối nối lệch 2 px, giật nhẹ | Bắt đầu bước quay về sớm hơn. Đo: `diff(t0, t_end − 1/fps)` = 0 |
| Motion blur trộn các sub-frame có số khác nhau | Bộ đếm nhoè "326" | `frameT(t, fps)` cho chữ/số |
| Con trỏ đứng đè lên nội dung sau khi click | Che biểu đồ | Con trỏ rời đi sau khi xong việc |

Các bẫy khác (theo buildwithhanif): rig lấy gốc tại điểm chạm đất; xoay quanh điểm tiếp xúc đứng yên; preview đọc từ cache cũ thì ghi sheet ra tên file mới; ffmpeg không có `drawtext` thì vẽ nhãn bằng canvas; khung 0 rỗng vì mọi thứ "pop in"; SFX đơn lẻ giữ ở mức gain 0,3–0,6 và soft-clip.
