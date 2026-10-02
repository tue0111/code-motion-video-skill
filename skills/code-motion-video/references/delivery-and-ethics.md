# Biến thể tỷ lệ, đóng gói studio, prompt mẫu, chi phí và pháp lý

### 12. Biến thể tỷ lệ và đóng gói studio

- 16:9 và 9:16 là **hai composition khác nhau**, không crop. Giữ asset, câu chuyện, state; đổi layout: 9:16 ít phần tử hơn, chữ to hơn, phân cấp dọc; 1:1 chữ chặt hơn, hold ngắn hơn. Đổi thời lượng beat thì ghi vào shotlist. Contact sheet riêng cho từng tỷ lệ.
- Lưu quyết định thành file, không để trong chat:
```
motion-studio/
  brief.md          mục tiêu một câu + sự thật sản phẩm
  style-guide.md    palette, type, motion rules, mặc định bị cấm
  shotlist.md       beats, states, reads, timestamps, mục đích
  timeline.json     fps, beat grid, cue âm thanh (cùng hệ thời gian với hình)
  assets/           logo, màn hình, footage, âm thanh đã duyệt
  src/              composition seekable + code motion
  reviews/          contact sheet, strip, ghi chú lỗi
  out/              file xuất theo từng tỷ lệ
```
Video sau: thay brief + assets, giữ render contract, checklist review, cấu trúc giao. Agent đọc file để biết gate nào đã qua, thiếu artifact nào.
- Phim dài: chia theo chương/section (6–8 phần), cho subagent viết song song từ kit chung (CSS, rig, palette) + `WORKER-NOTES.md` chứa luật cứng (§8); storyboard tổng do agent chính giữ.


### 13. Prompt mẫu giao cho agent (production contract)

```
Bạn vừa đạo diễn vừa lập trình một motion film render bằng code.
Mục tiêu: phim [N] giây cho [sản phẩm/khán giả]. Người xem phải nhớ: [một câu].
Đầu vào: chỉ dùng asset và câu chữ đã duyệt; xem tham chiếu và viết style-guide.md;
  viết shotlist.md với timestamp, trạng thái vào/ra, mục đích, reads.
Build: chọn renderer và giải thích lý do; mọi khung seekable + deterministic;
  chuyển động, cue âm thanh, transition trên cùng một timeline; giữ source sửa được + lệnh render lặp lại được.
Gate: 1) đưa style guide + shotlist trước khi build  2) contact sheet trước full render
  3) chấm hook, độ đọc, liên tục, chuyển động, sync âm  4) sửa 3 lỗi tệ nhất, render lại các đoạn đó
  5) xuất 16:9 và 9:16 như hai composition riêng.
Giao: video, poster frame, contact sheet, source, danh sách asset, ghi chú phần còn cần người xem lại.
```


### 14. Chi phí, pháp lý, trung thực

- Token: Opus 5.5 API $4/M input, $20/M output (tại thời điểm bài viết — kiểm tra lại giá hiện hành). Một phim 3 phút có voice ~7% quota tuần của một creator; dự án 3D một prompt có thể chạm giới hạn output. Tách chi phí: token / dịch vụ ngoài (voice, nhạc, video) / compute render.
- Không làm bản sao chân thực người thật khi chưa có đồng ý; không logo thương hiệu bên thứ ba; nhạc có license; credit asset CC-BY; link video tham chiếu thay vì nhúng. Đăng nền tảng Trung Quốc: gắn nhãn "AI 合成"/"AI-generated" và tick khai báo AI.
- "One-shot" thường là prompt 10k ký tự + skill + ví dụ + API key, và model tự làm nhiều vòng nội bộ (PDoomVideo: 2 lượt). Đặt kỳ vọng đúng với người dùng.
- Thẩm mỹ vẫn cần người: model làm được, nhưng quyết định khoe gì và đạt phong cách là phần khó — bộ asset + style guide tốt cải thiện rõ rệt. Một tham chiếu thật đẹp tiết kiệm nhiều công nhất (gallery: guanmo-ai.github.io/awesome-ai-motion).

