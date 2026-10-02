# Luật nhà của motion studio

Claude Code đọc file này ở mỗi lượt chạy trong project. **Phạm vi:** khi một agent làm cả phim một mình, file này là luật đầy đủ. Trong studio **Center–Worker**, file này áp dụng cho **Center (Claude)**; Worker (Codex) theo `AGENTS.md`. Phần "Lặp trước khi cho tôi xem" (chấm điểm, ghi review_log) là việc của Center, Worker không làm.

## Hợp đồng render
- Mỗi phim là hàm thuần của thời gian: `window.seek(t)` vẽ khung t, `window.PROJECT = {w,h,fps,duration}`.
- Ở chế độ render cấm: CSS transition/animation, `setTimeout`, `requestAnimationFrame`, `Date.now()`, `performance.now()`, trạng thái mang giữa các khung. Nhiễu chỉ dùng `M.rng(seed)` hoặc `M.hash(i)`, không bao giờ dùng `Math.random`.
- Chuyển động dùng `lib/motion.js`: lò xo dạng đóng (`spring`, `track`), không dùng easing tuyến tính cho thứ có khối lượng. Giá trị đổi đích nhiều lần thì dùng `track()`.
- Chữ và số phải đọc được thì dùng `M.frameT(t, fps)` để motion blur không làm nhoè.
- Font để local với `@font-face`. GSAP/thư viện tải về `assets/`. Không gọi mạng khi render.
- Render: `node render.mjs [--sub 4]`. Encode H.264 yuv420p CRF 16. Loudness −14 LUFS (−16 nếu có giọng đọc).

## Nhìn
- Mặc định bị cấm: tiêu đề giữa màn hình trên nền gradient, mọi thứ fade-in cùng lúc, nhãn ở góc và khung viền, glow trên UI, hạt bung vô cớ, logo hiện cuối kiểu mẫu.
- Một font display, một font UI. Một màu nhấn, trừ khi brief nói khác. Phân cấp 6:3:1.
- Cứ 2–4 giây phải có điều mới xảy ra trên màn hình. Không có phách chết.
- Không bịa màn hình sản phẩm, số liệu hay logo. Thiếu asset thì dừng lại hỏi.

## Âm thanh
- Có nhạc thì đo bằng `python3 scripts/beats.py track.wav > beats.json` rồi đặt hit lên beat đo được.
- Không có nhạc thì tổng hợp bằng `node scripts/sfx.mjs cues.json out/sfx.wav --bed <BPM>` trên cùng timeline với hình.

## Lặp trước khi cho tôi xem
1. `node render.mjs --verify <các mốc>` phải OK.
2. Render mỗi phách một khung thành contact sheet (`--sheet`), cộng strip quanh mọi chuyển cảnh (`--strip`). MỞ RA XEM.
3. Chấm 1–10: hook 2 giây đầu · độ đọc ở cỡ điện thoại (360 px) · chất lượng chuyển động · biến hoá · bố cục · đúng thương hiệu · khớp âm thanh.
4. Sửa 3 lỗi tệ nhất, chỉ render lại các giây bị ảnh hưởng (`--range`). Lặp đến khi mọi điểm ≥ 8.
5. Xong mới render full. Ghi điểm và lỗi vào `docs/review_log.md`.

## Thư mục
`docs/` (brief, style_guide, shotlist, review_log) · `refs/` · `assets/` · `lib/` · `index.html` · `render.mjs` · `out/`
