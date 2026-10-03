# Âm thanh, voice, beat grid

### 6. Âm thanh là đồng hồ của phim

- **Có lời dẫn:** làm voice trước, hình bám theo voice. Lấy timestamp từng ký tự/từ (ElevenLabs `convert-with-timestamps`; edge-tts theo từng câu rồi trim lặng; bản thu sẵn → Whisper/forced alignment, lưu ý sai tên riêng). Dựng `timeline.json` từ độ dài thật rồi mới animate. Giữ nguyên văn kịch bản người dùng (đặc biệt y tế/pháp lý).
- **MV:** bài hát là đồng hồ. Viết lời 1 dòng/ô nhịp, chốt tempo (khi 4/4 thật sự áp dụng: 1 phách = 60/BPM s, 1 ô = 240/BPM s; 96 BPM → 2,5 s/ô; 120 BPM → 2 s/ô). **Beat tracking trả beat ước lượng.** Trong `beats.py` hiện tại, `downbeats=beats[::4]` giả định 4/4 và beat đầu là phách mạnh; đây là ứng viên cần nghe xác nhận. Đo meter, phase và offset của file cụ thể; không mặc định offset dương 0,1–0,3 s. Pickup, đổi tempo hoặc section mới cần map riêng. Lấy `frame=round(t×fps)` từ thời gian gốc, không cộng frame đã làm tròn. Chưa có nhạc thì ghi UNKNOWN, không "đo" từ thể loại lo-fi. Bài trôi nhịp → căn từng đoạn. Bài ngắn hơn dự kiến → retime đoạn kết, không kéo giãn nhạc. Không đưa lời bài hát lên màn hình nếu phong cách cấm chữ — diễn tả ý.
- **Beat grid trước animation.** Khung/phách = fps × 60/BPM (120 BPM @ 60 fps = 30 khung/phách). Sự kiện chính khớp phách mạnh; chuẩn bị hơi sớm (vd khung 24), tiếp xúc + SFX đúng phách (khung 30), dư chấn hơi muộn (khung 33). Không phải phách nào cũng cần chuyển động. Tính từng mốc từ thời gian rồi làm tròn — đừng cộng dồn số khung đã làm tròn.
- SFX sinh ra từ chuyển động: tốc độ → whoosh, xung lực → impact, pop khi xuất hiện. BGM quản cảm xúc/đoạn; duck nhạc khi có lời. Nhắm mắt nghe phim: nếu âm thanh không có hình dạng riêng thì chưa xong.
- Nguồn: nhạc có license hoặc của người dùng, thư viện SFX, AI music (Suno…), hoặc tổng hợp bằng numpy/WebAudio offline.

