# Màu và chỉnh màu: màu đi xuyên cả phim thế nào, và chỉnh màu hậu kỳ theo thứ tự nào

Dùng khi:
- Lập bảng màu cho phim 30 s trước khi viết prompt ảnh, để các shot sinh riêng vẫn ra một phim.
- Viết màu vào prompt ảnh của nhiều shot mà không bị mỗi ảnh một tông.
- Các clip i2v ghép lại bị nhảy nhiệt màu, độ đen, bão hoà, cần đo và khớp.
- Áp look, hạt, bloom, halation, vignette cho bản dựng; giao cho điện thoại.

Không dùng khi: cần màu trong MỘT ảnh (trục K4 ở `C:\Users\Admin\src\t1-visual-knowledge\system\02_KNOWLEDGE.md`, bảng mốc màu ở `system/10_CREATIVE_ALBUM.md` §5; đọc ở đó, file này không viết lại). Cần ánh sáng và hướng đèn thì sang file ánh sáng của `film-craft`. Cần ghép lớp thì `compositing-2.5d.md`.
Nhãn: xem `../SKILL.md`. Mọi câu prompt ở đây chưa thử.

## 1. Color script: màu theo đoạn của phim `[nghề]`

Color script là một bảng, mỗi beat một dòng. Viết trước G1, trước khi viết prompt ảnh. Ba việc phải có:

1. **Mỗi beat một dải 3 đến 5 màu**, và mỗi màu gắn vào một vật hoặc một nguồn sáng (không "tông xanh" suông).
2. **Màu đổi ở bước ngoặt của phim, không đổi giữa chừng một beat.** Đổi ở chỗ khác thì người xem thấy lỗi, không thấy ý.
3. **Một màu neo xuyên phim**: một vật (khăn, ô, đèn) hoặc một nguồn sáng giữ nguyên màu từ shot đầu tới shot cuối. Mắt cần một chỗ để so. Đây cùng ý với "vật mốc" của album ở `10_CREATIVE_ALBUM.md` §5, nhưng ở phim thì vật mốc phải còn nhận ra qua chuyển động và qua đổi sáng.

Mẫu cho phim 30 s, 4 beat (số giây chỉ để minh hoạ):

| Beat | Giây | Mức sáng | Dải màu và vật mang | Nguồn sáng (nhiệt màu) | Màu neo | Cảm giác phải có |
|---|---|---|---|---|---|---|
| Mở | 0 đến 7 | trung, hơi thấp | xám xanh của tường; be của áo; da tự nhiên | cửa sổ ngày nhiều mây, ~6500 K | khăn đỏ gạch, nhỏ, ở cổ | tĩnh, hơi lạnh |
| Dồn | 7 đến 17 | thấp dần | xanh chàm ở bóng; vàng đục của bóng đèn trong khung; khăn đỏ | đèn dây tóc ấm ~2700 K ăn vào nền lạnh | khăn đỏ | căng, hẹp lại |
| Rẽ | 17 đến 22 | cao vọt | trắng kem, vàng nắng; khăn đỏ rực nhất | nắng xiên ấm ~4500 K | khăn đỏ | bật ra |
| Kết | 22 đến 30 | trung, bão hoà thấp | be, xám ấm; da; khăn đỏ nhạt hơn một bậc | ánh chiều ~3800 K | khăn đỏ | lắng |

Cách dùng bảng:
- Màu đổi ở "Rẽ" phải khớp với một cú cắt hoặc một dấu nhấn trong `cut-grammar.md`. Nếu T1 to 9 chỉ nhấn 3 đến 4 chỗ cả phim, bước ngoặt màu nên trùng một trong các chỗ đó.
- Bảng ghi `group` luôn: các shot cùng điều kiện sáng cùng một group. Group này sẽ dùng lại ở mục 4 khi đo.

## 2. Viết màu vào prompt ảnh của cả phim `[suy luận]`

Model ảnh không nhớ shot trước. Nhất quán đến từ câu chữ lặp lại **đúng một cấu trúc** ở mọi shot.

| Tình huống | Làm gì | Viết vào prompt (zh-CN) | Dấu kiểm trên strip | Rủi ro |
|---|---|---|---|---|
| Màu neo | Gắn màu vào vật, lặp nguyên văn ở mọi shot có vật đó | `脖子上的砖红色围巾，粗针织，颜色在所有画面保持一致` | khăn cùng sắc ở mọi shot | khăn đổi sang đỏ tươi khi nền ấm hơn (đó là ánh sáng, không phải lỗi, nếu vẫn cùng họ màu) |
| Nguồn sáng | Ghi nhiệt màu và hướng, không ghi "ấm/lạnh" suông | `窗外阴天的柔和冷白光从左侧照入，色温约6500K` | bóng và da cùng một hướng ấm lạnh | số K model không hiểu chính xác, chỉ nghiêng về ấm hay lạnh |
| Ấm trên nền lạnh | Chỉ định một nguồn ấm, phần còn lại lạnh | `只有桌上一盏钨丝灯发出暖黄光，其余环境为深蓝灰阴影` | một điểm ấm, không phủ khắp | cả khung ngả cam |
| Da người | Luôn có một câu giữ da | `肤色自然，不偏灰不偏绿不偏橙` | da không xanh, không cam | phủ look làm da lệch |

Tránh:
- Tên look suông ("teal and orange", "phong cách phim cũ") làm màu trôi theo model. Muốn look thì tả bằng thao tác ở mục 5 và áp ở hậu kỳ, không nhờ model ảnh tự làm; look áp một lần ở hậu kỳ nhất quán hơn mười lần model đoán `[suy luận]`.
- Ghi màu cho cả phim vào từng prompt cùng một câu dài. Chỉ ghi màu của **beat chứa shot đó** và màu neo.

## 3. Thứ tự chỉnh màu hậu kỳ `[nghề]`

Chỉnh (correction) là sửa cho đúng. Tạo look (grade) là cố ý lệch khỏi đúng. Làm correction xong mới grade, không đảo.

| Bước | Làm gì | Nhìn gì | Hay hỏng |
|---|---|---|---|
| 1. Cân trắng | Đưa vật trung tính (tường xám, áo trắng) về a*, b* gần 0, trừ khi nguồn sáng ấm có chủ ý | Vùng xám trên vectorscope hoặc a*/b* gần 0 | cân trắng làm mất nắng chiều có chủ ý |
| 2. Phơi sáng | Chỉnh mức sáng trung bình, không bóp điểm đen/trắng | Trung vị L* của da trong dải hợp lý | kéo sáng làm bệt bóng |
| 3. Tương phản | Đường cong chữ S nhẹ quanh trung tông | Điểm đen và điểm trắng còn chi tiết | cháy sáng, bóng bị nuốt |
| 4. Bão hoà | Điều chỉnh sau tương phản (tương phản đổi bão hoà cảm nhận) | Màu neo không vượt họ màu | bão hoà đều làm da cam |
| 5. Look | Tách tông, nâng đen, giảm bão hoà chọn lọc, rồi mới hạt và bloom (mục 6) | So với khung gốc, cạnh nhau | look cắn vào da |

**Da người là mốc.** Sau mỗi bước, nhìn da. Da lệch xanh/xám/cam thì look sai, dù nền đẹp. Giữ da trong dải trước, rồi mới thả màu ở nền `[nghề]`.

## 4. Khớp các clip i2v sinh riêng `[suy luận]`

Mỗi clip i2v sinh độc lập, nên lệch giữa các clip cùng cảnh là chuyện thường. Lệch hay gặp (chưa đo trên clip của dự án):

| Dấu hiệu | Nguyên nhân có thể | Sửa bằng gì |
|---|---|---|
| Hai clip cùng cảnh, một ấm một lạnh | model dịch cân trắng theo nội dung | đo Δb*, sửa bằng `colorbalance` hoặc `colortemperature` ở clip lệch |
| Bóng nâng lên ở clip sau | model đẩy điểm đen | `curves` kéo điểm đen về cùng mức |
| Da cam hơn khi sáng hơn | đường cong tăng | giảm bão hoà vùng cam sau khi sửa phơi |

Đo bằng `skills/t1to9-film/scripts/film_qa.py color video.mp4 timeline.json`: in L*, a*, b*, saturation trung vị cho từng đoạn, so với mốc **nhóm**. Ngưỡng cảnh báo trong `skills/t1to9-film/references/qa.md`: |ΔL*|>5, |Δb*|>3, saturation lệch >15%. Chỉ là cảnh báo; đừng gọi Δb*=4 là ΔE=4.

Quy tắc khớp:
- Đặt `group` cho các shot cùng điều kiện sáng, rồi khớp trong nhóm. **Không ép cả phim về một trung bình**: nhóm ban ngày và nhóm đèn đêm phải khác nhau, đó là color script.
- Chọn một clip đại diện làm mốc nhóm, kéo clip khác về nó, không về trung bình.
- Lệch có chủ đích (bước ngoặt) thì ghi lý do vào timeline, như script đã nhắc.

## 5. Các look thường dùng, tả bằng thao tác `[nghề]`

Không gọi tên phim. Tả thế này để agent làm được và Tuệ duyệt được.

| Look | Thao tác | Dải liều ban đầu (chưa thử) | Hỏng thành |
|---|---|---|---|
| Phai, nhẹ | nâng điểm đen lên 3 đến 6%, hạ trắng 2%, bão hoà 85% | đen 0.04 | xám bẩn, da chết |
| Đêm lạnh có điểm ấm | bóng nghiêng xanh chàm, sáng nghiêng ấm nhạt, trung tông giữ | dịch bóng -0.05 đỏ, +0.08 xanh dương | hai mảng màu bệt |
| Bạc màu giữ bạc | giảm bão hoà 20 đến 30% đồng thời tăng tương phản | S 0.75, S-curve rõ | da xám |

## 6. Hạt, bloom, halation, vignette: thứ tự và liều `[nghề, liều là suy luận]`

Thứ tự áp (sau khi đã grade, trước khi nén cuối):
1. Nội suy độ phân giải (nếu clip 480p lên 1080p) **xong trước**.
2. Grade (mục 3 và 5).
3. Halation và bloom (mở rộng sáng ra từ vùng cháy).
4. Vignette rất nhẹ.
5. **Hạt cuối cùng**, ở độ phân giải giao. Hạt phủ trước nội suy sẽ bị phóng to thành đốm mờ, và hạt chung kích thước cho cả clip 480p và 720p làm lộ chênh độ phân giải.

| Hiệu ứng | Liều ban đầu | Rủi ro |
|---|---|---|
| Bloom | ngưỡng chỉ vùng >0.85, blur ~1.5% chiều cao, cộng 15 đến 25% | cả khung mờ |
| Halation | cùng vùng cháy, blur rộng hơn bloom, nhuộm đỏ cam, 20 đến 30% | đỏ ở mọi cạnh sáng |
| Vignette | tối góc 8 đến 15% | lộ vòng tròn |
| Hạt | biên độ 2 đến 4% (thang 255 thì 5 đến 10), nặng hơn ở bóng, nhẹ ở sáng | hạt nhấp nháy rối, ăn bitrate |

Hạt phải **đổi theo khung** (seed theo số khung) nhưng không đổi theo thứ tự render, để seek-safe: seed là hàm của chỉ số khung. Hạt cũng giúp chống banding (mục 7).

## 7. Giao cho điện thoại `[nghề; Rec.709 và sRGB đã kiểm web 2026-11-12]`

- Rec.709 và sRGB **chung màu gốc (primaries)**, khác đường cong truyền. Rec.709 là chuẩn mã hoá video; mức hiển thị 2.4 theo BT.1886 là mục tiêu màn hình, không nằm trong chính đường cong mã hoá. sRGB gần gamma 2.2. Lệch giữa hai thứ nhẹ, làm trung tông và bóng sáng hơn hoặc tối hơn, không tạo bậc.
- Phim giao: gắn cờ bt709, `yuv420p`, dải tv (limited). Không gắn cờ thì app có thể đoán sai và ra phim bạc hoặc cháy.
- Nền tảng nén lại bằng H.264 8-bit, nên **vùng tối phẳng bị bệt và gradient bị bậc (banding)**. Phòng:
  - hạt mịn phủ cuối (mục 6), giữ hạt trong bóng;
  - tránh gradient phẳng rộng (trời đêm trơn, tường một màu); nếu cần thì cho nó có kết cấu trong ảnh gốc;
  - không đẩy điểm đen quá thấp; để nền tảng không phải nuốt chi tiết;
  - giao CRF thấp hơn nền tảng cần, nhưng nền tảng vẫn nén lại.- Ngoài nắng, màn hình điện thoại át bóng sâu: đừng để thông tin quan trọng ở vùng tối nhất; xem thử một lần ngoài sáng `[suy luận]`.

## 8. Code: chỉnh màu bằng ffmpeg và Python

ffmpeg (đã viết theo cú pháp bộ lọc chuẩn; chạy thử trước khi dùng cả loạt):

```bash
# cân trắng bằng nhiệt màu, tương phản/bão hoà nhẹ
ffmpeg -i in.mp4 -vf "colortemperature=temperature=6000,eq=contrast=1.05:saturation=0.9" out.mp4

# đường cong: nâng đen 0.04, trắng 0.97, chữ S nhẹ giữa
ffmpeg -i in.mp4 -vf "curves=master='0/0.04 0.25/0.22 0.75/0.78 1/0.97'" out.mp4

# tách tông: bóng nghiêng xanh dương, sáng nghiêng ấm
ffmpeg -i in.mp4 -vf "colorbalance=rs=-0.04:bs=0.06:rh=0.05:bh=-0.03" out.mp4

# halation: lấy vùng cháy, blur, nhuộm đỏ cam, trộn screen
ffmpeg -i in.mp4 -filter_complex "[0:v]split[a][b];[b]curves=all='0/0 0.8/0 1/1',gblur=sigma=18,colorchannelmixer=rr=1:gg=0.35:bb=0.1[h];[a][h]blend=all_mode=screen:all_opacity=0.25" out.mp4

# hạt cuối, vignette nhẹ, gắn cờ 709
ffmpeg -i in.mp4 -vf "vignette=angle=PI/6,noise=alls=6:allf=t+u,format=yuv420p" -c:v libx264 -crf 16 -colorspace bt709 -color_primaries bt709 -color_trc bt709 out.mp4
```

`noise=allf=t` làm hạt đổi theo thời gian; `u` là đồng đều. Hạt ffmpeg không seed theo khung như ý muốn, nên trong pipeline render từng khung thì dùng Python.

Python/OpenCV, một khung (hạt seed theo số khung, nặng ở bóng):

```python
import cv2, numpy as np
def grade(bgr, idx, seed=7):
    f = bgr.astype(np.float32) / 255
    x = np.linspace(0, 1, 256)
    f = np.interp(f, x, np.interp(x, [0, .25, .75, 1], [.04, .22, .78, .97])).astype(np.float32)
    lum = f.mean(axis=2)
    f[..., 0] += (1 - lum) * 0.03                                     # bóng nghiêng xanh dương
    f[..., 2] += lum * 0.02                                            # sáng nghiêng đỏ
    f += (np.random.default_rng(seed + idx).normal(0, .02, lum.shape) * (1.2 - lum))[..., None]
    return (np.clip(f, 0, 1) * 255).astype(np.uint8)
```

## 9. Với 9:16 và phim ngắn

- Phim 20 đến 60 s chỉ chịu 3 đến 4 beat màu. Màu neo đặt ở vùng giữa-trên khung dọc, nơi mắt dừng. Vignette nhẹ hơn khung ngang. 5 giây đầu phải có màu neo và nguồn sáng chính.

## 10. Lỗi hay gặp và cách sửa

| Dấu hiệu | Nguyên nhân | Sửa bằng gì |
|---|---|---|
| Hai shot cạnh nhau nhảy nhiệt màu ngoài ý | khác nhóm sáng chưa khớp | gán `group`, khớp về clip đại diện, đo lại |
| Da cam sau khi tăng bão hoà | bão hoà đều | giảm bão hoà vùng cam, hoặc giảm bước 4 |
| Bóng loang thành bậc trên điện thoại | 8-bit, nén | hạt mịn, nâng đen nhẹ, tránh gradient phẳng |
| Look đẹp ở shot này, hỏng ở shot kia | look cắn vào da | giảm look, giữ da bằng mặt nạ da hoặc giảm liều |

## 11. Hàng chờ thử

1. Lập bảng màu cho một phim 4 shot, sinh 4 ảnh theo mục 2. Nhìn strip: màu neo có nhận ra ở cả 4 không?
2. Sinh cùng một cảnh 3 lần với câu nhiệt màu, đo `film_qa.py color`: Δb* giữa các lần là bao nhiêu?
3. Xem cùng bản trên điện thoại ngoài nắng, ghi mức bóng còn đọc được.
