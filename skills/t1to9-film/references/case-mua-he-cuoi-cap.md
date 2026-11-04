# Case: *mùa hè cuối cấp* 《最后的夏天》 (2026-11-04, v1→v7)

Thư mục `<PREV_FILM>`. Bản final là `out/thanh-xuan-ccd_FINAL.mp4`: 1080×1920, 24 fps, 28,25 s, đo lại được −13,86 LUFS và −1,49 dBTP. Tổng chi Sumi ghi tay khoảng 787 điểm, nhưng không có ledger theo từng job để đối soát. Codex Astra chấm quy trình **4,5/10** (`reports/TASK-03-astra.md`).

## Chuyện gì đã xảy ra

| Bản | Làm gì | Tuệ / review nói gì | Bài học (đã vào skill ở đâu) |
|---|---|---|---|
| v1–v2 | Ảnh tĩnh, Ken Burns, thẻ tách nền kiểu karin | Phải chuyển động thật như 古一 | Dùng i2v thật. Hạt mịn, tương phản có khối (`prompts.md` B) |
| v3 | i2v Seedance 480p, nâng 720p cho cận mặt và hero | 480p nội suy lên vẫn mượt | 480p mặc định, 720p cho cận mặt và hero (SKILL luật 7) |
| v4 | 6 kiểu chuyển cảnh, watermark góc | Như template CapCut, không có câu chuyện. Shot list là "8 ca bẫy giải phẫu" | G0 trước prompt (`g0-script.md`). Hard test tách khỏi shot list |
| v5 | G0 r2: lưu bút, motif góc gấp. Trang giấy, bìa, chữ và cánh hoa **vẽ bằng code**, lật trang ở mọi cut | "Sai… cringe" | Code không vẽ vật thể (luật 2). Một thiết bị chuyển cảnh lặp ở mọi cut cũng hỏng (`cut-grammar.md`) |
| v6 | Bỏ đạo cụ code, theo lối cắt 古一 | Rơi S8_2, S3_3. Clip mới ngả vàng (b* lệch khoảng 4) | `film_qa.py diff`, `film_qa.py color` |
| v7 | Gắn lại shot, kéo màu về palette S | FINAL | Astra tìm thêm: N1 đọc nguồn tới 1,725 s trong khi usable chỉ 1,6 s. N2 giữ khung cuối khoảng 1,2 s mà không khai. Detector freeze không thấy cả hai (`film_qa.py ranges`) |

## Lỗi quy trình gốc

1. **Không có kịch bản trước ảnh.** Ảnh chọn theo bài test, rồi lấy hiệu ứng ra lấp chỗ thiếu ý.
2. **Duyệt không gắn với bản cụ thể.** Không có animatic được duyệt trước khi chạy batch, không có ledger theo job.
3. **Người chọn ảnh cũng là người viết mô tả cho Jev.** Mô tả đã nghiêng ("best composition") thì Jev chỉ lặp lại điều đó.
4. **Sửa ở renderer mà không cập nhật hợp đồng.** G0 vẫn "CHƯA DUYỆT", motif đổi mà không ghi.
5. **Âm thanh** tổng hợp bằng code, nhưng không có bản ghi nào cho thấy đã có người nghe.

## Giữ lại được gì

- Prompt có nguồn VSC và ghi tên tác giả. Ảnh raw được giữ. Beat grid lấy từ nhạc thật.
- Renderer là hàm thuần của t (`tools/render.py`).
- Grade chỉ chuẩn hoá WB, so 3 preset cạnh nhau. Tuệ chọn preset "ngọt".
- Chọn model theo độ khó: 2.0, Fast, 2.5.
- Chữ ký đóng ở hậu kỳ bằng asset riêng, vì model hay viết sai chữ.
- Lối cắt v7: hard cut là nền. Flash kem vào drop, flash CCD đóng băng rồi thẻ rơi theo phách, payoff hiện từ khung cháy trắng, outro tối dần.

## Trích sách đã dùng

McKee, *Story*, page_label 63 (controlling idea). G0 cũ ghi "tr.119" là sai, vì trang đó nói về subplot. Pramaggiore & Wallis page_label 33 (motif). Murch page_label 16. Reisz & Millar page_label 85. Katz page_label 197–198.
