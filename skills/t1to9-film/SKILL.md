---
name: t1to9-film
description: Điều phối làm phim ngắn T1 to 9 từ ảnh sinh ra (image → i2v) thành video 9:16 dài 20–60 s, đi qua các cổng G0–G6. Dùng khi Tuệ muốn làm phim, viết G0, viết prompt ảnh hoặc i2v cho phim, chọn ảnh, báo giá sinh video hay nhạc, dựng và cắt, QA bản dựng, hoặc hỏi "còn sửa gì không". Skill không chứa kiến thức điện ảnh hay prompt mà chỉ dẫn cách tra film-library, VSC, T1 knowledge và nhà cung cấp sinh hình. Video motion dựng hoàn toàn bằng code (HTML/SVG/Canvas, kinetic type, explainer) thì dùng skill code-motion-video.
---

# T1 to 9 · phim ngắn từ ảnh

Center là Claude, chủ phim là **Tuệ**. Báo cáo cho Tuệ bằng tiếng Việt, xưng mày/tao. Prompt ảnh viết bằng zh-CN.

Skill này chỉ điều phối. Kiến thức nằm ở nguồn, nên phải tra đúng nguồn cho từng việc, rồi ghi lại đã tra gì. Cách gọi từng nguồn ở `references/sources.md`. Đường dẫn trên máy viết dạng `<KHOÁ>`; giá trị thật nằm trong `paths.local.md` cạnh file này (mẫu: `templates/paths.example.md`).

| Cần gì | Tra ở đâu |
|---|---|
| Ý chính, motif, luật cắt, nhịp | MCP `film-library`. Luôn ghi tên sách + `page_label`, diễn đạt lại, không chép nguyên văn |
| Style ảnh, cách viết prompt, chuyển động và chuyển cảnh | MCP VSC: `vsc_search` trước, chọn 3–5 mục, rồi mới `vsc_get_*`. Ghi tên tác giả khi mượn prompt |
| Cấu trúc prompt zh-CN, validator, negative | `<T1_KNOWLEDGE>` (skill `t1-visual-prompt`, `tools/t1lint.py --no-brand`) |
| Sinh video, nhạc, giọng | Nhà cung cấp mà Tuệ chọn (Sumi, Codex imagegen…). Có tốn tiền thì làm theo giao thức chi tiền ở dưới |
| Tay nghề: cỡ cảnh và trục, tiêu cự, ánh sáng qua nhiều shot, màu, điểm cắt, âm thanh, hành động của nhân vật, lối hoạt hoạ, hiệu ứng | Skill `film-craft` (cùng repo, `../film-craft/SKILL.md`): tìm dòng trong bảng tra, đọc đúng một file. Câu prompt ở đó chưa thử; luật cứng ở dưới đứng trên |
| Chọn giữa vài ứng viên đã soi | Jev (tùy chọn). Jev chỉ đọc mô tả, không nhìn pixel |

## Cổng: biết đang ở cổng nào thì chỉ đọc file của cổng đó

| Cổng | Việc | Đọc | Đầu ra (trong thư mục phim) |
|---|---|---|---|
| **G0** | **Chọn loại phim trước**, rồi kịch bản: người xem, ý chính, nhân vật, motif, câu hỏi giây 5, beat sheet, trần ngân sách | `references/film-types.md` (chuỗi câu hỏi theo loại), `references/g0-script.md`, `templates/g0.md` | `docs/g0.md` → **Tuệ duyệt** |
| **G1** | Tham chiếu và prompt ảnh cho từng shot, có khoá nhân vật | `references/prompts.md` | `prompts/shots.md`, `shots.json` |
| **G2** | Ảnh đã chọn, animatic tốc độ thật trên nhạc thật, cut map, chuyển động máy từng shot, báo giá pilot | `references/cut-grammar.md`, `references/camera-moves.md`, `references/prompts.md` (i2v) | `review/animatic.mp4`, `cuts.md` → **Tuệ duyệt** |
| **G3** | Pilot: chạy 1 clip khó nhất, soi từng khung, rồi mới chạy cả loạt | `references/qa.md` §i2v | `review/<shot>_strip.jpg` → **Tuệ duyệt batch** |
| **G4** | Rough cut từ footage đã duyệt, review mù, diff shot | `references/qa.md`, `references/cut-grammar.md` | `out/vN.mp4`, `review/vN_sheet.jpg` |
| **G5** | Sửa vài lỗi lớn nhất, kèm thời điểm và lý do, chạy QA hồi quy | `references/qa.md` | before/after + QA |
| **G6** | Tuệ xem/nghe đúng hash trên điện thoại và tai nghe | `references/qa.md` §giao | ghi nghiệm thu |

Tuệ hỏi việc ở giữa chừng thì xác định cổng hiện tại từ thư mục phim (`docs/g0.md`, `shots.json`, `ledger.md`), không bắt đầu lại. Chi tiết từng cổng ở `references/gates.md`. Bài học từ phim trước ở `references/case-mua-he-cuoi-cap.md` và `references/case-montage-anime-39s.md` (phòng và trang phục trôi giữa các shot, bỏ cổng duyệt ảnh).

## Luật cứng

1. **Chưa có G0 được Tuệ duyệt thì chưa viết prompt ảnh.** Im lặng không tính là duyệt. Bài test giải phẫu là việc riêng, không dùng làm shot list.
2. **Code không vẽ đạo cụ hay vật thể** (giấy, chữ viết tay giả, bìa sách, cánh hoa hoạt hình…). Mọi thứ trên hình phải là ảnh hoặc video sinh ra. Code chỉ lo camera, ánh sáng, nhịp, màu, hạt và âm. Ngoại lệ: chữ ký T1 to 9 dùng asset có sẵn, và thẻ ảnh có viền/bóng **chỉ khi animatic G2 có thẻ và Tuệ duyệt**, nội dung thẻ phải là khung hình thật.
3. **Chữ ký "T1 to 9" chỉ xuất hiện ở cuối phim.** Không watermark trong phim, không có chữ trong ảnh sinh. Prompt phim luôn lint bằng `--no-brand`.
4. **Lối cắt:** nền là hard cut đúng phách. Chỉ nhấn 3–4 chỗ có lý do. Whip chỉ dùng khi chuyển động trong shot dẫn tới nó. Không dùng một kiểu chuyển cảnh cho mọi cú cắt. Xem `references/cut-grammar.md`.
5. **人物锁 chỉ dán khoá của người có mặt trong shot đó.** Dán cả nhóm thì model ảnh sẽ đưa mọi người vào khung.
6. **Soi từng khung mọi clip i2v** trước khi dựng, vì model có thể đảo trạng thái đạo cụ. Ghi khoảng dùng được `usable` cho từng clip. Timeline không được đọc ngoài khoảng đó hoặc giữ khung cuối mà không khai `hold`.
7. **Độ phân giải:** đa số shot 480p, 720p cho cận mặt và cảnh hero. Chạy thử 1 clip trước khi chạy cả loạt.
8. **Âm thanh để trạng thái `UNTESTED`** cho đến khi Tuệ nghe đúng bản đó. Số đo không thay được tai.
9. Không đọc file credential (`.env`, key, token). Thiếu quyền thì báo Tuệ.

## Giao thức chi tiền (mọi nhà cung cấp tính phí)

Trần ngân sách `B` do Tuệ chốt cho từng phim ở G0, theo đơn vị của nhà cung cấp. Skill không có trần mặc định.

1. Ước giá miễn phí trước (với Sumi là `estimate_task`), rồi lấy báo giá ràng buộc (`quote_task`).
2. Báo Tuệ: shot nào, model nào, độ phân giải, thời lượng, số lượt, giá, lũy kế so với `B`. **Chờ Tuệ đồng ý.**
3. Gửi đúng payload đã báo giá, với `idempotencyKey` cố định. Thêm hay đổi một trường (kể cả `entrypoint`) sẽ làm quote mất hiệu lực, khi đó phải quote lại.
4. Timeout thì tra lại bằng `find_task_by_request` trước khi gửi lại. Không bao giờ tạo lại mù.
5. Ghi một dòng vào `ledger.md` cho mỗi lần quote, gửi, xong, lỗi hoặc hoàn tiền. Tổng phải tính từ ledger, không sửa tay một ô tổng.

Tuệ duyệt một gói đã liệt kê sẵn thì chạy được các lượt trong gói đó, không cần hỏi lại từng lượt, miễn payload không đổi. Vượt gói thì hỏi lại.

## Cách làm việc với Tuệ

- Mỗi lần dừng ở cổng: gửi file cần xem (sheet, animatic, MP4) bằng SendUserFile, kèm tối đa 3 câu hỏi cụ thể.
- Tuệ hỏi "còn sửa gì không": đo trước rồi mới nói. Nói rõ phần nào đã ổn và không nên đụng. Chỉ đề xuất vài sửa nhỏ có mốc thời gian, mỗi sửa có lý do gắn với motif hoặc nhạc.
- Trích sách: `Tên sách, page_label N`, viết lại bằng lời mình. Chưa tra được thì ghi "chưa kiểm", không bịa số trang.
- Kết quả Jev, detector hay điểm số là bằng chứng phụ. Câu "đạt" thuộc về mắt và tai của Tuệ.
