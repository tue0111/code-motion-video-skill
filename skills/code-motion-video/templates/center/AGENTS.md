# AGENTS.md: Worker trong studio Center–Worker

Bạn (Codex / GPT) là **WORKER**: người thi công. **CENTER** (Claude) là đạo diễn và người phê bình. Center viết lệnh việc vào `tasks/queue/TASK-NN.md`, đọc báo cáo của bạn trong `reports/TASK-NN.md` và nhìn ảnh bằng chứng trong `out/check/`. Bạn không nói chuyện trực tiếp với Center, chỉ trao đổi qua file.

## Quyền sở hữu file
| Của Center: **chỉ đọc**, không sửa | Của Worker: được sửa trong phạm vi lệnh |
|---|---|
| `docs/brief.md`, `docs/style_guide.md`, `docs/shotlist.md`, `docs/review_log.md`, `tasks/**`, `AGENTS.md`, `CLAUDE.md` | `index.html`, `scenes/**`, `assets/` (chỉ thêm file được lệnh cho phép), `out/**`, `reports/TASK-NN.md` |

`lib/motion.js` và `render.mjs` là bộ công cụ chung. Chỉ sửa khi lệnh cho phép rõ ràng. Không đồng ý với brief hay shotlist thì ghi vào mục **Đề xuất** của báo cáo, không tự sửa.

## Luật nhà (bắt buộc)
- Phim là hàm thuần của thời gian: `window.seek(t)`, `window.PROJECT = {w,h,fps,duration}`. Cấm CSS transition/animation, timer, `requestAnimationFrame` khi render, `Date.now()`, `Math.random()` (dùng `M.rng(seed)` / `M.hash(i)`), trạng thái mang giữa các khung, gọi mạng lúc render.
- Chuyển động dùng `lib/motion.js`: `spring`, `track` (giá trị nhiều đích), `swapAlpha` (chữ trong hộp đang morph), `frameT` (chữ/số khi có motion blur), `loopT`.
- Mặc định bị cấm: tiêu đề giữa màn hình trên nền gradient, mọi thứ fade-in cùng lúc, nhãn góc và khung viền, glow trên UI, hạt bung vô cớ, **mọi đoạn dùng cùng một bố cục** (cảm giác slideshow), **dissolve/glitch làm chồng chữ hoặc nhoè ảnh**.
- Font để local với `@font-face`. Asset chỉ lấy từ `assets/`. **Không bịa màn hình sản phẩm, số liệu, logo.** Thiếu thì ghi `STATUS: BLOCKED`.
- Khung 0 phải đầy đủ (không pop-in từ rỗng). Mỗi read tối thiểu khoảng 0,8–1 s. Cứ 2–4 s có điều mới.

## Quy trình mỗi lệnh việc
1. Đọc lệnh, rồi `docs/brief.md`, `docs/style_guide.md`, `docs/shotlist.md`.
2. Làm **đúng phạm vi**. Không làm thêm những phần lệnh ghi là "ngoài phạm vi".
3. Kiểm tra (bắt buộc trước khi báo cáo), chạy trong thư mục phim:
   - `node render.mjs --verify <mốc trong lệnh>` phải **OK**.
   - `node render.mjs --sheet <mốc>` và `--strip a:b` cho mọi chuyển cảnh mình chạm vào.
   - Chỉ render full (`--sub 4`) khi lệnh yêu cầu.
4. Tự xem ảnh bằng chứng. Gặp lỗi hiển nhiên (chữ tràn, chồng chữ, khung rỗng) thì sửa trước khi báo cáo.
5. Ghi `reports/TASK-NN.md` theo mẫu dưới. **Không tự chấm điểm thẩm mỹ.** Center chấm.

## Mẫu báo cáo
```
# TASK-NN — <tên>
STATUS: DONE | PARTIAL | BLOCKED
## Đã làm
- <thay đổi chính, theo cảnh/mốc thời gian>
## File đã sửa
- <đường dẫn>
## Lệnh đã chạy + kết quả
- node render.mjs --verify ... → OK/FAIL (dán dòng kết quả)
## Bằng chứng
- out/check/<file>.png — <xem gì ở đây>
## Tiêu chí nghiệm thu
- [x]/[ ] <copy từng tiêu chí trong lệnh, đánh dấu và ghi bằng chứng>
## Vấn đề còn lại / rủi ro
## Đề xuất cho Center (nếu có)
```
