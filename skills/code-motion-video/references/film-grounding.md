# Film grounding: chỉ mục cơ chế cho staging, G0 và G3

Lớp mỏng. Không đổi gate, không đổi determinism. Dùng ở G0 (xương câu chuyện), G3 (key pose), và khi soi một khung. Gốc nguồn giữ ở kho nội bộ, không công khai; ở đây chỉ có mã thẻ và nhãn.

**Nhãn hai trục.** `source_support`: [sách] = một nhóm nguồn, [nhiều sách] = ít nhất hai nhóm độc lập nêu đúng cơ chế. `image_evidence`/`motion_evidence`: mọi mục dưới đây **UNTESTED**. Nhãn sách là lý do thiết kế, không phải bằng chứng cảm nhận. Still PASS không đóng G4/G6, không đóng timing, âm, loop.

## A. Mười hai cơ chế một khung (kiểm ở key pose)

| ID | Nhãn | Dùng khi | Dấu kiểm một khung | Điều kiện / giới hạn |
|---|---|---|---|---|
| FG-01 | [nhiều sách] | beat cần "muốn gì" | tay/thân hướng một đích chưa đạt | đạo cụ đặt cạnh không phải đích |
| FG-02 | [sách] | beat có vật cản | lối khóa + đường thay thế cùng khung | đổi chiến thuật cần chuỗi, không kiểm bằng still |
| FG-03 | [sách] | cần thấy khả năng tác động | tay, công cụ, điểm bám, vật chắn cùng thấy | mặt buồn không là bất lực |
| FG-04 | [sách] | cần cấp bách | vật tựa mép hẹp, trọng tâm hướng vào đó | blur không là deadline |
| FG-05 | [sách] | beat lựa chọn | hai đích tranh một tay/đường/nguồn lực | giữ được cả hai trong hình thì hỏng |
| FG-06 | [sách] | hành động bị kìm | một tay với, tay kia ghì | still không chứng minh vận tốc |
| FG-07 | [sách] | việc dở, chuyển chú ý | dụng cụ giữa thao tác, mắt sang đích khác | không suy thứ tự thời gian từ một khung |
| FG-08 | [nhiều sách] | lớp bị che | hai dấu lệch nhau cùng thấy | không chẩn đoán vô thức |
| FG-09 | [sách] | việc bề mặt thử quan hệ | tay làm việc, mắt/thân nối tới người nhận | cho nhiều cách đọc |
| FG-10 | [sách] | bất cân xứng thông tin | vật rõ với máy, bị chắn khỏi mắt nhân vật | không thấy ≠ chưa biết |
| FG-11 | [sách] | gán nghĩa cho màu | vật mang nhận ra, có cử chỉ hoặc dấu tích | không lập từ điển màu–cảm xúc |
| FG-12 | [sách] | nhóm cần đọc sai khác nhỏ | quy cách chung + một dấu khác đọc được ở cỡ giao | xem điều kiện dưới |

Màu: hạ độ rực cục bộ chỉ khi brief cho phép; giữ nền đặc trưng của phong cách.

**Điều kiện cho FG-12.** Đồng dạng tĩnh được dùng khi nhiệm vụ là đọc sai khác so với mốc chung. Nó không buộc mọi người chuyển động cùng pha hay cùng easing; luật tránh twinning vẫn giữ. Đoàn đồng bộ nghi lễ phải ghi nhiệm vụ của sự đồng bộ trong brief.

**Điều kiện cho ánh màu biểu hiện** (liên quan M05): chỉ khi brief cho phép nghệ thuật biểu hiện; ghi rõ là lớp ánh/grade phi tả thực, vật mang và vùng đổi. Brief tả thực một nguồn thì không thêm đèn ẩn.

## B. Cụm annex motion M01–M08 (cần chuỗi, không kiểm bằng still)

| Cụm | Ý | Nhãn | Quan hệ với skill | Kiểm bằng |
|---|---|---|---|---|
| M01 | Nhân quả thay lượng cử động | [sách] | củng cố chuỗi chuẩn bị → tiếp xúc → phản ứng | strip trạng thái–tác nhân–phản ứng; still chỉ kiểm điểm tiếp xúc |
| M02 | Đảo giá trị / đảo tình thế | [nhiều sách], **ứng viên**, chưa nâng | củng cố state vào→ra ở bước 5 | hai trạng thái + tác nhân; xem tốc độ thật |
| M03 | Dòng màu theo mốc | [sách] | mới với color arc; hierarchy đổi theo thời gian | sheet các mốc + playback. **Phải tái kiểm nguồn trước khi dùng; chưa xác minh cả cụm.** |
| M04 | Phản ứng rồi mới lộ nguyên nhân | [sách] | mới về thứ tự reveal | strip trước/sau, eye line, phần được lộ |
| M05 | Crescendo màu biểu hiện | [sách] | mâu thuẫn có điều kiện với ánh tả thực | cả nhịp tăng–đỉnh–rút; still chỉ kiểm đỉnh |
| M06 | Khoảng lặng ở bước ngoặt | [sách] | củng cố nhịp thở | duration, animatic, nghe; không suy từ ảnh đứng |
| M07 | Setup / payoff | [sách] | cho series, ngoài ảnh đơn | trình tự + test nhớ/nhận lại không gợi ý |
| M08 | Mood và đổi giá trị | [sách] | mâu thuẫn nếu cấm MV mục tiêu mood | animatic + câu hỏi đúng type; không dùng để phủ quyết MV |

Chưa cụm nào được test chuyển động. Chưa cụm nào đổi gate hay rubric. Lên nhãn quan sát cần animatic/strip/playback do người xem, theo `rubric.md`.
