# Biến thể tỷ lệ, đóng gói studio, prompt mẫu, chi phí và pháp lý

### 12. Biến thể tỷ lệ và đóng gói studio

- 16:9 và 9:16 là **hai composition khác nhau**, không crop. Giữ asset, câu chuyện, state; đổi layout: 9:16 ít phần tử hơn, chữ to hơn, phân cấp dọc; 1:1 layout riêng; thời gian read theo copy và kiểm trên kích thước đích, không mặc định ngắn hơn. Đổi thời lượng beat thì ghi vào shotlist. Contact sheet riêng cho từng tỷ lệ.
- Lưu quyết định thành file, không để trong chat:
Cây thư mục chuẩn (khớp `setup-and-studio.md` và `templates/studio/`); các tree khác trong tài liệu là ví dụ, không phải giao thức studio:
```
my-film/
  docs/brief.md          mục tiêu một câu + sự thật sản phẩm + G0/G2
  docs/style_guide.md    palette, type, motion rules, mặc định bị cấm
  docs/shotlist.md       beats, states, reads, timestamps, mục đích
  docs/review_log.md     review theo rubric, approval, feedback nguyên văn
  refs/  assets/  lib/   tham chiếu · logo, màn hình, footage, âm thanh đã duyệt · motion.js
  index.html  render.mjs composition seekable + renderer
  scripts/               qa, beats, sfx, beat_grid
  out/                   file xuất theo từng tỷ lệ, out/check/ bằng chứng
```
(`timeline.json` fps/beat grid/cue là tùy chọn, mẫu ở `templates/timeline-*.json`.)
Video sau: thay brief + assets, giữ render contract, checklist review, cấu trúc giao. Agent đọc file để biết gate nào đã qua, thiếu artifact nào.
- Phim dài: chia theo chương/section (6–8 phần), cho subagent viết song song từ kit chung (CSS, rig, palette) + `WORKER-NOTES.md` chứa luật cứng (§8); storyboard tổng do agent chính giữ.


### 13. Prompt mẫu giao cho agent (production contract)

```
Bạn vừa đạo diễn vừa lập trình một motion film render bằng code.
Mục tiêu: phim [N] giây cho [sản phẩm/khán giả]. Người xem phải nhớ: [một câu].
G0: chốt mục tiêu, loại phim (communication type tách khỏi delivery format), claim và giả thuyết hook; câu hỏi test giây 5 theo type.
Đầu vào: chỉ dùng asset và câu chữ đã duyệt; xem tham chiếu và viết style_guide.md;
  viết shotlist.md với [start,end), trạng thái vào/ra, claim→proof ID, reads nằm trong shot.
Build: chọn renderer và giải thích lý do; mọi khung seekable + deterministic;
  chuyển động, cue âm thanh, transition trên cùng một timeline; giữ source sửa được + lệnh render lặp lại được.
Gate: 1) G2: storyboard + animatic tốc độ thật của đúng revision, ghi approval (artifact, revision, người, timestamp) trước khi build production
  2) contact sheet trước full render  3) review theo rubric.md (A1–A3, T1–T5; mandatory_axes theo gate; chưa kiểm = UNTESTED)
  4) sửa tối đa 3 lỗi có evidence, render lại các đoạn đó  5) xuất 16:9 và 9:16 như hai composition riêng, kiểm trên kích thước đích.
Giao: video, poster frame, contact sheet, source, danh sách asset, ghi chú phần còn cần người xem lại.
```


### 14. Chi phí, pháp lý, trung thực

- Token: Opus 5.5 API $4/M input, $20/M output (tại thời điểm bài viết — kiểm tra lại giá hiện hành). Một phim 3 phút có voice ~7% quota tuần của một creator; dự án 3D một prompt có thể chạm giới hạn output. Tách chi phí: token / dịch vụ ngoài (voice, nhạc, video) / compute render. Số giá/quota trong case là ghi nhận tại thời điểm bài viết, không biến thành dự toán dự án; khi thực sự dự toán phải cập nhật nguồn hiện hành (K-02 không kiểm lại giá hay luật nền tảng).
- Không làm bản sao chân thực người thật khi chưa có đồng ý; không logo thương hiệu bên thứ ba; nhạc có license; credit asset CC-BY; link video tham chiếu thay vì nhúng. Đăng nền tảng Trung Quốc: gắn nhãn "AI 合成"/"AI-generated" và tick khai báo AI.
- "One-shot" thường là prompt 10k ký tự + skill + ví dụ + API key, và model tự làm nhiều vòng nội bộ (PDoomVideo: 2 lượt). Đặt kỳ vọng đúng với người dùng.
- Thẩm mỹ vẫn cần người: model làm được, nhưng quyết định khoe gì và đạt phong cách là phần khó — bộ asset + style guide tốt cải thiện rõ rệt. Một tham chiếu thật đẹp tiết kiệm nhiều công nhất (gallery: guanmo-ai.github.io/awesome-ai-motion).

