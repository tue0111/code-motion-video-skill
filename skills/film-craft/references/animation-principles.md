# Nguyên lý hoạt hoạ: vì sao một chuyển động trông sống, chết hay trôi

Dùng khi: một chuyển động trong motion code trông như PowerPoint; clip i2v trông trôi, nhẹ bẫng hoặc như quay chậm; cần quyết định số khung cho một hành động; cần viết hành động cho i2v sao cho có lấy đà và có dừng.
Không dùng khi: cần diễn xuất của nhân vật (xem `character-animation.md`); cần dấu vân tay của từng lối hoạt hoạ (xem `animation-styles.md`); cần lệch pha giữa các lớp trong motion code (xem `../../code-motion-video/references/motion-language.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Timing và spacing: hai thứ khác nhau

- **Timing** là hành động chiếm bao nhiêu khung. Nó nói về **khối lượng và ý định**: cùng một quãng, đi hết trong 6 khung là vật nhẹ hoặc cú giật, trong 30 khung là vật nặng hoặc sự do dự. `[nghề]`
- **Spacing** là vật nằm ở đâu trên từng khung trong số khung đó. Nó nói về **lực**: các vị trí dồn sát nhau ở đầu rồi thưa dần là đang tăng tốc, thưa rồi dồn lại là đang hãm. `[nghề]`

Sửa chuyển động bằng cách hỏi lần lượt: số khung đã đúng với khối lượng chưa, rồi phân bố vị trí đã đúng với lực chưa. Đổi easing mà không đổi số khung thường không cứu được gì.

Bảng số khung gợi ý ở 24 fps. Đây là điểm xuất phát để chỉnh bằng mắt, không phải luật. `[nghề]`

| Hành động | Số khung | Giây |
|---|---|---|
| Chớp mắt | 4–6 | 0,17–0,25 |
| Liếc mắt sang đích mới | 2–4 | 0,08–0,17 |
| Quay đầu nhanh | 6–10 | 0,25–0,4 |
| Quay đầu chậm, có nghĩ | 16–30 | 0,7–1,25 |
| Một bước đi thường | 12 | 0,5 |
| Một bước chạy | 6–8 | 0,25–0,33 |
| Lấy đà trước cú nhảy hoặc cú ném | 6–12 | 0,25–0,5 |
| Va chạm đến lúc nén hết | 1–3 | 0,04–0,12 |
| Hồi lại và ổn định sau va chạm | 8–20 | 0,33–0,8 |
| Giữ một pose để người xem đọc | 8–16 tối thiểu | 0,33–0,67 |
| Chữ hoặc phần tử UI vào khung | 6–12 | 0,25–0,5 |
| Nhìn, nhận ra, rồi phản ứng | 12–24 trước khi thân cử động | 0,5–1 |

Đổi sang fps khác bằng thời gian, không bằng số khung: lấy cột giây nhân với fps.

## 2. Mười hai nguyên lý, viết thành việc làm

Mười hai nguyên lý cổ điển của hoạt hoạ vẽ tay vẫn đúng cho motion code và cho việc soi clip i2v. Bảng dưới gom lại theo việc dùng. `[nghề]`

| Nguyên lý | Nói gọn | Trong motion code | Khi viết và soi i2v |
|---|---|---|---|
| Lấy đà (anticipation) | Trước khi đi một hướng, lùi ngược hướng đó một chút | Thêm một đoạn ngắn ngược chiều, 10–20% biên độ, trước chuyển động chính | Viết pha đầu: 先微微后仰，再向前迈步. Soi: khung nào thân bắt đầu ngả ngược |
| Nén và giãn (squash and stretch) | Vật đổi hình theo lực nhưng giữ thể tích | Giãn dọc hướng vận tốc khi nhanh, nén khi chạm; scaleX × scaleY giữ gần 1 | Vật cứng (cốc, điện thoại, mặt người) **không** được nén giãn. Soi: mặt có phồng xẹp không |
| Dàn cảnh (staging) | Mỗi lúc một ý, mắt biết nhìn đâu | Một sự kiện chính mỗi thời điểm; thứ khác chậm lại hoặc mờ đi | Một hành động chính mỗi clip. Soi thumbnail: còn đọc được không |
| Vẽ thẳng và vẽ theo pose | Hai cách dựng: lần lượt từng khung, hoặc đặt pose chính trước rồi chêm | Pose chính là keyframe, chuyển tiếp là hàm của t; hạt và lửa thì mô phỏng theo seed | Khung đầu và khung cuối là hai pose chính; model chêm phần giữa. Cho nó hai pose rõ |
| Bám theo và chồng lấn (follow through, overlap) | Các phần không dừng cùng lúc; phần mềm dừng sau | Mỗi lớp một độ trễ và độ giảm chấn riêng; tóc, dây, vạt áo trễ 2–6 khung | Viết: 人物停住后，发梢和裙摆继续向前摆动再回落. Soi: mọi thứ dừng cùng một khung là chết |
| Chậm vào chậm ra (slow in, slow out) | Vật có khối lượng không đạt tốc độ tức thì | Ease theo vật: vật nặng ease dài, UI nhỏ ease ngắn. Tuyến tính chỉ cho máy móc và băng chuyền | Soi spacing trên strip: vị trí cách đều nhau là trôi |
| Cung (arcs) | Thứ có khớp thì đi theo đường cong | Nội suy theo góc quanh khớp, hoặc thêm lệch vuông góc dạng parabol giữa hai điểm | Soi quỹ đạo bàn tay, đầu: đi thẳng tắp là rô-bốt |
| Hành động phụ (secondary action) | Một việc nhỏ đi kèm làm rõ việc chính | Thêm sau khi việc chính đã đọc được, biên độ nhỏ hơn | Một chi tiết: gió lật trang, khói từ cốc. Không tranh điểm nhìn |
| Timing | Xem mục 1 | | |
| Cường điệu (exaggeration) | Đẩy quá thực tế một chút để đọc được ở cỡ nhỏ | Biên độ và độ tương phản tốc độ lớn hơn cảm giác "đủ" khoảng một phần ba, rồi xem ở cỡ điện thoại | Phim tả thực thì cường điệu ở **timing** (giữ lâu hơn, giật nhanh hơn), không ở hình |
| Hình khối chắc (solid drawing) | Vật có ba chiều, có trọng lượng, giữ hình qua các góc | Nhất quán phối cảnh và hướng đèn; bóng tiếp xúc | Soi: mặt, tay, vật có giữ khối khi xoay không. Đây là chỗ i2v hỏng nhiều nhất |
| Sức hút (appeal) | Dáng rõ, tỉ lệ có chủ ý, dễ nhìn | Silhouette đọc được khi tô đen | Quyết định ở ảnh khung đầu, không sửa được ở i2v |

## 3. Giữ hình: thứ model và người mới hay quên

Chuyển động chỉ đọc được khi có lúc đứng yên để so. `[nghề]`

- **Giữ sống (moving hold).** Pose đứng yên nhưng không đông cứng: thở, một sợi tóc, một cái chớp mắt, trôi rất chậm 1–2%. Trong code: cộng một dao động biên độ rất nhỏ và chu kỳ dài vào pose. Với i2v: `人物保持姿势不动，只有呼吸起伏和发丝轻微飘动`.
- **Giữ chết (dead hold).** Đông cứng hoàn toàn. Chỉ dùng có chủ đích: freeze của motif chụp ảnh, impact frame. Trong phim từ ảnh sinh, giữ khung cuối của clip là giữ chết, nên `film_qa.py ranges` bắt khai `hold`.
- **Nhịp giữ và chuyển.** Một cụm hành động hay đi theo dạng: giữ, lấy đà, bung nhanh, vượt quá, ổn định, giữ. Thời gian nằm phần lớn ở hai đầu giữ; phần bung chỉ vài khung. Chuyển động chia đều thời gian cho mọi pha là dấu hiệu máy làm.

## 4. Easing: chọn theo vật, không theo thói quen

| Vật hoặc ý | Dạng chuyển động | Trong `../../code-motion-video/lib/motion.js` |
|---|---|---|
| Phần tử UI nhỏ, cần cảm giác chính xác | Ra nhanh, hãm gọn, gần như không vượt | `spring` preset `snappy` |
| Tấm lớn, panel, máy quay | Vào êm, ra êm, không nảy | `ease`, hoặc `spring` preset `default` gần tới hạn |
| Chữ lớn, vật nặng | Khởi động chậm, dừng có sức ì | preset `heavy` |
| Mascot, vật vui | Vượt rõ, nảy một hai lần | preset `playful` |
| Vật rơi | Tăng tốc đều tới lúc chạm (ease in bậc hai), không hãm trước khi chạm | parabol theo t |
| Vật bị ném đi | Nhanh nhất lúc rời tay, chậm dần | `easeOut` |
| Băng chuyền, kim đồng hồ, cuộn chữ | Đều | tuyến tính |

Ba lỗi easing hay gặp: `[nghề]`

1. **Mọi thứ cùng một đường cong.** Mỗi nhóm vật cần một tính cách. Xem bảng nhóm đối tượng trong `motion-language.md`.
2. **Ease in cho vật đi vào khung.** Vật vào khung thì đã có sẵn vận tốc; nó chỉ cần hãm (ease out). Ease in ở đây làm nó khởi động lề mề ngay trước mắt người xem.
3. **Dừng về 0 giữa hai đoạn.** Vận tốc cuối đoạn trước phải bằng vận tốc đầu đoạn sau, trừ khi có va chạm. `track` trong `motion.js` cộng lò xo nên giữ được điều này.

## 5. On ones, on twos và cảm giác của tốc độ khung

- **On ones:** mỗi khung một hình mới (24 hình một giây ở 24 fps). Mượt, hợp chuyển động nhanh và máy quay di chuyển. `[nghề]`
- **On twos:** mỗi hình giữ hai khung (12 hình một giây). Đây là nhịp quen của hoạt hoạ vẽ tay; hơi giật một cách dễ chịu, có cảm giác thủ công. `[nghề]`
- **On threes và hơn:** giữ ba khung trở lên. Dùng cho hành động chậm trong anime hạn chế và cho stop-motion thô. `[nghề]`

Quy ước hữu ích: **nhân vật on twos, máy quay và nền on ones.** Pan nền mà on twos sẽ rung giật khó chịu. Khi máy di chuyển nhanh, nhân vật cũng chuyển sang on ones trong đoạn đó. `[nghề]`

Trong code, dựng on twos bằng cách lượng tử hoá thời gian của riêng lớp nhân vật: `t2 = Math.floor(t * 12) / 12`, còn lớp nền và camera dùng `t` liên tục. `frameT` trong `motion.js` làm việc này cho chữ số; dùng cùng ý cho nhân vật.

Với i2v, model có xu hướng trả về chuyển động mượt on ones kể cả khi ảnh đầu là tranh vẽ, và kết quả trông như 3D giả vẽ tay. Hai cách kéo lại, đều `[suy luận]`:

- Viết vào prompt: `手绘动画，一拍二，每个动作保持两帧，动作有停顿感，不要平滑补帧`.
- Hậu kỳ: hạ lớp clip xuống 12 fps (giữ mỗi khung hai lần) rồi mới phủ hạt và chuyển động máy ở 24 fps. Cách này chắc hơn câu prompt.

Đừng nội suy khung (frame interpolation) cho hoạt hoạ vẽ tay. Nó xoá đúng thứ làm nên chất vẽ tay.

## 6. Smear, nhoè và chuyển động rất nhanh

Vật đi nhanh hơn khoảng một lần bề rộng của nó mỗi khung thì mắt thấy nó nhảy cóc. Ba cách nối: `[nghề]`

| Cách | Trông thế nào | Hợp với |
|---|---|---|
| Motion blur | Vệt nhoè theo hướng đi, dài theo vận tốc | Phim tả thực, motion code có lấy mẫu sub-frame |
| Smear | Một hai khung vật bị kéo dài thành dải hoặc nhân bản | Hoạt hoạ vẽ tay, mascot |
| Bỏ khung giữa | Cắt thẳng từ pose đầu sang pose cuối, thêm đường tốc độ hoặc bụi | Anime hạn chế, cú đánh |

Trong `render.mjs` của `code-motion-video` đã có blur theo sub-frame. Chữ và số phải dùng `frameT` để không bị trộn nhiều giá trị trong một khung.

## 7. Viết hành động cho i2v theo pha

Model i2v nhận một ảnh đầu và một đoạn văn. Nó giỏi tiếp tục thứ đang có đà trong ảnh, kém ở việc bắt đầu từ đứng yên và kém ở việc dừng. Viết ba pha rõ ràng giúp nó có lấy đà và có dừng. `[suy luận]`

```text
动作：起始：她低头看着手里的信，身体静止，只有呼吸。
然后：她先微微吸气、肩膀略抬，再慢慢抬起头，视线从信纸移向画面右上方的窗户。
结束：头停住后，耳边的碎发继续轻晃一下再落定，她保持望向窗外的姿势约半秒。
```

Quy tắc đi kèm:

| Việc | Vì sao |
|---|---|
| Một hành động chính, một hành động phụ, hết | Hai hành động chính thì model làm cả hai một nửa |
| Ghi pha lấy đà bằng một cụm ngắn (先……再……) | Không ghi thì hành động bật ra không báo trước |
| Ghi thứ gì dừng sau (tóc, vạt áo, dây) | Cho model chỗ để đặt follow through thay vì tự bịa chuyển động thừa |
| Ghi pha giữ cuối khoảng nửa giây | Tay cắt, và chống thói quen trôi tiếp của model |
| Ảnh khung đầu đã ở giữa hành động thì tốt hơn đứng nghiêm | Model tiếp đà dễ hơn tạo đà |
| Quãng di chuyển nhỏ trong clip 3–5 s | Quãng lớn kéo theo biến dạng; cần quãng lớn thì chia hai clip và cắt giữa hành động |

Dấu kiểm trên strip 4 khung một giây:

1. Có khung nào thân ngả ngược hướng trước khi đi không (lấy đà).
2. Khoảng cách vị trí giữa các khung có đổi không (spacing), hay đều tăm tắp (trôi).
3. Có một hai khung đứng gần yên ở cuối không (dừng).
4. Thứ mềm có dừng sau thứ cứng không (bám theo).
5. Vật cứng có giữ hình không (mặt, tay, đạo cụ).

Thiếu 1 và 3 thì cắt vào giữa hành động và ra trước khi nó trôi. Thiếu 5 thì thu hẹp `usable` hoặc sinh lại.

## 8. Khung dọc và phim ngắn đổi gì

- **Chuyển động dọc được lợi.** Rơi, bay lên, đứng dậy, ngước nhìn có cả chiều cao khung để đi. Chuyển động ngang chỉ có quãng ngắn, nên ngang thì đi nhanh gọn hoặc đổi thành đi theo chiều sâu. `[suy luận]`
- **Cường điệu timing nhiều hơn.** Màn hình nhỏ, người xem lướt nhanh. Pha giữ cần đủ dài để đọc, pha bung cần gọn. Chuyển động êm đều từ đầu tới cuối sẽ bị đọc là không có gì xảy ra. `[suy luận]`
- **Một điểm rơi mỗi 2–4 giây.** Ở phim 20–60 s có nhạc, mỗi câu nhạc nên có một chỗ chuyển động chạm đích. Khớp điểm chạm với phách theo `audio-timing.md`: lấy đà trước phách, chạm đúng phách, dư chấn sau phách.

## 9. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Trôi, như lơ lửng dưới nước | Spacing đều, không có giữ | Thêm pha giữ hai đầu, dồn chuyển động vào ít khung hơn |
| Nhẹ bẫng, không có sức nặng | Khởi động và dừng quá nhanh so với cỡ vật; thiếu lấy đà | Tăng số khung khởi động và dừng, thêm lấy đà, thêm nén khi chạm đất |
| Giống PowerPoint | Mọi lớp cùng lúc, cùng đường cong | Lệch pha từng lớp, mỗi nhóm vật một easing |
| Giật cục | Đổi hướng không có cung; vận tốc về 0 giữa hai đoạn | Nội suy theo cung, nối vận tốc |
| Cao su | Nén giãn trên vật cứng, hoặc không giữ thể tích | Bỏ nén giãn cho vật cứng; giữ tích hai trục gần 1 |
| Clip i2v như quay chậm | Model kéo một hành động nhỏ ra đủ độ dài clip | Tăng tốc 1,2–1,5 lần khi dựng rồi tính lại `usable`, hoặc cho hành động rõ hơn với pha giữ cuối |
| Tranh vẽ mà chuyển động như 3D | Model chêm mượt on ones | Hạ lớp nhân vật xuống 12 fps ở hậu kỳ |
| Mọi thứ dừng cùng một khung | Thiếu bám theo | Trễ phần mềm 2–6 khung, cho vượt quá rồi về |
| Không biết nhìn đâu | Hai chuyển động lớn cùng lúc | Một sự kiện chính mỗi thời điểm; thứ kia đợi hoặc nhỏ lại |

## 10. Hàng chờ thử

1. **Ba pha trong prompt i2v.** Cùng ảnh đầu, một prompt chỉ có động từ, một prompt viết đủ 起始, 然后, 结束. Nhìn strip: có khung lấy đà và khung dừng không.
2. **Câu on twos.** Ảnh đầu kiểu vẽ tay, thêm câu `一拍二` vào prompt. Nhìn: nhịp có đổi không, hay vẫn mượt.
3. **Hạ 12 fps ở hậu kỳ.** Lấy một clip vẽ tay mượt, giữ mỗi khung hai lần, phủ hạt 24 fps. Nhìn ở tốc độ thật: có ra chất vẽ tay hơn không, pan nền có rung không.
4. **Khung đầu đang giữa hành động.** So hai ảnh đầu cho cùng hành động quay người: một đứng nghiêm, một đã xoay vai. Nhìn: bản nào ít biến dạng hơn.
5. **Giữ sống.** Prompt chỉ có thở và tóc. Nhìn: model có giữ yên được không, hay tự thêm quay đầu, cười.
6. **Lấy đà trong code.** Trong `examples/minimal`, thêm 15% lấy đà ngược chiều trước một chuyển động chính. Cho Tuệ xem hai bản không nói bản nào: bản nào "có lực" hơn.
