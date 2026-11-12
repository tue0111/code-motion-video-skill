# Diễn xuất và chuyển động nhân vật: làm sao một cử động đọc ra ý nghĩ và sức nặng

Dùng khi: viết 分镜 ảnh cho shot có người (pose của khung đầu i2v); viết prompt i2v có hành động của người hay con vật; soi strip một clip i2v có người đi, quay đầu, cầm vật; dựng mascot hoặc rig SVG bằng code.
Không dùng khi: cần 12 nguyên lý, timing, spacing, easing (xem `animation-principles.md`); chọn chuyển động máy (xem `../../t1to9-film/references/camera-moves.md`); lối cắt (xem `../../t1to9-film/references/cut-grammar.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Pose trước chuyển động

Với i2v, khung đầu là pose duy nhất điều khiển chắc được. Pose sai thì chuyển động không cứu. `[suy luận]`

| Thành phần | Làm gì | Viết vào prompt ảnh (zh-CN) | Dấu kiểm trên khung |
|---|---|---|---|
| Line of action (đường lực chạy dọc thân) | Một đường cong C hoặc S từ đầu xuống chân trụ. Tránh thân thẳng đứng như cột `[nghề]` | `身体从头到支撑脚形成一道向前弯的弧线` | Vẽ một nét qua đầu, sống lưng, chân trụ: có cong không |
| Silhouette (bóng đen) | Tay tách khỏi thân, đạo cụ không chồng lên mặt. Tô đen cả người vẫn đọc ra việc đang làm `[nghề]` | `右手离开身体伸向门把，手臂轮廓与身体之间留出空隙` | Giảm ảnh còn 64 px chiều ngang: còn đọc được hành động không |
| Contrapposto (dồn trọng lượng) | Trọng lượng dồn lên một chân. Hông nghiêng về chân trụ, vai nghiêng ngược lại `[nghề]` | `重心落在左脚，左胯略高，肩线向右下倾斜` | Hông và vai không song song |
| Golden pose (pose kể chuyện) | Một pose mà chỉ còn một khung vẫn kể được beat. Đặt ở khung đầu hoặc cuối `[suy luận]` | Ghi pose ở 落幅: `最后停在她回头、左手仍扶着门框的姿态` | Khung cuối đứng được như một ảnh tĩnh |

Hướng thân có đích: xem FG-01 ở `../../code-motion-video/references/film-grounding.md`.

## 2. Sức nặng

`[nghề]` trừ khi ghi khác.

- **Trọng tâm nằm trên chân trụ.** Chiếu từ rốn xuống: rơi ngoài bàn chân trụ thì người đang ngã hoặc đang bước.
- **Lấy đà ngược chiều**, càng sâu thì vật càng nặng.
- **Khởi động và dừng theo khối lượng.** Nhấc xô nước khác nhấc ly: vai nhô, thân nghiêng ngược để cân. Số khung xem `animation-principles.md`.
- **Chân bám đất.** Bàn chân đang chạm đất không được trượt. Lỗi số một của đi bộ sinh bằng máy. `[suy luận]`

Viết sức nặng vào prompt bằng phản ứng của thân, không bằng tính từ: `她双手提起水桶，肩膀向上耸起，身体向另一侧倾斜以保持平衡` thay cho `很重的水桶`.

## 3. Nghĩ rồi mới làm

Người xem đọc ý nghĩ từ thứ tự cử động. `[nghề]`

1. **Mắt đi trước**, rồi đầu, rồi vai và thân. Đảo thứ tự thì nhân vật như bị kéo dây.
2. **Chớp mắt khi đổi ý hoặc đổi hướng nhìn.** Chớp giữa lúc quay đầu đánh dấu ý nghĩ mới.
3. **Nhịp nhìn:** nhìn, giữ, rời. Cái giữ là chỗ người xem đọc cảm xúc. Rời mắt xuống trước khi quay đi thường đọc là ngại hoặc buồn. `[suy luận]`

**Vi biểu cảm cho cận mặt 9:16.** Mặt chiếm gần nửa màn hình điện thoại, một thay đổi nhỏ đã đủ to. Mỗi clip chọn đúng một: khoé môi nhích, mí dưới căng, hàm siết, cánh mũi phồng. `[suy luận]`

Trong cận mặt, mắt là chỗ quan trọng nhất; thiếu đốm sáng nhỏ thì mắt trông chết, và khoảng trống đặt về phía mắt nhìn (Mercado, *The Filmmaker's Eye*, page_label 54). Một mặt gần như không đổi vẫn đọc ra cảm xúc khác nhau tuỳ shot đứng trước (Katz, *Film Directing Shot by Shot*, page_label 185, Kuleshov). `[sách]` Hệ quả: cận mặt i2v diễn ít, để nghĩa cho shot trước.

| Muốn đọc ra | Viết (zh-CN) | Dấu kiểm | Rủi ro |
|---|---|---|---|
| Mỉm cười nhẹ | `嘴角慢慢向上牵动一点，眼睛下方微微收紧，牙齿不露出` | Môi không mở, mắt có co | Model cười toe, lộ răng, đổi mặt `[suy luận]` |
| Nén khóc | `下巴轻轻收紧，下眼睑泛红并湿润，眼泪没有落下` | Nước mắt không chảy | Khóc oà, méo miệng `[suy luận]` |
| Nhận ra | `目光停住，眨一下眼，眉头轻轻抬起` | Đúng một cái chớp | Chớp nhiều lần `[suy luận]` |

Chặn diễn quá: `表情变化很小，面部其余部分保持不动`.

**Cảm xúc bằng thân và nhịp.** Một cảm xúc là một thôi thúc đổi quan hệ của người với người khác hoặc với nơi chốn: tiến tới, rút lui, đứng khựng. Nó lộ ra qua dáng, chuyển động, rồi mới tới mặt; cảm xúc càng mạnh thì thôi thúc càng khó nén. `[sách]` Konijn, *Acting Emotions*, page_label 72–73. Toàn thân là cỡ cho kiểu diễn này. `[sách]` Katz, *Film Directing Shot by Shot*, page_label 167.

Cách dùng: viết **thôi thúc, rồi chỗ nó bị kìm lại**. Thôi thúc bị kìm đọc mạnh hơn thôi thúc làm trọn. Bảng dưới là `[suy luận]`.

| Cảm xúc | Thôi thúc | Thân và nhịp | Viết (zh-CN) | Dấu kiểm |
|---|---|---|---|---|
| Sợ | Rút lui | Trọng tâm lùi về gót, vai nhô lên, rồi khựng, một nhịp không động | `她重心退到脚跟，肩膀耸起，随后整个人僵住不动约一秒` | Có một quãng đứng yên sau cú rút |
| Giận, bị nén | Tiến tới | Nửa bước tới rồi dừng, tay nắm lại ở cạnh thân, ngực phồng chậm | `他向前迈出半步后停住，右手在身侧慢慢握紧，胸口缓缓起伏` | Bước không trọn; tay không vung |
| Buồn | Buông | Mọi khởi động trễ, đầu cúi trước vai, dừng không vượt | `她的动作都慢半拍，先低下头，肩膀随后下沉，停住时没有回弹` | Không có nảy hay vượt ở điểm dừng |
| Nhớ, muốn | Hướng về vật | Tay đi tới vật rồi dừng cách một gang, thân nghiêng theo | `她伸手靠近桌上的旧照片，指尖在一掌之外停住，身体微微前倾` | Không chạm |
| Ngại, xấu hổ | Thu nhỏ | Quay ba phần tư khỏi người kia, vai khép, tay tìm vạt áo | `她侧身转开，肩膀向内收，手指捏住衣角` | Mặt rời khỏi trục nhìn của người kia |
| Nhẹ nhõm | Mở ra | Một hơi thở ra, vai rơi, đầu ngửa nhẹ | `她长长呼出一口气，肩膀落下，头微微后仰` | Vai thấp hơn khung đầu |

Nhịp là nửa kia: cùng một cử động, trễ trước khi làm đọc là do dự, làm ngay đọc là bản năng. Chọn chỗ đặt khoảng giữ trước khi chọn động từ.

## 4. Tay

`[nghề]`

- **Cử chỉ có đích:** tay đi tới vật, người hay bộ phận cơ thể. Vung không đích đọc là giả.
- **Tay cầm vật:** ngón ôm theo hình vật, có ngón chịu lực, ngón chỉ đỡ. Vật nặng thì cổ tay gập theo lực.
- **Hai tay không song sinh** (twinning): một tay làm việc, tay kia đỡ hoặc nghỉ (luật chung ở `motion-language.md`).
- **Tay nghỉ cũng kể chuyện:** nắm vạt áo, chạm cổ tay kia, đặt lên mép bàn.

## 5. Chu kỳ: đi và chạy

**Các pha một bước** `[nghề]`:

| Pha | Đi | Chạy |
|---|---|---|
| Contact | Gót chân trước chạm đất, hai chân dang rộng nhất | Bàn chân chạm đất gần dưới thân |
| Down | Thân thấp nhất, gối chân trước khuỵu nhận lực | Thân thấp nhất, nén mạnh |
| Passing | Chân sau vượt qua chân trụ, thân lên lại | Chân vung qua, thân đang lên |
| Up | Thân cao nhất, chuẩn bị ngã về trước | Bay: hai chân rời đất |

Đi luôn có ít nhất một chân trên đất. Chạy có pha bay. Chu kỳ đầy đủ là hai bước.

**Nhịp bước theo fps** (con số tham khảo phổ biến trong hoạt hoạ, không phải luật) `[nghề]`:

| Kiểu | Một bước ở 24 fps | Ở 30 fps |
|---|---|---|
| Đi dạo | khoảng 16 khung | khoảng 20 khung |
| Đi thường | khoảng 12 khung (2 bước mỗi giây) | khoảng 15 khung |
| Đi vội | khoảng 8 khung | khoảng 10 khung |
| Chạy | 4–6 khung | 5–8 khung |

Đi thường gần 120 BPM. Chọn kiểu đi theo tempo nhạc, không ép tempo theo bước. `[suy luận]`

**Tính cách qua dáng đi** `[nghề]`: độ nảy (vui nảy, mệt phẳng và kéo chân), độ dài bước, ngực ưỡn hay khom, vung tay rộng hay sát, đầu ngẩng hay cúi. Đổi một trục là đủ đổi người.

## 6. Phản ứng thứ cấp

Tóc, vải, phụ kiện khởi chậm hơn thân, dừng sau thân, vượt rồi lắc về. Bằng chứng rẻ nhất cho sức nặng. Tóc dài trễ và vượt nhiều; vải cứng trễ ít; bông tai, dây túi lắc như con lắc rồi tắt. `[nghề]`

Với i2v: chỉ cho thứ cấp với vật **đã có trong ảnh gốc**, ghi lực gây ra nó: `她转头时发尾稍后才跟上并轻轻甩回，耳坠随之晃动后静止`. `[suy luận]`

## 7. Hai nhân vật

`[nghề]`

- **Ai dẫn ai theo:** mỗi nhịp một người hành động, người kia phản ứng.
- **Nhịp so le:** B đáp A sau một khoảng nhỏ. Trễ dài đọc là do dự hoặc lạnh.
- **Khoảng cách là quan hệ:** rút ngắn hay nới ra giữa hai khung là một beat.
- **Chạm là đỉnh**, không phải mặc định. Trước chạm có một nhịp dừng.
- **Không nhìn nhau vẫn nối nhau.** Một người tránh, quay lưng, bận tay; người kia đứng gần yên và xoay thân theo. Từ chối nhìn có khi giữ người xem hơn hai người đối mặt. `[sách]` Kenworthy, *Master Shots Vol. 2*, page_label 79–80. Dàn cảnh cụ thể ở `shot-and-coverage.md` §6.

Với i2v: A làm, cắt sang B phản ứng, an toàn hơn một shot cả hai cùng cử động (§8.4). `[suy luận]`

## 8. Áp dụng cho i2v

Phần này toàn bộ là `[suy luận]`, chưa thử trên Seedance hay Kling.

### 8.1. Một clip 3–5 s chứa được bao nhiêu

- **Một hành động chính** cộng một thứ cấp (quay đầu, tóc theo). Không thêm "rồi cười rồi bước đi".
- 5 s đủ cho pha mở và pha giữ. 3 s chỉ còn hành động. Handle 0,5 s theo `../../t1to9-film/references/prompts.md` §B.

### 8.2. Viết hành động thành pha

Khuôn ba pha, viết tách khỏi phần máy:

```text
起始状态：她侧身站在窗边，目光落在窗台上的茶杯。
动作：她的视线先抬起望向窗外，随后头部跟着转过去，肩膀最后微微转动。
结束状态：她停在望向窗外的姿态，眨一下眼，保持约半秒不动。
保持面部、手指与原图一致，不新增人物，画面中不出现任何文字。
```

起始状态 phải tả đúng ảnh gốc, lệch thì model tự sửa ảnh ở vài khung đầu.

### 8.3. Động từ cụ thể (zh-CN)

| Hành động | Viết | Ghi chú |
|---|---|---|
| Quay đầu | `目光先移向右侧，头部随后缓缓转向右侧` | Ghi phía, mắt trước |
| Ngước nhìn | `她抬起眼睛望向上方，下巴随后微微抬起` | Mắt trước cằm |
| Bước tới | `她向前迈出一步，左脚落地后身体重心前移` | Một bước, không "走过来" |
| Đưa tay | `右手从身侧抬起，伸向桌上的信封，指尖在信封上方停住` | Dừng trước khi chạm là an toàn hơn |
| Mỉm cười nhẹ | `嘴角慢慢向上牵动一点，不露齿` | Xem §3 |
| Tóc bay | `一阵风从画面左侧吹来，发丝向右飘起后慢慢落回` | Ghi hướng gió và lúc dừng |
| Thở | `胸口随呼吸轻轻起伏` | Cận đứng yên khỏi đơ |

Tránh `动起来`, `自然地活动`.

### 8.4. Hành động model hay làm hỏng và cách né

| Hành động | Hỏng kiểu gì | Né bằng cỡ cảnh hoặc che |
|---|---|---|
| Tay cầm vật | Ngón dính vào vật, vật đổi hình, đổi tay | Cận vật mà tay đã cầm sẵn từ khung đầu, chỉ cho nhấc hoặc xoay nhỏ. Hoặc cắt ở lúc tay sắp chạm |
| Đi bộ toàn thân | Trượt chân, chân đổi bên, đầu gối gập ngược | Cắt ngang hông (trung cảnh, máy bám theo), hoặc quay lưng xa trong sương, hoặc chỉ cận bàn chân |
| Hai người chạm | Tay nhập vào nhau, thừa ngón, mặt lẫn | Cận riêng hai bàn tay ở khung đầu đã chạm sẵn; hoặc chạm ngoài khung, chỉ thấy phản ứng mặt |
| Nói | Miệng nhép vô nghĩa, răng biến dạng | Phim không thoại: chặn bằng `嘴唇保持闭合`. Cần thì quay lưng hoặc che bằng tiền cảnh |
| Quay người 180° | Mặt đổi danh tính | Dừng ở ba phần tư; cắt trước khi mặt quay hẳn về |

### 8.5. Bảng kiểm khi soi strip

Bổ sung cho `../../t1to9-film/references/qa.md` §i2v, chỉ phần diễn:

- [ ] Mắt, rồi đầu, rồi thân. Không khung nào thân đi trước mắt.
- [ ] Chân trụ không trượt (so mép bàn chân với một mốc trên sàn).
- [ ] Trọng tâm trên chân trụ ở mọi khung đứng yên.
- [ ] Đúng một hành động chính.
- [ ] Tóc, vải dừng sau thân.
- [ ] Hai tay không cùng góc ở cùng khung.
- [ ] Mặt đổi đúng một chỗ.
- [ ] Cảm xúc chính đọc được khi che mặt đi (chỉ nhìn thân và nhịp).
- [ ] Khung cuối là golden pose; ghi `usable` tới đó.

## 9. Nhân vật dựng bằng code (mascot, rig SVG)

Hàm có sẵn ở `../../code-motion-video/lib/motion.js`. Đừng viết lại spring.

| Việc | Dùng | Ghi chú |
|---|---|---|
| Mắt, đầu, thân lệch pha | `M.track(t - d, keys)` với `d` tăng dần cho đầu rồi thân | Ví dụ mắt `d=0`, đầu `d≈0.06`, thân `d≈0.12` giây `[suy luận]` |
| Tai, đuôi, tóc trễ và vượt | `M.spring(t - d, ...M.SPRING.playful)` | Chỉ cho phần mềm. Thân dùng `default` hoặc `heavy` |
| Vật nặng | `M.SPRING.heavy` | Ít nảy, khởi chậm |
| Chu kỳ đi | `M.loopT(t, dur)`, `dur` = hai bước | Neo chân trụ theo toạ độ đất, thân di chuyển, để chân không trượt |
| Chớp mắt | `M.rng(seed)` chọn thời điểm không đều | Hai mắt chớp cùng lúc là đúng |
| Bước khớp nhạc | `M.beatGrid(bpm)` chọn khung contact | Contact rơi đúng phách |

## 10. Riêng 9:16 và phim ngắn

`[suy luận]`
- Khung dọc hợp người toàn thân, nhưng đó là cỡ i2v hay hỏng chân nhất. Toàn thân chỉ khi người đứng yên hoặc ở xa.
- Ngang hẹp: hành động sang ngang dễ ra khỏi khung. Đổi sang trục sâu (tiến về máy, ngước lên, cúi xuống).
- Mỗi shot 1,5–3 s trên màn hình: một golden pose, một thay đổi.

## 11. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Người trôi trên sàn | Chân trụ trượt | Cắt cỡ cảnh ngang hông; với code thì neo chân theo toạ độ đất |
| Nhân vật như bị kéo dây | Thân và đầu đi cùng lúc với mắt | Viết thứ tự `目光先…头部随后…肩膀最后…` |
| Pose cứng như ma nơ canh | Line of action thẳng, hông vai song song | Sửa ảnh gốc: dồn trọng lượng một chân |
| Hành động thứ hai tự mọc | Prompt có hai động từ chính | Tách thành hai shot |

## 12. Hàng chờ thử

1. **Mắt trước đầu.** Cùng ảnh, có và không có `目光先…头部随后`. Strip 0,25 s: có khung nào mắt đã sang mà đầu chưa sang không.
2. **Đi bộ hai cỡ.** Toàn thân so với trung cảnh ngang hông. Đếm khung chân trượt hoặc đổi bên.
3. **Cười nhẹ.** `嘴角…不露齿` so với `微笑`. Khung cuối: lộ răng không, mặt còn là người cũ không.
4. **Tay dừng trước khi chạm.** `指尖在信封上方停住` so với `拿起信封`. Crop tay: số ngón, vật đổi hình không.
5. **Thứ cấp có hướng.** Ghi hướng gió và lúc dừng, so với `头发飘动`. Tóc dừng sau thân không, nhấp nháy không.
6. **Thôi thúc bị kìm.** Toàn thân, một bản `他很生气`, một bản dòng "Giận, bị nén" ở §3. Che mặt trên strip: bản nào còn đọc ra giận, bản nào model phóng nét mặt.
