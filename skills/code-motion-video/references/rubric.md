# Rubric — hiểu / muốn / nhớ (khán giả) và thi công

**Trạng thái: áp dụng từ v0.4.0**, thay 7 trục cũ ("lặp tới khi mọi điểm ≥ 8"). Soạn: Sol/Astra (K-01), Center chốt, Jev cân (xem `case-film01.md` §Quyết định). Lý do: ở film-01, Center chấm v2 ≥ 8 mọi trục thi công nhưng chủ phim vẫn chê "chán" và thích v1 hơn. 7 trục cũ đo thi công, không đo người xem có hiểu, có muốn, có nhớ hay không.

**Cách kết luận (chốt):**
1. **Cổng = hai bảng riêng**, mỗi trục có ngưỡng chốt **trước rough** (mặc định mọi trục bắt buộc ≥ 8). Không lấy trung bình để vượt cổng. Vi phạm quyền/nội dung/số liệu là blocker độc lập.
2. **Tổng có trọng số 65 % khán giả / 35 % thi công** chỉ dùng để **so hai phiên bản** với nhau, không dùng để vượt cổng.
3. **Chưa kiểm = N/A**. N/A ở trục bắt buộc thì **chưa qua cổng**. Model tự chấm A1–A3 chỉ là dự đoán, ghi "model-estimate"; điểm A thật cần người chưa biết brief (hoặc chủ phim, ghi rõ là ai).
4. Tách **execution_status** (Worker: DONE/PARTIAL/BLOCKED) khỏi **acceptance_status** (Center/chủ phim: ACCEPTED/REJECTED/PENDING).

## Cách dùng thang 1–10

- 1–3: thiếu/sai nền tảng của trục; 4/6/8/10 là mốc dưới đây. 5/7/9 là trạng thái trung gian, ghi tiêu chí nào đã đạt và còn thiếu.
- Mỗi điểm phải có: revision, người chấm, timestamp, bằng chứng, phương pháp và giới hạn. **Chưa kiểm = N/A**, không biến thành 0 hoặc 8; N/A của trục bắt buộc thì chưa qua gate.
- **10** là đạt toàn bộ điều đã kiểm trong phạm vi brief, không bảo đảm conversion hoặc mọi khán giả đều thích.
- Đề xuất báo hai bảng riêng, không lấy trung bình chung. Chốt ngưỡng theo dự án trước rough; cho bản quảng cáo VSC có thể đề xuất mọi trục bắt buộc ≥8, nhưng phải được Center/chủ phim duyệt. Vi phạm quyền/nội dung/số liệu là blocker độc lập, không bù bằng điểm cao.

## Trục khán giả

| Trục / cách kiểm | 4 | 6 | 8 | 10 | Ví dụ film-01, nguồn và ý nghĩa |
|---|---|---|---|---|---|
| **A1 — Hiểu ngay lợi ích và câu chuyện.** Xem đến 5 s, hỏi mở “Đây là gì, giúp gì?”; xem hết, yêu cầu kể lại cơ chế/lời hứa. Ghi đáp án nguyên văn của người chưa biết brief. | Chỉ nhớ hình/hiệu ứng, đoán sai loại sản phẩm | Biết lĩnh vực, lợi ích chung chung; cần giải thích thêm | Trong mốc brief yêu cầu, nói đúng sản phẩm/lợi ích; sau phim kể đúng quan hệ chính | Đúng lợi ích, cơ chế và giới hạn, không cần gợi ý trong toàn bộ test đã định | Sheet v1/v2 0–4 s chủ yếu mắt; 8 s v2 có tên, chưa giải nghĩa cộng đồng. independent_view; L1/L2 muốn kiểm “được gì”. Không khẳng định người thật đã test ở 5 s. |
| **A2 — Muốn và biết hành động.** Hỏi vì sao có/không muốn thử và bước tiếp theo; quan sát click thử trong phiên test nếu có. Phân biệt ý định tự khai với hành vi. | Lời mời rời lợi ích, không biết bước tiếp | Biết URL/CTA nhưng chưa có lý do hoặc ngại bước tiếp | Nói được giá trị cho mình và bước cụ thể; CTA nhất quán hành trình | Thực hiện đúng bước được test, lý do/ma sát được ghi nhận; không gán thành tỷ lệ chuyển đổi ngoài mẫu | VSC 56/58 s có JOIN COMMUNITY và URL; hình S08 chưa cho thấy cùng làm gì. v3 C–G dự kiến search→copy→make. Có CTA không tự chứng minh người muốn tham gia. |
| **A3 — Nhớ đúng thương hiệu và liên tưởng.** Hỏi tên/giá trị không gợi ý sau phim và sau khoảng chờ được chốt trước test. | Nhớ hiệu ứng nhưng nhầm/không nhớ brand | Nhớ tên ngay nhưng không gắn giá trị | Nhớ đúng tên và một lời hứa sau khoảng chờ đã định | Nhớ đúng tên/lợi ích/dấu hiệu riêng qua các tình huống test đã định, không nhầm đối thủ | Wordmark và bracket VSC có trong v1/v2, end card rõ ở 56/58 s. brief/style định signature; chưa đo recall nên không cho điểm từ logo hiện diện. |

Film type thay đổi câu hỏi A1/A2: MV đo motif/nghệ sĩ và nghe/lưu; manifesto đo niềm tin và đồng hành. Ngoại lệ “hiểu sản phẩm trong 5 s” phải ghi trước test, không sửa sau khi bị chê. Chủ phim có quyền chốt gu; phản hồi một người không đại diện cho thị trường.

## Trục thi công

| Trục / cách kiểm | 4 | 6 | 8 | 10 | Ví dụ thật, nguồn và ý nghĩa |
|---|---|---|---|---|---|
| **T1 — Sự thật và proof.** Đối chiếu claim/asset/state/source/revision/quyền; xem thao tác có kết quả. | Claim/UI không có nguồn, nội dung cấm lộ | Claim đúng nguồn nhưng proof nhỏ/gián tiếp hoặc quyền còn thiếu | Mọi claim trọng tâm có proof đọc được, asset/nội dung/quyền được xác nhận | Toàn bộ chuỗi claim→proof truy nguyên được đến nguồn và revision, không gây hiểu nhầm trong phạm vi kiểm | Brief gốc chỉ cho 10,000+/620/800+, cấm prompt; v3 cho prompt video. Bản tham chiếu VSC trong lessons hiện prompt không thành quyền áp dụng cho v1/v2. |
| **T2 — Readability và hierarchy.** Phone 360, crop full-res, read intervals; OCR/bbox chỉ gợi lỗi, người đọc xác nhận. | Chữ tràn/che/không tìm được điểm neo | Read được khi pause, ở tốc độ thật còn hụt; lớp phụ tranh mắt | Copy chính và CTA đọc ở tốc độ/kích thước dùng, mỗi read có khoảng ổn định | Mọi read bắt buộc và biến thể ratio đã kiểm đều rõ, không lỗi trong strip cuối | TASK-02 Center chấm phone 5 vì chữ nhỏ; TASK-04/05 còn 7; TASK-07-r4 sửa WORKSHOP/02/scrim. Sự tiến bộ có timestamp, không suy thành hiểu sản phẩm. |
| **T3 — Hành động, motion và liên tục phục vụ ý.** Playback/strip đầu–giữa–cuối; state trace, coverage và freeze whitelist. | Motion gây chồng/mất state; hiệu ứng thay câu chuyện | Kỹ thuật cơ bản đúng nhưng lặp staging hoặc có đoạn chết vô ý | Motion làm rõ nguyên nhân/kết quả, điểm neo và hướng nhìn liên tục, có hold đúng mục đích | Toàn tuyến và đoạn khó đạt ý đồ đã duyệt, tốc độ/mối nối/camera không có lỗi trong phạm vi kiểm | TASK-09 Center thấy hành lang như collage, TASK-13 sửa bốn vách/phối cảnh; TASK-15 sửa helix/tường trụ. TASK-17 vẫn báo bốn freeze sớm. Phối cảnh đúng không tự làm câu chuyện mạnh. |
| **T4 — Âm, cấu trúc và sync.** Beat/cue sample, loudness/TP, playback có tiếng; nghe điểm nối. | Hit lệch, âm che read/voice hoặc có clipping | Sync chính đúng nhưng section phẳng/nối tempo vấp | Phrase/voice hỗ trợ reads, cue trong dung sai brief, âm cuối đạt spec và người duyệt đã nghe | Toàn mix/đầu–giữa–cuối/nối tempo/thiết bị cần giao đã kiểm, không lỗi cảm nhận được ghi | TASK-06 đo −14,38 LUFS/−1,27 dBTP nhưng không có chứng cứ nghe trực tiếp; v3 feedback “giây 9 vấp” dù có beat grid. Meter đúng chưa đủ điểm 8 âm cảm nhận. |
| **T5 — Tái lập, vận hành và file giao.** Verify/hash/scope/manifest, decode MP4, frame count/PTS, RAM và resume. | Render thiếu/hỏng/stateful; source/file final không xác định | Một bản chạy được nhưng thiếu evidence hoặc fail một tiêu chí bắt buộc | Verify pass, final đủ spec, scope không đổi, QA có phân loại lỗi, manifest tái lập đủ | Re-render/resume đoạn thử và bàn giao đúng checksum đã xác nhận trong môi trường khóa, mọi check bắt buộc pass | TASK-07-r4 lazy LRU24 thay preload179; TASK-14 lỗi chung `_tiles`; TASK-17 đủ1800 khung nhưng PARTIAL vì tiêu chí freeze/RMS–màu. Exit0 không bằng acceptance. |

## Gate review đề xuất

1. **G2:** A1 và ý định A2 từ storyboard/animatic; chủ phim chốt type/story/hook. Chưa chấm T3/T4/T5 final.
2. **G4:** cả A1–A3 bằng test cụ thể và T1–T4 bằng rough; T5 kiểm verify/benchmark. Ghi số người/test, không bịa phần trăm thị trường.
3. **G6:** mọi trục bắt buộc có evidence trên file giao. Test hành vi chưa có thì A2 ghi mức bằng chứng hiện có, không tự nâng thành conversion.
4. Feedback “v1 ổn hơn” kích hoạt review A1–A3/type/story và so cặp cùng đoạn; không mặc định tăng motion. Ghi preference của chủ phim thành trường riêng, không trộn với lỗi kỹ thuật.
