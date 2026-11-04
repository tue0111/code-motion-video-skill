# QA: máy báo dấu hiệu, người đóng cổng

Ngưỡng ở đây là mặc định đề nghị cho 24 fps, lấy từ báo cáo Astra §5. Chốt lại ở G2 nếu look cần. Có ba trạng thái: `PASS`, `FAIL` và `UNTESTED`. UNTESTED không phải là PASS.

Script: `python <skill>/scripts/film_qa.py <lệnh>`. Chạy bằng Python có cv2/numpy (`<PY312>`). Script tìm ffmpeg/ffprobe theo thứ tự: biến `FFMPEG`/`FFPROBE`, rồi thư mục trong biến `FFMPEG_DIR` (`<FFMPEG_DIR>`), rồi PATH.

## Bảng kiểm mỗi bản dựng (G4, G5)

| Kiểm | Lệnh | Ngưỡng |
|---|---|---|
| Vật thể vẽ bằng code, thẻ chưa duyệt, watermark | `film_qa.py lint timeline.json [--allow-card]` | 0 lỗi. `--allow-card` chỉ khi `approvals.md` có dòng G2 cho thẻ |
| Danh sách shot giữa hai bản | `film_qa.py diff old.json new.json [--ack id]` | 0 shot `required` bị mất mà chưa ack. Mọi thêm, bớt, đổi thứ tự, đổi giờ đều phải hiện trong báo cáo cho Tuệ |
| Đoạn nguồn dùng được | `film_qa.py ranges timeline.json` | 0 lần đọc ngoài `usable` hay quá độ dài clip. Giữ khung cuối chỉ hợp lệ khi có `hold: {reason, approved}` |
| Màu từng đoạn | `film_qa.py color out.mp4 timeline.json` | Cảnh báo khi trung vị lệch so với nhóm: \|ΔL*\|>5, \|Δb*\|>3, saturation >15%. Đặt `group` cho shot cùng điều kiện sáng |
| Loudness của MP4 (sau AAC) | `film_qa.py loudness out.mp4` | I = −14 ±1 LUFS, TP ≤ −1 dBTP. LRA chỉ để báo |
| Freeze | `film_qa.py freeze out.mp4` | Báo các đoạn ≥0,5 s. Grain và zoom che được việc khung bị giữ, nên luôn chạy kèm `ranges` |
| Contact sheet + strip chuyển cảnh | `tools/sheet.py` của phim | Mắt người xem |
| Nghe | Tuệ nghe trên tai nghe và loa điện thoại | `audio_review = UNTESTED` cho tới khi Tuệ ghi đã nghe đúng sha256 |

Thông số Lab: dùng ảnh float /255 với OpenCV để ra L* 0–100 và a*/b* thật. Với uint8 thì `L* = L×100/255`, `a* = a−128`. Đừng gọi Δb* = 4 là ΔE = 4.

## §i2v: soi từng clip trước khi dựng (G3)

1. Trích strip: 1 khung mỗi 0,25 s, cộng khung đầu và cuối. Thêm crop cận tay, mặt và đạo cụ ở độ phân giải gốc.
   `ffmpeg -i clip.mp4 -vf "fps=4,scale=270:-1,tile=8x2" -frames:v 1 review/<shot>_strip.jpg`
2. Kiểm theo thứ tự:
   - **Trạng thái đạo cụ** có giữ đúng như prompt không? Model hay đảo trạng thái: gấp thành mở, thêm vật mới.
   - **Danh tính:** có thêm người, đổi mặt hay lẫn A với B không?
   - **Tay:** số ngón ở các khung không bị che. Bị che thì ghi `unknown`, không ép đếm.
   - **Chữ:** có chữ nào hiện ra trên giấy, biển hay áo không?
   - **Chuyển động:** đúng một chuyển động máy chính không? Khung có giật không?
3. Ghi `usable: [a, b]` (giây nguồn) vào shot trong `shots.json`. Clip hỏng hết thì ghi lý do và đề xuất sửa prompt. Không retry khi chưa báo Tuệ.
4. Đổi `speed` thì tính lại: nguồn cần = `offset + (t_khung_cuối − t0) × speed`, với `t_khung_cuối = (ceil(t1×fps) − 1)/fps`. `ranges` tự tính việc này.

## Review mù (G4)

Xem MP4 ở tốc độ thật **trước** khi đọc lại lý do của chính mình. Ghi lỗi theo dạng `t=12.3s · shot · thấy gì · sửa biến nào`. Rồi mới đối chiếu với G0: câu hỏi giây 5 còn đứng không, motif có đổi nghĩa không, có cú cắt nào chỉ đẹp mà không có lý do không.

## §giao (G6)

- Ghi `sha256` 8 ký tự đầu của file giao vào `approvals.md`, kèm thiết bị Tuệ xem và nghe.
- Bản 1080×1920, 24 hoặc 30 fps, H.264 yuv420p, AAC 48 kHz. A/V lệch ≤ 1 khung.
- Chữ ký T1 to 9 chỉ ở cuối. Không có watermark. Khung 0 đầy và đang chuyển động.
- Sau khi giao, đề xuất bài học mới cho `case-*.md` hoặc `prompts.md` §C.

## Đề xuất sửa khi Tuệ hỏi "còn gì chỉnh không"

1. Xem lại theo từng beat, đo trước khi khẳng định (đo màu, đo loudness, kiểm khoảng nguồn, căn nhạc).
2. Nói rõ phần nào đã xong và không nên đụng.
3. Đề xuất vài sửa nhỏ, mỗi sửa có mốc thời gian và lý do gắn với motif hoặc nhạc. Ví dụ: tách hai shot gần giống nhau đứng liền, thêm một tiếng màn trập đúng drop vì motif là chụp ảnh.
