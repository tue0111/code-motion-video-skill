# Production design: thế giới trong khung nói gì trước khi nhân vật kịp làm gì

Dùng khi: viết G0 và cần chốt bối cảnh, đạo cụ, trang phục, bảng màu. Viết prompt ảnh gốc cho nhiều shot cùng một nơi. Hai shot cùng cảnh trông như hai căn phòng khác nhau. Khung đẹp nhưng không nói được nhân vật là ai.
Không dùng khi: cần ánh sáng (`light-in-motion.md`), chỉnh màu hậu kỳ (`color-and-grade.md`), cỡ cảnh và dàn người (`shot-and-coverage.md`), nơi chốn Việt và Đông Á cho một ảnh tĩnh (repo `t1-visual-knowledge`, `system/12`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Việc của thiết kế mỹ thuật trong phim 20–60 s

Phim dài có thoại để giới thiệu nhân vật. Phim này không có. Mỗi shot dài 1,5–4 s, nên bối cảnh phải trả lời xong ba câu trong hai giây đầu `[nghề]`:

| Câu hỏi | Thứ trả lời | Ví dụ viết được |
|---|---|---|
| Ai sống ở đây | Đồ vật có dấu dùng, cách sắp xếp, mức gọn hay bừa | Bàn học có chồng vở bọc ni lông, một cây bút hết mực vẫn cắm trong ống |
| Lúc nào | Giờ (hướng và màu nắng), mùa (áo, cây, quạt hay chăn), thời kỳ (đồ điện, chất liệu) | Quạt tai voi, lịch xé trên tường, nắng xiên qua song cửa |
| Chuyện gì vừa xảy ra hoặc sắp xảy ra | Một vật lệch khỏi trật tự của phòng | Hai cái ghế, một cái còn kéo ra. Vali mở trên giường |

Luật chọn: mỗi vật trong khung phải làm được ít nhất một trong ba việc trên. Vật chỉ để "cho đầy" thì bỏ, vì trên màn hình điện thoại nó thành nhiễu.

Màu, bối cảnh và đạo cụ không phải để trang trí cho đẹp mắt. Chọn từng thứ vì tác dụng kể chuyện của nó `[sách]` (LoBrutto, *The Filmmaker's Guide to Production Design*, page_label 96).

## 2. Bộ tài sản chủ: chốt trước khi sinh shot đầu tiên

Model ảnh sinh mỗi lần một thế giới mới. Không có tài sản chủ thì mỗi shot tự chọn phòng, áo và hướng nắng riêng. Lỗi này đã xảy ra ở một phim thật: xem `../../t1to9-film/references/case-montage-anime-39s.md` (các shot cùng "một căn phòng" ra mỗi ảnh một phòng, nhân vật đổi 5 kiểu váy).

| Tài sản chủ | Là gì | Dùng thế nào | Dấu kiểm |
|---|---|---|---|
| Tấm phòng chủ | Một ảnh toàn cảnh của nơi chốn, có đủ đồ đạc cố định, không cần người | Làm ảnh tham chiếu cho mọi shot cùng cảnh. Mô tả phòng trong prompt chép nguyên từ một đoạn khoá | Đặt các ảnh gốc cạnh nhau: cửa, rèm, bàn, ghế ở cùng phía, nắng cùng hướng |
| Tấm nhân vật và trang phục | Mỗi nhân vật một ảnh toàn thân, đúng bộ đồ của cảnh | Đoạn khoá trang phục đi nguyên văn vào mọi prompt | Cổ áo, tay áo, độ dài váy hay quần, kiểu tóc không đổi giữa các shot |
| Bảng màu | 3–5 màu có tên vật mang màu, kèm việc của từng màu (mục 6) | Viết tên vật mang màu vào prompt, không viết mã màu | Thu nhỏ strip còn 64 px cao: vẫn thấy cùng một bộ màu |
| Sơ đồ đồ đạc và đạo cụ | Danh sách vật cố định (ở đâu trong phòng) và vật sẽ được cầm, dời | Mỗi shot đối chiếu: vật cần cho hành động đã có trong ảnh gốc chưa | Không vật nào tự mọc hay biến mất giữa hai shot |

Đoàn phim thật cũng làm đúng việc này: mặt bằng dàn cảnh ghi mọi cửa, đồ đạc và đạo cụ, rồi tách thành sơ đồ đồ đạc và sơ đồ đạo cụ để từng bộ phận làm theo `[sách]` (LoBrutto, page_label 89). Bảng màu cũng chốt trước khi làm tiếp, có mẫu màu để cả nhóm cùng nhìn `[sách]` (LoBrutto, page_label 97).

Đoạn khoá mẫu, đặt ở đầu mọi prompt cùng cảnh:

```
场景锁：老式单元房客厅，左侧一扇木框窗挂白色纱帘，窗下一张两人布沙发，右侧靠墙一张木餐桌和两把椅子，地面是暗红色水磨石。下午四点的阳光从左侧窗户斜射进来。
服装锁：女生穿浅蓝色短袖衬衫和深灰色及膝百褶裙，白色短袜，黑色长发披肩。
```

`[suy luận]` Đoạn khoá giảm trôi nhưng không đủ một mình. Ảnh tham chiếu (tấm phòng chủ) mới là thứ giữ bố cục. Hai thứ dùng cùng nhau.

## 3. Không gian: phòng phải phục vụ hành động

| Tình huống | Làm gì | Viết vào prompt (zh-CN) | Dấu kiểm | Rủi ro |
|---|---|---|---|---|
| Nhân vật phải đi từ A tới B trong cảnh | A và B nằm cùng một mặt phẳng ngang khung, có lối đi trống giữa hai điểm. Không đặt một điểm ở tiền cảnh, một điểm ở hậu cảnh | 灶台在画面右侧，餐桌在画面左侧，两者之间是空的地面 | Vẽ được một đường thẳng từ A tới B mà không cắt qua vị trí máy | Đường đi băng qua máy thì model i2v xoay nhân vật ra phía ống kính |
| Cần chiều sâu trong khung dọc | Ba lớp: một vật tiền cảnh lấn mép dưới hoặc mép bên, nhân vật ở giữa, một nguồn sáng hoặc cửa ở xa | 前景是一截模糊的门框，中景是坐在桌边的女生，远处是亮着的窗 | Che lớp nào đi thì khung phẳng hẳn | Tiền cảnh quá lớn che mất tay và vật chính |
| Khung dọc 9:16 | Chọn kiến trúc có chiều đứng: cửa, cầu thang, hẻm, rèm dài, giá sách, cột | 窄长的楼梯间，扶手从画面底部向上延伸 | Đường dẫn mắt chạy dọc, không cụt ở giữa khung | Phòng rộng ngang bị cắt còn một mảng tường |
| Nơi chốn phải nhận ra ngay | Ba mốc neo: một kiến trúc, một vật dụng, một chất liệu bề mặt. Đủ ba thì thôi | 铁皮卷帘门，塑料红凳，水泥地上的雨水痕迹 | Người lạ nhìn một khung nói được "ở đâu" | Kê quá năm mốc thì model trộn và bỏ bớt ngẫu nhiên |
| Bối cảnh trống, lạnh | Thêm dấu người vừa ở đó: hơi nước, ghế lệch, đèn còn bật | 桌上一杯还冒着热气的茶，椅子被拉开 | Phòng không người vẫn có chuyện | Hơi nước và khói dễ thành hiệu ứng quá tay, xem `fx-animation.md` |

## 4. Đạo cụ: ba tầng và một luật cứng

| Tầng | Là gì | Số lượng cho phim 20–60 s | Cách viết |
|---|---|---|---|
| Vật mang chuyện | Vật mà nếu bỏ đi thì phim mất ý. Thường là motif của G0 | Một, nhiều nhất hai | Tả kỹ: chất liệu, màu, một dấu riêng (mẻ, phai, dán băng keo). Xuất hiện ít nhất ba lần, mỗi lần một trạng thái |
| Vật để tay | Thứ nhân vật cầm, khuấy, gấp, mở. Cho tay có việc và cho i2v một hành động nhỏ, rõ | Một vật mỗi shot | Viết vật và điểm tiếp xúc: tay nào, cầm ở đâu |
| Vật dựng không khí | Đồ đạc nền | Vừa đủ ba mốc neo ở mục 3 | Gộp trong đoạn khoá phòng, không tả lại ở từng shot |

Luật cứng, rút từ phim thật: **vật nào hành động cần thì phải có sẵn trong ảnh gốc.** Model i2v không được giao việc sinh vật mới giữa clip. Giao thì vật mọc ra sai chỗ, sai kích thước, hoặc đổi hình giữa chừng. Trước khi viết prompt i2v, đọc lại hành động và gạch từng danh từ: cái nào chưa có trong ảnh thì sửa ảnh trước.

Vật mang chuyện đổi trạng thái là cách kể rẻ nhất của phim không thoại `[nghề]`:

```
第一次：窗台上一盆刚浇过水的茉莉，叶子上有水珠。
第二次：同一盆茉莉，土面干裂，两片叶子发黄。
第三次：同一个花盆，空的，旁边放着一把小铲子。
```

Ba khung, không cần người, vẫn có thời gian trôi và có mất mát.

## 5. Trang phục

| Quyết định | Làm gì | Vì sao | Dấu kiểm |
|---|---|---|---|
| Hình bóng | Chọn bộ đồ có đường viền riêng: tay phồng, áo dài tà, mũ, khăn | Shot ngắn và cảnh rộng chỉ đọc được hình bóng | Tô đen nhân vật vẫn phân biệt được hai người |
| Tách khỏi nền | Áo khác nền về độ sáng trước, khác màu sau | Nén video và màn hình ngoài nắng ăn mất khác biệt màu trước | Chuyển khung sang xám: người vẫn nổi |
| Một cảnh một bộ | Khoá từng món: cổ, tay áo, độ dài, màu, giày | Model đổi kiểu váy giữa các lần sinh nếu chỉ viết "váy trắng" | Xếp các ảnh gốc cạnh nhau, soi cổ và tay áo |
| Vải cho chuyển động | Cần gió hay bước đi đọc được thì chọn vải mỏng, có tà. Cần đứng yên, nặng thì chọn vải dày | Vải là thứ i2v làm tốt và báo được hướng gió | Tà áo chuyển động trễ hơn thân nửa nhịp |
| Hoạ tiết | Trơn hoặc hoạ tiết to, thưa. Tránh kẻ nhỏ, chấm bi nhỏ | Hoạ tiết nhỏ nhấp nháy và trôi giữa các khung | Phóng to vùng áo ở ba khung liên tiếp |
| Đổi áo có nghĩa | Chỉ đổi khi phim đổi thời điểm, và đổi cho thấy rõ | Đổi nhẹ trông như lỗi liên tục | Người xem nói được "đây là hôm khác" |

## 6. Màu mang nghĩa

Bảng màu là thứ định nghĩa thế giới của phim, và có thể đổi hẳn khi câu chuyện sang một thế giới khác `[sách]` (LoBrutto, page_label 96). Với phim 20–60 s, làm ba bước:

1. **Chọn 3–5 màu, mỗi màu gắn với một vật và một việc.** Ví dụ: xanh áo đồng phục (hiện tại, thường ngày), vàng nắng chiều (ký ức), đỏ của một sợi dây buộc tóc (thứ sẽ mất). Tỉ lệ diện tích xem `../../code-motion-video/references/visual-hierarchy-631.md`.
2. **Giữ một màu để dành.** Màu mang ý chính không xuất hiện ở các shot mở đầu, hoặc chỉ là một chấm nhỏ. Tới payoff nó mới chiếm khung.
3. **Vẽ đường đi của màu theo đoạn phim**, song song với đường năng lượng ở G0. Ghi vào shot list: shot nào màu nào dẫn.

| Thủ pháp | Làm gì | Viết vào prompt (zh-CN) | Dấu kiểm |
|---|---|---|---|
| Màu theo người | Một nhân vật luôn mang một màu trên người hoặc vật đi kèm | 她始终系着一条红色发绳 | Màu đó có mặt ở mọi shot có nhân vật, không có ở shot khác |
| Màu lan dần | Diện tích màu chính tăng qua từng shot | 红色只出现在发绳上 → 红色的伞占画面三分之一 → 整面红墙 | Đo diện tích trên strip thu nhỏ: tăng đơn điệu |
| Đổi thế giới | Hai nơi hoặc hai thời điểm dùng hai bảng màu tách hẳn | 教室：灰蓝校服、白墙、绿黑板。回忆：暖黄的光、木色、橘色夕阳 | Thu nhỏ strip thấy rõ hai khối màu |
| Rút màu | Bối cảnh gần trung tính, chỉ một vật có màu bão hoà | 灰色水泥楼道里，只有一把黄色雨伞 | Mắt rơi vào vật đó ở khung đầu tiên |

Lượng một màu mạnh trên màn hình tăng thì độ căng tăng, giảm thì dịu lại. Đây là nhận định của tác giả sách từ kinh nghiệm dạy và làm nghề, không phải phép đo, nên dùng như một giả thuyết để thử `[sách]` (Bellantoni, *If It's Purple, Someone's Gonna Die*, page_label 92).

Hai cảnh báo:

- **Nghĩa của màu theo văn hoá và theo chính bộ phim.** Đỏ là hỉ sự và Tết ở Việt Nam, trắng có thể là tang. Sách phương Tây gán nghĩa khác. Nghĩa đáng tin nhất là nghĩa phim tự dựng: màu đi cùng điều gì ở lần đầu xuất hiện thì mang điều đó về sau `[nghề]`.
- **Màu của vật khác màu của grade.** File này lo màu nằm trên vật và bối cảnh, tức thứ phải đúng ngay trong ảnh gốc. Phủ tông ở hậu kỳ không tạo ra được một chiếc ô đỏ. Thứ tự: chốt màu vật ở đây, rồi mới sang `color-and-grade.md`.

## 7. Chất liệu và tuổi của vật

Đồ thật có tuổi. Tuổi là tính cách và là dấu của một đời sống. Bối cảnh phẳng về chất liệu thì trông giả `[sách]` (LoBrutto, page_label 111). Model ảnh lại mặc định ra đồ mới tinh, sạch, đối xứng `[suy luận]`. Sửa bằng cách viết **vết mòn có vị trí và có nguyên nhân**:

| Thay vì viết | Viết | Vì sao |
|---|---|---|
| 旧桌子 | 桌面靠近座位的一侧被磨得发亮，桌角有一块掉漆 | Mòn ở chỗ tay người chạm, không mòn đều |
| 老房子 | 墙脚有一圈返潮的水渍，窗框的绿漆起皮 | Ẩm đi từ dưới lên, sơn tróc ở chỗ nắng mưa |
| 旧书包 | 书包肩带接口处用不同颜色的线缝过 | Một vết sửa nói có người giữ gìn nó |
| 破旧的 (tính từ chung) | Một danh từ, một vị trí, một trạng thái | Tính từ chung cho ra bụi và rách rải đều như phim kinh dị |

Mỗi khung chỉ cần hai hoặc ba vết. Nhiều hơn thì thành nhà hoang.

Bộ chất liệu cũng là bảng màu thứ hai: chọn hai chất chủ và một chất đối (ví dụ gỗ và vải bông, đối với inox). Giàu nghèo, ấm lạnh của một nơi hiện ra qua chất liệu trước cả màu `[nghề]`.

## 8. Thời kỳ

Phim lấy bối cảnh quá khứ nên được nhìn từ một khoảng cách: hình quá nét, quá mới làm người xem thấy như người thời nay mặc đồ cổ đi dự tiệc `[sách]` (LoBrutto dẫn lời một nhà quay phim, page_label 111).

| Việc | Làm gì |
|---|---|
| Neo thời kỳ | Ba vật không thể nhầm thập niên: một đồ điện, một phương tiện, một kiểu chữ hoặc bao bì. Phim không chữ thì thay kiểu chữ bằng kiểu tóc |
| Gỡ vật lạc thời | Thêm vào phần phủ định: điện thoại thông minh, điều hoà treo tường, đèn LED trắng, biển quảng cáo in bạt |
| Nhìn từ xa | Máy tĩnh hoặc dolly chậm, không zoom. Độ nét dịu, tương phản thấp hơn cảnh hiện tại. Xem `lens-and-camera.md` |
| Tra hình thật | Trước khi viết, tra ảnh tư liệu của đúng nơi và đúng thập niên. Không dựng từ trí nhớ về phim khác |

Câu mẫu: `九十年代的南方小城家庭：显像管电视机，绿色铁皮暖水瓶，墙上挂着一本手撕日历。没有手机，没有空调，没有白色LED灯。`

## 9. Khi khung là 9:16 và phim chỉ 20–60 s

- **Một nơi chốn chính, nhiều nhất hai.** Mỗi nơi mới tốn một shot để người xem định vị. Phim 30 s không đủ tiền trả.
- **Vật mang chuyện phải đọc được ở cỡ ngón tay cái.** Thu khung còn 180 px ngang: còn nhận ra vật thì đạt.
- **Vùng an toàn.** Giao diện ứng dụng che khoảng 15 % trên và 20 % dưới. Vật mang chuyện và tay không nằm ở đó.
- **Ít vật hơn phim ngang.** Khung dọc hẹp, ba vật đã đầy. Chiều sâu lấy từ lớp trước sau, không từ dàn ngang.
- **Trần và sàn vào khung.** Khung dọc lộ sàn và trần nhiều hơn tường. Chất liệu sàn (gạch bông, xi măng, chiếu) thành mốc neo mạnh, nên chọn có chủ ý.

## 10. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Hai shot cùng cảnh ra hai căn phòng | Mỗi shot một prompt tả phòng riêng, không có tấm phòng chủ | Mục 2. Sinh lại từ ảnh tham chiếu chung, chép nguyên đoạn khoá |
| Áo, tóc đổi giữa các shot | Trang phục tả bằng một cụm chung | Đoạn khoá từng món ở mục 5 |
| Vật mọc ra hoặc biến mất trong clip | Hành động cần vật chưa có trong ảnh gốc | Luật cứng mục 4. Sửa ảnh trước, không viết lại prompt i2v |
| Nhân vật không đi tới được chỗ cần tới | Hai điểm nằm trước sau theo trục máy | Mục 3, dòng đầu. Dàn lại phòng trong ảnh gốc |
| Khung đẹp nhưng vô danh, như ảnh mẫu nội thất | Mọi vật mới và đối xứng, không có dấu người | Mục 1 (vật lệch trật tự) và mục 7 (hai vết mòn có nguyên nhân) |
| Phim rối màu dù từng khung đều đẹp | Không có bảng màu chốt, mỗi shot tự chọn | Mục 6. Nếu đã sinh xong thì kéo về bằng `color-and-grade.md`, nhưng màu vật sai thì phải sinh lại |
| Màu chính không còn sức ở payoff | Đã dùng hết từ shot đầu | Giữ màu để dành, mục 6 bước 2 |
| Cảnh quá khứ trông như chụp hôm qua | Thiếu mốc neo thời kỳ, hình quá nét, có vật lạc thời | Mục 8 |
| Bối cảnh nuốt nhân vật | Áo cùng độ sáng với nền, hoặc nền quá nhiều chi tiết | Chuyển xám để kiểm, đổi độ sáng áo, bớt vật |

## 11. Hàng chờ thử

1. **Đoạn khoá có giữ phòng không.** Sinh 4 ảnh cùng cảnh, hai ảnh chỉ dùng đoạn khoá, hai ảnh dùng đoạn khoá kèm tấm phòng chủ làm tham chiếu. Đếm số đồ đạc cố định đổi vị trí ở mỗi cặp.
2. **Vật mang chuyện ba trạng thái.** Làm chuỗi ba khung ở mục 4. Cho người chưa biết ý xem 3 s rồi hỏi "chuyện gì đã xảy ra".
3. **Màu để dành.** Dựng hai bản của cùng một phim: bản A màu chính có từ shot 1, bản B chỉ xuất hiện ở payoff. So khung nào được nhớ.
4. **Vết mòn có nguyên nhân so với tính từ chung.** Cùng một bối cảnh, một prompt viết `破旧的`, một prompt viết hai vết mòn có vị trí. So bằng mắt: bản nào trông có người ở.
5. **Đường đi ngang khung.** Hai ảnh gốc cho cùng một hành động đi từ A tới B: một bản A và B cùng mặt phẳng, một bản trước sau. Sinh i2v cả hai, đếm số clip nhân vật quay mặt ra máy.
6. **Kiểm cỡ ngón tay cái.** Thu mọi khung có vật mang chuyện còn 180 px ngang, ghi lại shot nào vật không còn đọc được.
