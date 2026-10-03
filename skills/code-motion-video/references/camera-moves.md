# Camera: 17 chuyển động và cách viết thành code / prompt

Nguồn ý tưởng: 南鸢 nuyoah, "AI 视频怎么运镜？17 个摄影机运动" (30/09/2026). Phần ánh xạ sang code là của skill này.

## Luật viết một cú máy (dùng cho cả code lẫn prompt model video)

Một từ như "camera di chuyển chậm" không đủ. Mỗi cú máy phải ghi:

1. **Khung đầu**: cỡ cảnh, chủ thể ở đâu, tiền cảnh và hậu cảnh là gì.
2. **Ai di chuyển**: camera đổi **vị trí** (dolly, truck, pedestal, orbit, tracking) hay chỉ đổi **hướng** (pan, tilt, roll) hay chỉ đổi **tiêu cự** (zoom). Ba loại này cho không gian khác nhau.
3. **Hướng, quãng đường, tốc độ** (kèm easing).
4. **Khung cuối**: người xem thấy gì khi cú máy dừng. Cú máy phải dừng hẳn và giữ đủ lâu để đọc.
5. **Cái gì giữ nguyên**: tiêu cự, độ cao, đường chân trời, chủ thể đứng yên hay không.

Chọn **một** chuyển động chính cho mỗi shot, xuất phát từ điều người xem cần thấy. Đừng nhét nhiều thuật ngữ vào một shot.

## Mô hình camera trong code 2D/2.5D

Đặt mỗi lớp một độ sâu `z` (tiền cảnh nhỏ, hậu cảnh lớn). Camera có `(cx, cy, cz, pan, tilt, roll, focal)`.

```
scale_layer  = focal / (z_layer − cz)                     // phối cảnh
screen_x     = (x_layer − cx) * scale_layer + W/2 + pan_px
```

- **Dolly** (đổi `cz`): các lớp phóng to **không đều**, tiền cảnh to nhanh hơn hậu cảnh, che khuất thay đổi. Có parallax.
- **Zoom** (đổi `focal`): mọi lớp phóng **cùng tỉ lệ**, không parallax. Đừng dùng `scale()` toàn khung để giả dolly.
- **Truck / pedestal** (đổi `cx` / `cy`): tiền cảnh trượt nhanh, hậu cảnh trượt chậm, tỉ lệ theo `1/(z − cz)`.
- **Pan / tilt** (đổi hướng nhìn): mọi lớp dịch **gần như cùng lượng**. Ở 2D, pan nghĩa là dịch toàn khung, không có parallax.
- **Roll**: xoay toàn khung quanh tâm. Chỉ dùng có chủ đích và giới hạn góc.

Các phép dịch pan/tilt toàn ảnh là approximation cho lớp ảnh phẳng, không tự tái tạo mọi thay đổi phối cảnh của quay máy trong không gian. Ghi rõ mức fidelity shot cần.

Tất cả là hàm closed-form của t (`kf`, `ease`, `spring`), tuân theo determinism.

## 17 chuyển động: tác dụng và cách triển khai

| # | Tên | Camera làm gì | Cảm xúc thường gặp | Triển khai trong code |
|---|---|---|---|---|
| 1 | Static (cố định) | Giữ vị trí, hướng, tiêu cự | điềm tĩnh, kìm nén; đứng lâu thì sốt ruột/cô đơn | Camera đứng yên, chuyển động nằm trong khung. Vẫn cho môi trường thở nhẹ, đừng để đóng băng |
| 2 | Dolly in/out | Cả máy tiến/lùi | in: lại gần nội tâm. out: cô lập, mở ra hoàn cảnh | Đổi `cz`, các lớp scale theo độ sâu. Tách bạch với zoom |
| 3 | Truck | Cả máy đi ngang, hướng giữ nguyên | quan sát từ bên; tiền cảnh che gây cách biệt/nhòm ngó | Đổi `cx`. Chủ thể đứng yên cũng trôi sang phía ngược lại |
| 4 | Pedestal | Cả máy lên/xuống | mở rộng từ chi tiết ra toàn cảnh; hạ xuống thì gò bó | Đổi `cy`, lộ hoặc che bề mặt. Khác tilt: pedestal đổi độ cao, tilt đổi hướng |
| 5 | Tracking | Đi cùng chủ thể | đồng hành, nhập vai; bám sau lưng thì căng | `cx = subject_x(t) + offset`. Chủ thể ổn định trong khung, nền trôi |
| 6 | Orbit | Đi vòng cung quanh chủ thể, luôn hướng vào nó | nhấn khoảnh khắc; bị vây quanh | Đổi vị trí camera quanh subject và hướng nhìn; để lộ mặt/occlusion đúng cần geometry hoặc asset nhiều góc phù hợp. Hai lớp nền trượt ngược chỉ là gợi depth (parallax ước lệ), không đủ chứng minh orbit thật. Góc θ(t); chủ thể đứng yên, không tự xoay theo camera |
| 7 | Parallax | Hiệu ứng: gần nhanh, xa chậm khi camera đổi chỗ | chiều sâu, thời gian trôi | Kết quả của truck/orbit khi có ≥3 lớp độ sâu. Phải ghi rõ tiền, trung, hậu cảnh |
| 8 | Pan | Đứng tại chỗ, quay ngang | tìm kiếm, chờ đợi; nhanh thì cảnh giác | Dịch ngang toàn khung theo `pan(t)`. Đường chân trời giữ thẳng |
| 9 | Tilt | Đứng tại chỗ, ngẩng/cúi | ngẩng: kính nể, choáng ngợp. cúi: kéo về hoàn cảnh cụ thể | Dịch dọc toàn khung. Ghi rõ độ cao không đổi |
| 10 | Whip pan | Pan rất nhanh | bất ngờ, giật mình, nhịp hài | 4–8 khung + motion blur (trung bình sub-frame hoặc smear). **Phải có điểm dừng rõ** và giữ để đọc. Dùng làm transition được |
| 11 | Roll | Xoay quanh trục nhìn | mất thăng bằng, chóng mặt, mơ | `rotate(roll(t))` toàn khung. Góc nhỏ, có điểm dừng. Nghiêng tĩnh là bố cục, không phải roll |
| 12 | Reveal pan | Pan để lộ thông tin ngoài khung | mong đợi chuyển thành câu trả lời (vui hoặc sợ) | Thông tin mới **không có mặt** ở khung đầu, chỉ vào trọn ở khung cuối. Dừng một nhịp |
| 13 | Tilt reveal | Tilt để nối chi tiết với bối cảnh | tò mò, rồi vỡ lẽ | Chi tiết → mặt → bối cảnh theo thứ tự. Mỗi chặng là một read |
| 14 | Chase | Bám chủ thể ở tốc độ cao, khoảng cách dao động | gấp gáp, sợ hãi hoặc háo hức | Tracking cộng `offset` có nhiễu seeded nhỏ. Luôn giữ chủ thể, mục tiêu và đường đi trong khung |
| 15 | Whip pan + zoom | Lia tới mục tiêu **rồi** zoom vào chi tiết | phát hiện đột ngột, nhấn hài | Hai đoạn nối tiếp: whip (đổi pan) xong mới zoom (đổi `focal`). Ghi rõ thứ tự |
| 16 | Orbit zoom | Vừa vòng cung vừa đổi tiêu cự | áp lực dồn lại, quyết định hình thành | θ(t) và `focal(t)` chạy song song, bán kính giữ nguyên. Khác dolly zoom |
| 17 | Bullet time | Hành động gần như dừng, góc nhìn vẫn vòng | khoảnh khắc quyết định, hồi hộp | Tách thời gian: `t_action = slowmo(t)` gần như hằng số, còn `θ(t)` vẫn chạy. Nền phải đổi theo góc nhìn |

## Kiểm tra sau khi render (strip quanh cú máy)

- Dolly: tiền cảnh và hậu cảnh có đổi tỉ lệ khác nhau không? Nếu scale đều thì đó là zoom.
- Tracking: chủ thể có ổn định trong khung trong khi nền trôi không?
- Orbit hình học: các mặt khác nhau của chủ thể có lần lượt hiện ra không, hay chủ thể tự xoay? Chỉ kiểm thấy mặt khác khi brief thực sự yêu cầu và có geometry/asset hỗ trợ.
- Parallax ước lệ (hai lớp nền trượt ngược): chỉ kiểm chiều sâu và hướng trượt; không gọi là orbit thật.
- Whip pan và reveal: khung cuối có dừng hẳn và đủ lâu để đọc không?
- Camera có làm người xem mất phương hướng không? Theo luật nhóm đối tượng, CAMERA phải mượt, gần như vô hình.

Lệch chỗ nào thì sửa đúng biến của câu tương ứng (vị trí, hướng hay tiêu cự), không viết lại cả shot.

## Dùng cho model video (Seedance, Kling, Veo) trong pipeline lai

Khi cảnh chân thực phải dùng model video, viết phần camera theo 5 mục ở đầu file, tách khỏi phần mô tả nhân vật và bối cảnh. Có ảnh khung đầu rồi thì prompt chỉ tả chuyển động, camera và thay đổi môi trường. Ví dụ dạng câu:

> Từ trung cảnh ngang hông, camera tiến thẳng chậm tới cận mặt; tiêu cự và độ cao giữ nguyên; khung cửa gần và bức tường xa đổi tỉ lệ theo chiều sâu; nhân vật đứng yên; dừng hẳn ở cận mặt.
