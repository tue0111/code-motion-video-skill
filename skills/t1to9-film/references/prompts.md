# Prompt cho phim: ảnh zh-CN (G1) và i2v (G2–G3)

Cấu trúc prompt ảnh lấy từ T1 knowledge (`<T1_KNOWLEDGE>`), xem `sources.md` §3. File này chỉ ghi **những chỗ phim khác ảnh đơn**.

## A. Prompt ảnh: hồ sơ phim đè lên mặc định của T1 OS

| Mặc định T1 OS (ảnh đơn) | Phim T1 to 9 |
|---|---|
| 【固定品牌角标】 in "T1 to 9" góc phải dưới | **Bỏ.** 母版锁 ghi 画面中不出现任何文字、字母、数字、日期水印、标志、签名或水印. Lint bằng `--no-brand` |
| Một ảnh, một mục đích | Album: một 母版锁 cho cả phim, mỗi shot một khối 【分镜 · Sx】, một negative chung |
| Khoá nhân vật để trong 母版锁 | **人物锁 tách khỏi 母版锁 và dán theo từng shot**: chỉ chép khoá của người có mặt. Shot cận tay thì chỉ khoá phần thấy được (tay, đồng hồ, tay áo) |
| Chọn khung đẹp | Mỗi 分镜 ghi thêm **trạng thái vào và ra của đạo cụ** và **động từ của beat**, để i2v có hành động mà không phải đoán |

**Thứ tự viết một phim:**
1. Đọc G0 đã duyệt. Mỗi beat thành một shot. Shot nào tái dùng ảnh cũ thì ghi rõ.
2. VSC: `vsc_search(lexicon)` lấy 3–5 style ứng viên, `vsc_get_style` cho 1–2 style chọn. `vsc_search(gallery, media_type=image)` lấy 3–5 prompt cùng thể loại để học cách viết. Ghi id và tác giả vào đầu `prompts/shots.md`.
3. Theo skill `t1-visual-prompt`: viết bảng quyết định 6 dòng cho 母版锁 (trục chính, trục phụ…), rồi từng 分镜.
4. Ghi từng shot ra file tạm, chạy `t1lint.py --no-brand --strict --allow S`, sửa đến khi PASS. `--allow S` cho phép mã shot kiểu `S1` trong tên 分镜. Ngoài mã shot ra, mọi chữ Latin khác vẫn bị báo.
5. Tự kiểm: 人物锁 của shot có đúng người có mặt không? Có chữ nào lọt vào cảnh không (bảng, sách, biển)? Nếu cảnh có giấy hoặc sổ thì ghi 纸上没有任何字 hoặc 字迹模糊不可读.

**Hard test giải phẫu:** shot nào có tay cầm vật, hai người chạm nhau hay hai tay của hai người thì sinh 4 ảnh và soi kỹ. Danh sách ca rủi ro lấy từ shot list, không làm ngược lại.

## B. Prompt i2v (Seedance và các model tương tự)

Viết bằng zh-CN, một đoạn, theo thứ tự:

1. **Máy:** một chuyển động chính, chọn theo ngữ pháp máy của loại phim (`film-types.md` mục 4). Lấy câu zh-CN từ `camera-moves.md` theo khuôn 运镜 / 速度 / 构图 / 落幅, viết **tách riêng** khỏi phần cảnh (主体 / 地点 / 动作 / 氛围) để đổi khung đầu mà không phải viết lại phần máy. Cần thêm biến thể thì tra VSC `motion` (`vsc_get_motion`).
2. **Hành động chính:** một động từ, ghi trạng thái đầu và cuối của đạo cụ ("把纸角向内折起…然后右手移出画面"). Thêm pha mở và đóng để có tay cắt: 起幅 khung đầu rõ, 落幅 giữ khung cuối khoảng 0,5 s (học từ CAM-117 干净甩镜 và CAM-120 叠化定住).
3. **Thứ cấp:** gió, ánh sáng, cánh hoa *có trong ảnh gốc*. Không thêm vật thể mới.
4. **Khoá:** 保持面部、手指、[đạo cụ] 与原图一致，不新增人物，画面中不出现任何文字.
5. **Âm:** model có sinh tiếng thì chỉ tiếng hiện trường, **不要背景音乐**. BGM ghép ở hậu kỳ.

**Model và độ phân giải** (luôn `list_models` + quote lại, đừng dùng giá cũ):
- Mặc định 480p, code nội suy lên 1080p, rồi phủ hạt mịn.
- 720p cho cận mặt và shot hero.
- Model mạnh nhất chỉ cho shot cao trào nặng hiệu ứng. Diễn của người dùng tầm giữa. Shot đơn giản dùng bản Fast hoặc Mini.
- Thời lượng sinh phải dài hơn đoạn cần dùng ít nhất 0,5 s, để có handle và để cắt bỏ khúc model làm hỏng.

**Pilot:** chạy 1 clip rủi ro nhất trước. Soi từng khung (`qa.md` §i2v) rồi mới quote batch.

## C. Lỗi đã gặp (thêm dòng mới khi gặp)

| Ngày | Model | Lỗi | Cách xử lý |
|---|---|---|---|
| 2026-11-04 | GPT Image (Codex) | Dán 人物锁 của cả A và B vào shot chỉ có A thì B lọt vào khung | Chỉ dán khoá của người có mặt |
| 2026-11-04 | GPT Image | Hai nhân vật sinh riêng từng shot ra cùng một khuôn mặt | Khoá mặt, tóc, phụ kiện khác nhau rõ ràng ngay ở G0. Dùng ảnh tham chiếu mặt A cho các shot có A |
| 2026-11-04 | Seedance 2.0 Fast | Góc trang đã gấp tự mở ra lại ở khoảng 1,7 s | Ghi `usable: [0, 1.6]`. Timeline không được đọc quá khoảng đó (kể cả khi đổi speed) |
| 2026-11-04 | Sumi | Thêm trường `entrypoint` sau khi quote thì bị lỗi TASK_QUOTE_CHANGED | Gửi đúng payload đã quote |
