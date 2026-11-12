# Lối hoạt hoạ: mỗi lối có dấu vân tay gì và viết thế nào để ra đúng lối đó

Dùng khi: chọn lối hình cho một phim hoặc một đoạn; viết ảnh khung đầu và prompt i2v cho phim hoạt hoạ; soi strip xem clip có trôi khỏi lối đã chọn không; trộn hai lối (thực và mơ).
Không dùng khi: cần chuyển động máy (xem `skills/t1to9-film/references/camera-moves.md`); cần khói, lửa, va chạm (xem `fx-animation.md`); dựng phẳng hoàn toàn bằng code (xem `skills/code-motion-video`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử. Mọi nhận định về cách model i2v phản ứng là `[suy luận]`.

## 1. Cách đọc các khối

Mỗi lối có cùng bảy dòng: **Dấu nhận** (mắt thấy gì trên một khung và khi chạy), **Nhịp** (on ones = mỗi khung một hình khác, on twos = giữ hai khung, on threes = giữ ba; ở 24 fps twos cảm nhận khoảng 12 hình/giây), **Màu và nét**, **Máy**, **Hợp**, **Prompt** (ảnh đầu, i2v), **Lỗi và code**.

Hai luật chung: lối nằm ở ảnh khung đầu trước, prompt i2v sau; ảnh sai lối thì prompt chuyển động không cứu được `[suy luận]`. Nhịp khung là một nửa của lối: cùng một nét vẽ, chạy mượt on ones thành "video lọc", chạy twos mới thành hoạ `[nghề]`.

## 2. Cel 2D vẽ tay đầy đủ (full animation) `[nghề]`

- **Dấu nhận:** nét viền kín, đậm nhạt đều, màu phẳng một lớp bóng; chuyển động có squash and stretch, overlap (tóc, vạt áo chậm hơn thân), anticipation rõ trước mỗi động tác.
- **Nhịp:** nhân vật chính on twos (cảnh diễn), on ones khi chạy nhanh hoặc xoay; nền thường đứng yên. Cảm nhận 12 đến 24 hình/giây, đổi theo cường độ.
- **Màu và nét:** bảng màu hẹp, nét tối màu thay vì đen, bóng cứng mép, không chuyển sắc mịn.
- **Máy:** pan, truck phẳng trên nền vẽ, zoom nhẹ. Tránh orbit quanh nhân vật (đòi hình khối).
- **Prompt:** ảnh đầu `手绘赛璐璐动画画面，清晰闭合的轮廓线，平涂色块加一层硬边阴影，背景为手绘水彩质感的画布，无渐变高光`; i2v `保持手绘赛璐璐风格，动作为隔帧绘制的节奏（每两帧换一幅画），人物先下蹲蓄力再起跳，头发与衣摆稍后跟随，线条粗细不变，不要三维光滑质感`.
- **Lỗi và code:** trôi sang 3D bóng (mép sáng, bóng mềm xuất hiện); nét rung hoặc dày mỏng thất thường; mất twos thành mượt giả (chuyển động nội suy liên tục). Sửa: thêm `不要平滑插帧`, rút clip 3 đến 5 s, hạ độ cứng của hành động. Code: lượng tử hoá `t` bằng `M.frameT(t, 12)` rồi vẽ SVG phẳng; chỉ làm được lối này nếu hình là hình học đơn giản (xem luật 2 của `t1to9-film`: code không vẽ vật thể trong phim từ ảnh sinh).

## 3. Anime kiểu hạn chế (limited) `[nghề]`

Không gọi tên hãng hay đạo diễn trong prompt. Tả kỹ thuật.

- **Dấu nhận:** nhiều giây là tranh tĩnh được giữ (hold) rồi pan hoặc zoom chậm; nhân vật phẳng, ít bước vẽ; nền vẽ tay chi tiết hơn nhân vật nhiều; ánh sáng hậu kỳ như tia sáng, lens flare, hạt, bokeh dán lên (compositing).
- **Nhịp:** twos hoặc threes (khoảng 8 đến 12 hình/giây), có đoạn hold dài. Động tác lớn đi bằng ít khung chủ chốt: smear (một khung nhoè kéo dài theo hướng đi), speed lines (vạch tốc độ), impact frame (một hai khung đảo màu hoặc trắng đen nét thô, xem `fx-animation.md` §10), bank (nghiêng cả khung hoặc nền khi nhân vật quay/rẽ).
- **Màu và nét:** nhân vật hai tông (màu nền, một bóng); nền nhiều tầng sắc độ; viền sáng tách nhân vật khỏi nền.
- **Máy:** pan trên nền rộng, parallax nhiều lớp trượt khác tốc, zoom nhanh vào hold, nghiêng khung (bank). Hợp 9:16 khi nền được vẽ dọc dài.
- **Prompt:** ảnh đầu `日系动画背景美术，细节丰富的手绘建筑与云层，人物为平涂两层阴影的扁平造型，逆光边缘光，空气中漂浮光尘`; i2v `画面以静态手绘为主，镜头缓慢横移，前景、人物、远景以不同速度错位滑动；人物仅头发与衣角小幅摆动，三帧一动，不要平滑过渡`.
- **Lỗi và code:** model làm mượt hold thành chuyển động liên tục (mất chất limited); nhân vật phẳng bị thổi phồng khối; nền "sống" đồng loạt. Sửa: viết rõ phần nào đứng yên (`背景静止`). Code: tách lớp rồi trượt bằng `M.project` với `cz` khác nhau; hold là giữ `t` bằng `M.frameT`; flash, hạt mịn, viền sáng được phép (ánh sáng), nhưng vạch tốc độ vẽ tay là vật thể, nên phải nằm trong clip sinh ra.

## 4. Cut-out và rig 2D (motion comic, paper cut) `[nghề]`

- **Dấu nhận:** bộ phận cứng xoay quanh khớp (cổ, vai, khuỷu), hình bộ phận không đổi dáng; mép giấy có bóng đổ mỏng, chồng tầng thấy độ dày; chuyển động giật nhẹ, cơ học.
- **Nhịp:** twos hoặc threes, easing đơn giản; hay có "đứng khựng".
- **Máy:** parallax nhiều tầng, trượt phẳng, pan trên khung tranh. **Hợp:** truyện cổ, tư liệu, chuyện cần tiết kiệm.
- **Prompt:** ảnh đầu `剪纸拼贴风格，各部件由分层纸片构成，边缘有细微锯齿与阴影，纸张纹理清晰`; i2v `纸片关节式动作，手臂绕肩关节摆动，部件形状不变形，层与层之间轻微滑动，两帧一动`.
- **Lỗi và code:** model làm bộ phận uốn dẻo như cao su, mất độ cứng của giấy. Đây là lối dễ dựng nhất bằng code nếu tách sẵn layer, nhưng layer là vật thể: dùng khi cả phim là phim code (skill `code-motion-video`), không trộn vào phim ảnh sinh.

## 5. Stop-motion `[nghề]`

- **Dấu nhận:** vật thật có khối, vân tay vật liệu (đất sét: dấu ngón, mặt bóng mờ; rối vải: sợi; giấy: mép), bề mặt rung nhẹ giữa khung (boil), chuyển động on twos, ánh sáng thật cỡ nhỏ (đèn nhỏ, bóng đổ cứng, độ sâu trường ảnh nông).
- **Nhịp:** twos là chuẩn (12 hình/giây); chạy on ones thì mượt quá, mất tính thủ công.
- **Máy:** thấp, sát mặt bàn, trượt chậm, macro; tránh trôi quá mượt. **Hợp:** chuyện nhỏ, ấm, kỳ quặc. Không có nét viền; nhiễu bề mặt đổi từng khung (boil).
- **Prompt:** ảnh đầu `定格动画场景，黏土捏制的角色，表面可见指纹与细小凹痕，微缩布景，小型灯具造成的硬阴影，浅景深`; i2v `定格动画节奏，两帧一动，角色表面纹理在帧间轻微抖动，动作幅度小且略显生硬，镜头静止或极慢推进，不要丝滑流畅`.
- **Lỗi và code:** model làm vật liệu thành da nhựa trơn; boil biến thành rung toàn khung (nhiễu video); chuyển động quá trôi. Sửa: `材质保持哑光`, giảm biên độ. Code: boil bằng dịch chuyển hạt mịn theo `M.rng(seed + frame)`, nhưng chỉ phủ hạt và grain lên clip sinh, không vẽ vật thể.

## 6. 3D cách điệu `[nghề]`

- **Dấu nhận:** khối 3D nhưng chuyển động stepped (giữ pose, không nội suy) on twos; toon shading (ánh sáng chia 2 đến 3 bậc, mép cứng); nét vẽ chồng lên 3D (viền đậm theo silhouette, nét nhấn ở nếp).
- **Nhịp:** twos cho thân, on ones cho máy (hoặc ngược lại có chủ ý); cảm nhận 12 hình/giây cho diễn xuất.
- **Máy:** dolly, orbit có parallax thật vì khối là thật. **Hợp:** hành động có chiều sâu.
- **Prompt:** ảnh đầu `三维渲染，卡通着色，光影分为两到三级硬边色阶，轮廓处叠加手绘黑色描边，纹理为手绘笔触`; i2v `角色动作为定格式隔帧摆姿，动作之间不做平滑过渡，摄影机缓慢环绕，描边粗细保持一致`.
- **Lỗi và code:** nét viền biến mất hoặc nhấp nháy; bóng trở về mềm (PBR). Sửa: giữ cụm `硬边色阶` trong cả ảnh đầu lẫn i2v. Code dựng toon 3D: dùng 2.5D `M.project` cho lớp phẳng; không dựng được khối thật.

## 7. Rotoscope và tranh vẽ phủ lên phim thật `[nghề]`

- **Dấu nhận:** chuyển động của người thật (trọng lượng, nhịp thở, bước chân) nhưng bề mặt là nét và mảng màu vẽ; nét viền nhảy nhẹ giữa các khung (jitter); màu đôi khi tràn ra ngoài viền.
- **Nhịp:** on twos hoặc on ones có jitter; chính jitter là chữ ký.
- **Máy:** theo máy quay thật, hợp cầm tay. **Hợp:** nhớ lại, mơ, độc thoại nội tâm.
- **Prompt:** ảnh đầu `真人动作描摹成手绘动画，粗细不均的铅笔轮廓线，色块略微溢出轮廓，纸面质感`; i2v `保持真人动作的重量感与呼吸节奏，轮廓线逐帧微微抖动，色块填充不稳定，两帧一动`.
- **Lỗi và code:** nét nhảy quá nhiều thành nhiễu; quay về ảnh thật (lọc rồi bỏ lọc giữa clip). Soi khung cuối so khung đầu.

## 8. Tranh động: màu nước, mực, sơn dầu, cắt giấy, tranh dân gian `[suy luận]`

- **Dấu nhận:** chất liệu đổi hình chứ không đổi vị trí: màu nước loang và khô mép, mực lan theo vân giấy, nét cọ sơn dầu để lại gờ, mảnh giấy cắt dịch lớp.
- **Nhịp:** on ones cho loang, twos cho cọ; chủ thể chuyển động chậm, ít. **Hợp:** đoạn thơ, ký ức; không hợp hành động nhanh.
- **Prompt:** màu nước `水彩动画，颜料在湿纸上缓慢晕开，边缘有水渍干痕，留白不上色`; mực `水墨在宣纸上缓缓洇开，浓淡层次由笔触决定`; sơn dầu `厚涂油画，笔触肌理可见，画面中的笔触缓慢流动`.
- **Chất liệu Việt `[suy luận]`:** tranh khắc gỗ dân gian (màu phẳng mảng lớn, nét đen dày, giấy điệp ánh vỏ sò), sơn mài (mặt bóng sâu, vàng bạc nạm, tối nhiều tầng), lụa (màu nhạt thấm, mép mềm). Chưa kiểm model có hiểu các từ này; thử ảnh đầu trước, ghi lại từ nào ra đúng.
- **Lỗi:** model hoá "ảnh có filter" thay vì chất liệu thật; loang không có hướng. Sửa: ghi nguồn loang (`从画面中心向外晕开`).

## 9. Pixel art và motion graphics phẳng

Việc của `skills/code-motion-video`: vẽ bằng code, `M.frameT`, bảng màu cố định. Trong phim ảnh sinh chỉ dùng khi cả đoạn đổi lối có chủ ý; i2v hay làm pixel nhoè khi nội suy `[suy luận]`.

## 10. Chọn lối theo chuyện và ngân sách `[suy luận]`

| Chuyện | Lối hợp | Ngân sách |
|---|---|---|
| Diễn xuất, hài | Cel đầy đủ | Đắt: hay trôi 3D, nhiều lượt chạy |
| Khí chất, nhạc, ít hành động | Anime hạn chế | Rẻ nhất, hợp 9:16 (hold và parallax) |
| Truyện cổ, tư liệu | Cut-out | Rẻ, mất sức sống nếu kéo dài |
| Ấm, nhỏ, lạ | Stop-motion | Vừa: boil dễ thành nhiễu |
| Hành động có chiều sâu | 3D cách điệu | Vừa: dễ mất nét viền |
| Nhớ, mơ | Rotoscope, tranh động | Vừa: nhịp khó giữ |

## 11. Giữ một lối xuyên suốt nhiều clip i2v `[suy luận]`

- **Khoá ở ảnh đầu:** mọi ảnh đầu cùng một khối phong cách (chép nguyên một đoạn, không diễn đạt lại), cùng bảng màu, cùng loại nét.
- **Câu khoá trong i2v:** mở prompt bằng `保持第一帧的画风、线条与色块不变，不转为三维或写实`.
- **Cái model hay tự làm mượt:** nhịp twos (thành on ones), hold (thành chuyển động), nét viền (thành mép sáng), mặt phẳng (thành khối). Khi soi strip, đếm số khung có hình khác nhau trên mười khung liền: nếu gần mười, mất twos.
- Clip dài hơn khoảng 5 s dễ trôi lối; khung cuối clip này làm khung đầu clip sau chỉ khi đã soi.

## 12. Trộn hai lối có chủ đích (thực và mơ) `[suy luận]`

Nguyên tắc: một ranh giới rõ, một lý do, một nơi chuyển. Cảnh thực quay/ảnh thực, cảnh mơ chuyển sang tranh động hoặc rotoscope; chuyển ở đúng một hành động kích (ngủ, nhắm mắt, soi gương). Không trộn lối trong cùng khung trừ khi mục đích là "vật mơ xâm nhập thực"; khi ấy chỉ một vật đổi lối. Hard cut là nền (xem `skills/t1to9-film/references/cut-grammar.md`); dấu nhấn chuyển lối tính vào 3 đến 4 dấu nhấn cả phim.

## 13. 9:16 và điện thoại

Nét viền mỏng mất khi nén: viền tối thiểu khoảng 1,5% chiều ngang `[suy luận]`. Hold dài đọc tốt trên điện thoại, chi tiết nền nhỏ thì không. Vẽ nền dọc, đừng cắt từ nền ngang.

## 14. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Mép sáng, bóng mềm xuất hiện giữa clip | Trôi sang 3D | Thêm `平涂，硬边阴影，不要三维渲染` vào cả hai prompt |
| Nét viền rung, dày mỏng thất thường | Model không giữ nét giữa khung | Rút clip, bỏ chuyển động phụ, nét dày hơn ở ảnh đầu |
| Mười khung liền đều khác nhau | Mất twos | Viết `隔帧`, `不要插帧`; hạ biên độ |
| Hold biến thành trôi | Model tự làm sống | Viết rõ `背景静止` |
| Vật liệu thành nhựa | Mất vân tay | Nhấn `哑光`, `指纹` |

## 15. Hàng chờ thử

1. Cùng một ảnh đầu cel, i2v có và không có `隔帧`: đếm khung khác nhau trong mười khung liền.
2. Anime hạn chế: pan nền hai lớp khác tốc; nền có "sống" đồng loạt không.
3. Stop-motion có và không `两帧一动`; soi boil.
4. Câu khoá phong cách có và không, qua ba clip liền: lối có giữ không.
5. Từ chất liệu Việt (khắc gỗ, sơn mài, lụa) ở ảnh đầu: từ nào ra đúng.
