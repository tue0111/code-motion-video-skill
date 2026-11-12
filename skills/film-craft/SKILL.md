---
name: film-craft
description: Kho kiến thức nghề điện ảnh, quay phim và hoạt hoạ cho phim ngắn T1 to 9. Dùng khi cần quyết định hoặc giải thích một việc thuộc tay nghề, ví dụ chọn cỡ cảnh và góc máy, giữ trục và hướng nhìn giữa hai shot, tiêu cự, tốc độ khung và nhoè chuyển động, ánh sáng qua nhiều shot, màu và chỉnh màu, điểm cắt và nhịp dựng, thiết kế âm thanh, 12 nguyên lý hoạt hoạ và timing, diễn xuất nhân vật, các lối hoạt hoạ (cel, anime, stop-motion, 3D cách điệu), hiệu ứng động, ghép lớp 2.5D, hoặc quay thật bằng máy và điện thoại. Skill này không điều phối quy trình. Làm phim từ ảnh sinh ra thì dùng t1to9-film, motion dựng bằng code thì dùng code-motion-video, và hai skill đó tra sang đây khi cần tay nghề.
---

# Film craft · tay nghề điện ảnh, quay phim, hoạt hoạ

Hai skill kia trả lời câu "làm theo thứ tự nào". Skill này trả lời câu **"vì sao làm vậy và viết thế nào"**. Nó là kho để tra. Không đọc hết một lượt: tìm đúng dòng trong bảng dưới, mở một file, lấy thứ cần, quay lại việc.

## Tra theo việc đang làm

| Đang cần | Mở file |
|---|---|
| Chọn cỡ cảnh, góc, độ cao máy. Chia một cảnh thành các shot. Giữ trục 180°, hướng nhìn, hướng đi giữa hai shot. Dàn người trong khung dọc | `references/shot-and-coverage.md` |
| Tiêu cự khi máy chuyển động, tốc độ khung, góc màn trập và nhoè chuyển động, đổi nét, tính cách của tay cầm, gimbal, dolly, ống anamorphic | `references/lens-and-camera.md` |
| Ánh sáng có nguồn gốc, khớp ánh sáng giữa các shot cùng cảnh, giờ trong ngày làm cấu trúc, nguồn sáng di chuyển, đêm còn đọc được | `references/light-in-motion.md` |
| Bảng màu theo đoạn phim, khớp màu các clip sinh riêng, thứ tự chỉnh màu, hạt và bloom, giao cho điện thoại | `references/color-and-grade.md` |
| Cắt ở đâu, nối kiểu gì, đường mắt qua chỗ cắt, nhịp, xử lý thời gian, dựng từ clip i2v | `references/editing.md` |
| Các lớp âm, im lặng, điểm đồng bộ, thiết kế SFX, chọn và cắt nhạc, mix cho loa điện thoại | `references/sound-design.md` |
| Vì sao một chuyển động trông chết hoặc trôi. Timing, spacing, easing, lấy đà, bám theo, cung, on ones và on twos | `references/animation-principles.md` |
| Pose, sức nặng, mắt đi trước thân, dáng đi, tay, hai nhân vật. Viết hành động cho i2v thành các pha | `references/character-animation.md` |
| Chọn và giữ một lối hoạt hoạ: cel 2D, anime hạn chế, cut-out, stop-motion, 3D cách điệu, tranh động | `references/animation-styles.md` |
| Khói, lửa, nước, gió, tia, phép thuật, cú va chạm và impact frame | `references/fx-animation.md` |
| Tách lớp ảnh, parallax, chiều sâu giả, rung máy có seed, glow, Ken Burns có chủ đích | `references/compositing-2.5d.md` |
| Quay thật bằng máy ảnh hoặc điện thoại, ghép footage thật với cảnh sinh bằng AI | `references/shooting-real.md` |

Thứ đã có ở chỗ khác thì không lặp ở đây:

| Cần | Nằm ở |
|---|---|
| 46 chuyển động máy và khuôn prompt i2v | `../t1to9-film/references/camera-moves.md` |
| Gu cắt của Tuệ (hard cut đúng phách, 3–4 dấu nhấn) | `../t1to9-film/references/cut-grammar.md` |
| Chọn loại phim, viết G0 | `../t1to9-film/references/film-types.md`, `g0-script.md` |
| Beat grid, voice timing | `../code-motion-video/references/audio-timing.md` |
| Lệch pha giữa các lớp, vật lý theo vật liệu trong motion code | `../code-motion-video/references/motion-language.md` |
| Ánh sáng, tiêu cự, màu, bố cục cho **một ảnh tĩnh** | repo `t1-visual-knowledge`, `system/02`, `11`, `12` |
| Sách điện ảnh gốc | MCP `film-library`, cách tra ở `../t1to9-film/references/sources.md` |

## Cách dùng một file

1. Đọc dòng "Dùng khi" ở đầu file. Không khớp thì đóng lại.
2. Tìm bảng có tình huống của mình. Lấy **quyết định**, **câu prompt** và **dấu kiểm**.
3. Câu prompt zh-CN ở đây là điểm xuất phát. Sửa danh từ cho đúng cảnh của phim, giữ khuôn của `t1to9-film` (场景 tách khỏi 镜头), rồi mới lint.
4. Ra ảnh hay clip thì soi theo dấu kiểm. Khác với file thì ghi vào case của phim, và sửa file này nếu thấy lặp lại.

## Nhãn độ tin

| Nhãn | Nghĩa |
|---|---|
| `[nghề]` | Kiến thức phổ biến của nghề, nhiều nguồn độc lập cùng nói |
| `[sách]` | Có trích một cuốn trong `film-library`, kèm `page_label` đã đọc |
| `[suy luận]` | Phân tích của skill, nhất là mọi dự đoán model i2v phản ứng ra sao |
| `[đã thử YYYY-MM-DD]` | Đã thấy trên ảnh hoặc clip thật của một phim, có ghi phim nào |

Khi viết ra, **chưa có dòng nào mang nhãn đã thử**. Mọi câu prompt là giả thuyết cho tới khi một phim thật dùng nó. Mỗi file có mục "Hàng chờ thử" ở cuối; phim nào tiện thì thử một phép và ghi kết quả.

## Thứ tự quyền khi mâu thuẫn

Yêu cầu của Tuệ cho phim đang làm > luật cứng trong `t1to9-film/SKILL.md` và `code-motion-video/SKILL.md` > gu đã chốt (`cut-grammar.md`) > case phim thật > các file ở đây > sách.

Kiến thức chung nói "nên" mà gu của Tuệ nói khác thì theo gu, và file ghi rõ dòng "T1 to 9 chọn khác".

## Luật khi thêm kiến thức

- Viết bằng lời mình. Không chép sách, web, VSC hay khoá học. Trích sách chỉ một dòng tên sách và `page_label`, kèm diễn đạt lại.
- Mỗi nguyên lý phải kéo theo một quyết định, một câu prompt hoặc một dấu kiểm. Không có thì chưa đáng vào.
- Không tính từ rỗng trong câu prompt (电影感, 高级感, 唯美). Viết vật, nguồn sáng, động từ, số.
- Repo công khai: không commit ảnh, video, khung hình phim của người khác.
