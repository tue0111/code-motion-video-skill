# Shot và coverage: chia một cảnh thành các khung để người xem không lạc

Dùng khi: viết shot list ở G0–G1; hai shot nối nhau mà người xem thấy "nhảy" hoặc không biết ai đang nhìn ai; cần chọn cỡ cảnh hay góc cho một beat; dàn hai người trở lên trong khung dọc.
Không dùng khi: cần chuyển động máy (xem `../../t1to9-film/references/camera-moves.md`); cần điểm cắt và nhịp (xem `editing.md`); cần bố cục trong một ảnh tĩnh (repo `t1-visual-knowledge`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Một shot trả lời một câu hỏi

Trước khi chọn cỡ cảnh, viết ra câu hỏi mà shot trả lời cho người xem. Cỡ cảnh là hệ quả. `[nghề]`

| Câu hỏi của người xem | Cỡ cảnh hợp | Vì sao |
|---|---|---|
| Đây là đâu, lúc nào, người này nhỏ hay lớn so với nơi này | Toàn cảnh rộng, người chiếm dưới một phần ba chiều cao khung | Mắt đọc nơi chốn trước, người sau |
| Người này đang làm gì bằng cả thân | Toàn thân hoặc từ gối lên | Thấy chân trụ và tay cùng lúc |
| Hai người này quan hệ thế nào | Trung cảnh hai người, từ hông lên | Thấy khoảng cách và hướng thân |
| Người này đang nghĩ gì | Cận từ ngực hoặc vai lên | Mắt và miệng đủ lớn để đọc trên điện thoại |
| Quyết định nằm ở đâu | Đặc tả mắt, tay, vật | Loại hết thứ khác ra khỏi khung |
| Cái gì vừa đổi | Insert vào vật | Bằng chứng, giữ đủ lâu để nhận ra |

Hai luật kèm theo:

- **Cỡ cảnh là mức thân mật.** Càng gần càng buộc người xem đứng về phía nhân vật. Để dành khung gần nhất cho beat quan trọng nhất của phim. Phim 30 s mà shot nào cũng cận thì không còn cú cận nào có sức. `[nghề]`
- **Trên điện thoại, mọi cỡ cảnh xích lại một nấc.** Mặt người trong toàn thân 9:16 chỉ còn vài chục điểm ảnh. Cảm xúc phải đọc bằng dáng ở cảnh rộng, bằng mặt từ cận ngực trở vào. `[suy luận]`

## 2. Góc và độ cao máy

| Vị trí máy | Người xem cảm thấy | Viết zh-CN | Rủi ro model |
|---|---|---|---|
| Ngang mắt nhân vật | Ngang hàng, trung tính | 机位与人物眼睛同高，平视 | Ít |
| Thấp hơn mắt, ngước nhẹ (ngang ngực hoặc hông) | Nhân vật vững, có sức | 机位在人物腰部高度，略微仰拍 | Cằm và mũi to ra, chân dài giả |
| Sát đất, ngước mạnh | Áp đảo, hoặc góc nhìn của vật nhỏ | 机位贴近地面，大仰角 | Phối cảnh chân méo, trời chiếm khung |
| Cao hơn mắt, chúc nhẹ | Nhân vật nhỏ lại, bị nhìn | 机位高于人物头顶，略微俯拍 | Đầu to thân nhỏ kiểu ảnh tự chụp |
| Thẳng đứng từ trên xuống | Bản đồ, hoa văn, số phận | 正上方垂直俯拍 | Người nằm bị vẽ thành đứng |
| Nghiêng trục ngang (Dutch) | Lệch, bất an | 画面水平线倾斜约十五度 | Model tự nắn thẳng lại |
| Qua vai người khác | Ta đứng cạnh người này nhìn người kia | 越过前景人物的肩膀拍摄，前景肩部虚化 | Vai che quá nửa khung dọc |
| Điểm nhìn nhân vật (POV) | Ta là người đó | 第一人称视角，画面下方可见自己的手 | Tay thừa, tay sai phía |

Chọn độ cao máy **một lần cho cả cảnh** rồi mới lệch có lý do. Độ cao máy nhảy lung tung giữa các shot cùng cảnh là dấu hiệu rõ nhất của ảnh sinh rời rạc. Ghi độ cao máy vào khối khoá chung của cảnh. `[suy luận]`

Góc ngước và chúc đổi quyền lực giữa hai người khi dùng **theo cặp**: A ngước lên B thì B phải chúc xuống A, cùng một độ nghiêng. Một bên ngước một bên ngang mắt thì người xem không ghép được hai shot vào một không gian. `[nghề]`

## 3. Trục 180° và hướng màn hình

Vẽ một đường thẳng qua hai người đang đối nhau, hoặc dọc theo hướng một người đang đi. Mọi vị trí máy của cảnh nằm **cùng một phía** đường đó. Giữ được thì A luôn nhìn sang phải khung, B luôn nhìn sang trái, và người xem tự dựng ra căn phòng. `[nghề]`

Với ảnh sinh, không có máy thật nên trục phải được viết ra thành chữ ở từng prompt:

| Cần giữ | Ghi vào từng 分镜 của cảnh | Dấu kiểm trên contact sheet |
|---|---|---|
| Hướng nhìn | 甲面朝画面右侧 / 乙面朝画面左侧 | Xếp hai khung cạnh nhau: hai người nhìn vào nhau, không nhìn cùng một phía |
| Hướng đi | 人物从画面左侧走向右侧 | Qua mọi shot của hành trình, người vẫn đi một chiều |
| Phía nguồn sáng | 光从画面左侧来 | Bóng mũi đổ cùng một phía ở mọi shot cùng cảnh |
| Phía của vật mốc | 窗户始终在人物身后右侧 | Cửa sổ, cửa ra vào, bàn không đổi bên |

Đổi hướng đi nghĩa là **quay về**. Nếu câu chuyện là đi tới một nơi, người phải giữ một chiều cho tới khi đến. Muốn đổi chiều mà không mang nghĩa quay về, chen một shot trung tính: người đi thẳng vào máy hoặc thẳng ra xa máy. `[nghề]`

Vượt trục có chủ đích dùng được khi quan hệ giữa hai người vừa lật: người đang bị ép trở thành người ép. Vượt đúng tại beat đó, một lần. `[nghề]`

**Luật 30°.** Hai shot liên tiếp cùng một chủ thể phải khác nhau rõ: đổi góc ít nhất khoảng 30°, hoặc đổi cỡ cảnh ít nhất hai nấc. Khác ít hơn thì chỗ cắt trông như khung bị giật. Với ảnh sinh, cách dễ nhất là đổi cỡ cảnh hai nấc và giữ nguyên trục. `[nghề]`

## 4. Đường nhìn (eyeline)

Người xem luôn nhìn theo mắt nhân vật. Ba việc phải khớp: `[nghề]`

1. **Nhìn rồi mới thấy.** Shot A: người nhìn ra ngoài khung. Shot B: thứ họ thấy. Thứ tự đảo lại (thấy trước, mặt sau) thì thành reaction, nghĩa khác: ta biết trước nhân vật.
2. **Độ cao đường nhìn khớp độ cao vật.** Nhìn lên thì shot sau máy ngước. Nhìn xuống bàn thì shot sau máy chúc. Sai độ cao thì người xem thấy hai shot ở hai nơi.
3. **Nhìn sát ống kính thì thân mật, nhìn xa ống kính thì ta quan sát.** Mắt lệch khỏi ống kính một chút là đối thoại bình thường. Nhìn thẳng ống kính là nói với người xem, chỉ dùng khi phim cần phá bức tường đó.

Viết đường nhìn bằng **đích**, không bằng hướng suông: `视线落在画面外右下方的手机屏幕上` tốt hơn `向右看`. Model vẽ mắt có hồn hơn khi mắt có vật để nhìn. `[suy luận]`

## 5. Các mẫu coverage cho phim ngắn

Phim 20–60 s không đủ chỗ cho coverage đầy đủ kiểu phim dài. Dùng các mẫu nén sau. Mỗi mẫu là một cụm 2–4 shot. `[suy luận]`

| Mẫu | Chuỗi shot | Dùng cho | Điều kiện từ lúc viết prompt |
|---|---|---|---|
| Vào cảnh | Rộng nơi chốn → trung người trong nơi đó → cận | Mở phim, đổi địa điểm | Ba shot cùng giờ, cùng phía sáng, cùng trang phục |
| Vào ngược | Đặc tả vật hoặc tay → cận mặt → rộng lộ nơi chốn | Mở bằng câu hỏi, hợp giây đầu của phim dọc | Vật ở shot 1 phải còn trong shot rộng |
| Nhìn và thấy | Cận người nhìn ra ngoài khung → thứ được thấy → cận người đổi nét mặt | Khoảnh khắc nhận ra | Đường nhìn khớp độ cao; shot 3 khác shot 1 ở một chi tiết đọc được |
| Đối nhau | Cận A nhìn phải → cận B nhìn trái → hai người chung khung | Hai người, không thoại | Giữ trục; cùng cỡ cảnh cho A và B trừ khi muốn lệch quyền lực |
| Việc đang làm | Trung người làm → insert tay và vật → cận mặt | Nghề, nấu, viết, sửa | Tay trong insert khớp tay áo, đồng hồ, móng |
| Đi tới | Sau lưng đi vào → chính diện đi tới → nơi đến | Hành trình | Giữ một chiều đi; shot chính diện là shot trung tính |
| Một shot dài | Một khung, người và máy đổi cỡ cảnh bằng di chuyển | Khi cần liền hơi | Rủi ro i2v cao; pilot trước |

**Bậc cỡ cảnh.** Đi từ rộng vào cận từng nấc thì êm, hợp nhịp chậm. Nhảy từ rộng thẳng vào đặc tả thì gắt, hợp điểm rơi. Chọn một trong hai cho từng chỗ cắt, đừng để ngẫu nhiên.

**Shot để thở.** Sau cụm cận, cho một khung rộng hoặc một khung không người (trời, tay nắm cửa, mặt nước). Nó cho mắt nghỉ và báo đổi đoạn.

## 6. Dàn người trong khung (blocking)

- **Khoảng cách là quan hệ.** Hai người cách nhau bao xa, ai quay thân về ai, ai cao hơn trong khung. Viết ba thứ đó trước khi viết nét mặt. `[nghề]`
- **Tam giác cho ba người.** Ba đầu ở ba độ cao khác nhau (đứng, ngồi, cúi). Ba đầu thẳng hàng thì thành ảnh thẻ. `[nghề]`
- **Chiều sâu thay chiều ngang.** Khung dọc không đủ rộng để hai người đứng cạnh nhau thoải mái. Xếp theo chiều sâu: một người gần máy lệch một bên, người kia xa hơn lệch bên còn lại. Người gần mờ hay người xa mờ là lựa chọn ai quan trọng. `[suy luận]`
- **Di chuyển đổi quan hệ.** Một người bước tới, quay lưng, ngồi xuống, đi ra khỏi khung. Mỗi beat của cảnh nên có một lần đổi vị trí như vậy thay vì đổi nét mặt. Với i2v, đây là hành động chính của clip. `[nghề]`
- **Để trống phía trước hướng nhìn.** Người nhìn sang phải thì đứng lệch trái khung. Dồn người sát mép phía họ đang nhìn tạo cảm giác bị chặn, chỉ dùng khi muốn đúng cảm giác đó. `[nghề]`

Câu mẫu cho hai người theo chiều sâu:

```text
前景：甲站在画面左侧靠近镜头，侧身，肩部和后脑虚化。
中景：乙站在画面右侧三步之外，正面朝向甲，全身清晰。
两人之间留出一条空的走廊地面，光从乙身后的窗户照来。
```

## 7. Riêng cho khung dọc 9:16

| Việc | Khung ngang làm thế nào | Khung dọc làm thế nào |
|---|---|---|
| Hai người đối nhau | Hai bên trái phải | Xếp chiều sâu, hoặc người đứng người ngồi để chồng theo chiều cao |
| Tả nơi chốn | Lia ngang | Tầng theo chiều cao: nền đất, người, kiến trúc, trời |
| Khoảng trống hướng nhìn | Bên trái hoặc phải | Hẹp, nên dùng hướng nhìn lên hoặc xuống để có chỗ trống |
| Vật quan trọng | Bất kỳ đâu | Tránh 15% trên cùng và 20% dưới cùng: giao diện ứng dụng che |
| Đi qua khung | Trái sang phải | Quãng ngắn; hợp hơn là đi vào sâu hoặc đi về phía máy |
| Cận mặt | Mặt lệch một phần ba | Mặt ở một phần ba trên, phần dưới cho vai, tay hoặc vật |

Khung dọc mạnh ở dáng đứng, cầu thang, cửa, cây, mưa rơi, thứ gì có chiều cao. Yếu ở đường chân trời rộng và ở hai người ngồi cạnh nhau. Khi G0 có cảnh thuộc nhóm yếu, đổi cách dàn ngay ở shot list, không đợi tới lúc ảnh ra. `[suy luận]`

## 8. Ghi vào shot list

Mỗi shot thêm bốn ô ngoài nội dung, để người viết prompt không phải đoán:

```text
S4 · câu hỏi: cô ấy thấy gì? · cỡ: cận ngực · máy: ngang mắt, phía trái trục
     · nhìn: xuống phải, vào tin nhắn · nối: S3 (rộng, cùng trục) → S4 (nhảy hai nấc) → S5 (insert màn hình, máy chúc)
```

Khối khoá chung của một cảnh (dán vào mọi 分镜 của cảnh đó):

```text
本场统一：机位高度与人物眼睛同高；甲始终面朝画面右侧，乙始终面朝画面左侧；窗户在画面左后方，光从左侧来；时间为傍晚。
```

## 9. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Hai shot đối thoại, hai người nhìn cùng một phía | Không ghi hướng mặt | Ghi 面朝画面左侧 / 右侧 ở từng shot; nếu ảnh đã có, lật ngang một ảnh khi không có chữ hay chi tiết lệch bên |
| Chỗ cắt giật như lỗi | Hai shot gần giống cỡ và góc | Đổi một shot đi hai nấc cỡ cảnh |
| Người đi tới mà như đi về | Đổi chiều giữa hai shot | Giữ một chiều, hoặc chen shot đi thẳng vào máy |
| Không biết nhân vật nhìn gì | Thiếu shot "thấy", hoặc sai độ cao máy | Thêm insert đúng độ cao đường nhìn |
| Cả phim phẳng, không điểm rơi | Mọi shot cùng một cỡ | Vẽ dải cỡ cảnh theo thời gian; giữ khung gần nhất cho đúng một beat |
| Phòng mỗi shot một kiểu | Không có khối khoá chung của cảnh | Viết khối 本场统一, dán vào mọi shot |
| Vai tiền cảnh che hết khung dọc | Qua vai kiểu khung ngang | Hạ máy, cho vai chiếm một góc dưới, hoặc bỏ qua vai, dùng cận sạch |
| Mặt nhỏ không đọc được trên điện thoại | Toàn thân trong 9:16 | Vào một nấc, hoặc chuyển cảm xúc sang dáng |

## 10. Hàng chờ thử

1. **Trục bằng chữ.** Sinh hai cận A và B với 面朝画面右侧 / 左侧. Nhìn: xếp cạnh nhau có ra hai người đối nhau không, model có giữ đúng phía không.
2. **Khối khoá chung của cảnh.** Sinh ba shot cùng cảnh, một lượt có khối 本场统一, một lượt không. Nhìn: phía cửa sổ và phía bóng có giữ không.
3. **Nhảy hai nấc so với một nấc.** Dựng hai bản của cùng chỗ cắt. Nhìn ở tốc độ thật: bản nào giật.
4. **Hai người theo chiều sâu trong 9:16.** Dùng câu mẫu mục 6. Nhìn: model có giữ người gần ở mép và người xa rõ không, hay kéo cả hai ra giữa.
5. **Đường nhìn có đích so với hướng suông.** Cùng một cận, một bản `向右看`, một bản có vật đích. Nhìn: mắt bản nào có tiêu điểm.
6. **Vào ngược ở giây đầu.** Mở phim bằng đặc tả thay vì toàn cảnh. Hỏi Tuệ sau khi xem: giây thứ 5 có muốn xem tiếp không.
