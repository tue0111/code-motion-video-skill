# Luật nhà của motion studio

Claude Code đọc `CLAUDE.md` ở mỗi lượt chạy trong project. File này (`AGENTS.md`) dành cho Codex làm phim ở mode **solo**. Trong mode Center–Worker dùng `templates/center/AGENTS.md`; không gán luật solo cho Worker.

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
- Mặc định thử một thay đổi có nghĩa mỗi 2–4 s cho clip thông tin ngắn. MV/hold/read dài theo phrase và nhu cầu hiểu; ngoại lệ ghi ở shotlist. Không thêm chuyển động trang trí để né detector.
- Không bịa màn hình sản phẩm, số liệu hay logo. Thiếu asset thì dừng lại hỏi.

## Âm thanh
- Có nhạc thì ước lượng bằng `python3 scripts/beats.py track.wav > beats.json` (downbeat chỉ là ứng viên `beats[::4]`, xác nhận meter/phase bằng nghe) rồi đặt hit lên beat đã xác nhận.
- Không có nhạc thì tổng hợp bằng `node scripts/sfx.mjs cues.json out/sfx.wav --bed <BPM>` trên cùng timeline với hình.

## Lặp trước khi cho tôi xem
1. `node render.mjs --verify <các mốc>` phải OK.
2. Render mỗi phách một khung thành contact sheet (`--sheet`), cộng strip quanh mọi chuyển cảnh (`--strip`). MỞ RA XEM.
3. Review theo `references/rubric.md` (trong skill): hai bảng A1–A3 và T1–T5, tập trục bắt buộc/ngưỡng theo gate đã chốt. Chưa kiểm = UNTESTED; không dùng model-estimate thay test người hoặc nghe.
4. Chọn tối đa ba lỗi có evidence, sửa đúng tầng và kiểm lại đoạn ảnh hưởng (`--range`). Không dùng điểm trung bình để vượt gate.
5. Chỉ render full khi được giao và đủ approval. Ghi evidence cùng execution_status và acceptance_status vào `docs/review_log.md`; trong mode Center–Worker việc chấm và acceptance thuộc Center/chủ phim.

## Thư mục
`docs/` (brief, style_guide, shotlist, review_log) · `refs/` · `assets/` · `lib/` · `index.html` · `render.mjs` · `out/`
