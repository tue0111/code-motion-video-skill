# Brief sản xuất — "vòng tròn" (tên làm việc)

## Revision, nguồn và approval

```text
Brief ID / revision / người sở hữu: vong-tron / r1 / chủ phim (tài khoản ntue2411)
Facts từ người dùng: 7 ảnh AI đã hoàn thiện (áo dài kem voan, quần tím, hoa lan tím, ô giấy cam, kiến trúc cung đình);
  làm cho cá nhân; đăng lên X; kịch bản "huy động từ bất kỳ đâu"; video được phép tạo qua MCP (Sumi Studio).
Quyết định của chủ phim (30/10/2026): KHÔNG có chữ trên phim.
Giả định đang thử (chưa duyệt): 24 s, 4:5, nhạc không lời ngũ cung 80 BPM, motif vòng tròn + gió.
Thiếu dữ kiện và cảnh bị ảnh hưởng: nhạc thật — đang là nhạc tạm tự tổng hợp.
Communication type / lý do / loại bị loại: xem G0.
Delivery format: 1080×1350 (4:5), 24 s, 30 fps, H.264 + AAC, ≤ 512 MB — đăng X (feed điện thoại + desktop).
Câu hỏi test giây 5 / câu trả lời kỳ vọng: "Phim này về cái gì, cảm giác gì?" → "một cô gái áo dài ở cung điện cổ, gió, nhẹ, hoài niệm".
Mandatory axes G2: A1 (motif/cảm xúc), T3 (chuyển động phục vụ ý, nhịp thở), T4 (nhịp khớp nhạc tạm) — chủ phim chốt.
G0 direction approval: PENDING
G2 artifact + revision/hash + approver + timestamp + decision: PENDING (animatic_v1, xem review_log.md)
```

## G0: đạo diễn

- **Người xem:** người lướt X trên điện thoại, video tự phát **không tiếng**; không biết trước bộ ảnh.
- **Biết:** "Một cô gái áo dài ở sân điện cổ; mọi khung đều có một vòng tròn."
- **Cảm:** gió nhẹ, tĩnh, hoài niệm, đẹp kiểu chậm — không "lookbook bán hàng".
- **Làm:** dừng lướt, xem hết, bật tiếng, lưu/thả tim.
- **Loại phim:** chính = **MV / visualizer** (`film-types.md` §7) vì mục tiêu là cảm xúc và motif, không giải thích gì. Phụ = social short (hook phải đọc được khi tắt tiếng).
  Loại bị loại: TVC/lookbook thương hiệu (không có thương hiệu, không CTA mua); recap (không có sự kiện).
- **Giây 5 (MV):** đã thấy motif (voan/gió + ô cam) và hướng cảm xúc (chậm, ấm). Kiểm bằng xem không tiếng.
- **Đồng hồ chính:** nhạc. Lưới 80 BPM, 1 ô nhịp = 3 s, 8 ô = 24 s. Đổi cảnh trên downbeat.
- **Một câu người xem nhớ:** *gió đi qua một sân cũ, và mọi thứ ở đó đều tròn.*

## Manifest asset và quyền

| Asset ID | Nguồn | Quyền | Dùng cho | Scene |
| --- | --- | --- | --- | --- |
| p1–p7 | Ảnh AI chủ phim cung cấp (upload phiên này) | Chủ phim sở hữu/tự tạo — chủ phim xác nhận | Animatic, prompt image-to-video | S1–S7 |
| temp.wav | Tự tổng hợp (`scripts/temp_score.mjs`) | Tự tạo | Chỉ animatic | toàn phim |

Bản đồ ảnh: p1 ngồi ghế cầm ô + bàn kính · p2 nghiêng mặt, ô cam tiền cảnh · p3 soi gương tròn trên cỏ · p4 toàn cảnh bước tới · p5 lần chuỗi hạt · p6 góc thấp cầm lược, cửa gỗ · p7 cầm lược cạnh cửa sổ tròn.

## Quy tắc

- Giữ: kem + tím oải hương + ô cam là điểm nhấn duy nhất; gỗ tối; ánh chiều ấm.
- Tránh: mọi chữ trên phim, hiệu ứng lấp lánh/particle, nhạc EDM.
- Model video **không** được đổi mặt, trang sức (khuyên tai vỏ trai, nhẫn hoa), hoa lan tím.

## Bàn giao

- `out/animatic_v1.mp4` (G2) → sau duyệt: 7 clip image-to-video, nhạc thật, `out/final.mp4` 4:5 + poster.
- Quyết định cần chủ phim duyệt: thứ tự/nhịp (animatic), model + ngân sách credit, nhạc.
