# Phân cấp thị giác 6:3:1

Nguồn ý tưởng: 南鸢 nuyoah, "把游戏设计里的631原理转化成可复用的提示词结构" (01/10/2026), dựa trên "游戏美术中的631法则" (耿嘉辉). Phần áp dụng cho motion bằng code là của skill này.

## Ý cốt lõi

**Đừng cho mọi thứ làm nhân vật chính.** Chiếm nhiều diện tích nhất và thu hút nhất là hai việc khác nhau.

- **~60% nền**: không gian, mảng lớn, tần số thấp, vùng yên tĩnh. Dựng thế giới.
- **~30% chuyển tiếp**: cấu trúc phụ, đồ bày, đường dẫn mắt. Tạo biến hoá và dẫn về trọng tâm.
- **~10% điểm neo**: tương phản cao, nơi người xem phải nhìn.

Đây là tỉ lệ kinh nghiệm, không phải luật cứng (7:2:1 cũng được). Mục đích là kéo giãn khoảng cách giữa các tầng. Đây cũng là cách vá trực tiếp kiểu output "mọi thứ đều nổi" như gradient, glow và chi tiết rải khắp nơi.

## Áp dụng theo từng trục (sửa một trục mỗi lần)

| Trục | 60 | 30 | 10 |
|---|---|---|---|
| Bố cục | mảng lớn dựng khung | đường nối không gian | vùng nhỏ thành trọng tâm |
| Ánh sáng | ánh sáng chủ đạo tạo không khí | đèn phụ giữ chi tiết vùng tối | đèn cục bộ chiếu chỗ cần xem |
| Màu | màu chủ đạo (có thể rực) | màu phụ tạo biến hoá | màu điểm nhấn |
| Bố trí không gian | địa hình, kiến trúc | lối đi, sắp đặt | dấu vết sử dụng |
| Hình khối vật thể | khối tổng | cấu trúc phụ | chi tiết nhỏ |
| Mật độ thông tin | vùng yên tĩnh | vùng vừa | vùng phức tạp làm đối chiếu |

Bài học từ đối chiếu của tác giả:
- **Làm nổi chủ thể không tự động làm tác phẩm hay hơn.** Nếu phong cách cần nhiều neon, đừng tẩy màu. Hãy giữ màu và lập phân cấp ở trục khác: hạ **độ sáng** biển hiệu xung quanh, để độ sáng mạnh nhất cho cửa và nhân vật.
- Màu chủ đạo không bắt buộc phải nhạt. Vấn đề là quan hệ giữa các màu.
- Vùng yên tĩnh vẫn có texture thật, chỉ ít biến động gây chú ý hơn. Chi tiết phải **có chỗ đặt và có chỗ nghỉ**.
- Điểm nhấn không cần vừa rực, vừa sáng, vừa phức tạp. Một khác biệt rõ ràng dành cho đúng đối tượng là đủ (ví dụ áo đỏ giữa cảnh đen trắng).

## Theo chức năng kể chuyện (phim, MV, explainer)

**Không gian nền → đời sống nhân vật → trọng tâm của cảnh.**
1. Thế giới này thế nào (tường, sàn, ánh sáng, quy mô)? Nền có thể rực rỡ nếu được tổ chức bằng trục đối xứng, lặp lại, cụm màu.
2. Ai sống ở đây? Đồ vật phải có công dụng và giải thích được nhân vật, không phải đồ rải ngẫu nhiên.
3. Cảnh này người xem cần chú ý gì? Trọng tâm có thể nhỏ, có thể không rực nhất. Sức nặng còn đến từ câu chuyện đã dựng trước đó.

Ba tầng có thể giao nhau: một vật bày trong góc có thể thành trọng tâm khi nhân vật cầm lên.

## Trong motion bằng code

- **Phân cấp thay đổi theo thời gian.** Đừng chia cứng 10 giây thành 6s môi trường, 3s cấu trúc, 1s chủ thể. Mỗi **khung** có một điểm neo, và điểm neo có thể chuyển (gắn với luật "mỗi thời điểm một sự kiện chính").
- Ghi 6:3:1 vào `style-guide.md`: màu chủ đạo, màu phụ, màu nhấn kèm mã màu; hướng đèn chính; quy định vùng nào được có chi tiết dày.
- Chuyển động cũng tuân phân cấp: nền chậm, biên độ nhỏ; lớp phụ phản ứng; chỉ điểm neo có chuyển động mạnh, sáng nhất, tương phản nhất. Không có lớp nền nào nhấp nháy giành mắt khỏi hành động chính.
- Cận cảnh thì vật quan trọng có thể chiếm cả khung. 10% là về **sự chú ý**, không phải diện tích.
- Khi nào được phá: cảnh phố đông vui (nhiều neon cùng tạo không khí), đối đầu (hai chủ thể ngang sức), hỗn loạn (các yếu tố tranh nhau là đúng ý đồ).

Màu gắn vào vật mang có lịch sử: xem FG-11 trong `references/film-grounding.md` (nhãn sách; không làm bằng chứng cho 6:3:1).

## Kiểm tra: thumbnail test

Thu contact sheet hoặc khung xuống cỡ thumbnail điện thoại (khoảng 160–240 px ngang):
- Còn tìm thấy điểm neo không? Không thấy thì kiểm tra trước những thứ đang tranh chấp với nó.
- Mảng sáng tối lớn và không gian còn đọc được không? Không đọc được thì quay về khối lớn và bố trí.
- Phong cách có bị nhạt đi không? Nếu có, kiểm tra xem có lỡ xoá mất đặc trưng bắt buộc không.

Mỗi vòng chỉ sửa một vấn đề chính rồi so trước và sau.

```bash
ffmpeg -i out/check/t02.00.jpg -vf scale=200:-1 out/check/thumb.jpg
```

## Khung prompt cảnh (khi cần ảnh hoặc khung đầu từ model ảnh/video)

```
[Địa điểm, thời gian, điều đang xảy ra].
Phong cách [..], giữ [màu/chất liệu/đặc trưng bắt buộc của phong cách].
Phần lớn khung là [môi trường lớn], tông chủ đạo [..].
[Cấu trúc/đồ vật phụ] dùng [màu phụ], sắp theo [hướng/tiền-hậu] dẫn về [vùng xem chính].
[Ít đồ bày và dấu vết sử dụng] gợi [đời sống/hoàn cảnh], mỗi vật có công dụng.
[Trọng tâm] ở [vị trí rõ ràng], nổi bằng [chênh sáng cục bộ / màu nhấn / viền rõ / vị trí cô lập].
Ánh sáng từ [nguồn, hướng], tạo [kết quả nhìn thấy]; đèn phụ giữ [vùng tối cần đọc]; [đèn cục bộ] chiếu [quanh trọng tâm].
Chi tiết dồn ở [chỗ kể chuyện], vùng khác giữ khối lớn, texture dịu.
Giữ [quan hệ nhân vật, trang phục, kiến trúc, đạo cụ]. Góc máy [..], cỡ cảnh [..], tỉ lệ khung [..].
```

Khi chuyển ảnh thành video: prompt chỉ tả hành động, camera (xem `camera-moves.md`) và thay đổi môi trường. Nêu rõ nền giữ yên, không có nhấp nháy hay vật cản đi qua trước điểm neo.
