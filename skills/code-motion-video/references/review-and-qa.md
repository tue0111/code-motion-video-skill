# Review loop và QA trên MP4

### 10. Review loop — model không xem được video, nhưng xem được ảnh

Đọc code không thấy được chuyển động. Render và **mở ảnh ra nhìn thật**:
- **Contact sheet:** một khung mỗi beat chính (đầu/giữa/cuối mỗi shot) → hình dạng cả phim.
- **Strip:** mọi khung quanh chuyển cảnh và hành động nhanh (lượt quay, take, nhảy, ném) → thấy pop, snap, khung giữa chuyển cảnh xấu.
- **Crop full-res:** mặt, tay, điểm tiếp xúc, glow, chữ.
- Timing: sheet bước cố định 0,1–0,15 s, đọc theo thứ tự như người xem; đếm số khung mỗi read nhận được.
- Ghép sheet bằng ffmpeg `tile` (`-vf scale=480:-2` rồi `-filter_complex tile=4xN`).

Checklist khung:
```
[ ] Chữ đọc được ở cỡ điện thoại      [ ] Không phần tử nào vượt safe area
[ ] Asset sản phẩm thật, không bịa    [ ] Font + màu nhất quán giữa cảnh
[ ] Không khung giữa chuyển cảnh xấu  [ ] Cut và cue âm thanh rơi cùng lúc (phải NGHE, ảnh tĩnh không chứng minh được)
[ ] 2 giây đầu có hook thật           [ ] Khung cuối đủ mạnh làm poster
[ ] Có anticipation/follow-through    [ ] Không chuyển động tốc độ đều, không đối xứng máy móc
[ ] Điểm tiếp xúc chạm thật (chân-đất, tay-đạo cụ)   [ ] Không đoạn chết không có gì xảy ra
```

Prompt critic (tự áp dụng hoặc giao subagent):
```
Đừng mô tả ý định. Chỉ phán xét các khung đã render.
Tìm 3 lỗi lớn nhất. Mỗi lỗi: mốc thời gian/khung, bằng chứng nhìn thấy, tác hại, biến cần sửa, khung sẽ render lại.
Chỉ vá những đoạn đó rồi render lại đúng các khung bị ảnh hưởng.
```
Chấm điểm: hook, độ đọc, liên tục, chuyển động, đồng bộ âm thanh. Ghi mỗi vòng: phiên bản → khung → lỗi → biến → sửa → bằng chứng mới. Không dùng số dòng code làm thước đo chất lượng.


### 11. QA trên chính file MP4 (preview không đủ)

- `ffprobe` container + video + audio (duration các stream có thể khác nhau).
- Trích khung từ MP4 từng cái một (`ffmpeg -ss T -i out.mp4 -frames:v 1`) — render có thể khác snapshot (vd một `visibility: visible` lộ trên toàn video).
- Quét khung đen/trống: `-vf "scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-"`, YAVG < 20 là đáng ngờ.
- Quét khung đứng hình (diff khung liên tiếp) khi có video layer.
- Loudness: `volumedetect`; voice ~ −16 LUFS (`loudnorm`). Spot-check sync ở đầu/giữa/cuối.
- Khung đầu là cover được thiết kế, không đen (có thể thêm 1 s cover + 1 s lặng, nhúng `attached_pic`). Nhạc không bị cắt giữa câu.

