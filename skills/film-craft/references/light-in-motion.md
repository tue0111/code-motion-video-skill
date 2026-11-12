# Ánh sáng trong phim: giữ ánh sáng liền qua nhiều shot và cho ánh sáng chuyển động trong một shot

Dùng khi: viết 母版锁 và 分镜 cho một cảnh có nhiều shot cần cùng ánh sáng; xếp dòng giờ trong ngày cho cả phim ở G0; viết prompt i2v có nguồn sáng di chuyển (đèn xe, cửa mở, lửa); soi strip thấy ánh sáng nhảy giữa các clip.
Không dùng khi: đèn trên mặt trong một ảnh tĩnh, cỡ nguồn, suy giảm, catchlight, tiêu cự (xem `<T1_KNOWLEDGE>/system/11_LIGHT_AND_OPTICS.md`); sửa màu và grade (xem `color-and-grade.md`); chuyển động máy (xem `../../t1to9-film/references/camera-moves.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Ánh sáng có nguồn gốc (motivated)

Mỗi cảnh một nguồn chính thấy được hoặc suy ra được: cửa sổ, đèn bàn, màn hình, lửa, đèn đường. Mọi bóng khớp với nguồn đó. `[nghề]`

Hai lối: ánh màu có nguồn thật để biện minh (lọc cam giả ánh nến), hoặc luồng sáng màu bật lên không nguồn để nói cảm xúc thay diễn viên (Bordwell & Thompson, *Film Art*, page_label 150). `[sách]` T1 to 9 mặc định lối đầu; lối sau chỉ khi brief cho phép, theo điều kiện M05 ở `../../code-motion-video/references/film-grounding.md`.

| Tình huống | Làm gì | Viết vào prompt (zh-CN) | Dấu kiểm | Rủi ro |
|---|---|---|---|---|
| Nội cảnh ban ngày | Cửa sổ là nguồn chính, ghi phía | `唯一主光来自画面左侧的窗户，房间右侧较暗` | Bóng mọi vật đổ về phải | Model thêm đèn trần `[suy luận]` |
| Practical trong khung | Đèn có trong hình, đặt gần người | `桌上一盏台灯是画面中唯一的光源，光只照亮她的手和半边脸` | Đèn là chỗ sáng nhất, sáng giảm nhanh ra xa | Đèn cháy trắng mất hình chao `[suy luận]` |
| Nguồn ngoài khung | Ghi `画外` và việc của nguồn | `画外右侧有路灯，冷白光斜照在墙上形成窗框的影子` | Có bóng in hình nguồn | Model vẽ cả đèn vào khung `[suy luận]` |

Luật chung của `11_LIGHT_AND_OPTICS.md` vẫn đúng: ghi nguồn ở đâu, bóng rơi vào đâu.

## 2. Liên tục ánh sáng giữa các shot cùng cảnh

Cảnh hai phút trên màn hình có thể quay mất mấy giờ, và người quay phải giữ hướng nắng, độ dài bóng, nhiệt màu như chỉ hai phút trôi qua (Hall, *Understanding Cinematography*, page_label 173). Ánh sáng và màu lệch giữa các shot làm gãy liên tục, phòng dựng chỉ sửa được lệch nhỏ (Dancyger, *The Technique of Film and Video Editing*, page_label 405). `[sách]`

Với ảnh sinh còn nặng hơn: mỗi shot là một lần sinh độc lập, không có mặt trời chung. Cách giữ là **viết cùng một mô tả ánh sáng** vào mọi prompt của cảnh. `[suy luận]`

**Bốn thứ khoá cho mỗi cảnh** `[nghề]`:

1. **Hướng nguồn theo không gian**, không theo khung: `从窗户一侧`, không `从画面左侧`. Shot ngược thì nguồn sang phía kia khung.
2. **Nhiệt màu** của nguồn chính và của vùng tối.
3. **Tỉ lệ sáng tối**: vùng tối còn chi tiết hay chìm.
4. **Giờ trong ngày**: độ cao nguồn, độ dài bóng.

**Phiếu ánh sáng.** Viết một lần, dán nguyên văn vào mọi 分镜 của cảnh, cạnh 人物锁. Chỉ dòng `本镜方向` đổi theo góc máy.

```text
【光线卡 · 场景二 · 傍晚厨房】
主光：西侧窗户射入的低角度夕阳，暖橙色，光线穿过窗格在墙面和桌面投下长条形影子。
暗部：房间东侧由天空反射的冷蓝色微光填充，暗部仍能看清物体轮廓。
明暗：受光面与暗面反差明显，人物脸部一半受光。
实景光：灶台上方一盏未开的灯，不发光。
本镜方向：摄影机面朝窗户，人物处于逆光，头发边缘有暖色亮边。
```

Shot ngược cùng cảnh chỉ đổi dòng cuối: `本镜方向：摄影机背对窗户，夕阳从摄影机身后照亮人物正脸。` `[suy luận]`

Kiểm: xếp ảnh của cảnh cạnh nhau, che mặt, chỉ nhìn bóng. Mọi bóng chỉ về cùng một chỗ trong không gian.

## 3. Dòng ánh sáng cả phim

Giờ trong ngày là cấu trúc, không chỉ là nền. `[nghề]`

| Giờ | Ánh sáng | Hợp với beat | Viết (zh-CN) |
|---|---|---|---|
| Sáng sớm | Thấp, xanh xám rồi ấm dần, có sương | Mở đầu, chờ đợi | `天刚亮，冷灰蓝色的天光，地面有薄雾` |
| Trưa | Trên đầu, bóng ngắn gắt, hốc mắt tối | Phơi bày, ngột ngạt | `正午阳光从头顶直射，影子短而锐利` |
| Giờ vàng | Thấp, ấm, bóng dài, viền sáng | Ký ức, thân mật, cao trào ấm | `太阳贴近地平线，暖金色侧逆光，影子拉得很长` |
| Giờ xanh | Trời tím xanh đều, đèn phố vừa bật | Chuyển tiếp, buồn lặng | `日落后的蓝色时刻，天空深蓝，街灯刚亮起暖黄色` |
| Đêm | Chỉ nguồn nhân tạo và trăng | Riêng tư, nguy hiểm | Xem §5 |

Ở G0 `[suy luận]`:
- **Đổi ánh sáng ở bước ngoặt**, thường trùng drop của nhạc.
- **Hai đoạn liền nhau khác ít nhất một trục** (giờ, nhiệt màu, tỉ lệ sáng tối). Cả phim giờ vàng thì không giờ vàng nào đặc biệt.
- Beat sheet ghi mỗi beat một dòng giờ và nguồn chính.

## 4. Ánh sáng động trong một shot

Nguồn di chuyển là cách rẻ để shot tĩnh có sự kiện, và để lộ dần: thứ được rọi tới sau cùng là thứ người xem nhớ. `[nghề]`

| Kiểu | Viết cho i2v (zh-CN) | Dấu kiểm trên strip | Rủi ro `[suy luận]` |
|---|---|---|---|
| Đèn xe quét qua | `一束车灯光从画面右侧扫过墙面，依次照亮她的肩和脸，然后移出画面，房间恢复昏暗` | Vệt sáng đi một chiều, phòng trở lại như khung đầu | Cả phòng sáng đều lên, không có vệt |
| Cửa mở | `门缓缓打开，走廊的光在地板上铺开成一条逐渐变宽的光带，最后落到她脚边` | Dải sáng hình thang, mép thẳng | Model sinh người ở cửa |
| Lửa lập loè | `烛火轻微摇曳，脸上的光影随之轻轻晃动` | Dao động nhỏ, cùng nhịp trên mặt và tường | Sáng tối giật mạnh, mặt đổi |
| Đèn tàu chạy qua | `窗外列车驶过，车窗的光块一格一格掠过她的脸` | Ô sáng lặp đều, cùng hướng | Ô sáng đứng yên hoặc đổi hướng |
| Người đi qua vùng sáng tối | `她从阴影中走进窗前的一束光里，停在光中` | Mặt sáng lên khi vào vùng, không trước | Nguồn đi theo người |

Giữ cảnh: `场景布局、物体位置和人物面部保持与原图一致，只有光线变化`. Một shot một sự kiện ánh sáng; đổi sáng cùng lúc máy chạy mạnh thì model dễ vẽ lại cả cảnh. Lộ dần cần vật đã có sẵn trong tối ở ảnh gốc, không thì model bịa. `[suy luận]`

## 5. Đêm đọc được

Đêm giả bằng ngày dựa vào: vùng tối chiếm phần lớn khung, chủ thể ngược sáng hoặc sáng chéo trên nền tối, độ sâu trường ảnh nông; trời sáng trong khung làm lộ giả; trăng xanh là quy ước từ thời phim câm (Malkiewicz & Mullen, *Cinematography*, page_label 14). `[sách]`

Áp vào ảnh sinh và điện thoại `[suy luận]`:
- **Đêm phải có nguồn**: đèn đường, cửa sổ sáng, màn hình, lửa. Không nguồn thì ra đen kín hoặc xanh đều.
- **Chọn cái được rọi**, nền chìm, ghi mức sàn: `暗部仍能看清墙面纹理`.
- **Mức tối sau nén.** H.264 trên điện thoại xoá chi tiết vùng rất tối và gây sọc ở vùng tối chuyển dần (trời đêm, tường trơn). Đề nghị ban đầu, chưa đo: mặt L* từ 30, chi tiết cần đọc L* trên 10. Chốt ở pilot. Hạt mịn (`prompts.md` §B) che bớt sọc.
- Trăng: `冷白色月光` có nguồn, không `蓝色夜景`.

## 6. Khói, sương, bụi, mưa

Không khí có hạt làm tia sáng thành khối nhìn thấy. Không có hạt thì không có tia. `[nghề]`

| Thứ | Làm gì | Viết (zh-CN) | Dấu kiểm |
|---|---|---|---|
| Sương, khói mỏng | Nguồn ngược sáng sau sương | `窗外的光穿过室内薄烟，形成几道清晰的光柱` | Tia có mép, đi thẳng từ nguồn |
| Bụi trong nắng | Hạt nhỏ trôi chậm trong một vệt | `一束阳光里有细小的灰尘缓缓飘浮` | Hạt chỉ sáng trong vệt, tối ngoài vệt |
| Mưa | Ngược sáng mới thấy hạt mưa | `逆光中雨丝清晰可见，背景路灯照亮雨线` | Hạt mưa sáng nhất gần nguồn |
| Mặt ướt | Phản chiếu nguồn kéo dài theo phương dọc | `湿漉漉的路面倒映着街灯，倒影拉成竖长的光条` | Vệt phản chiếu thẳng dưới nguồn |

Tia sáng và vệt phản chiếu chạy dọc, hợp chiều cao khung 9:16. Sương, mưa hay nhấp nháy hoặc đổi mật độ trong i2v: máy chạy nhỏ, ghi `雾气浓度保持不变`. `[suy luận]` Thủ pháp không khí cho ảnh tĩnh ở skill `t1-atmosphere-devices`.

## 7. Ánh sáng và chuyển động máy

`[nghề]` trừ khi ghi khác.

- **Flare:** nguồn mạnh gần mép khung khi máy lia. Có nguồn trong khung thì flare là bằng chứng máy có thật; không nguồn thì là trang trí giả.
- **Đi ngược sáng:** máy tiến về nguồn, người thành silhouette dần, viền rõ dần: `摄影机缓慢推向窗户，人物逐渐变成剪影，头发边缘的亮边越来越明显`. `[suy luận]`
- **Bóng máy:** nguồn sau máy đổ bóng máy lên chủ thể. Ảnh sinh không có máy, nhưng model có thể vẽ bóng người lạ ở tiền cảnh: `前景没有任何人影`. `[suy luận]`
- **Nguồn đứng yên khi máy đi.** Hỏng dễ thấy nhất: orbit mà bóng xoay theo máy. `光源位置固定不动，影子方向不随镜头变化`. `[suy luận]`

## 8. Khớp ánh sáng giữa các clip i2v và grade

`[suy luận]`

- Mỗi clip i2v trôi ánh sáng riêng (sáng dần, ngả ấm, đổi tương phản), nên hai clip cùng cảnh có thể lệch dù ảnh gốc đã khớp.
- Thứ tự sửa: khớp ở ảnh bằng phiếu §2, chọn `usable` có ánh sáng ổn định, rồi mới grade.
- Grade sửa được nhiệt màu, độ sáng tổng. **Không** sửa được hướng nguồn, hướng bóng: lệch hướng thì sinh lại ảnh.
- Shot cùng phiếu đặt cùng `group`, chạy `film_qa.py color` (`../../t1to9-film/references/qa.md`). Grade chi tiết ở `color-and-grade.md`.

## 9. Riêng 9:16 và màn hình điện thoại

`[suy luận]`

- Xem ngoài trời, vùng tối và trung tối chập lại. Chủ thể đọc bằng tương phản cục bộ (mặt sáng trên nền tối), không bằng chi tiết trong bóng.
- Nửa dưới khung dọc bị giao diện app che. Vùng sáng của chủ thể đặt ở một phần ba giữa.
- Một nguồn nhỏ đặt cao trong khung dọc dẫn mắt từ trên xuống người.
- Phim ngắn không cho mắt kịp quen tối: đoạn đêm đầu sáng hơn đoạn đêm sau một chút.
- Soi bản dựng trên điện thoại ở nửa độ sáng màn hình.

## 10. Motion dựng bằng code

Mở rộng mục "Ánh sáng" trong `../../code-motion-video/references/motion-language.md`.

| Việc | Làm gì | Dùng |
|---|---|---|
| Một hướng đèn cả phim | Khai `LIGHT = {dir:[x,y,z]}` một lần; bóng, highlight, gradient đều đọc từ đó | Chỉ đổi ở bước ngoặt |
| Bóng tiếp xúc | Elip tối sát chân. Vật nhấc lên thì bóng nhỏ, nhạt, mờ hơn | Bóng là hàm của độ cao (`M.spring`, `M.kf`) |
| Highlight theo bề mặt | Vật xoay, đốm sáng đứng theo đèn, không dính vào vật | Góc giữa pháp tuyến và `LIGHT.dir` |
| Nguồn di chuyển | Vệt sáng quét là một gradient có vị trí theo `t` | `M.kf(t, …)`, không dùng `Math.random` |
| Lửa lập loè | Nhiễu có seed, biên độ nhỏ | `M.rng(seed)` hoặc `M.hash(i)` theo số khung |

Phim T1 to 9 vẫn theo luật 2 của `../../t1to9-film/SKILL.md`: code chỉ đổi ánh sáng trên hình đã sinh (vệt sáng, giảm sáng, grade), không vẽ đèn mới.

## 11. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Bóng chỉ về hai hướng trong cùng cảnh | Mỗi shot tự chọn nguồn | Phiếu ánh sáng §2 dán vào mọi shot |
| Shot ngược mà nguồn vẫn bên trái | Ghi hướng theo khung, không theo không gian | Ghi `从窗户一侧`, thêm dòng `本镜方向` |
| Cảnh đêm đen kín hoặc xanh đều | Không có nguồn | Thêm một practical và mức sàn tối |
| Vùng tối sọc màu trên điện thoại | Nén vùng tối chuyển dần | Nâng sàn tối, thêm hạt, tránh trời đêm trơn lớn |
| Clip tự sáng dần | Model trôi phơi sáng | Cắt `usable` sớm hơn, hoặc grade bù theo thời gian |
| Đổi sáng kéo theo đổi cảnh | Máy mạnh cộng sự kiện sáng | Một sự kiện mỗi shot, `只有光线变化` |

## 12. Hàng chờ thử

1. **Phiếu ánh sáng.** Ba shot cùng cảnh, có và không có 光线卡. Che mặt, nhìn bóng: cùng hướng không.
2. **Đèn xe quét.** Prompt §4 trên ảnh phòng tối. Strip 0,25 s: vệt đi một chiều, phòng trở lại như khung đầu không.
3. **Shot ngược.** Hai shot đối diện cùng phiếu, đổi `本镜方向`. Nguồn có sang đúng phía kia không.
4. **Sàn tối sau nén.** Cảnh đêm ở ba mức sáng mặt (L* 20, 30, 40), nén như bản giao, xem điện thoại ngoài trời. Ghi mức thấp nhất còn đọc mặt.
5. **Orbit.** Có và không có `光源位置固定不动`. Bóng có xoay theo máy không.
