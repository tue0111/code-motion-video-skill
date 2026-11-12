# Lối kể của đạo diễn: phim này nên mang lối nào, và lối đó là những quyết định kỹ thuật nào

Dùng khi: viết G0 phim sáng tạo, cần chọn lối kể trước style; phim đẹp từng shot mà không có giọng chung; Tuệ nói "chậm, lặng, lạ hơn" và cần đổi lời đó thành máy, độ dài, diễn, âm.
Không dùng khi: cần cỡ cảnh (`shot-and-coverage.md`), tiêu cự (`lens-and-camera.md`), ánh sáng (`light-in-motion.md`), điểm cắt (`editing.md`), âm (`sound-design.md`), prompt chuyển động máy (`../../t1to9-film/references/camera-moves.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Cách dùng

1. Chọn loại phim, rồi **một lối chính** ở mục 4. Mượn tối đa một quyết định của lối khác.
2. Ghi vào G0 một dòng: `lối: <tên> · máy · độ dài shot · diễn · âm · cắt`. Mọi prompt sau đó phải khớp dòng này.
3. Lối là bộ ràng buộc, không phải bộ hình. Tên đạo diễn chỉ ở dòng nguồn, không vào prompt (mục 6). [suy luận]

## 2. Bảng quyết định của bảy lối

[suy luận, từ nguồn ở mục 3]

| Lối | Máy | Độ dài shot | Diễn | Sáng, màu | Âm | Cắt |
|---|---|---|---|---|---|---|
| A. Máy tĩnh, khung như tranh, một cảnh một shot | Khoá, ngang mắt, chính diện, toàn hoặc trung toàn | 4–8 s, mỗi shot trọn một cảnh | Một hành động nhỏ mỗi shot, còn lại đứng yên | Sáng đều, ít bóng, bảng màu hẹp nhạt | Tiếng phòng khô, một tiếng cụ thể | Hard cut giữa tableau, không cắt trong cảnh |
| B. Tiết chế: tay và vật thay cho mặt | Tĩnh, cận và đặc tả tay, vật | 1–2,5 s, một động tác trọn | Mặt phẳng; cảm xúc ở nhịp tay | Một nguồn bên hông, nền tối, màu đất | Tiếng vật sát và rõ | Cắt trên động tác (`editing.md` mục 3) |
| C. Sự việc ngoài khung, âm kể thay hình | Tĩnh, xa hơn mức cần, nhân vật quay lưng về sự việc | Giữ 4–7 s sau sự việc | Phản ứng bằng thân, không quay lại | Sáng thường ngày, không báo trước | Gánh chuyện, rồi cắt về im (`sound-design.md`) | Cắt bằng âm, hình đứng yên |
| D. Thời gian chảy trong shot, nước, gió, lửa | Đẩy hoặc trượt rất chậm, đều, tầm thấp | Một shot 6–9 s, các shot khác bình thường | Người nhỏ, đứng hoặc đi chậm | Ẩm, phản chiếu, một nguồn ấm trên nền lạnh | Nguyên tố liền mạch, nhạc lùi | Cắt khi máy đã dừng |
| E. Hồi hộp bằng thông tin: người xem biết trước | Insert mối nguy, trung cảnh người không biết | Ngắn dần qua mỗi lần qua lại | Nhân vật thản nhiên | Mối nguy có điểm sáng hay màu riêng | Một tiếng đếm tăng dần | Cross-cut theo phách, dày dần |
| F. Thường nhật lặp, một vết vỡ, rồi đứng yên | Tĩnh, thấp ngang người ngồi, cùng khung lặp lại | Đều ở pha lặp; shot tĩnh cuối gấp đôi | Động tác lặp y hệt; vết vỡ là một động tác lệch | Đổi giờ trong ngày; khung cuối không người | Cùng một tiếng mỗi lần lặp; vết vỡ là tiếng vắng | Cảnh trống không người (pillow shot) làm dấu ngắt |
| G. Phi lý điềm tĩnh | Trung, ngang tầm, tĩnh, ngay ngắn | 2–4 s | Thản nhiên với cái lạ | Ban ngày thường, không sương, không u ám | Tiếng hiện trường thường | Hard cut thẳng, không nhấn vào cái lạ |

## 3. Từng lối: nguồn, prompt, dấu kiểm, rủi ro i2v

Rủi ro i2v đều là [suy luận]: clip chỉ 5–10 s, model hay tự thêm chuyển động máy và diễn thêm.

**A. Máy tĩnh, khung như tranh.** [sách] *ROY ANDERSON ANALYSIS*, page_label 63: khoá chỗ máy, cho người và dàn cảnh gần như bất động, tránh cắt nhanh, thì khung đứng gần tranh và người xem chuyển sang nhìn ngẫm.
- Ảnh: `固定机位，正面平视，全景，人物站在画面中下部，上方留出大面积空白墙面，灰绿色调，光线均匀，几乎没有阴影`
- i2v: `镜头完全固定，不推不拉不摇。人物只做一个缓慢动作：抬手扶正帽子，其余人物和物体保持静止`
- Dấu kiểm: chồng khung đầu và cuối, nền trùng khít; chỉ một vùng chuyển động.
- Rủi ro: model thêm zoom chậm, người phụ tự cử động. Cắt `usable` trước khung đầu tiên nền lệch.

**B. Tay và vật thay cho mặt.** [sách] Bresson, *Notes on the Cinematographer*, page_label 15: người diễn lặp động tác tới mức tự động, không "nghĩ" khi làm, thì quan hệ với đồ vật mới đúng; phim nên làm như việc của tay.
- Ảnh: `特写：一双手把茶杯放在木桌上，画面不出现人脸，左侧窗户的侧光，背景暗`
- i2v: `手指松开杯柄，手缓慢收回出画，杯中水面轻轻晃动后静止，镜头固定`
- Dấu kiểm: đếm ngón trên mọi khung; động tác có pha đầu và pha cuối; mặt (nếu có) không đổi nét.
- Rủi ro: thừa ngón, tay run vô cớ; mặt bị "diễn" thêm, nên ghi `面部表情平静不变，不流泪`.

**C. Ngoài khung, âm kể thay hình.** [sách] Bresson, *Notes on the Cinematographer*, page_label 31: âm thay được hình thì bỏ hình; hình và âm thay phiên chứ không đỡ nhau; chậm và im chống lại tốc độ và ồn. [sách] Brunette, *Michael Haneke*, page_label 75: việc nặng nhất xảy ra ở phòng bên, chỉ nghe; sau đó máy giữ rất xa, người gần như bất động, và khi tiếng tắt thì im lặng đè xuống.
- Ảnh: `中景：人物坐在厨房桌边，背对门口，门后走廊昏暗，画面中只有这一个人`
- i2v: `人物停下手中的动作，头部不转动，只有肩膀微微收紧，镜头固定，门口不出现其他人`
- Dấu kiểm: tắt tiếng xem strip, shot như không có gì; bật tiếng mới thấy chuyện.
- Rủi ro: model cho quay đầu hoặc vẽ thêm người ở cửa. Âm làm riêng ở G2, model video không lo được.

**D. Thời gian chảy trong shot.** [sách] Tarkovsky, *Sculpting in Time* (Hunter-Blair), page_label 58: nhịp không do độ dài mảnh cắt mà do áp lực thời gian chảy trong shot; hai mảnh mang kiểu thời gian khác hẳn thì không nối được, như hai ống nước khác cỡ.
- Ảnh: `全景：雨中木屋檐下，雨水沿屋檐连续滴落，地面积水倒映一盏暖色灯，人物在画面远处很小`
- i2v: `镜头极慢匀速向前推进，雨持续落下，积水表面不断泛起涟漪，人物站立不动`
- Dấu kiểm: tốc độ đẩy ở giây 1 và giây cuối gần bằng; mưa cùng hướng suốt clip.
- Rủi ro: không ra long take thật; mưa đổi hướng, đẩy rồi khựng. Shot đẩy chậm đặt cạnh shot máy vung thì gãy, đúng điều sách nói.

**E. Người xem biết trước nhân vật.** [nghề] Cho thấy mối nguy nhân vật không biết rồi kéo dài: bất ngờ cho một giây, hồi hộp cho cả đoạn. [sách] *Hitchcock/Truffaut*, page_label 14 (lời dẫn của Truffaut): hồi hộp là kéo người xem vào làm người chơi thứ ba cùng đạo diễn và phim; một tình huống thường ngày chỉ cần một nốt bất an là mang sẵn kịch. Bản trong thư viện là trích đoạn, không có mục quả bom.
- Ảnh insert: `特写：桌布下方的闹钟，指针接近十二点，表盘没有数字，桌布边缘下垂`
- i2v: `闹钟秒针匀速走动，镜头固定，画面其余部分静止`
- Dấu kiểm: mối nguy đọc được ở khung đầu insert, dưới 0,5 s; mặt nhân vật không có dấu đã biết.
- Rủi ro: mặt đồng hồ ra số rác, kim quay ngược. Giữ mặt trơn hoặc đổi sang vật không cần chữ (dây cháy, nước dâng).

**F. Thường nhật, vết vỡ, đứng yên.** [sách] Schrader, *Transcendental Style in Film*, page_label 87–88: đời thường được giữ cứng và lạnh; chỗ lệch ăn mòn dần lớp vỏ đó; rồi một hành động dứt khoát phá kiểu cách, là lúc duy nhất nhạc dâng và người lộ cảm xúc; sau cùng là cái nhìn tĩnh, không giải quyết chỗ lệch mà vượt qua nó. Hệ quả: vết vỡ là shot duy nhất được nới tiết chế, mọi shot trước phải nén.
- Ảnh: `固定机位，低机位约坐姿高度，中景：老人在家门口扫地，竹帘挂在门框上，清晨侧光`
- i2v cảnh trống: `空无一人的门口，竹帘被风轻轻吹动，扫帚靠在墙边，镜头固定`
- Dấu kiểm: chồng các lần lặp, bố cục trùng; chỉ ánh sáng và một chi tiết đổi.
- Rủi ro: ảnh sinh riêng lệch bố cục, phá cảm giác lặp. Sửa từ cùng một ảnh gốc (đổi giờ, chi tiết) thay vì sinh mới.

**G. Phi lý điềm tĩnh.** [nghề] Chuyện không thể có được quay và diễn như chuyện thường: không nhạc báo, không ai ngạc nhiên. [sách] Richardson, *Surrealism and Cinema*, page_label 30 (nói về phim nhiều tập thời câm mà nhóm siêu thực mê): chuyện kỳ lạ trồi lên giữa tình huống thường ngày, quay ở phố thật, nên không khí mơ lại rất vật chất và tỉnh khô, và chính điều đó làm hình lạ hơn.
- Ảnh: `中景：穿西装的男人坐在客厅沙发上看报纸，膝盖以下浸在平静的水里，白天的普通室内光`
- i2v: `男人翻过一页报纸，水面只有轻微波动，人物表情平常，镜头固定`
- Dấu kiểm: chỉ một thứ lạ trong khung; sáng và nét mặt như ảnh đời thường.
- Rủi ro: model "kịch hoá": nước bắn, đèn tối lại, người giật mình. Ghi cấm vào negative.

## 4. Loại phim và cảm xúc cần, nên thử lối nào

[suy luận] Loại phim theo `../../t1to9-film/references/film-types.md`.

| Loại phim | Cảm xúc cần | Lối chính | Mượn được |
|---|---|---|---|
| MV mood / ký ức | Nhớ, mất, thời gian trôi | F | Một shot D làm payoff |
| MV mood / ký ức | Thân, gần | B | Âm sát của C |
| Truyện + twist | Căng, chờ | E | Insert tay của B |
| Truyện + twist | Payoff lặng, đau | C | Shot tĩnh cuối của F |
| Lễ hội / gia đình | Thuộc về, ấm | B (tay trao vật) | Lặp nghi thức của F |
| Du lịch / địa danh | Thong thả, ngắm | A | Một shot nguyên tố D |
| Editorial | Lạnh, thái độ | A | Một chi tiết lạ của G |
| Sản phẩm | Tò mò, dí dỏm | G | Insert tay của B |
| Sản phẩm | Tin cậy, chất liệu | B | Sáng đều của A |
| Kỳ ảo / cao trào | Kinh ngạc có luật | G | Nguyên tố của D |
| Kỳ ảo / cao trào | Sợ dần | E | Ngoài khung của C |
| Beat-sync | Đã tai, chính xác | A (tableau đổi trên phách) | Insert tay của B |

## 5. Điều đổi khi 9:16 dài 20–60 s, và chỗ đụng gu của Tuệ

**Không sống nổi nguyên bản** [suy luận]:
- **Long take của D.** Clip 5–10 s, phim 30 s: 6–9 s là trần. Không nối hai clip giả long take, chỗ nối lộ ở tốc độ đẩy.
- **Shot rất xa giữ lâu của C.** Trên điện thoại người ở toàn cảnh quá nhỏ, bị vuốt đi. Dùng trung cảnh, tối đa 5–7 s.
- **F trong 20 s.** Cần ít nhất ba lần lặp mới thành nhịp. Dưới 30 s thì bỏ F, chỉ lấy cảnh trống làm dấu ngắt.
- **Tableau ngang của A.** Xếp dàn cảnh theo tầng dọc: người ở một phần ba dưới, khoảng trống ở trên (`shot-and-coverage.md`).

**Đụng gu cắt** (`../../t1to9-film/references/cut-grammar.md`):
- C và D muốn nhịp nằm trong shot và âm lấn nhạc. T1 to 9 chọn khác: nhạc dẫn, hard cut đúng phách; im lặng là một trong 3–4 dấu nhấn (khoảng lặng trước payoff), không làm nền cả phim.
- D nói độ dài mảnh cắt không tạo nhịp. T1 to 9 chọn khác: cắt theo phách, nhưng một đoạn nhạc chỉ xếp clip cùng áp lực thời gian.
- B, E, G hợp sẵn với hard cut. A hợp nếu đổi tableau mỗi 4–8 phách, không phải mỗi phách.
- Lối tiết chế (A, B, C, F) dùng 2 dấu nhấn là đủ. Flash kem giữa phim lặng dễ thành tiếng hét. [suy luận]

## 6. Chống bắt chước

- Không viết tên đạo diễn, tên phim, hay "风格" gắn với một người vào prompt ảnh hay i2v. Viết máy, vật, nguồn sáng, động tác.
- Không tái dựng khung hình cụ thể của phim có thật: không chép bố cục, phục trang, đạo cụ, bối cảnh của một cảnh nổi tiếng. Ví dụ ở mục 3 cố ý dùng vật đời thường.
- Lấy nguyên tắc, không lấy hình: "một hành động mỗi tableau" là nguyên tắc; chép dáng một nhân vật nổi tiếng là chép hình. Người biết phim đọc prompt mà nhận ra cảnh gốc thì viết lại.

## 7. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| "Chậm" mà chỉ thấy chán | Chậm không ràng buộc, shot dài vì không biết cắt | Ghi dòng `lối:` ở G0; mỗi shot dài phải có một thứ đang đổi |
| Tableau mà máy trôi | i2v tự thêm zoom | `镜头完全固定，不推不拉不摇`, cắt `usable` sớm, ổn định bằng code |
| Tiết chế mà mặt khóc to | Model tự diễn | `面部表情平静不变`, chuyển cảm xúc sang tay hoặc âm |
| Ngoài khung mà không ai hiểu | Âm yếu hoặc làm sau cùng | Thiết kế âm ở G2, xem animatic có tiếng |
| Hai shot chậm cạnh nhau mà gãy | Áp lực thời gian khác | Xếp theo lượng chuyển động, chèn cảnh trống |
| Lối lẫn lộn | Mượn quá một lối | Một lối chính, một thứ mượn |

## 8. Hàng chờ thử

1. **Máy khoá thật.** 3 clip 5 s lối A có và không có `不推不拉不摇`. Đúng nếu bản có câu trùng nền đầu cuối ở 2/3 clip.
2. **Mặt phẳng.** 2 clip lối B có và không có `面部表情平静不变`. Đúng nếu bản có câu không đổi miệng, mắt ngoài một lần chớp.
3. **Âm kể thay hình.** 10 s lối C, có và không có tiếng ngoài khung. Đúng nếu người lạ chỉ kể đúng chuyện ở bản có tiếng.
4. **Áp lực thời gian.** Ba cặp cắt: chậm với chậm, chậm với nhanh, chậm, cảnh trống, nhanh. Tuệ xem trên điện thoại, ghi cặp nào gãy.
5. **Phi lý không kịch hoá.** Sinh 3 clip lối G. Đúng nếu không clip nào tự thêm nước bắn, đổi sáng hay nét mặt ngạc nhiên.
