# AGENTS.md: Worker trong studio Center–Worker

Vai do lệnh việc hiện hành chỉ định: **WORKER** production hoặc **PLANNER/BUG-HUNTER**. Chỉ ghi trong allowlist của lệnh. Lệnh cụ thể có thể cho phép `knowledge/out/<ID>/` và một đường báo cáo; các file Center khác vẫn chỉ đọc. **CENTER** (Claude) là đạo diễn và người phê bình. Center viết lệnh việc vào `tasks/queue/TASK-NN.md`, đọc báo cáo của bạn trong `reports/TASK-NN.md` và nhìn ảnh bằng chứng trong `out/check/`. Bạn không nói chuyện trực tiếp với Center, chỉ trao đổi qua file.

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
- Khung 0 phải đầy đủ (không pop-in từ rỗng). Mỗi read tối thiểu khoảng 0,8–1 s.
- Mặc định thử một thay đổi có nghĩa mỗi 2–4 s cho clip thông tin ngắn. MV/hold/read dài theo phrase và nhu cầu hiểu; ngoại lệ ghi ở shotlist. Không thêm chuyển động trang trí để né detector.

## Quy trình mỗi lệnh việc
Chọn nhánh theo `task_kind`. Production chạm scene/render phải nộp chứng cứ G3–G6 ở bảng bên dưới. Planning/doc-review kiểm tính đầy đủ nguồn, citation, phép tính, liên kết, scope và file báo cáo; không chạy render khi nhiệm vụ không có scene hoặc yêu cầu không render. Không tự tạo `done.json`; watcher sở hữu lifecycle. Báo model thực theo runtime log, thiếu bằng chứng thì ghi UNKNOWN.

1. Đọc lệnh, rồi `docs/brief.md`, `docs/style_guide.md`, `docs/shotlist.md`.
2. Làm **đúng phạm vi**. Không làm thêm những phần lệnh ghi là "ngoài phạm vi".
3. Kiểm tra (bắt buộc trước khi báo cáo), chạy trong thư mục phim:
   - `node render.mjs --verify <mốc trong lệnh>` phải **OK**.
   - `node render.mjs --sheet <mốc>` và `--strip a:b` cho mọi chuyển cảnh mình chạm vào.
   - Chỉ render full (`--sub 4`) khi lệnh yêu cầu.
4. Tự xem ảnh bằng chứng. Gặp lỗi hiển nhiên (chữ tràn, chồng chữ, khung rỗng) thì sửa trước khi báo cáo.
5. Ghi `reports/TASK-NN.md` theo mẫu dưới. **Không tự chấm điểm thẩm mỹ.** Center chấm.

## Vòng đời lệnh việc
- Watcher sở hữu tín hiệu hoàn tất: sau khi bạn thoát, nó ghi `reports/TASK-NN.done.json` và chuyển lệnh sang `tasks/done/`. **Bạn không tự tạo done.json hay di chuyển file trong tasks/.**
- Chạy không qua watcher (thủ công): báo cáo xong là hoàn tất; Center tự kiểm.
- Chạy lại cùng nội dung: Center tạo ID mới `TASK-NN-r2`. Mọi file bằng chứng mang tiền tố ID của lệnh (`out/check/TASK-NN-r2-sheet.png`), không ghi đè bằng chứng của lượt trước.
- Môi trường: watcher đã thêm ffmpeg vào PATH. Nếu vẫn ENOENT, tìm `ffmpeg.exe` trong `%LOCALAPPDATA%\Microsoft\WinGet\Packages` và đặt PATH trong tiến trình, ghi lại trong báo cáo.

## Bằng chứng bắt buộc theo gate (kể cả khi lệnh không liệt kê)
| Gate | Bắt buộc |
|---|---|
| G3 key pose | `--verify` ở mọi key pose · `--sheet` các key pose |
| G4 rough cut | `--verify` · `--sheet` mỗi beat · `--strip` mọi chuyển cảnh đã chạm · test cỡ điện thoại (sheet `--w 360`) |
| G5 sửa lỗi | `--strip` đúng các timestamp lỗi trước và sau sửa · `--verify` các mốc đó |
| G6 final | render `--sub 4` · `node scripts/qa.mjs out/final.mp4 out/qa` · `diff` khung 0 và khung cuối nếu phim loop |

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
