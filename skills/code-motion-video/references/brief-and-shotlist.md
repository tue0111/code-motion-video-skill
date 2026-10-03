# Brief đạo diễn, style guide, shotlist và reads

### 3. Brief đạo diễn (8 mục — gộp rari + 观默)

```
FILM        Một câu người xem phải nhớ · Khán giả · Thời lượng · fps · Tỷ lệ (16:9 / 9:16 / 1:1)
ASSETS      Logo thật · Ảnh UI thật · Font + màu (token) · Nhạc/voice · Tham chiếu được phép
1 Mục tiêu        Cho ai xem? Xem xong nhớ gì?
2 Storyboard      Mỗi cảnh một nhiệm vụ; chủ thể / chủ thể phụ / nền; ai được thấy trước
3 Quỹ đạo+camera  Mỗi thành phần: điểm đầu → đường đi → điểm cuối; camera di chuyển để làm rõ gì
4 Chuyển động     Ai chịu lực, khung tiếp xúc, biến dạng, bật lại, hồi phục
5 Vật liệu+sáng   Bề mặt (mờ/bóng), hướng đèn chính, highlight, bóng tiếp xúc
6 Nhịp+âm thanh   BPM hoặc mốc voice; SFX rơi vào khung nào
7 Điều cấm        Ví dụ: cấm mọi thứ cùng fade-in; cấm glow vô cớ; cấm biến dạng không có tiếp xúc;
                  không bịa màn hình, chức năng, số liệu; không thay logo
8 Nghiệm thu      Khung kiểm tra, dải chuyển cảnh, check âm thanh, layout từng tỷ lệ, lệnh render
DELIVERABLES Storyboard, contact sheet, video từng tỷ lệ, poster frame, source, asset list, ghi chú phần cần người duyệt
```

Tách sự thật về sản phẩm (không được bịa) khỏi lựa chọn làm phim (được sáng tạo). Người dùng lười điền → tự đề xuất đủ 8 mục rồi đưa duyệt.

**Phân tích tham chiếu → style guide** (không phải ghép cảnh mượn):
Palette (mã màu thật, không "premium") · Typography (họ, độ rộng, độ đậm, cấp) · Bố cục (mắt nhìn đâu trước) · Nhịp (thời gian trung bình giữa các thay đổi có nghĩa) · Motion (snap / glide / overshoot / cut / hold) · Texture (grain, giấy, kính, không) · **KHÔNG chép:** chủ thể, logo, câu chữ, hình sản phẩm của tham chiếu.


### 4. Shotlist: trạng thái, beat và "reads"

- Hiệu ứng ≠ storyboard. "Zoom, morph, thêm hạt" là hoạt động, không phải ý nghĩa. Mỗi beat ghi **người xem biết gì**, trạng thái vào, trạng thái ra, lý do tồn tại. Không giải thích được vì sao shot 4 tồn tại → bỏ shot 4.
- Mẫu 16 s (chỉ khi phù hợp, thay bằng duration/structure đã duyệt): `0–2 HOOK · 2–5 PROBLEM · 5–9 REVEAL (sản phẩm qua tương tác thật) · 9–13 PROOF (một màn/con số chứng minh) · 13–16 CLOSE (trạng thái kết sạch + CTA đọc được)`. Mẫu 15 s: lấy đà 3 s → phát triển 8 s → kết 4 s.
- UI motion: viết danh sách state trước (`SEARCH → RESULT → DETAIL → ACTION → CONFIRMATION`), một component giữ nhận diện khi đổi kích thước/màu/vị trí.
- **Reads (lỗi timing phổ biến nhất của model):** người xem chỉ xem một lần, tốc độ thật. Với mỗi shot liệt kê từng thứ người xem phải hiểu, mỗi read có start–end đủ để mắt tìm thấy + hiểu + kịp ghi nhận. Một read một lúc; nguyên nhân rồi mới phản ứng. Hành động nhanh, ý nghĩa giữ lâu. Dẫn mắt trước read quan trọng. **Shot bao chứa toàn bộ setup, hành động, read và transition trên cùng timeline.** Dùng duration từ start/end của shot; không cộng trùng các khoảng chồng nhau và không bỏ thời gian ngoài read. Ví dụ setup 1 s + action 1 s + read 2 s + exit 1 s là shot 5 s. Bản đầu thường nhồi 6 s nội dung vào 1,3 s. Cột của `templates/shotlist.md`: ID · [start,end) · biết/cảm · động từ · claim/ý đồ ID · proof/asset/cue ID · state vào→ra · copy + read · camera/motion · cue âm.
- Mọi đường nối có transition có động cơ (match cut, cut on action, camera mang qua, wipe, iris…); không mở bằng khung cứng, không dừng đột ngột. Kết vần với mở đầu.

