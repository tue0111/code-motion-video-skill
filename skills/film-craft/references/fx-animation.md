# Hiệu ứng động: khói, lửa, nước, gió, tia, phép thuật và cú va chạm

Dùng khi: viết prompt i2v có khói, lửa, nước, gió, tia sáng, phép thuật; dựng một cú va chạm có nhịp; chọn hiệu ứng nào nằm trong clip sinh và cái gì code được làm; soi strip xem hiệu ứng có chết không.
Không dùng khi: cần lối hoạt hoạ chung (xem `animation-styles.md`); cần máy quay (xem `skills/t1to9-film/references/camera-moves.md`); cần gu cắt (xem `skills/t1to9-film/references/cut-grammar.md`).
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử. Mọi nhận định về cách model i2v phản ứng là `[suy luận]`.

## 1. Nguyên tắc chung `[nghề]`

- **Có nguồn, có hướng, có vòng đời.** Hiệu ứng sinh ra ở đâu, bay về đâu, tan khi nào. Hiệu ứng không nguồn là trang trí.
- **Hình lớn trước, chi tiết sau.** Khối khói/lửa/sóng đọc được ở 3 khung đầu; mịn và hạt đến sau. Chi tiết đến trước khối thì ra nhiễu.
- **Nhịp không đều.** Có đợt bốc, đợt lắng; đều quá thì là vòng lặp máy.
- **Phục vụ điểm nhìn.** Hiệu ứng nằm sau hoặc quanh chủ thể, không che mặt hay đạo cụ quan trọng. Tương phản với nền cao hơn chi tiết của nó.
- **Vòng đời ba pha:** sinh (0,1 đến 0,3 s), lớn (đỉnh), tan (dài hơn pha sinh, thường gấp 2 đến 4 lần). Tan đột ngột trông giả.

## 2. Khói và sương

- **Hình và vòng đời:** cột cuộn lên, nở rộng, loãng dần; sương nằm thành lớp, trôi ngang rất chậm. Khói bốc 2 đến 6 s mới tan.
- **Thật hay giả:** thật khi nở theo độ cao, mép loãng, có xoáy nhỏ trên xoáy lớn; giả khi đồng đều, mép sắc, trôi một khối.
- **Prompt i2v:** `薄烟从杯口缓缓升起，向上扩散并逐渐变淡，边缘不规则，随微风向右飘散`; sương `低处薄雾沿地面缓慢平移，近处较浓、远处较淡`.
- **Rủi ro `[suy luận]`:** khói thành vải mềm hoặc vòng lặp; sương đè mất khuôn mặt.
- **Code:** hạt có seed `M.rng(seed)`, mỗi hạt có `t0` sinh, bay `y = y0 - v*(t-t0)`, nở `r = r0 + k*(t-t0)`, mờ `alpha = 1 - (t-t0)/life`. Trường dòng: hướng gió là hàm của `(x, y, t)` (sin nhiều tần số), tính đóng theo `t`, không mô phỏng tích luỹ để seek an toàn. Hợp phim code; trong phim ảnh sinh, chỉ phủ lớp sương mờ cực nhẹ (xem §12).

## 3. Lửa, tia lửa, tàn

- **Hình và vòng đời:** lửa liếm lên, thót đầu, chao hai bên; tia lửa bắn ra theo parabol, sáng rồi tối trong 0,5 đến 1,5 s; tàn bay chậm, nhỏ dần.
- **Thật hay giả:** lõi sáng trắng vàng, vành cam, đỉnh đỏ; ánh sáng lên người đổi theo lửa (nhấp nháy không đều). Giả khi lửa như dán, mặt người không nhận ánh cam.
- **Prompt i2v:** `火焰向上跳动，焰心发白、外缘橙红，火光在人脸与墙面上不规则闪动；火星向上飞散后熄灭`.
- **Rủi ro:** lửa thành khí mềm; ánh lửa không rọi lên nền.
- **Code:** nhấp nháy ánh sáng `1 + 0.15*noise(t*9)` là ánh sáng, được phép; tia lửa `x = x0 + vx*dt, y = y0 + vy*dt + g*dt²/2`, mỗi tia có seed.

## 4. Nước: giọt, toé, gợn, mưa, sóng

- **Hình:** giọt rơi tăng tốc, va thành vành toé rồi gợn vòng ra ngoài (gợn 1 đến 3 s); mưa là vệt thẳng nghiêng theo gió, mặt nước nảy hạt; sóng là chu kỳ, đỉnh vỡ bọt.
- **Thật hay giả:** thật khi giọt tăng tốc, toé đối xứng không hoàn hảo, gợn tròn rộng dần mờ dần. Giả khi nước đều như gel, mưa là vệt song song lặp.
- **Prompt i2v:** `水滴落入水面，溅起细小水花，圆形涟漪向外扩散并逐渐变淡`; mưa `雨丝斜落，地面溅起细小水花，水洼里有扩散的涟漪`.
- **Rủi ro:** nước chảy ngược hoặc đứng; mưa thành nhiễu hạt.
- **Code:** gợn `r = c*(t-t0)`, `alpha = exp(-k*(t-t0))`; mưa là hạt có seed nghiêng theo một góc. Dùng khi phim code.

## 5. Gió trên tóc, vải, lá, cánh hoa

- **Hình:** tóc và vải chậm hơn thân (overlap), lắc theo đợt gió; lá và cánh hoa xoay trên quỹ đạo uốn, rơi chậm; đợt gió có đầu, có đuôi.
- **Thật hay giả:** thật khi mọi vật cùng chịu một hướng gió mà mỗi vật lệch pha; giả khi chúng đồng bộ hoặc ngược chiều nhau.
- **Prompt i2v:** `微风从左向右吹过，长发与衣摆同向飘动，幅度由小渐大再回落；几片花瓣顺风斜飘而过`.
- **Rủi ro:** tóc biến hình, cánh hoa sinh thêm ngoài khung; vải bơm phồng.
- **Code:** chỉ cho lớp hạt mịn bay qua (bụi, phấn); cánh hoa là vật thể, nên nằm trong clip sinh.

## 6. Bụi và hạt trong tia sáng

- **Hình:** hạt nhỏ trôi chậm, chỉ thấy khi vào vùng sáng; mỗi hạt xoáy riêng, sáng lên rồi tối khi ra khỏi tia.
- **Thật hay giả:** thật khi hạt nhiều cỡ, nhiều độ sâu (to nhoè gần, nhỏ rõ xa), tốc độ khác nhau; giả khi cùng cỡ cùng tốc.
- **Prompt i2v:** `光束中细小灰尘缓慢漂浮，只在光线范围内可见，大小不一，远处较小较清晰`.
- **Rủi ro:** hạt thành tuyết hoặc đom đóm; đổi cả cảnh sáng.
- **Code:** được phép (hạt mịn, ánh sáng): hạt có seed, nhân với mặt nạ tia sáng, `alpha` theo vị trí trong tia; giữ kích thước dưới 3 px ở 1080 rộng, mật độ thấp.

## 7. Sét, điện, tia năng lượng

- **Hình:** sinh tức thì (1 đến 2 khung), phân nhánh, chớp tắt 2 đến 4 lần trong 0,2 đến 0,5 s; tia năng lượng có lõi sáng, quầng, và vệt dư.
- **Thật hay giả:** thật khi toàn khung đổi sáng cùng lúc (nền bị rọi), có bóng đổ; giả khi chỉ là đường sáng lên hình.
- **Prompt i2v:** `一道闪电从天而降，瞬间照亮整个场景，人物与地面出现硬朗的阴影，闪烁两次后熄灭`.
- **Rủi ro:** sét thành rễ cây phát sáng, thời lượng kéo dài.
- **Code:** flash toàn khung `M.pulse` (chỉ một hai khung) và quầng được phép; đường sét là vật thể.

## 8. Ánh sáng phép thuật và hạt phát sáng

- **Hình:** nguồn sáng ở tay/vật, hạt toả ra rồi bay dạt; ánh sáng rọi lên mặt và vật gần. Sinh có kích (cử chỉ), tan có đuôi.
- **Thật hay giả:** thật khi có nguồn và rọi sáng lên môi trường; giả khi là sticker sao lấp lánh.
- **Prompt i2v:** `掌心亮起暖金色光点，光点向上缓缓飘散，映亮手指与脸颊，光芒由弱渐强再渐隐`.
- **Rủi ro:** tràn khung, mất mặt; hạt đứng yên.
- **Code:** quầng và rọi sáng (blend cộng, màu) được phép; hạt mịn có seed, `alpha = sin(pi*phase)`.

## 9. Vỡ, nứt, mảnh văng

- **Hình:** vết nứt lan từ điểm chạm theo nhánh, rồi vỡ; mảnh văng theo parabol, xoay, to chậm nhỏ nhanh; bụi theo sau.
- **Thật hay giả:** thật khi nứt có điểm khởi, mảnh to văng chậm; giả khi mảnh như tuyết hoặc vật tự tan.
- **Prompt i2v:** `玻璃从中心撞击点裂开，裂纹向外蔓延，碎片向外飞溅并旋转，随后落下，扬起少量灰尘`.
- **Rủi ro:** vật biến mất thay vì vỡ; mảnh phi vật lý.
- **Code:** không (vật thể); hit stop và rung máy xem §10.

## 10. Cú va chạm: chuỗi chuẩn `[nghề]` (số khung ở 24 fps là gợi ý `[suy luận]`)

| Pha | Khung | Việc | Prompt i2v / việc ở hậu kỳ |
|---|---|---|---|
| Chuẩn bị (anticipation) | 4 đến 12 | Lùi, co, hít | `先向后蓄力` |
| Tiếp xúc | 1 đến 2 | Chạm | `接触的瞬间` |
| Impact frame | 1 đến 2 | Đảo màu hoặc trắng đen nét thô | Hậu kỳ: chèn khung (flash là ánh sáng, được phép) |
| Hit stop | 2 đến 6 | Giữ hình, đứng khựng | Hậu kỳ: giữ khung, khai `hold` |
| Rung máy | 6 đến 12, tắt dần | Máy lắc, biên độ giảm theo hàm mũ | Hậu kỳ: `x = A*exp(-k*t)*sin(w*t)` |
| Bụi, dư chấn | 12 đến 36 | Bụi, mảnh, gợn | Trong clip sinh |

- **SFX:** âm chạm rơi đúng khung tiếp xúc (hoặc trước 1 khung); hit stop đi kèm ngắt tiếng 2 đến 4 khung rồi tiếng dư. Chi tiết nhịp âm xem `skills/code-motion-video/references/audio-timing.md`.
- **Impact frame có giá trị khi hiếm:** dùng với đúng cú đáng nhớ nhất, không mỗi cú đấm.

## 11. Biến hình và chuyển cảnh bằng hiệu ứng

Tan thành hạt, mực loang, cháy lan: mỗi cái chỉ khi nó là ý của phim (nhân vật tan thật, ký ức bị đốt). T1 to 9 chọn khác kiến thức chung: nền là hard cut, chỉ 3 đến 4 dấu nhấn cả phim (xem `skills/t1to9-film/references/cut-grammar.md`). Hiệu ứng chuyển cảnh tính vào số dấu nhấn đó. Không dùng một kiểu cho mọi cú cắt.

## 12. Lớp hiệu ứng trong phim từ ảnh sinh (luật 2 của `skills/t1to9-film/SKILL.md`)

Code không vẽ vật thể. Nghĩa là:
- **Nằm trong clip sinh:** khói, lửa, nước, tia sét, mảnh vỡ, cánh hoa, tóc bay, mọi thứ có hình dạng riêng.
- **Code được làm:** camera (rung máy, hold, dolly số), ánh sáng (flash cháy sáng, quầng, nhấp nháy ánh sáng), hạt mịn không phải đạo cụ (bụi, grain), màu, nhịp, âm.
- Flash cho dấu nhấn dùng màu kem như `cut-grammar.md`, không trắng tinh.
- Phim code-only (skill `code-motion-video`) không bị ràng buộc này, vẽ hiệu ứng bằng hạt có seed và hàm đóng theo `t` trong `skills/code-motion-video/lib/motion.js` (`rng`, `spring`, `track`, `pulse`).

## 13. 9:16 và điện thoại `[suy luận]`

Hiệu ứng nhỏ bị nén mất. Hạt cần cao tối thiểu khoảng 0,3% chiều cao khung (khoảng 6 px ở 1920); tia sáng, tia lửa cần tương phản với nền, nên đặt trên nền tối hoặc đối màu. Hiệu ứng nằm giữa khung hơn là hai mép. Ở 480p chi tiết mịn thành nhiễu: dồn vào ít hiệu ứng, to, có hình khối.

## 14. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Hiệu ứng lặp như gif | Không có đợt bốc và lắng | Viết `时强时弱`, rút clip |
| Hiệu ứng che mặt | Không đặt chỗ | Chỉ vị trí: `位于人物身后` |
| Ánh sáng lên người không đổi | Hiệu ứng không rọi | Viết rõ ánh sáng rọi lên mặt, tường |
| Vật biến mất thay vì vỡ | Model không hiểu vỡ | Mô tả điểm chạm, mảnh văng, rơi |
| Hiệu ứng tràn khung | Không đặt giới hạn | `局限于画面中央` |

## 15. Hàng chờ thử

1. Khói có và không `边缘不规则、时强时弱`: soi đợt bốc.
2. Hit stop: giữ 3 khung so với 6 khung ở hậu kỳ, nhìn ở điện thoại.
3. Hạt bụi trong tia sáng bằng code phủ lên clip sinh: nhìn có dính nền không.
4. Impact frame một khung so với hai khung.
5. Tia sét: có `照亮整个场景` thì nền có đổi sáng không.
