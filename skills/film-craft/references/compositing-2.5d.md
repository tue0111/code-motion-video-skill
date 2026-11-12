# Ghép lớp và chiều sâu giả: làm một ảnh phẳng có không gian

Dùng khi:
- Có một ảnh đẹp mà i2v hỏng hoặc quá đắt, cần cho nó chuyển động máy bằng code.
- Muốn animatic có parallax thật hơn Ken Burns trơn.
- Cần thêm sương, bụi, glow, tia sáng lên shot cho có không khí.
- Soi một shot ghép bị "dán": viền răng cưa, halo, lớp trượt sai tỉ lệ.

Không dùng khi: cần vật thể mới hoặc hành động của người (code không vẽ, xem mục 1). Cần liệt kê 46 chuyển động máy và khuôn prompt i2v thì `skills/t1to9-film/references/camera-moves.md`. Cần mô hình camera 2.5D bằng công thức thì `skills/code-motion-video/references/camera-moves.md` và `skills/code-motion-video/lib/motion.js` (`project`, `rng`, `kf`). File này không lặp lại các công thức đó. Màu và hạt: `color-and-grade.md`.
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Giới hạn cứng

Luật 2 trong `skills/t1to9-film/SKILL.md`: code không vẽ vật thể. Với ghép lớp, nghĩa là:
- Mọi điểm ảnh của vật thể phải đến từ ảnh hoặc clip đã sinh. Cắt, dịch, phóng, làm mờ, che khuất lớp ảnh có sẵn: **được**.
- Code chỉ **cộng** ánh sáng (glow, bloom, tia, sương dạng nhiễu), hạt và màu. Bụi và sương là nhiễu/độ sáng, không phải vật thể; hạt bụi dạng chấm sáng nhỏ mờ ổn, nhưng cánh hoa, lá, giấy, tàn tro có hình thì **không**.
- Lấp chỗ hở sau chủ thể bằng ảnh sinh ra (inpaint do model ảnh, mục 2), không bằng nét vẽ tay hay hình tạo bằng code.
- Lớp nào cũng phải truy được về một file ảnh/clip trong `shots.json`. `film_qa.py lint` bắt lớp không có nguồn.

## 2. Tách lớp một ảnh `[nghề]`

Năm tầng thông dụng, từ gần tới xa:

| Tầng | Là gì | Cách cắt | Hay hỏng |
|---|---|---|---|
| Tiền cảnh | vật gần máy, thường mờ (cành, mép bàn, vai người) | mặt nạ mềm, cạnh lông | cạnh cứng như dán |
| Chủ thể | người hoặc vật chính | mặt nạ chính xác, có tóc mịn | mất sợi tóc, viền sáng |
| Trung cảnh | cái quanh chủ thể | thường để cùng nền | |
| Nền | tường, phố, núi xa | phần còn lại | lộ lỗ sau chủ thể khi dịch |
| Trời | chân trời | cắt theo đường chân trời | cạnh nhà răng cưa |

**Lấp chỗ hở sau chủ thể.** Khi chủ thể dịch khác nền, phía sau lộ ra phần chưa từng có trong ảnh. Hai cách:
1. **Không lộ**: giữ quãng dịch nhỏ hơn bề ngang chủ thể mà nền che được (mục 3). Rẻ nhất.
2. **Inpaint**: dùng model ảnh vẽ phần sau, gửi ảnh nền đã xoá chủ thể kèm câu `移除前景人物，补全被遮挡的背景，保持原有光线、材质和透视，不添加新物体`. Chưa thử `[suy luận]`. Soi: phần bù có thêm vật mới không, cạnh có khớp không.

**Khi nào đáng ghép, khi nào để i2v làm `[suy luận]`:**

| Tình huống | Ghép lớp | i2v |
|---|---|---|
| Ảnh tĩnh đẹp, chỉ cần máy trôi nhẹ, người đứng yên | đủ, ít rủi ro | thừa, có thể đảo trạng thái đạo cụ |
| Cần người cử động, gió, vải, mặt | không làm nổi | bắt buộc |
| Cần dolly lớn hay orbit thật | lộ mép, sai phối cảnh | phù hợp hơn nhưng khó kiểm |
| Animatic G2 | làm nhanh để duyệt nhịp | không cần |
| Shot i2v hỏng nửa clip nhưng khung đẹp | cứu bằng ghép từ khung đẹp | sinh lại tốn |

## 3. Parallax: dịch theo độ sâu `[nghề]`

Nguyên tắc: máy đổi vị trí ngang một đoạn Δ, thì lớp ở độ sâu z dịch trên màn hình tỉ lệ **1/z** (gần dịch nhiều, xa dịch ít). Đây đúng với `project()` của motion.js: `scale = focal / (z − cz)`.

Quy đổi dùng được ngay cho 3 lớp (gần, giữa, xa), lấy lớp xa dịch 1 đơn vị:

| Lớp | z (đơn vị tuỳ ý) | Dịch tương đối |
|---|---|---|
| Tiền cảnh | 1 | ~4 |
| Chủ thể | 3 | ~1.3 |
| Nền | 8 | 0.5 |

Con số chỉ cần **đúng thứ tự và tỉ lệ**, không cần đúng vật lý. Người xem tin vì chênh, không vì độ chính xác.

**Quãng dịch an toàn trước khi lộ mép.** Mỗi lớp phải rộng hơn khung một lượng bằng quãng nó sẽ dịch (overscan). Với khung 1080 px:
- Lớp chạy xa nhất (tiền cảnh) dịch tối đa D px thì lớp đó phải rộng ít nhất 1080 + 2D.
- Thực hành: tổng dịch toàn cảnh của lớp xa dưới 2 đến 3% bề ngang; tiền cảnh 8 đến 12%. Quá thì thấy vết cắt ở chủ thể.
- Cộng thêm phóng to nhẹ cả lớp (3 đến 6%) làm overscan, và giữ scale đồng nhất để không lộ.

**Dolly giả khác zoom ở đâu.** Zoom toàn khung phóng mọi lớp cùng tỉ lệ, không có chênh, người xem thấy "phóng ảnh". Dolly giả phóng lớp gần nhanh hơn lớp xa (đổi `cz`), che khuất thay đổi. Với 3 lớp, dolly vào 4% làm lớp gần phóng ~6%, lớp xa ~2%. Đừng dùng `scale()` toàn khung để giả dolly (đã ghi ở camera-moves.md của code-motion-video).

## 4. Dấu hiệu chiều sâu cộng thêm `[nghề]`

Parallax một mình không đủ; cộng ít nhất hai dấu hiệu.

| Dấu hiệu | Làm bằng gì | Liều ban đầu | Rủi ro |
|---|---|---|---|
| Mờ theo độ sâu | blur riêng từng lớp: tiền cảnh 2 đến 4 px, nền 1 đến 2 px | nhẹ | blur làm bể cạnh chủ thể |
| Phối cảnh không khí | lớp xa sáng hơn, bớt tương phản, ngả màu của không khí | nâng đen 3 đến 6% cho lớp xa | xa như mờ phim |
| Che khuất | tiền cảnh che một phần chủ thể | che vừa phải | che mặt |
| Bóng tiếp xúc | mảng tối mờ ngay dưới chân/đáy vật, nhân mặt nạ | 20 đến 35% | bóng sai hướng đèn |
| Light wrap | rìa chủ thể nhận một chút màu sáng của nền sau | 5 đến 10%, 3 đến 6 px | viền trắng dày |
| Viền sáng | sáng hẹp ở cạnh phía đèn ngược | hẹp, mờ | thành viền trắng "xoá cắt" |

Câu prompt hỗ trợ khi sinh ảnh gốc để dễ tách (chưa thử): `前景有虚化的树枝，主体清晰，背景远处有淡淡的雾，三层深度分明，主体与背景明暗有区别`. Ảnh có tầng sâu và tương phản chủ thể nền sẵn thì tách dễ hơn `[suy luận]`.

## 5. Chuyển động máy giả `[nghề]`

| Kiểu | Cách làm | Tần số, biên độ gợi ý | Cảm giác |
|---|---|---|---|
| Rung tay cầm | tổng vài sin có seed trên dịch ngang/dọc và xoay nhỏ | 0.5 đến 2 Hz chính, thêm 4 đến 7 Hz nhỏ; biên độ 0.3 đến 0.8% bề ngang; xoay 0.1 đến 0.3 độ | máy người cầm |
| Trôi chậm | một chuyển động đơn điệu rất chậm | 1 đến 3% trong cả shot | lặng, quan sát |
| Thở | phóng thu rất nhẹ lặp ~0.2 Hz | 0.3 đến 0.6% | ảnh tĩnh còn sống |

Motion blur theo vận tốc: lấy mẫu con trong khung (sub-frame) trung bình vài vị trí quanh t. Blur chỉ cần khi vận tốc lớn (whip, rung mạnh); chuyển động chậm không blur, blur thừa làm mờ cả khung.

Với 9:16: rung dọc dễ gây say hơn rung ngang. Rung ngang chính, dọc nhỏ hơn.

## 6. Ghép lớp ánh sáng `[nghề]`

| Chế độ | Công thức | Dùng cho | Rủi ro |
|---|---|---|---|
| screen | 1 − (1−a)(1−b) | glow, bloom, tia sáng, sương sáng | cháy trắng |
| add | a + b | lửa, đèn rực, tia mạnh | cháy |
| multiply | a·b | bóng, vignette, tối góc | bẩn bóng |
| overlay | tuỳ a | tăng tương phản cục bộ, sương dày | đổi màu khó đoán |

Xếp từ thấp lên: nền, chủ thể, bóng (multiply), sương (screen, nhiều lớp), glow/tia (screen), bụi (screen, nhỏ), hạt, cuối cùng. Sương nhiều lớp: 2 đến 3 lớp nhiễu trôi **khác tốc độ**, lớp gần nhanh hơn, mờ hơn.

Hạt bụi: chấm mờ sáng, kích thước 1 đến 3 px, vài chục hạt, di chuyển theo độ sâu; dùng `rng` có seed của motion.js để vị trí là hàm thuần của t, không cần mô phỏng.

## 7. Ken Burns có chủ đích trên ảnh tĩnh `[nghề + suy luận]`

- Đủ khi: shot ngắn (dưới ~2.5 s), có nhạc dẫn, chủ thể không cần cử động (phong cảnh, đồ vật, chi tiết).
- Lộ là ảnh tĩnh khi: người trong khung đứng bất động hơn 1.5 s trong khi máy chạy; mặt nhìn thẳng ống kính; chuyển động quá đều (ease tuyến tính); chỉ zoom mà không có chênh lớp.
- Cách cứu: thêm lớp (tiền cảnh chuyển khác tốc độ), thở, một lớp sương trôi, hoặc để cut trước khi lộ.
- Trong animatic thì Ken Burns trơn là đủ; trong phim giao, ưu tiên i2v cho shot có người.

## 8. Code: parallax 3 lớp và rung máy có seed

Mọi giá trị là hàm thuần của t (seek-safe). JS dùng `window.M` của `motion.js`:

```js
// layers: [{img, z, overscan}]; z lớn = xa. Vẽ lên canvas ctx kích thước W,H.
const LAYERS = [ {img: sky, z: 8}, {img: mid, z: 3}, {img: fore, z: 1} ];
const F = 400;                                // "focal", tuỳ chỉnh tới khi tỉ lệ đúng

function noise1(t, seed) {                    // tổng sin pha theo seed, không trạng thái
  const r = M.rng(seed); let v = 0;
  for (const f of [0.7, 1.3, 5.1]) v += Math.sin(2*Math.PI*f*t + r()*6.28) * (f < 2 ? 1 : 0.3);
  return v / 1.6;
}

function draw(ctx, t, W, H) {
  const dolly = M.kf(t, [[0,0],[4,1]]);        // 0..1 trong 4 s
  const cx = (dolly - 0.5) * 0.06;             // truck ngang, đơn vị tuỳ chỉnh
  const shakeX = noise1(t, 11) * 0.006 * W;    // 0.6% bề ngang
  const shakeY = noise1(t, 23) * 0.003 * H;
  for (const L of LAYERS) {
    const s = 1 + 0.04 * dolly / L.z * 3;      // lớp gần phóng nhiều hơn
    const dx = -cx * F / L.z * W + shakeX;     // dịch ~ 1/z
    ctx.save();
    ctx.translate(W/2 + dx, H/2 + shakeY);
    ctx.scale(s * 1.08, s * 1.08);             // 1.08 là overscan
    ctx.drawImage(L.img, -W/2, -H/2, W, H);
    ctx.restore();
  }
}
```

Tham số là điểm xuất phát. Chỉnh bằng mắt trên strip.

Python/OpenCV cho một lớp:

```python
import cv2, numpy as np
def place(layer_rgba, dx, dy, s, W, H):
    M = np.float32([[s, 0, W/2 - s*W/2 + dx], [0, s, H/2 - s*H/2 + dy]])
    return cv2.warpAffine(layer_rgba, M, (W, H), flags=cv2.INTER_LANCZOS4,
                          borderMode=cv2.BORDER_TRANSPARENT)
```

Không dùng `BORDER_REFLECT` cho lớp (ra bóng ma gương, đã nêu ở cut-grammar). Alpha phải **premultiplied** trước khi warp để khỏi viền đen.

## 9. Với 9:16 và phim ngắn

- Khung dọc có ít bề ngang, nên truck lớn lộ mép nhanh. Ưu tiên dolly in/out và dịch dọc nhỏ.
- Parallax ngang trên khung dọc cần overscan lớn hơn tương đối: kiểm trước.
- Phim ngắn: một chuyển động chính cho mỗi shot, đừng chồng rung + trôi + thở cùng biên độ.

## 10. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Viền cắt răng cưa | mặt nạ cứng, không feather | feather 1 đến 3 px, premultiplied alpha, thử mặt nạ mềm hơn |
| Halo sáng quanh chủ thể | màu nền còn dính ở rìa mặt nạ | co mặt nạ 1 px, decontaminate màu rìa |
| Lớp trượt sai tỉ lệ | dịch không theo 1/z | sửa z, so với bảng mục 3 |
| Lộ mép trong khung | quãng dịch lớn hơn overscan | tăng overscan hoặc giảm quãng dịch |
| Bóng không khớp hướng đèn | bóng cộng không theo nguồn sáng | quay hướng bóng theo đèn chính của ảnh |
| Cả khung phẳng như cắt giấy | thiếu dấu hiệu sâu ngoài parallax | thêm blur theo lớp và phối cảnh không khí |
| Rung giật nhịp, không tự nhiên | nhiễu tần số cao biên độ lớn | giảm tần số cao, biên độ 0.3 đến 0.8% |
| Chữ/vật hiện ra từ lớp ghép | lớp không có nguồn | gỡ lớp, vi phạm luật 2 |

## 11. Hàng chờ thử

1. Tách 3 lớp một ảnh có sương, dịch truck 4% trong 3 s. Xem strip: có lộ mép không?
2. Cùng ảnh: dolly giả (lớp gần phóng nhiều) và zoom toàn khung. Nhìn chênh khi xem ở tốc độ thật.
3. Đo bao nhiêu overscan là đủ cho quãng dịch tiền cảnh 10% trên khung 1080×1920.
4. Rung có seed ở 0.3% và 0.8%: ngưỡng nào cảm giác "người cầm" mà không say.
5. Inpaint nền sau chủ thể bằng câu ở mục 2; kiểm phần bù có thêm vật mới không.
6. Ken Burns trơn so với ghép 3 lớp cùng ảnh trong animatic: có duyệt khác không?
