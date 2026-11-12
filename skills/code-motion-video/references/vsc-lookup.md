# VSC: tra kho Vibe Shot Club khi làm phim

Người dùng có connector Vibe Shot Club (tool `vsc_*`, tài khoản hội viên). Đây là **nguồn tra cứu lúc làm**, không phải tài liệu để chép vào repo hay thư mục phim. Điều khoản VSC cấm liệt kê hay xuất kho; repo công khai hay riêng tư cũng vậy. Không lưu định nghĩa, template, mô tả động tác hay prompt của VSC vào `references/`, `docs/` hay `refs/`.

Phiên không có tool `vsc_*` (chưa nối, 401, hết hạn): làm như cũ bằng `camera-moves.md` và `motion-language.md`, nói một dòng là chưa tra được VSC. Không đọc web vibeshot.club để thay.

## Tra gì, ở lớp nào

| Lớp (SKILL.md "Năm lớp") | Nhu cầu | Kho | Tool |
|---|---|---|---|
| REFERENCE | Chọn hoặc phân biệt phong cách cho `style_guide.md` | 风格图谱 `lexicon` | `vsc_search` → `vsc_get_style`; trộn: `vsc_mix_styles` |
| TIMELINE / RENDERER | Một cú máy cụ thể (dolly, orbit, dolly zoom, bullet time…), động tác, nhảy, đánh, chuyển cảnh, khớp nhịp | 动作运镜库 `motion` | `vsc_search` (filter `technique`: camera / beat-sync / transformation / transition) → `vsc_get_motion` |
| Cảnh lai dùng model video | Viết prompt Seedance/Kling cho cảnh người thật | `motion` + 提示词画廊 `gallery` | `vsc_get_motion`, `vsc_get_prompt` |
| — | Chỉ khi người dùng **nói rõ** MJ/sref (thường để làm ảnh khung đầu) | MJ 风格库 `sref` | `vsc_get_sref` |

## Cách tra (giữ hạn mức)
1. Phiên mới gọi `vsc_whoami` một lần.
2. `vsc_search` từ khoá Trung + Anh. Đưa 3–5 ứng viên, hoặc tự chọn một nếu brief đã rõ.
3. Chỉ lấy chi tiết mục được chọn; không lật hết trang, không lấy hàng loạt. `vsc_media` chỉ khi người dùng muốn xem video/ảnh mẫu.
4. `locked: true` hoặc báo hạn mức: dừng gọi chi tiết, làm tiếp bằng thứ đã có.

## Chuyển kết quả VSC thành phim code

**Cú máy (`motion`, nhóm CAM-…):** mô tả VSC thường nêu ai đi, đi đâu, chủ thể đứng yên hay không. Viết lại theo 5 mục của `camera-moves.md` (khung đầu, ai di chuyển, hướng/quãng/tốc độ, khung cuối, cái gì giữ nguyên), rồi code bằng camera 2.5D trong `lib/motion.js`. Phân biệt đúng loại: dolly có parallax, zoom thì không, dolly zoom là cả hai ngược chiều. Mẫu VSC dùng nền ô cờ và cột tham chiếu để thấy parallax; khi animatic cũng có thể đặt lưới tạm như vậy để kiểm, xoá trước rough.

**Động tác:** lấy pha (chuẩn bị → đỉnh → va → hồi) và điểm khớp nhịp, map vào beat grid. Trong code 2D chỉ giữ cái đọc được ở cỡ điện thoại; chi tiết cơ thể chân thực thì để model video.

**Phong cách (`lexicon`):** `features` thành luật trong `style_guide.md` viết bằng lời mình (ánh sáng rơi lên gì, cái gì che, màu gắn vào vật nào). `confusables` thành dòng "không phải X vì…" để critic có tiêu chí. Không dán template; template viết cho model ảnh, phim code cần token và luật chuyển động.

**Prompt model video (cảnh lai):** dùng VSC để chọn và gọi đúng tên cú máy, nhưng phần camera vẫn tách riêng theo mục "Dùng cho model video" trong `camera-moves.md`. Prompt画廊 chỉ để hiểu cấu trúc; viết lại cho brief, không chép câu.

Ghi id VSC đã dùng vào `docs/shotlist.md` (cột ghi chú của shot) để lần sau tra lại.

## Học từ VSC mà không chép
Sau review, nếu một mục VSC giúp hoặc gây lỗi, ghi vào `docs/review_log.md` của phim bằng lời mình, kèm id. Bài học lặp lại ở ≥ 3 phim thì đưa vào `failure-modes.md` hoặc `camera-moves.md` dưới dạng quy tắc của skill (kèm id để tra), không chép mô tả VSC.
