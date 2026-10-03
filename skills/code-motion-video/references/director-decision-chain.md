# Chuỗi quyết định brief → phim

**Trạng thái: áp dụng từ v0.4.0.** Soạn: Sol/Astra (K-01), Center chốt. Ánh xạ sang gate trong SKILL.md: bước 0–4 = **G0** (mới), 5–7 = G1–G2, **8 = G2 (animatic, chủ phim duyệt; im lặng không phải duyệt)**, 9–10 = G3, 11 = G4, 12 = G5, 13–14 = G6. Cơ sở: `case-film01.md` (L1–L8), `film-types.md`. Chọn **mục tiêu truyền thông** trước look; chọn **công nghệ tạo pixel** sau asset và yêu cầu motion. Hai lựa chọn khác nhau.

| Bước / gate | Câu hỏi bắt buộc | Đầu ra kiểm được | Điều kiện tiếp tục / người quyết |
|---|---|---|---|
| 0. Khóa brief revision | Ai xem, ở đâu, đã biết gì? Tài liệu nào hiện hành? Điều gì cấm/cho phép? | Brief ID, duration/fps/ratio, danh sách nguồn và xung đột đã xử lý | Center xác nhận; thiếu dữ kiện bắt buộc thì BLOCKED, không tự bịa. |
| 1. Biết–cảm–làm | Sau phim, người xem nói lại gì, cảm gì, làm đúng hành động nào? | Một câu định vị + một lợi ích + một CTA quan sát được; mục tiêu chính/phụ | Không chấp nhận “cool/epic” làm mục tiêu khán giả. Không suy ý định mua từ mắt nhìn. |
| 2. **Chọn loại phim trước style** | Cần hiểu cơ chế, tin bằng chứng hay gắn cảm xúc? Có đủ asset để loại phim này tồn tại? | Type chính/phụ, lý do chọn, loại bị loại và giới hạn; dùng film_types.md | Center/chủ phim duyệt. VSC có thể là demo với mở đầu brand; không buộc mọi cộng đồng dùng demo. |
| 3. Claim và chất liệu | Mỗi lời hứa được chứng minh bằng hình gì? UI/clip/số liệu có thật? Được dùng và được hiện phần nào? | Asset/claim manifest: source, quyền, revision, crop/privacy, checksum, credit, scene | Thiếu UI/quyền/nội dung thiết yếu → BLOCKED cảnh tương ứng. Dựng lại UI chỉ khi được phép và đối chiếu chức năng. |
| 4. **5 giây đầu người xem hiểu gì?** | Xem một lần đến 5 s, họ biết đây là ai/loại gì, dành cho ai, được gì? Nếu chưa định vị, trì hoãn có lý do nào? | Khung/copy 0–5 s; câu trả lời kỳ vọng; phiếu test mở “Bạn vừa thấy gì, nó giúp gì?” | Người chưa đọc brief trả lời không gợi ý. Ghi nguyên văn, không đổi câu hỏi để đạt. Brand/MV có ngoại lệ định vị sớm do chủ phim ký, vẫn phải có hook cụ thể. |
| 5. Xương câu chuyện | Hành động nào gây kết quả nào? Tại sao shot này tồn tại? Bỏ hiệu ứng còn hiểu không? | Beat sheet: người xem biết→động từ→claim→proof→state vào/ra→read→CTA | Bỏ shot chỉ lặp ý, thêm proof thay trang trí; Center khóa logic trước style. |
| 6. Âm và thời gian | Voice, nhạc hay hành động là đồng hồ chính? Tempo/offset/bar có thật? Mối nối khác tempo ở đâu? | Audio map và read intervals; beat grid có segment/offset/downbeat; cue có đơn vị giây+frame | Music-first cho MV; voice/action-first cho explainer/demo khi cần. Đo `frame=round(t·fps)` từ thời gian gốc, không cộng số frame đã làm tròn. |
| 7. Style phục vụ loại phim | Điểm neo mỗi shot là gì? Màu/font/camera có che proof/read không? Lấy gì từ tham chiếu? | Style tokens và thumbnail; invariant/shot variables; layout riêng theo ratio | Duyệt look sau type/logic. 6:3:1 là quan hệ hierarchy, không đo diện tích cứng. |
| 8. **Storyboard/animatic duyệt sớm — G2** | Chủ phim xem tốc độ thật có hiểu hành trình, thích hướng kể, đọc CTA không? Hook và đoạn khó có đúng gu? | Storyboard toàn tuyến + animatic có thời gian/copy/âm tạm, ghi khác biệt với final; phản hồi theo timestamp | Chủ phim ghi duyệt hoặc cần sửa type/story/hook. Im lặng không là duyệt. Tài liệu đơn lẻ chưa thay thế playback timing. |
| 9. Khả thi và budget | Motion khó nhất tạo bằng gì? RAM/compute/quota đủ không? Có thể sửa và render lại một đoạn không? | Benchmark 2–4 s khó, decoded-memory estimate, chunk boundaries, concurrency/temp policy, manifest resume | Center duyệt tradeoff trước full. `W·H·4·N` byte là ước tính RGBA, còn browser/texture/encode overhead. |
| 10. Key pose — G3 | Khung 0 đủ chưa? Proof/CTA và chữ đứng có đọc được ở 360 px không? | verify key poses, sheet và crop/phone; không chấm motion từ still | Worker kiểm kỹ thuật, Center review hình; sửa lỗi rõ trước rough. |
| 11. Rough — G4 | Động từ→kết quả có nhìn thấy? Mỗi read có thời gian ổn định? Cú nối có làm mất phương hướng? | verify, sheet mỗi beat, strip mọi nối đã chạm, phone, bản nháp có tiếng; test khán giả | Gate khán giả riêng rubric_v2. Không polish nếu sai loại/câu chuyện. |
| 12. Diagnose→patch — G5 | Lỗi ở ý nghĩa, hierarchy, timing, audio hay renderer? Sửa biến nào đủ? | Top 3 theo tác hại; timestamp→ảnh/đo→nguyên nhân→patch→before/after; hash ngoài phạm vi | Lỗi cấp câu chuyện quay lại G2; lỗi cục bộ chỉ vá lớp gây lỗi. Sửa hai lượt không hết thì Center đổi phương pháp. |
| 13. Final — G6 | File giao có đúng nháp đã duyệt? Có decode đủ, audio/PTS đúng, rights đủ, ratio đúng? | Render theo lệnh, QA trên MP4, frame count/stream/loudness, freeze/black có whitelist, sheet final, playback/nhận xét người | Worker execution status khác Center acceptance status. Exit 0 của QA không phủ quyết checklist FAIL. Loop chỉ diff khi brief là loop. |
| 14. Bàn giao và lesson | Người nhận mở được đúng file? Những gì còn chưa kiểm được là gì? | Filename mới theo revision, SHA-256/bytes, manifest source/config/asset, báo cáo DONE/PARTIAL/BLOCKED, credit | Watcher sở hữu done.json/tasks; Center chốt final và lưu feedback nguyên văn cùng nguyên nhân giả thuyết. |

## Mẫu một beat kiểm được

`E: người xem biết cách tìm clip → search cinematic → gallery trả clip thật → proof là UI nguồn đã duyệt → input→result→detail → nhãn giữ khi UI ổn → click trên beat → card mở và người xem đọc kết quả.`

Ví dụ này dựa trên v3 shotlist C–F, là **kế hoạch**, chưa phải cảnh đã hoàn thành hay chức năng đã độc lập kiểm trên site.

## Quy tắc dừng

- Sai nguồn/quyền/nội dung: BLOCKED phần cần dữ kiện, không thay bằng fiction quảng cáo.
- Người xem chưa hiểu: quay lại type/story/copy; không mua thêm wow để bù.
- Người xem hiểu nhưng chủ phim không thích look: giữ logic, sửa style/staging có mục tiêu.
- Máy pass nhưng người chưa nghe/xem: ghi kiểm kỹ thuật đã đạt, acceptance cảm nhận còn chờ.
