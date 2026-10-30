# Danh sách cảnh — r1 (80 BPM, 1 ô nhịp = 3 s, 30 fps, khoảng [start,end))

| ID | [s) | Ảnh | Người xem cảm gì | Camera (một chuyển động chính) | Vào → ra | Cue âm |
| --- | --- | --- | --- | --- | --- | --- |
| S1 | [0,3) | p2 | **Hook:** gương mặt nghiêng, tóc bay, ô cam — gió | Push-in chậm vào mặt | Khung 0 đã có voan phủ trước ống kính, trôi ra trong 1,8 s → voan thứ hai quét ngang 2,55–3,6, cắt **dưới voan** ở 3,0 | whoosh 0 · đàn gảy · whoosh 2,55 |
| S2 | [3,6) | p4 | Toàn cảnh sân điện, cô bước tới | Dolly-in | Lộ ra sau voan → hoà 0,3 s sang S3, khớp chiếc ô | — |
| S3 | [6,9) | p1 | Ngồi, ô nghiêng, nhìn thẳng máy | Truck trái → phải | cắt trên downbeat 9,0 | — |
| S4 | [9,12) | p5 | **Nghỉ:** tay lần chuỗi hạt (vòng tròn nhỏ) | Gần như tĩnh | cắt 12,0 | pad nhỏ lại, một nốt |
| S5 | [12,15) | p6 | Góc thấp, ngẩng lên | Tilt lên theo ánh mắt | cắt 15,0 | — |
| S6 | [15,18) | p7 | Cửa sổ tròn — chuẩn bị đỉnh | Push mạnh dần, **đậu** đúng lòng cửa sổ ở 17,55 | Iris: lòng cửa sổ thành khung tròn hé ảnh gương 17,55 → nở phủ khung 18,6 | chuông 17,55 |
| S7 | [18,24) | p3 | **Đỉnh + kết:** soi gương, bóng trong gương | Pull-out chậm | Chữ hiện 20,2–21,4 trên mảng trời trong gương, giữ tới hết | chuông 20,2 · pad tắt dần |

- **Motif vòng tròn:** ô (S1–S3) → chuỗi hạt (S4) → cửa sổ tròn (S6) → gương (S7). Mở bằng gió/voan, kết bằng phản chiếu.
- **Đỉnh:** một đỉnh lớn duy nhất ở 17,55–18,6 (iris). Nghỉ trước đỉnh: S4 (3 s) + nửa đầu S6 tĩnh.
- **Ngoại lệ cadence (MV chậm):** mỗi cảnh giữ 3 s, không thêm chuyển động trang trí.
- **Production:** mỗi ảnh thay bằng một clip image-to-video (prompt ở `production_prompts.md`); camera trong prompt **khớp** cột Camera; hiệu ứng voan, iris, chữ, grade, grain vẫn do code làm.
- Contact sheet: mỗi phách (0,75 s) một khung. Strip: 2,7–3,3 (voan) · 17,4–18,7 (iris).
