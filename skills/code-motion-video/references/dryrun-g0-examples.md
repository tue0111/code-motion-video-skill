# Dry-run G0: ba brief ngắn, thử bằng văn bản

Ví dụ rút gọn từ đợt review K-02 (chạy trên v0.4.0, nay đã vá ở v0.4.1). Đây là thử quy trình trên giấy, **không phải video, không phải test khán giả**. Dùng để thấy G0 đi từ brief thiếu dữ kiện tới câu hỏi đúng và điểm dừng đúng. Mọi cột thời gian là blockout đề xuất, thay bằng timing thật khi có asset/nhạc/copy.

## Nhãn dùng trong ví dụ

- **FACT:** do yêu cầu gốc nói. Chỉ có ba điều: (A) app ghi chú AI, 30 s; (B) MV lo-fi, 60 s; (C) quán cà phê, 9:16, 15 s.
- **ASSUMPTION:** giả định để dry-run chạy tiếp, chưa chủ phim xác nhận. Không được copy thành dữ kiện.
- **UNKNOWN:** chưa có (tên, sản phẩm thật, tính năng, audience, nền tảng, FPS, logo, asset, nhạc, quyền, người duyệt). Ghi UNKNOWN/PENDING, không bịa, không kế thừa giả định từ lượt trước (YouTube, lyric, chi nhánh mới...).
- Phần trong `[ngoặc vuông]` là chỗ cần điền dữ kiện thật, không phải nội dung được phép xuất bản.

**Kết luận gate thực tế (cả ba):** chỉ hoàn thành *bản thử G0*. G1 còn thiếu asset/quyền; G2 chưa có animatic hay người duyệt. Không đánh dấu PASS production. Thiếu đầu vào thì dừng đúng, đó không phải bug của skill.

## A. App ghi chú AI, 30 s

| Mục | Nội dung | Nhãn |
|---|---|---|
| Mục tiêu giả định | Giới thiệu một workflow thật cho người mới | ASSUMPTION |
| Type | Demo sản phẩm app/web (chính); explainer là lớp phụ nếu cần giải input→output. Loại launch (chưa có tin mới), brand thuần, data film | ASSUMPTION, chờ duyệt |
| Biết–cảm–làm | Biết `[app]` hỗ trợ `[một tác vụ ghi chú đã xác minh]`; cảm hiểu thao tác, tin output nhìn thấy; làm: mở `[đường dẫn thật]` thử đúng workflow đó | placeholder |
| Claim / proof | A-C1 = làm được tác vụ đã chọn; A-P1 = capture UI đúng revision, input và output đọc được | proof UNKNOWN |
| **Câu hỏi giây 5** | Kỳ vọng: "Đây là `[app]`, giúp làm `[tác vụ]` từ `[input]`" | chưa có người trả lời, chưa chấm A1 |

Không mặc định app có tóm tắt/transcribe/search. Không hứa giảm X% thời gian hay "AI luôn đúng".

| Shot [start,end) s | Động từ → thay đổi | State vào → ra | Read ổn định dự kiến |
|---|---|---|---|
| A01 [0,3) | Nhìn kết quả → biết app hỗ trợ việc gì | output có sẵn → thấy tên + tác vụ | [0.8,3) tên + một dòng giá trị |
| A02 [3,7) | Nhập/chọn đầu vào theo thao tác thật | chưa chọn → input sẵn sàng | [4.5,7) input ngắn, không dữ liệu riêng tư |
| A03 [7,15) | Thực hiện tác vụ AI đã xác minh → thấy phản hồi | input → pending (nếu thật có) → output | [11,15) output đủ hiểu; chờ dài thì ghi time-compression đã duyệt |
| A04 [15,24) | Đối chiếu → hiểu output dùng vào việc gì | output → chi tiết kết quả | [17,23) ví dụ + giới hạn cần biết |
| A05 [24,30) | Thử → biết bước tiếp cụ thể | kết quả → end card | [25,30) tên + CTA + đích, kiểm đọc thực tế |

Tổng: 3+4+8+9+6 = **30 s**, không hở/chồng; read nằm trong shot. Chưa đo khả năng đọc.

- **Đồng hồ:** action/read; voice chỉ khi được chọn; không ép nhạc 120 BPM. Latency bị rút ngắn phải công khai trong plan.
- **Skill không dẫn đủ (đã vá):** shotlist thiếu claim/proof/read; shot = tổng reads bỏ action/transition; "UI giả" thiếu ranh giới; prompt có thể bỏ G0/animatic.
- **Dừng:** chưa có chức năng/capture/quyền thì chỉ duyệt cách kiểm và hướng, không build scene tính năng/CTA.

## B. MV lo-fi, 60 s

| Mục | Nội dung | Nhãn |
|---|---|---|
| Mục tiêu giả định | Một trải nghiệm nghe có motif phát triển | ASSUMPTION |
| Type | MV / visualizer (chính). Loại demo/explainer/launch vì brief không nói bán cơ chế hay ra mắt | ASSUMPTION |
| Biết–cảm–làm | Biết/nhận `[bài/nghệ sĩ]` và motif; cảm hướng yên/chậm (giả định nghệ thuật, cần nghe nhạc mới chốt); làm tiếp tục nghe/lưu nếu kênh yêu cầu | placeholder |
| Chất liệu | B-P1 = bản nhạc có quyền + cue sheet; B-P2 = artwork/motif có quyền. Tên bài, nghệ sĩ, lyric, BPM, 4/4, instrumental: chỉ khi được cho | UNKNOWN |
| **Câu hỏi giây 5 (riêng cho MV)** | "Bạn nhớ hình gì, cảm giác đang đi theo hướng nào?" Chốt câu hỏi + ngoại lệ trước test | chưa thử |

Không áp lợi ích sản phẩm/conversion/CTA bán hàng cho MV.

Motif thử: *một vòng sáng trên bề mặt tối* (đề xuất visualizer trừu tượng, chưa là hình final, không gán cho nội dung bài chưa nghe).

| Shot [start,end) s | Động từ → trải nghiệm | Ý đồ / evidence cần | Khoảng nhận motif/identity |
|---|---|---|---|
| B01 [0,8) | Nhận ra → vào thế giới bài | motif + phrase mở | [1,5) một motif |
| B02 [8,24) | Theo dõi → thấy motif phát triển | phrase kế (chưa đo) | [10,16) điểm neo dễ tìm |
| B03 [24,40) | Đối chiếu → cảm biến thể | section/variation thật | [27,34) quan hệ mới |
| B04 [40,52) | Mở rộng → tăng cường độ nếu nhạc có đỉnh | chỉ giữ "đỉnh" khi nhạc xác nhận | [46,50) |
| B05 [52,60) | Trở về → hoàn chỉnh phrase | resolve thật; kiểm quyền cắt đoạn | [55,60) |

Tổng: 8+16+16+12+8 = **60 s**. "Read" ở đây là khoảng nhận hình, không đo tốc độ đọc chữ. Phrase thật khác thì **thay mốc blockout**, không kéo nhạc cho khớp bảng.

- **Đồng hồ:** nhạc thật. Chọn đoạn 60 s được duyệt; đánh phrase/section/meter/offset. `beats.py` chỉ cho downbeat ứng viên (`beats[::4]`, giả định 4/4); chưa có audio thì cue map PENDING.
- **Rubric chuyển nghĩa trước test:** A1 nhận motif/hướng cảm xúc; A2 nghe tiếp/lưu nếu là mục tiêu; A3 nhớ bài/nghệ sĩ nếu identity bắt buộc (bảng mốc A theo type trong `rubric.md`).
- **Hold dài có mục đích được phép**; không đổi bố cục mỗi 2–4 s chỉ để thỏa luật. Loop chỉ khi brief yêu cầu (kiểm T↔0 và seam âm, không ép ảnh cuối = ảnh đầu).
- **Dừng:** không thể khóa motion/audio map hay duyệt cảm xúc khi chưa có bài; viết blockout không thay việc nghe.

## C. Quán cà phê, 9:16, 15 s

| Mục | Nội dung | Nhãn |
|---|---|---|
| Fact | 15 s, 9:16 (đó là **format**, chưa phải mục tiêu) | FACT |
| Mục tiêu giả định | Người gần quán biết nơi này và mở đường đi | ASSUMPTION |
| Type | `communication_type` đề xuất: TVC thương hiệu địa phương phục vụ ghé quán (chưa chốt); `delivery_format`: social short 9:16 15 s. Không suy khai trương, offer, chi nhánh mới | ASSUMPTION |
| Claim / proof | C-C1 = hình dung đúng nơi thật; C-P1 ảnh/clip địa điểm, C-P2 món thật, C-P3 tên/địa chỉ chủ quán duyệt. Stock không là chứng cứ "đây là quán đó" | proof UNKNOWN |
| **Câu hỏi giây 5** | "Đây là `[tên quán]`, có `[đặc điểm thấy được]`." Test mute + cỡ điện thoại là đề xuất | chưa có kết quả |

Không tự thêm "yên tĩnh", "ngon nhất", giờ mở cửa; chỉ mô tả bằng asset đã xác nhận.

| Shot [start,end) s | Động từ → thay đổi | Claim / proof | Read ổn định dự kiến |
|---|---|---|---|
| C01 [0,3) | Nhận ra → biết tên + loại nơi | C-C1 / C-P1 + tên thật | [0.5,3) tên, không slogan dài |
| C02 [3,7) | Nhìn gần → một món/chi tiết thật | C-P2 | [4,6.5) một thông tin đã duyệt |
| C03 [7,11) | Hình dung → hiểu trải nghiệm thật | C-P1 (người chỉ khi có consent) | [8,10.5) một ý |
| C04 [11,15) | Tìm đến → biết bước tiếp | C-P3 tên + địa chỉ/đích | [11,15) CTA + địa chỉ ngắn |

Tổng: 3+4+4+4 = **15 s**. 4 s CTA là phân bổ thử, chưa chứng minh đủ cho địa chỉ thật (quá dài thì chuyển sang đích map rõ).

- **Skill không dẫn đủ (đã vá):** không tách mục tiêu khỏi "Social short" (type vs format); thiếu read/proof field; CTA bị tính thời lượng theo mẫu thay vì nội dung; format bị gắn với "hold ngắn hơn" vô căn cứ.
- **Dừng:** thiếu thông tin/asset/quyền thì không làm quảng cáo với địa chỉ hoặc offer tự bịa. Safe area theo nền tảng thật, chưa khóa khi chưa biết nền tảng.

## Chung cho cả ba

- Bước 9–14 của `director-decision-chain.md` (khả thi, G3–G6, bàn giao) đều **NOT RUN** ở dry-run: không có still, MP4, loudness đo, benchmark hay test khán giả.
- Phân loại type bằng Jev trả typed answer + xác suất cao cho cả ba (A demo, B MV, C social short). Đó là **phán đoán model trên text ít dữ kiện**, không phải tỷ lệ thành công; với C nó chỉ nhận đúng format, chưa giải được mục tiêu truyền thông.
- Nghiệm thu đề xuất: chủ phim chốt `mandatory_axes` + ngưỡng trước rough; G2 cần duyệt type/story/hook và timing animatic (T3/T4/T5 final chưa phải yêu cầu của G2); chưa kiểm = UNTESTED; không tính tổng 65/35 trên bộ điểm thiếu.
