# Ống kính và máy quay: thứ chỉ hình động mới có

Dùng khi: chọn tiêu cự cho một shot có máy chuyển động; clip trông như video điện thoại hoặc như game thay vì như phim; cần quyết định tốc độ khung, lượng nhoè chuyển động, slow motion; cần đổi nét trong shot; cần mô tả tính cách của cách giữ máy (tay cầm, gimbal, dolly, chân máy).
Không dùng khi: cần tên và câu prompt của từng chuyển động máy (xem `../../t1to9-film/references/camera-moves.md`); cần tiêu cự, khẩu độ, vùng nét cho một ảnh tĩnh (repo `t1-visual-knowledge`, `system/11_LIGHT_AND_OPTICS.md`); cần thiết lập máy thật khi đi quay (xem `shooting-real.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Tốc độ khung và cảm giác "phim"

| Tốc độ quay và phát | Trông thế nào | Dùng cho |
|---|---|---|
| 24 fps (25 ở vùng PAL) | Chuyển động có nhoè, hơi đứt quãng một cách quen mắt. Đây là thứ mắt đọc là "điện ảnh" | Mặc định cho phim kể chuyện |
| 30 fps | Mượt hơn một chút, quen với video mạng và tin tức | Vlog, sản phẩm, nội dung muốn có cảm giác đang diễn ra |
| 50/60 fps phát đúng tốc độ | Rất mượt, sắc, giống trực tiếp hoặc game | Thể thao, màn hình UI; phim kể chuyện thì dễ thành "hiệu ứng phim truyền hình" |
| Quay 50/60 phát ở 24/25 | Chậm 2–2,5 lần, mượt | Slow motion nhẹ: tóc, vải, bước chân |
| Quay 100/120 trở lên phát ở 24 | Chậm 4–5 lần | Nước, cú va chạm, khoảnh khắc treo |

`[nghề]`

Hệ quả cho dự án:

- **Timeline cuối là 24 fps** trừ khi phim là demo UI. Clip i2v thường ra 24 fps; clip ra 30 fps phải đổi về 24 bằng cách tính lại thời gian từng khung, không bằng trộn khung. `[suy luận]`
- **Không nội suy lên 60 fps** để "mượt hơn". Nó xoá cảm giác phim và sinh bóng ma quanh tay và tóc. `[nghề]`
- **Slow motion thật cần khung thật.** Kéo chậm một clip 24 fps xuống 50% là giữ mỗi khung hai lần, trông giật. Muốn chậm thì xin model làm chậm ngay trong clip (`慢动作，动作速度为正常的一半`), hoặc chấp nhận nội suy quang học cho cảnh không có tay và mặt cận. `[suy luận]`

## 2. Góc màn trập và nhoè chuyển động

Mỗi khung hình phơi sáng trong một phần thời gian của khung đó. Phần đó quyết định vật đang chuyển động để lại vệt dài bao nhiêu. `[nghề]`

| Màn trập | Phơi mỗi khung ở 24 fps | Trông thế nào | Hợp với |
|---|---|---|---|
| 180° | 1/48 s | Nhoè vừa đủ để các khung nối nhau. Chuẩn quen mắt | Gần như mọi thứ |
| 90° hoặc hẹp hơn | 1/96 s trở xuống | Từng khung sắc, chuyển động lắc cắc, căng | Hành động, hỗn loạn, mưa và bụi thấy từng hạt |
| 270–360° | 1/32–1/24 s | Vệt dài, mềm, mơ | Ký ức, say, đêm, đèn kéo vệt |

Dấu nhận nhanh trên một khung dừng: bàn tay đang vẫy **phải nhoè** ở 180°. Tay sắc nét ở mọi khung trong khi thân di chuyển nhanh là dấu hiệu màn trập hẹp hoặc ảnh sinh từng khung không có nhoè, và sẽ nhấp nháy khi phát. `[nghề]`

Viết cho model:

| Muốn | zh-CN |
|---|---|
| Nhoè chuẩn | 运动中的手和发梢带有自然的动态模糊 |
| Sắc, giật | 高速快门，每一帧都清晰锐利，水滴和尘土颗粒分明 |
| Vệt dài | 慢速快门，移动的灯光拉出光轨，人物边缘有拖影 |

Trong motion code, nhoè là lấy mẫu nhiều thời điểm trong một khung rồi trộn. Lấy mẫu trải trên nửa khoảng thời gian của khung là tương đương 180°. `render.mjs` của `code-motion-video` có tuỳ chọn blur làm việc này; chữ cần đọc thì dùng `frameT` để không bị trộn.

Khi ghép clip i2v với lớp dựng bằng code, lượng nhoè hai bên phải khớp. Clip có nhoè mà chữ ký hay thẻ ảnh lướt vào sắc lẹm thì lộ ghép. `[suy luận]`

## 3. Tiêu cự khi máy chuyển động

Với ảnh tĩnh, tiêu cự quyết định phối cảnh và độ nén. Khi máy chuyển động, nó còn quyết định **chuyển động trông mạnh hay yếu**. `[nghề]`

| | Góc rộng (khoảng 18–28 mm) | Trung (35–50 mm) | Tele (85 mm trở lên) |
|---|---|---|---|
| Máy tiến hoặc lùi | Tiền cảnh lao qua nhanh, cảm giác tốc độ lớn, không gian mở ra | Giống người bước tới | Gần như không thấy tiến, chỉ thấy nền lớn dần |
| Máy đi ngang | Parallax mạnh giữa gần và xa | Vừa | Nền trượt nhanh sau chủ thể, chủ thể như đứng yên |
| Rung tay | Ít lộ | Lộ vừa | Lộ rất rõ, cần chân máy |
| Người đi về phía máy | Lớn lên rất nhanh ở vài bước cuối | Tự nhiên | Đi mãi không tới, bị nén vào nền |
| Mặt người khi máy sát | Méo, mũi to | Đúng | Phẳng, đẹp |

Vài cách dùng đáng nhớ:

- **Muốn tốc độ:** góc rộng, máy thấp, có vật ở tiền cảnh lướt qua. Tele không cho cảm giác tốc độ dù vật đi nhanh.
- **Muốn nhân vật "kẹt":** tele, người đi về phía máy, nền nén sát sau lưng.
- **Muốn thân mật mà không méo:** 35–50 mm, máy cách một sải tay, tiến rất chậm.
- **Muốn tách người khỏi đám đông:** tele bám theo ngang, nền và người qua lại thành vệt màu.

Viết tiêu cự kèm **khoảng cách máy** thì model có hai neo thay vì một con số: `35mm镜头，机位距人物约一米五` hoặc `85mm长焦，机位在街对面`. `[suy luận]`

**Giữ một bộ tiêu cự cho cả phim.** Phim ngắn dùng hai, nhiều nhất ba tiêu cự, và gán nghĩa cho từng cái: ví dụ 35 mm cho thế giới, 85 mm cho nội tâm. Mỗi shot một tiêu cự khác nhau là dấu hiệu ảnh sinh rời. Ghi bộ tiêu cự vào khối khoá của phim. `[suy luận]`

## 4. Vùng nét khi có chuyển động

- **Nét nông đòi giữ nét.** Người hoặc máy di chuyển theo chiều sâu thì khoảng cách nét đổi. Ở phim thật có người kéo nét; ở i2v model thường để mặt trôi ra khỏi nét hoặc tự làm nét cả khung. Shot có đi theo chiều sâu thì viết vùng nét rộng hơn, hoặc viết rõ nét bám theo ai: `焦点始终跟随她的脸`. `[suy luận]`
- **Đổi nét (rack focus) là một cú cắt không cắt.** Nét chuyển từ vật gần sang vật xa đổi điểm nhìn của người xem mà không đổi khung. Cần hai vật cách xa nhau theo chiều sâu, cùng nằm trong khung từ đầu, và máy đứng yên. `[nghề]`

  ```text
  起始：焦点在前景的玻璃杯上，背景的人影完全虚化。
  然后：焦点平稳地从玻璃杯移到背景的人，约一秒完成，玻璃杯变虚。
  机位固定，不推不拉，不新增物体。
  ```

  Rủi ro: model đẩy máy thay vì đổi nét, hoặc làm cả hai cùng nét. Soi strip: cỡ của vật có đổi không. Đổi tức là máy đã chuyển động. `[suy luận]`
- **Nét sâu cho cảnh có hai lớp hành động.** Khi tiền cảnh và hậu cảnh cùng kể chuyện, cả hai phải nét. Viết `前景和背景都清晰` và dùng góc rộng. `[nghề]`
- **Điện thoại xoá nền mờ nhẹ.** Nền mờ ít trên màn hình nhỏ trông như lỗi nét. Đã mờ thì mờ rõ; không thì nét hẳn. `[suy luận]`

## 5. Cách giữ máy là một giọng kể

| Cách giữ | Dấu nhận trên hình | Người xem cảm thấy | zh-CN |
|---|---|---|---|
| Chân máy, khoá cứng | Khung tuyệt đối yên, chỉ thứ trong khung động | Quan sát, bình tĩnh, hoặc lạnh | 三脚架固定机位，画面完全静止 |
| Chân máy, lia và ngẩng | Xoay quanh một điểm, không có parallax | Một người đứng yên nhìn theo | 三脚架摇镜，机位不移动 |
| Dolly, slider | Trượt thẳng, đều, có parallax | Có chủ ý, trang trọng | 轨道平移，匀速平稳 |
| Gimbal, steadicam | Trôi êm, hơi bồng bềnh, đổi hướng tròn | Đi theo như hồn ma hoặc như giấc mơ | 稳定器跟拍，画面平滑漂浮 |
| Tay cầm, đứng yên | Thở nhẹ, rung nhỏ tần số thấp | Có người ở đây, đang chứng kiến | 手持拍摄，画面有轻微的呼吸感晃动 |
| Tay cầm, di chuyển | Nhấp theo bước chân, khung lệch rồi sửa | Tài liệu, gấp, thật | 手持跟拍，随脚步轻微起伏 |
| Vai, tele | Rung rõ, nét săn tìm | Rình, căng | 长焦手持，画面抖动，焦点偶尔游移 |
| Flycam | Trượt cao, đều, đường chân trời yên | Toàn tri, mở hoặc kết | 航拍，高空匀速前移 |

`[nghề]`

Luật dùng: **chọn một cách giữ làm nền cho cả phim**, giống chọn giọng kể ngôi thứ nhất hay thứ ba. Đổi cách giữ là đổi trạng thái: phim trên chân máy chuyển sang tay cầm đúng lúc nhân vật mất bình tĩnh. Mỗi clip một kiểu thì không còn nghĩa. `[nghề]`

Rung tay cầm thêm ở hậu kỳ bằng nhiễu có seed thì kiểm soát được và khớp giữa các clip hơn là xin model rung (xem `compositing-2.5d.md`). Xin model chân máy cố định, rồi tự thêm thở. `[suy luận]`

## 6. Tính cách ống kính

| Đặc điểm | Trông thế nào | Khi nào đáng viết | zh-CN |
|---|---|---|---|
| Anamorphic | Bokeh hình bầu dục dọc, flare vệt ngang xanh, mép khung hơi cong | Phim muốn chất màn ảnh rộng; trong 9:16 chỉ còn bokeh và flare là đọc được | 变形宽银幕镜头，椭圆形焦外光斑，横向蓝色拉丝眩光 |
| Ống cổ, tráng phủ đơn | Tương phản thấp, flare ấm dạng quầng, mép mềm | Ký ức, hoài niệm | 老镜头，逆光下画面泛起暖色光晕，边缘略软 |
| Ống hiện đại sắc | Sắc tới mép, flare ít | Sản phẩm, công nghệ | 现代定焦镜头，全画面锐利干净 |
| Halation | Quầng đỏ cam quanh điểm sáng mạnh | Chất phim nhựa, đèn đêm | 高光边缘有淡红色的胶片光晕 |
| Tối góc | Bốn góc tối dần | Dồn mắt vào giữa, nhẹ thôi | 画面四角轻微压暗 |
| Thở nét | Khung hơi co giãn khi đổi nét | Chi tiết thật của ống kính, chỉ khi có rack focus | Không cần viết |
| Macro | Vùng nét mỏng như tờ giấy, vật nhỏ thành cảnh lớn | Insert vật, mắt, giọt nước | 微距镜头，景深极浅，只有___清晰 |

`[nghề]`

Hạt, halation và tối góc nên để hậu kỳ phủ một lần cho cả phim thay vì xin model ở từng clip. Xin từng clip thì mỗi clip một liều. Xem `color-and-grade.md`. `[suy luận]`

## 7. Phơi sáng đổi trong shot

- **Đi từ tối ra sáng hoặc ngược lại:** máy thật mất một nhịp để thích nghi, vùng sáng cháy rồi dịu lại. Đây là một cách vào cảnh mạnh: mở cửa ra nắng, khung cháy kem rồi hiện hình. Khớp với dấu nhấn "hiện ra từ khung cháy" trong `cut-grammar.md`. `[nghề]`
- **Giữ phơi sáng cho mặt.** Ngược sáng thì mặt tối. Hoặc chấp nhận bóng đen có viền sáng, hoặc có nguồn hắt. Viết rõ chọn cái nào; không viết thì model nâng sáng đều và mất ngược sáng. `[suy luận]`
- **Đèn nhấp nháy.** Đèn huỳnh quang, màn hình, đèn LED rẻ tạo sọc hoặc nháy khi quay thật. Trong phim sinh ra, nháy thường là lỗi của model; soi 8 khung liền ở vùng đèn. `[suy luận]`

## 8. Riêng cho 9:16 và phim ngắn

- **Tele trong khung dọc rất hẹp.** Một cú rung nhỏ đã đẩy mặt ra khỏi khung. Shot tele dọc thì máy cố định hoặc chỉ ngẩng cúi. `[suy luận]`
- **Góc rộng dọc kéo dài người** khi máy thấp: chân dài, đầu nhỏ. Hợp thời trang, không hợp chân dung thân mật. `[nghề]`
- **Chuyển động máy theo trục dọc và trục sâu đọc tốt hơn trục ngang.** Xem các nguyên lý 9:16 trong `camera-moves.md`.
- **Phim 20–60 s không đủ chỗ cho nhiều giọng máy.** Một cách giữ nền, một ngoại lệ có lý do. Hai tiêu cự.

Khối khoá máy cho cả phim, dán vào 母版锁 hoặc đầu `prompts/shots.md`:

```text
全片摄影统一：24帧，自然动态模糊；镜头只用35mm和85mm两支；基础为三脚架固定机位，仅在第___镜改为手持；景深中等，近景背景明显虚化；不使用鱼眼和超广角畸变。
```

## 9. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Trông như phim truyền hình hoặc game | Quá mượt: 60 fps hoặc nội suy khung | Về 24 fps, bỏ nội suy |
| Chuyển động nhấp nháy, lắc cắc không chủ ý | Không có nhoè chuyển động | Xin nhoè trong prompt; hoặc thêm blur theo vận tốc ở hậu kỳ cho lớp code |
| Slow motion giật | Kéo chậm clip 24 fps | Xin chậm ngay trong clip, hoặc bỏ slow |
| Máy tiến mà không thấy tiến | Tele, hoặc model zoom thay vì dolly | Đổi góc rộng, thêm tiền cảnh; viết 摄影机前移 thay cho 变焦 |
| Mặt trôi khỏi nét khi người đi tới | Nét nông, không ai kéo nét | Viết nét bám mặt, hoặc vùng nét rộng hơn |
| Rack focus thành cú đẩy máy | Model gộp hai lệnh | Ghi 机位固定，不推不拉; kiểm cỡ vật trên strip |
| Mỗi clip một kiểu rung | Xin model rung từng clip | Xin máy cố định, thêm rung có seed ở hậu kỳ |
| Mỗi shot một phối cảnh, không ghép thành một nơi | Tiêu cự tự do từng shot | Bộ hai tiêu cự cho cả phim, ghi vào khối khoá |
| Lớp code sắc lẹm trên clip có nhoè | Không khớp nhoè | Bật blur sub-frame cho lớp code |
| Hạt và quầng sáng mỗi clip một liều | Xin model làm hạt | Bỏ khỏi prompt, phủ một lần ở hậu kỳ |

## 10. Hàng chờ thử

1. **Dolly góc rộng so với tele.** Cùng ảnh đầu, hai prompt chỉ khác `24mm` và `85mm`, cùng `摄影机前移`. Nhìn: tiền cảnh có lao qua khác nhau không, hay model bỏ qua tiêu cự.
2. **Rack focus.** Dùng khối mẫu mục 4. Nhìn strip: cỡ vật có giữ nguyên không, nét có chuyển trong khoảng một giây không.
3. **Chân máy cộng rung hậu kỳ so với xin model tay cầm.** Hai bản của cùng một shot. Nhìn ở tốc độ thật: bản nào giống tay cầm thật, bản nào giữ mặt ổn hơn.
4. **Slow motion trong clip.** Prompt có `慢动作，动作速度为正常的一半`. Nhìn: model có làm chậm thật không, tóc và vải có mượt không.
5. **Câu nhoè chuyển động.** Một hành động vẫy tay, có và không có câu 动态模糊. Dừng ở khung tay nhanh nhất: tay có vệt không.
6. **Khối khoá máy cả phim.** Sinh bốn ảnh của bốn shot khác cảnh, có và không có khối khoá. Nhìn contact sheet: phối cảnh và độ mờ nền có nhất quán hơn không.
