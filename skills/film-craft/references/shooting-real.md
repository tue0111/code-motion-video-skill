# Quay thật: máy ảnh hoặc điện thoại, đủ để có footage dùng được và ghép được với cảnh AI

Dùng khi:
- Phim cần một shot quay thật (tay, đồ vật, phố, người thật cho phép) trộn với cảnh sinh.
- Chuẩn bị đi quay một buổi bằng điện thoại hoặc máy ảnh, cần thiết lập và bảng kiểm.
- Muốn lấy plate hoặc ảnh tham chiếu thật để sinh ảnh AI khớp ánh sáng, tiêu cự.
- Footage quay thật bị flicker, rung, lệch màu khi đặt cạnh clip i2v.

Không dùng khi: chỉ cần chuyển động máy trong cảnh sinh (`skills/t1to9-film/references/camera-moves.md`). Cần ghép lớp bằng code thì `compositing-2.5d.md`. Cần khớp màu sau khi quay thì `color-and-grade.md`.
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử. Thông số flicker 50 Hz và tốc màn trập đã kiểm web ngày 2026-11-12.

## 1. Thiết lập video `[nghề]`

| Mục | Chọn | Vì sao | Rủi ro |
|---|---|---|---|
| Tốc độ khung | khớp bản giao: 24 hoặc 30 fps (qa.md giao 24 hoặc 30). Quay 50 hoặc 60 fps nếu có đoạn slow motion | đổi fps lúc dựng làm giật hoặc ghost | quay 25 rồi ép 24 dễ giật nhẹ |
| Slow motion | quay 50/60 fps, phát ở 24/25: chậm ~2 đến 2.4 lần | mượt hơn nội suy khung | thiếu sáng ở màn trập nhanh |
| Màn trập | quy tắc 180 độ: màn trập ≈ 1/(2 × fps). 24 fps → 1/48 (làm tròn 1/50); 25 fps → 1/50; 30 fps → 1/60; 50 fps → 1/100 | chuyển động có blur tự nhiên, giống clip i2v | màn trập quá nhanh ra nét "giật gân" |
| Flicker đèn 50 Hz (Việt Nam) | dùng 1/50 hoặc 1/100 s, cả khi quay 24 và 30 fps. Tránh 1/60, 1/125 trong nhà | đèn lưới nhấp nháy 100 lần/giây ở 50 Hz; phơi sáng dài bằng số nguyên chu kỳ thì trung bình hết nhấp nháy | lưới điện lệch ~1%; đèn LED PWM vẫn có thể sọc, thử màn hình trước khi quay |
| Mở khẩu / ND | khoá màn trập, chỉnh sáng bằng ND và khẩu | giữ blur nhất quán | khẩu quá nhỏ làm mất nét do nhiễu xạ; ND rẻ đổi màu |
| ISO | thấp nhất mà đủ sáng; điện thoại tự đặt, chỉ khoá được ở app như Blackmagic Camera hoặc app máy | nhiễu ít, nhưng hạt vừa phải còn hợp với clip i2v | ISO cao tạo nhiễu màu |
| Khoá phơi sáng, cân trắng | khoá cả hai trước khi bấm | tránh nhảy sáng/màu giữa chừng | cân trắng tự động đổi khi người vào khung |
| Profile | phẳng hoặc log khi cần dải động rộng (cảnh ngược sáng, hoàng hôn); 709 chuẩn khi cảnh bình thường và làm nhanh | log cần grade, phẳng sẽ bệt nếu bỏ | log 8-bit dễ banding; dùng 10-bit nếu máy có |
| Độ phân giải, codec | 4K nếu máy đủ rồi hạ 1080×1920 giao; HEVC/H.264 10-bit nếu có | thừa chỗ cắt dọc, ổn định thêm | file nặng |
| Hướng | quay ngang 4K rồi cắt 9:16 khi cần chừa lựa chọn; quay dọc thẳng khi biết chắc 9:16 | quay dọc giữ nét tối đa; quay ngang cho phép dịch khung | cắt từ ngang làm mất 2/3 điểm ảnh |

## 2. Điện thoại `[nghề + suy luận]`

- **Khoá AE/AF** (nhấn giữ vào chủ thể). Không khoá thì phơi sáng và nét đổi khi người di chuyển.
- **Ống kính**: dùng ống chính (main) hoặc tele ~2 đến 3x cho chân dung; ống siêu rộng méo biên và nhiễu hơn trong thiếu sáng. Giữ **một tiêu cự** cho cả cảnh, và ghi vào slate để khớp ảnh AI (mục 8).
- **Tắt hoặc giảm**: HDR video tự động, làm đẹp, "AI scene", chống rung số cực mạnh (xem dưới), zoom số. Bật HDR tự động làm sáng nhảy từ khung này sang khung khác.
- **Ổn định điện tử** cắt biên khung và có thể méo cạnh khi bước. Cái giá: mất ~5 đến 10% khung, "nước chảy" ở vật gần. Dùng khi tay cầm; tắt khi đã có gimbal hoặc tripod, vì sẽ chồng ổn định.
- Giữ ống kính sạch (lau vân tay); nguồn sáng sau lưng làm lóa.
- Quay chế độ máy bay hoặc không làm phiền để thông báo không chen vào.

## 3. Giữ máy `[nghề]`

| Cách | Cảm giác | Dùng khi | Rủi ro |
|---|---|---|---|
| Tay cầm, hai tay sát người, bước lăn gót | sống, gần, hơi căng | cảnh đời thường, tiếp xúc | rung dọc; bước chân nặng làm say |
| Gimbal | trôi mượt, hơi "lạnh" | tracking dài | quá mượt lộ giả; pin; cần cân bằng |
| Tripod | tĩnh, quan sát | master, insert, plate | cứng nếu không có gì trong khung chuyển động |
| Slider | trượt ngắn, sang trọng | chi tiết, sản phẩm | tốn công, khó mang |
| Tựa vật (tường, bàn, túi gạo) | gần tripod, nhanh | nơi không mang tripod | tựa không chắc |

Với phim dọc 20 đến 60 s, **tripod hoặc tựa vật cho plate và ảnh gốc i2v** (dễ ghép), tay cầm cho cảnh quay thật tách riêng.

## 4. Ánh sáng tại chỗ với đồ tối thiểu `[nghề]`

| Đồ | Cách dùng | Kết quả | Rủi ro |
|---|---|---|---|
| Cửa sổ | đặt chủ thể nghiêng 45° so với cửa, máy ở phía bóng | sáng mềm, một hướng | mây đổi sáng giữa các take |
| Tấm hắt (trắng/bạc) | đặt phía đối diện cửa | nâng bóng 1 đến 2 stop | hắt gắt làm mắt nheo |
| Vải tản (voan/ga trắng) | căng giữa nắng và chủ thể | tản nắng thành mềm | cháy nếu để sát |
| Một đèn LED | tản qua giấy mờ, đặt cao 45° | làm đèn chính khi thiếu sáng | PWM gây sọc (mục 1) |

Giờ quay: **một giờ sau bình minh và một giờ trước hoàng hôn** cho ánh xiên ấm; giữa trưa nắng gắt, bóng đen dưới mắt. Cảnh trong nhà thì chọn giờ ánh cửa sổ ổn định. Ghi lại giờ và thời tiết vào slate (mục 6) để khớp với ảnh AI (mục 8).

## 5. Với 9:16 và phim ngắn

- Khung dọc: chủ thể ở giữa, nhưng chừa đầu và chân để cắt; ngang quay thì chừa 1/3 mỗi bên.
- Phim ngắn ít chỗ cho cảnh đẹp thừa: mỗi shot quay thật phải có một việc (insert, reaction, chuyển).
- Nhạc dẫn nhịp nên quay **nhiều biến thể ngắn** của một hành động (3 đến 5 s), chọn lúc dựng.

## 6. Coverage cho một cảnh ngắn `[nghề]`

| Shot | Việc | Độ dài quay |
|---|---|---|
| Master | cả cảnh một lần, định vị không gian | đủ cả hành động + 5 s đầu/cuối |
| Cận (medium/close) | chủ thể và phản ứng | thêm handle 3 s mỗi đầu |
| Insert | chi tiết (tay, vật, mắt) | vài lần, mỗi lần 3 đến 5 s |
| Cutaway | cái chủ thể nhìn, hoặc không khí | 5 s mỗi cái, đúng hướng sáng |
| Plate sạch | cảnh không người, tripod | 10 s |

**Handle**: giữ máy chạy 2 đến 3 s trước và sau hành động, để có chỗ cắt và chỗ khớp. **Slate**: đọc to hoặc ghi giấy: cảnh, shot, take, giờ, tiêu cự, hướng sáng. Vỗ tay để dựng đồng bộ nếu có thu âm riêng.

## 7. Thu âm `[nghề]`

- **Tiếng hiện trường** (wild track): thu 30 s tiếng nền ngay chỗ quay.
- **Room tone 30 s**: im lặng của chính căn phòng, để lấp khoảng trống lúc dựng.
- Micro **cài áo** gần mặt, tránh cọ vải; **shotgun** đặt trên đầu hướng xuống, càng gần càng tốt.
- **Gió**: lông chắn gió (dead cat) cho micro ngoài trời; che bằng thân khi không có.
- Phim không thoại là chính: thu tiếng hành động (bước, vải, tay chạm) riêng cho dựng; nhạc dẫn nhịp và `audio-timing.md` của code-motion-video lo phần nhịp.

## 8. Ghép với cảnh AI `[suy luận]`

Mọi chỗ dưới đây chưa thử.

| Việc | Làm gì | Viết vào prompt (zh-CN) | Dấu kiểm |
|---|---|---|---|
| Plate + tham chiếu | quay cảnh sạch tại chỗ, đánh dấu hướng sáng, tiêu cự, chiều cao máy | `以参考图的光线方向、色温和透视为准，镜头高度与参考图一致，约50mm视角` | bóng cùng hướng với plate |
| Khung thật làm khung đầu i2v | lấy một khung thật làm ảnh đầu | `保持首帧的人物、服装与光线不变，只让手臂缓慢抬起，镜头静止` | khung đầu i2v khớp footage |
| Khớp hạt | đo hạt của footage, phủ cho clip AI | không ghi vào prompt; làm ở hậu kỳ | hạt cùng cỡ ở 100% |
| Khớp màu | dùng nhóm sáng, `film_qa.py color` | | Δb*, ΔL* trong ngưỡng qa.md |

- **Một tiêu cự** cho cả cảnh quay và ảnh AI: ghi vào slate, ghi vào prompt.
- Quay thật không đồng độ phân giải với clip 480p: hạ footage hoặc cho nó là shot hero, đừng đặt cạnh nhau liên tục.

## 9. Quản lý file `[nghề]`

- Đặt tên: `YYYYMMDD_cảnh_shot_take` (ví dụ `20261112_S3_02_T04.mov`). Giữ nguyên tên gốc máy trong một cột ghi chú.
- Sao lưu ngay sau buổi quay: hai nơi (đĩa rời, đám mây). Đừng xoá thẻ trước khi kiểm.
- Proxy: nếu máy yếu, tạo bản 720p H.264 làm proxy, dựng bằng proxy rồi thay bằng file gốc khi render.

## 10. Bảng kiểm

**Trước khi bấm máy:**
- [ ] pin, thẻ trống, ống kính sạch
- [ ] fps và màn trập đúng (1/50 hoặc 1/100 trong nhà)
- [ ] khoá AE/AF/WB, tắt HDR tự động
- [ ] gimbal cân, tripod chắc
- [ ] plate và ảnh tham chiếu đã chụp
- [ ] slate sẵn sàng

**Sau mỗi take:**
- [ ] nét đúng, có sọc flicker không (xem màn hình phóng 100%)
- [ ] sáng không nhảy, da không đổi màu
- [ ] có handle đầu và cuối
- [ ] ghi take tốt/không vào slate
- [ ] tiếng sạch (nghe tai nghe)

## 11. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Sọc sáng chạy ngang khung | màn trập lệch chu kỳ 50 Hz hoặc đèn PWM | 1/50 hoặc 1/100; đổi đèn; quay lại |
| Sáng nhảy giữa take | AE chưa khoá | khoá AE, dùng app quay chế độ tay |
| Footage rung quá | tay cầm thiếu tựa | tựa vật, gimbal; ổn định lúc dựng |
| Footage cạnh clip AI sắc khác | cân trắng khác | khớp theo nhóm (color-and-grade.md) |
| Ánh sáng AI không khớp footage | thiếu plate/hướng sáng | quay plate, ghi hướng sáng vào prompt |

## 12. Hàng chờ thử

1. Quay một mặt phẳng dưới đèn trần ở 1/50, 1/60, 1/100: bản nào hết sọc?
2. Điện thoại: bật và tắt HDR tự động, so độ nhảy sáng khi người bước vào khung.
3. Dùng một khung thật làm ảnh đầu i2v: clip có giữ ánh sáng, người không?
4. Sinh ảnh AI theo plate (câu mục 8): hướng bóng có khớp không?
5. Quay slow 60 fps phát ở 24 fps, so với nội suy khung từ 24 fps.
