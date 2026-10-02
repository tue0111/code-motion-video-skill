# Ngôn ngữ chuyển động: lệch pha, vật lý, ánh sáng

### 5. Ngôn ngữ chuyển động (phần tạo khác biệt)

**Phân lớp & lệch pha.** Chủ thể khởi động trước → chủ thể phụ đáp lại muộn hơn → camera trễ vài khung → môi trường/dư chấn sau cùng; nền chuyển động chậm liên tục. Cùng đồng hồ t, khác hàm:
```
chu_the = f(t); phu = g(t − d1); camera = h(t − d2); moi_truong = k(t − t_vacham)
```
Mỗi thời điểm một sự kiện chính. Dấu hiệu hỏng: mọi lớp dùng chung một easing/tiến độ → cảm giác PowerPoint. Tránh "twinning": hai tay cùng góc, hai mắt chớp cùng lúc, đám đông nhún đồng loạt.

**Một hành động đầy đủ:** chuẩn bị (lấy đà ngược chiều) → tăng tốc/kéo giãn theo hướng vận tốc → va đập (khớp hình và tiếng) → nén dẹt (giữ thể tích) → overshoot → ổn định (biên độ giảm dần) → phản ứng thứ cấp (tóc, mũ, đạo cụ dừng sau cùng).
- Biến dạng phải có nguyên nhân (tốc độ, xung lực), không phải easing ngẫu nhiên. Overshoot chỉ ở chỗ giải thích được bằng năng lượng.
- **Liên tục vận tốc:** vận tốc cuối đoạn trước = vận tốc đầu đoạn sau, trừ khi có lực mới (va chạm). Đừng reset về 0 khi đổi trạng thái.
- Slow-in/slow-out, đi theo cung (arc) chứ không đường thẳng, trọng lượng (vật nặng khởi động/dừng chậm, ít nảy), cường điệu đủ để đọc, key pose phải đọc được như ảnh tĩnh trước khi thêm chuyển động.

**Quy tắc theo nhóm đối tượng:**
```
MICRO UI   nhanh, overshoot tối thiểu      PANELS   ổn định có kiểm soát
CAMERA     mượt, gần như vô hình           HEADLINE vào mạnh, giữ đủ lâu để đọc
MASCOT     tinh nghịch, rõ ý đồ
```
Đừng biến mọi thứ thành spring — nếu cái gì cũng overshoot thì không gì có cảm giác chính xác. Kiểm tra cuối: sau mỗi chuyển động người xem có biết nhìn đâu không?

**Vật lý chọn theo vật liệu:** rơi/nảy (trọng lực → tiếp xúc → bật), va chạm/quán tính (tiếp xúc → truyền lực → tiếp tục), nén/bật lò xo, uốn/xoắn (tác lực → biến dạng → truyền ra), vật mềm/sóng (nhiễu → gợn → tắt dần), hạt/dòng chảy (trường dòng → quỹ đạo → tụ/tản). Tất cả viết dạng **closed-form theo t** (keyframe, spring giải tích, parabol), không tích phân từng khung.

**Ánh sáng:** một hướng đèn chính thống nhất toàn phim; đèn bù yếu giữ chi tiết vùng tối; đèn viền tách khỏi nền; bóng tiếp xúc sát đất để vật "đứng". Khi vật xoay/đổi hình, highlight chạy theo bề mặt. Cảnh vũ trụ hay bị cháy sáng — yêu cầu màu thật.

