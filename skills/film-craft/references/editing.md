# Dựng phim: nối hai shot thế nào để người xem hiểu và cảm

Dùng khi: lập cut map ở G2 và cần biết mỗi cú cắt đòi gì từ hai clip; viết prompt i2v sao cho có tay cắt; một cú cắt ở G4 "vấp" mà chưa rõ vì sao; phải che chỗ model làm trôi mặt hay đạo cụ.
Không dùng khi: cần gu cắt và số dấu nhấn của Tuệ (`../../t1to9-film/references/cut-grammar.md`, đứng trên file này); cần câu prompt chuyển động máy (`../../t1to9-film/references/camera-moves.md`); cần beat grid (`../../code-motion-video/references/audio-timing.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Sáu thứ một cú cắt phải cân

[sách] Murch, *In the Blink of an Eye* (rev. 2nd), page_label 16–17: cú cắt lý tưởng thoả cùng lúc cảm xúc, chuyện, nhịp, đường mắt, mặt phẳng 2D (trục, hướng nhìn), không gian 3D. Phải bỏ thì bỏ từ dưới lên. Làm đúng tầng trên thì người xem ít để ý lỗi tầng dưới, ngược lại thì không.

Bảng kiểm cho mỗi dòng `cuts.md`:

| # | Hỏi | Đạt khi |
|---|---|---|
| 1 Cảm xúc | Sau cú cắt người xem cảm gì, có đúng beat G0? | Nói được bằng một từ |
| 2 Chuyện | B cho thêm điều gì A chưa có? | Có một điều mới |
| 3 Nhịp | Rơi đúng phách và hơi thở? | Không thấy sớm hay trễ |
| 4 Đường mắt | Mắt cuối A và đầu B ở đâu? | Gần nhau, hoặc xa có chủ ý (mục 4) |
| 5 Mặt phẳng 2D | Hướng nhìn, hướng đi giữ trái phải? | Không lật trục vô cớ |
| 6 Không gian 3D | Người và vật còn đúng chỗ? | Không nhảy vị trí |

Ghi: `t=8.40 S3→S4 · 1✓ 2✓ 3✓ 4✗(mắt từ trái trên xuống phải dưới) 5✓ 6–`. Có ✗ ở 1 hoặc 2 thì cắt sai, đẹp mấy cũng sửa.

## 2. Điểm cắt: trong một hành động, một cái nhìn, một hơi thở

[sách] Murch, page_label 41: điểm cắt tốt là chỗ người xem có thể chớp mắt, tức lúc một ý vừa trọn. Đi cùng người xem và dẫn trước một chút; chậm quá thì chán, nhanh quá thì rối.

| Trong A có | Cắt ở đâu | Sớm hơn | Muộn hơn |
|---|---|---|---|
| Hành động | Khi động tác đã khởi, khoảng một phần ba đầu [nghề] | Chưa biết ai làm gì | Động tác xong, cắt thành chờ |
| Cái nhìn | Khi mắt vừa dừng ở đích, hoặc ngay sau một cái chớp | B mất lý do | Người xem hỏi "nhìn gì", căng thêm |
| Cảm xúc trên mặt | Sau đỉnh, trước khi mặt xả | Mất read | Ngượng, model bắt đầu trôi mặt |
| Tĩnh, không gian | Khi mắt đã quét hết khung | Không định vị được | Rỗng |

Trên strip (`qa.md` §i2v) tìm khung bắt đầu chuyển động, cộng 2–4 khung ở 24 fps làm điểm ra của A. B vào ở pha tương ứng, không lặp phần A đã cho xem. [suy luận]

## 3. Các kiểu nối và điều kiện phải có từ prompt i2v

Ghi kiểu nối vào shot list G2 trước khi viết prompt. Clip không có điều kiện thì hiệu ứng lúc dựng sẽ lộ.

| Kiểu | Dùng khi | Điều kiện hai shot, câu prompt (zh-CN) | Dấu kiểm trên strip |
|---|---|---|---|
| Cut on action | Đổi cỡ cảnh mà vẫn liền | Cùng động tác, cùng tay, đổi cỡ ít nhất hai nấc. A: 人物右手把杯子举到嘴边，动作持续到镜头结束 · B: 特写：杯沿贴近嘴唇 | Cuối A và đầu B cùng pha động tác |
| Match hình, màu | Nối hai nơi hay hai thời | Cùng khối, cùng vị trí và cỡ: 圆形灯罩位于画面正中，宽度约占画面三分之一; hoặc 画面下半部是大面积暖橙色 ở cả hai | Chồng cuối A lên đầu B ở 50%, khối trùng |
| Match chuyển động | Chuyển cảnh trôi một mạch | Cùng hướng và tốc độ trên màn hình: 镜头匀速向右平移，主体从左向右移动 ở cả hai | Vector 4 khung cuối A và 4 khung đầu B cùng chiều |
| Match âm | Nối bằng tiếng | Hành động cuối A có nhịp giống tiếng đầu B. Xem `sound-design.md` | Nghe |
| Cutaway | Bắc thời gian, che chỗ nối | Cùng thế giới, không nhân vật chính: 窗外树叶在风中摆动，画面中没有人物 | Không có gì phải khớp |
| Insert | Chi tiết cần cho chuyện | Đúng trạng thái đạo cụ lúc đó: 特写：手指把信封封口压平，不出现人脸 | Đạo cụ khớp shot trước và sau |
| Reaction | Dạy người xem cảm gì | Mặt hướng về sự việc, có một đổi nhỏ: 近景：人物停下动作，视线移到正前方，眨眼一次 | Hướng nhìn khớp vị trí sự việc |
| Cross-cut | Hai việc song song dồn về một điểm | Mỗi mạch có màu hoặc hướng chuyển động riêng | Đọc ra mạch nào ngay khung đầu |
| Jump cut có chủ đích | Nén thời gian, bồn chồn | Cùng khung máy: 机位与构图完全不变，人物换了姿势 | Nền đứng yên, chỉ người đổi |
| Smash cut | Đảo cảm xúc đột ngột | A: 人物闭眼躺在草地上，几乎不动 · B: 人群奔跑，镜头剧烈晃动 | Sáng tối hoặc lượng chuyển động đổi hẳn |
| J-cut, L-cut | Kéo sang cảnh sau (J), giữ dư âm cảnh trước (L) | Tiếng hiện trường sạch, không nhạc | Tiếng B vào trước cắt 6–12 khung [suy luận] |
| Montage | Gói nhiều thời gian | Một quy luật chung: cùng cỡ, cùng hướng, hay 同一个手部动作，不同地点 | Contact sheet đọc ra quy luật |

T1 to 9 chọn khác: nền là hard cut đúng phách; match cut và cắt giữa hành động chỉ khi hai shot khớp thật; whip chỉ khi chuyển động trong shot dẫn tới. Smash cut và jump cut nên tính vào quỹ 3–4 dấu nhấn (`cut-grammar.md` luật 2). [suy luận]

## 4. Đường mắt giữa hai shot, nhất là 9:16

Cú cắt làm điểm nhìn mới bật ra. Gần chỗ mắt đang đứng thì êm, xa thì mắt phải tìm mất vài khung và thấy giật. [nghề]

1. Chấm điểm nhìn trên khung cuối A và khung đầu B: mắt người, vật sáng nhất, vật đang chuyển động.
2. Đo khoảng cách theo phần trăm chiều cao khung. Dưới khoảng 15% là liền, trên khoảng 35% là nhảy. [suy luận, số để đo rồi chỉnh]
3. Muốn liền: đặt chủ thể B vào vùng chủ thể A vừa rời. Muốn nhấn: cho nhảy có chủ ý, báo trước bằng tiếng hay phách.
4. Chuyển động cuối A dẫn mắt về hướng nào thì B mở ở hướng đó.

9:16: trục dài là trục dọc, nên mắt nhảy đầu khung xuống đáy khung tốn đường hơn nhảy ngang. Giao diện điện thoại che đáy và mép phải. Giữ điểm nhìn ở dải giữa và một phần ba trên, nhiều cặp shot liền nhau dùng chung một "cột" điểm nhìn. [suy luận] Prompt: 人物面部位于画面上三分之一、水平居中.

## 5. Thời gian: nén, giãn, dừng

| Công cụ | Hợp phim 20–60 s không thoại? | Lưu ý với i2v |
|---|---|---|
| Ellipsis (bỏ đoạn giữa) | Rất hợp, là cách kể nhanh chính | Shot sau cần một dấu đổi đọc được dưới 1 s: ánh sáng, đồ, vị trí |
| Giữ lâu | Một hai chỗ để thở | Cần `usable` đủ dài, đừng kéo bằng freeze |
| Slow motion | Một chỗ hero | Kéo chậm clip 24 fps bằng code dễ giật. Sinh sẵn chậm: 慢动作，发丝和衣角缓慢飘动 [suy luận] |
| Speed ramp | Vào drop | Cần chuyển động liên tục cả clip; tính lại nguồn theo `qa.md` §i2v mục 4 |
| Freeze | Khi là motif ký ức hay kết | Khai `hold`. Ở T1 to 9 freeze CCD là dấu nhấn có sẵn |

## 6. Nhịp: độ dài shot, căng rồi nhả, phách

[sách] Reisz & Millar, *Technique of Film Editing* (reissue 2nd), page_label 85: cận đứng yên nói hết ý rất nhanh nên phải ngắn; rộng có chuyển động ngang khung giữ chú ý lâu hơn; độ dài chỉ so được khi tính loại shot. [sách] Murch, page_label 41: mật độ cắt theo nhịp nghĩ của cảnh, cảnh hành động dày hơn hẳn cảnh trò chuyện.

Điểm xuất phát để đo rồi chỉnh (24 fps) [suy luận]: cận tĩnh, insert 0,8–1,5 s; trung có một hành động 1,5–2,5 s; rộng có chuyển động 2,5–4 s; shot giữ cho cảm xúc 3–5 s, tối đa một hai chỗ.

Căng rồi nhả: shot ngắn dần trước điểm rơi, sau đó thả một shot dài. Phim 30 s đủ cho một hai vòng. Chia đều thì không có vòng nào.

Phách: cắt trên phách cho cảm giác chắc, nhưng không cần cắt mọi phách; đổi mật độ theo đoạn nhạc. Lệch phách để giữ một read thì cứ lệch. Nghề hay cắt sớm hơn phách 1–2 khung cho cảm giác trúng [nghề, chưa đo ở repo này]. T1 to 9 chọn khác: hard cut đúng phách, rút 3, 2, 1 phách trước drop. Lấy phách từ `beat_grid.py`.

## 7. Dựng từ clip i2v

Clip 3–5 s thường có ba pha [suy luận, chưa đo có hệ thống]:
- **Mở** (khoảng 0–0,5 s): gần khung gốc, sạch nhất về mặt và đạo cụ.
- **Giữa**: chuyển động chính, tay cắt tốt nhất.
- **Đóng** (nửa giây cuối): model chậm lại, dễ trôi mặt, mở lại đạo cụ, thêm vật.

Prompt cho tay cắt: 开头半秒画面基本静止，然后人物开始转头 (起幅); 最后半秒镜头停住，人物保持静止 (落幅). Sinh dài hơn đoạn cần ít nhất 0,5 s (`prompts.md` mục B). Ghi `usable: [a, b]` và cắt ra trước khung lỗi đầu tiên ít nhất 2 khung.

Che chỗ lỗi bằng thứ có lý do trong chuyện:

| Lỗi | Che bằng | Vì sao chính đáng |
|---|---|---|
| Mặt trôi sau 1,5 s | Reaction người khác hoặc insert tay, rồi về shot khác của người đó | Người xem cần phản ứng hay chi tiết |
| Đạo cụ đổi trạng thái | Insert cận đạo cụ đúng trạng thái, sinh riêng | Chi tiết đáng xem gần |
| Hai clip lệch mặt nhẹ | Đổi cỡ ít nhất hai nấc, cắt trên hành động | Mắt bận theo động tác |
| Hai không gian không nối được | Cutaway không người | Cho thời gian trôi, cho thở |

Không vá bằng flash: ở T1 to 9 mỗi dấu nhấn có chức năng riêng.

## 8. Trật tự thông tin, và điều đổi khi 9:16 dài 20–60 s

- **Mở bằng câu hỏi.** Khung 0 đầy và đang chuyển động (`qa.md` §giao). Trong 2–5 s đầu có một điều chưa giải thích: cái nhìn ra ngoài khung, vật lạ, hành động dở. Câu hỏi giây 5 nằm ở G0.
- **Setup và payoff.** Vật hay cử chỉ được cho thấy rõ một lần trước khi mang nghĩa; insert là cách gài. Payoff lặp cùng vật, cùng cỡ hay cùng góc để nhận ra không cần chữ. [nghề]
- **Phản ứng trước, nguyên nhân sau** khi muốn kéo tò mò. [nghề]
- **Kết.** Shot cuối trả lời câu hỏi mở hoặc đổi nghĩa motif, dài hơn các shot trước, rồi mới outro.

9:16 ngắn [suy luận]: không có chỗ cho shot định vị dài, lộ không gian dần qua shot trung. Người xem vuốt đi trong 1–2 s nên câu hỏi phải đến trước bối cảnh. Nền tảng phát lặp, nên khung cuối nối được khung đầu là lợi thế.

## 9. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Cắt "vấp" dù hai shot đẹp | Đường mắt nhảy xa, hoặc cắt giữa hai ý | Chấm điểm nhìn, dời điểm cắt 2–6 khung, hoặc đổi thứ tự |
| Cắt trên hành động mà thấy lặp động tác | B vào ở pha sớm hơn điểm ra của A | Cho B vào muộn hơn đúng phần đã xem |
| Mọi shot dài bằng nhau | Chia đều theo phách | Độ dài theo mục 6, một shot dài sau điểm rơi |
| Không hiểu đã qua thời gian | Ellipsis thiếu dấu đổi | Shot có ánh sáng hay đạo cụ khác rõ, hoặc cutaway |
| Mặt, đạo cụ trôi cuối clip | Dùng cả pha đóng | Cắt `usable` sớm hơn, che bằng insert hay reaction |
| Match cut không thấy match | Prompt hai shot không khoá vị trí và cỡ | Cùng câu bố cục ở cả hai prompt, chồng 50% trước khi dựng |
| Slow motion giật | Kéo chậm clip 24 fps bằng code | Sinh sẵn chuyển động chậm, hoặc ramp ngắn |

## 10. Hàng chờ thử

1. **Pha của clip i2v.** Sinh 3 clip 5 s cùng model, ghi khung lỗi mặt hay đạo cụ đầu tiên. Đúng nếu đa số lỗi nằm sau 60% độ dài; sai thì bỏ giả định "pha đóng hỏng nhất".
2. **Ngưỡng đường mắt 9:16.** Dựng 6 cặp cắt với khoảng cách điểm nhìn 5%, 20%, 40% chiều cao, Tuệ xem tốc độ thật trên điện thoại. Ghi từ mức nào Tuệ thấy giật.
3. **Cắt sớm so với phách.** Một đoạn, ba bản: đúng phách, sớm 1 khung, sớm 2 khung. Xem mù, hỏi bản nào trúng nhất.
4. **起幅 và 落幅.** Hai clip có và không có câu nửa giây tĩnh. Đo trên strip có nửa giây tĩnh ở đầu và cuối không.
5. **Cut on action từ hai clip sinh riêng.** A trung cảnh, B cận, cùng động tác nâng cốc. Xem pha động tác có khớp trong 4 khung không.
