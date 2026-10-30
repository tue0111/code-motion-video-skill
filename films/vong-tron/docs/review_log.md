# Review — animatic_v1 (G2)

- Gate: **G2** (animatic tốc độ thật, nhạc tạm). mandatory_axes: A1, T3, T4. Protocol: tự soát khung + chủ phim xem.
- Revision: `index.html` r1, `scripts/temp_score.mjs` r1. 1080×1350, 30 fps, 24 s.
- Bản kiểm: `out/animatic_v1.mp4`, `out/check/sheet.png` (mỗi phách một khung), strip 2,7–3,3 và 17,4–18,7, still 0 / 22 / 23,9.
- Người chấm: Claude (model-estimate) — **chưa có điểm người**.
- execution_status: DONE · acceptance_status: **PENDING (chủ phim)**

## Bảng khán giả

| Trục | Ngưỡng | Điểm | Status | Ghi chú |
| --- | --- | --- | --- | --- |
| A1 Motif/cảm xúc ở giây 5 | 8 | — | UNTESTED | model-estimate: khung 0 đã có mặt nghiêng + ô cam + voan; cần chủ phim xem không tiếng |
| A2 Muốn xem hết / lưu | 8 | — | UNTESTED | |
| A3 Nhớ đúng | — | — | NOT_APPLICABLE | phim cá nhân, không thương hiệu (chờ chủ phim xác nhận) |

## Bảng thi công

| Trục | Ngưỡng | Điểm | Status | Bằng chứng |
| --- | --- | --- | --- | --- |
| T1 Quyền | 8 | — | UNTESTED | ảnh do chủ phim cung cấp; nhạc tự tạo |
| T2 Đọc được 360 px | 8 | — | UNTESTED | không có chữ; chưa test điểm neo ở 360 px |
| T3 Chuyển động/nhịp thở | 8 | — | UNTESTED | sheet + strip đã xem; một đỉnh (iris), nghỉ ở S4 |
| T4 Sync (đã nghe) | 8 | — | UNTESTED | cắt trên downbeat theo lưới; **chưa ai nghe** — model không nghe được |
| T5 Tái lập | 8 | — | TESTED | `render.mjs --verify 0,2.9,9.5,17.8,18.3,22` OK |

## Ba lỗi đã sửa trong vòng này

| # | Mốc | Bằng chứng | Tầng | Sửa | Kết quả |
| --- | --- | --- | --- | --- | --- |
| 1 | 17,4–18,7 | Iris: tâm vòng tròn nhảy từ vị trí cửa sổ sang giữa khung ở 18,0 | renderer | Camera S6 đậu đúng cửa sổ ở 17,55 (`ease` tới IRIS[0]); vòng nở lấy tâm từ cửa sổ thật | strip mới liền mạch |
| 2 | 2,7–3,3 | Voan quá mỏng, lộ cú cắt S1→S2 | style | Độ đặc voan lần quét ×2,2 | cú cắt nằm dưới voan |
| 3 | 20–24 | Chữ trắng đè lên tóc/mặt | copy/layout | Chủ phim chốt bỏ hẳn chữ | đã gỡ chữ và tiếng chuông 20,2 |

## Lỗi còn lại (biết trước, production xử lý)

- Ảnh tĩnh: người không cử động, chỉ có camera trôi → clip image-to-video thay thế.
- S2→S3 hoà 0,3 s: chiếc ô ở hai ảnh khác vị trí/cỡ nên "match" chỉ gần đúng.
- S7 giữ 6 s trên ảnh tĩnh hơi dài; clip 7 s sẽ có chuyển động thật.

## Kết luận vòng

- Phản hồi nguyên văn của chủ phim: _(chờ)_
- Quyết định: chủ phim chốt **không có chữ**. Còn chờ duyệt G2 (type, thứ tự, hook, nhịp) + duyệt ngân sách credit.
