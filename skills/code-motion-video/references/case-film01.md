# Case film-01: VSC TVC (02–03/10/2026), bài học thật

> Các mô tả dưới đây tổng hợp từ hồ sơ/nhận xét Center. Mỗi số đo, điểm, thời gian hoặc mô tả video phải kèm artifact nguồn nếu muốn dùng làm bằng chứng. Khi chưa có artifact trong gói này, nhãn là **reported**, không phải K-02 đã tái đo hoặc trực tiếp xem. Điểm "≥ 8" và "7 trục" dưới đây là rubric cũ (đã thay bằng `rubric.md`), chỉ giữ như lịch sử.

## Dòng thời gian
1. **v1 (60 s, brand film):** mắt hero → wordmark → 3 nhóm tác phẩm (card) → số liệu → cộng đồng → 4 trụ cột → tường mosaic → end card. Nhạc tự tổng hợp 120 BPM.
   - Kỹ thuật sạch: 1800 khung, −14 LUFS, theo ghi nhận Center, rubric 7 trục cũ chấm ≥ 8 mọi trục trừ chuyển động (7).
   - **Chủ phim: "chuyển động hơi chán, không có yếu tố gì nhìn thật sự ấn tượng".**
2. **v2 (60 s):** Center đổi sang set-piece (Jev chấm: mắt phản chiếu 2,75 · zoom vô tận 2,64 · lao z-space 2,40 · wordmark hạt 2,24 · xoắn ốc bullet-time 1,83) + addendum đơn sắc, màu chọn lọc, "bản đồ thở" (đỉnh = màu + chuyển động + hit nhạc; nghỉ = đơn sắc + chậm + nhạc thưa).
   - Tốn khoảng 9 lệnh Worker, 1 lần máy crash (RAM khi render sub-4), 1 lần hết hạn mức Codex.
   - Theo ghi nhận Center, v2 đạt ≥ 8 mọi trục của rubric 7 trục cũ.
   - **Chủ phim xem xong: "Tao thấy cái V1 ban đầu còn ổn hơn."**
3. **Tham chiếu chủ phim đưa (cùng chủ đề hoặc cùng loại, do model khác làm), được khen hơn hẳn:**
   - **"VSC" 30 s:** demo sản phẩm. Quay UI thật: lướt gallery có clip video thật đang chạy → gõ search → mở tác phẩm → prompt hiện và được highlight → nút "一键复制" → số liệu trên clip full-bleed → end card. 24 lần đổi cảnh trong 30 s. Mỗi beat là một động từ (找到它 / 读懂它 / 一键复制).
   - **"Viko" 30 s:** explainer sản phẩm. Kịch bản vấn đề → giải pháp ("刷到好图，然后，SEE IT. VIKO IT."), 5 chương đánh số (CAPTURE / REVERSE / DECODE / ARCHIVE / RECREATE). Mockup UI nghiêng 3D. Một màu thương hiệu (magenta), câu hai vế có từ khoá tô màu, end card có CTA + URL.
4. **v3 (đang dở, đã dừng):** hook của v1 + hành trình người dùng; nhạc ghép Gulch (99 BPM) → Happy Upbeat (129 BPM). Lần ghép đầu "giây 9 đổi beat bị vấp" vì riser có trống 129 BPM đè lên đuôi 99 BPM; sửa bằng cắt kiểu DJ: dừng đúng phách, vào trọn một ô nhịp build, đáp trên downbeat.

## Bài học (Center tự rút, cần phản biện)
- **L1. Center chấm "≥ 8" (rubric 7 trục cũ) nhưng chủ phim chê:** rubric 7 trục cũ đo **thi công** (đọc được, bố cục, nhịp, kỹ thuật), không đo **người xem có hiểu và muốn không**. Thiếu trục "người xem biết mình được gì sau 5 s".
- **L2. Sai loại phim:** brief "Motion + TVC + Epic + Cinematic + eye-catchy" bị Center hiểu thành brand film cảm xúc. Với một sản phẩm/cộng đồng online, khán giả cần **demo/explainer**: hành trình người dùng, UI thật, động từ. Bước "chọn loại phim" phải xảy ra **trước** style.
- **L3. Thêm set-piece không cứu được câu chuyện yếu:** v2 thêm wow kỹ thuật nhưng vẫn không trả lời "để làm gì", lại mất sự rõ ràng của v1. Theo ước lượng của Center, công sức tăng khoảng ba lần; chưa có bảng tổng công trên cùng phạm vi trong tài liệu này.
- **L4. Chuyển động thật trong khung > camera di chuyển trên ảnh tĩnh.** Clip video thật hoặc UI đang thao tác cho cảm giác sống mà parallax không thay được.
- **L5. Nhạc dẫn dắt cấu trúc:** khi có nhạc thật, khối cảnh = 2 ô nhịp, hit = downbeat. Ghép hai bài khác tempo phải đổi ở chỗ không có lớp nhịp chồng (DJ cut / break), và cú cắt hình phải trùng chỗ đổi nhịp.
- **L6. Vận hành:** render sub-4 nạp hết khung hero làm crash máy (nạp lười LRU + render theo đoạn); sau crash sandbox Windows của Codex lỗi ACL (chạy danger-full-access); hạn mức Codex hết giữa hàng đợi (xếp lệnh theo ưu tiên, lệnh nhỏ); `device_commit_files` đôi khi giữ bản cũ (tạo file mới và kiểm md5).
- **L7. Bản quyền và quy tắc nội dung:** clip trong gallery có nguồn Twitter của tác giả khác; nhạc thương mại (Tipper) có thể bị claim; không lộ prompt ảnh nhưng được lộ prompt video (quy tắc riêng của chủ phim).
- **L8. Phản hồi của chủ phim là dữ liệu vàng:** "chán", "không ấn tượng", "v1 ổn hơn", "vấp ở giây 9". Center nên hỏi hoặc cho xem sớm hơn (animatic hoặc storyboard 30 s) trước khi đốt nhiều giờ render.

## Phản biện của Sol/Astra (K-01), giữ để không tự thuyết phục mình
- L2 quá tuyệt đối: chọn loại phim phụ thuộc mục tiêu và mức biết của khán giả. Brand film vẫn đúng khi mục tiêu là nhận diện với người đã biết.
- L3 chưa chứng minh nhân quả: v2 đổi cùng lúc màu, staging, nhịp và mix. Phải hỏi chủ phim "ổn hơn" là ở trục nào, so cùng đoạn v1/v2.
- L4 là heuristic: clip/UI dùng khi nó mang **thông tin**; ảnh tác phẩm vẫn là proof hợp lệ.
- L5: với explainer/demo, đồng hồ chính có thể là voice/read/hành động, không phải mọi khối = 2 ô nhịp.
- L6: `danger-full-access` là cách khôi phục được chủ máy cho phép, không phải mặc định chữa lỗi ACL. Tách chẩn đoán OOM / process exit / ACL / quota.
- L8: phản hồi chủ phim quyết gu, nhưng không thay test khán giả độc lập.
- Đồng biến RMS–độ bão hoà toàn phim là proxy hẹp. Freeze detector cần whitelist theo mục đích (giữ để đọc, poster).
- Phản hồi v1/v2 là preference quan sát của chủ phim; chưa cô lập biến màu/staging/nhịp/mix để chứng minh nguyên nhân duy nhất. Các quyết định Jev là judgment trên state của lượt đó; xác suất không là tỷ lệ hiệu quả của phim.

## Quyết định (Center + Jev, backend typesafe)
| # | Quyết định | Jev | Chốt |
|---|---|---|---|
| D1 | Đóng gói | extend_lean 0,98 | Mở rộng **gọn** `code-motion-video`: thêm `film-types`, `director-decision-chain`, `rubric`, `failure-modes`, `case-film01`; vá SKILL.md, gate, template. Không tách skill. |
| D2 | Cổng G0 (loại phim + 5 s đầu + animatic chủ phim duyệt) trước style/render | 0,79 | Có |
| D3 | Trọng số khán giả | ≈ 65–75 % | 65/35, chỉ để so phiên bản |
| D4 | Bỏ "im lặng 10 phút = tiếp tục" | 0,83 | Bỏ. Chạy không người trông thì dừng ở bản nháp |
| D5 | Tách trục A/T + chưa kiểm chặn cổng (lúc quyết định ghi "N/A", nay là UNTESTED) + execution vs acceptance | 0,88 | Có |
| D6 | Đỉnh có thể đi qua 1 hoặc vài trục (màu, chuyển động, scale, sáng, âm, câu chuyện); trước đỉnh lớn vẫn phải có nghỉ | 0,87 | Có |
| D7 | Kết luận rubric | both 0,62 | Hai bảng + ngưỡng là cổng; tổng trọng số chỉ để so |
| D8 | Phân vai | chủ phim | Claude = đạo diễn/thẩm mỹ/bản cuối · **Astra** = plan + dò lỗi · **Sol 6.1** = gia công |
