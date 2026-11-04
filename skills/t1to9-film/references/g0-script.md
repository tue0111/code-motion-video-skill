# G0: viết kịch bản trước khi có ảnh

Phim T1 to 9 là phim ngắn không thoại, dài 20–60 s, chiếu trên điện thoại. Hồi v1–v4, *mùa hè cuối cấp* hỏng vì không có G0: shot list được chọn theo "8 ca bẫy giải phẫu", nên ra 8 tấm bưu thiếp, rồi phải lấy hiệu ứng ra lấp. Xem `case-mua-he-cuoi-cap.md`.

## Thứ tự viết (khuôn ở `templates/g0.md`)

0. **Loại phim.** Chọn một loại chính và tối đa một loại phụ theo bảng chọn ở cuối `film-types.md`. Ghi lý do, và ghi luôn loại đã cân nhắc nhưng bỏ. Từ đây trở đi, dùng chuỗi câu hỏi tư duy của loại chính thay cho các câu chung bên dưới mỗi khi hai bên khác nhau.
1. **Người xem và sự thay đổi.** Ai xem, trên nền tảng nào. Sau phim họ *cảm* gì và *làm* gì (xem lại, gửi cho ai). Viết thành hành vi quan sát được.
2. **Ý chính (controlling idea), một câu.** Có giá trị (cuối phim đổi thành gì) và nguyên nhân (nhờ hành động nào). Tra: `search("controlling idea value cause", book="story")`, xem McKee page_label 63. Phim mood vẫn cần một câu về cảm giác thay đổi từ A sang B nhờ đâu. Đừng ép phim mood thành ba hồi.
3. **Một nhân vật chính, khoá ngoại hình.** Gồm dáng mặt, tóc, một dấu riêng nhìn thấy được (đồng hồ, kẹp tóc…) và một đạo cụ gắn với họ. Có nhân vật thứ hai thì phải khác rõ về mặt, tóc và phụ kiện, để không thành sinh đôi. Đây là nguồn của 人物锁 ở G1.
4. **1–2 motif.** Mỗi motif có setup, nhắc lại và payoff, và **phải đổi nghĩa** ở lần cuối (Bordwell, *Film Art*, page_label 299; Pramaggiore & Wallis page_label 33). Motif là một vật hay một hành động do ảnh hoặc video sinh ra, không phải hiệu ứng code. Không lặp một motif đến nhàm: 28 s thì mỗi motif xuất hiện 2–3 lần là đủ.
5. **Câu test giây thứ 5.** Câu hỏi người xem tự đặt ra khi xem 5 giây đầu. Ghi luôn điều kiện đạt (họ phải thấy gì). Khung 0 phải đầy và đang chuyển động.
6. **Beat sheet có động từ.** Mỗi beat có thời gian, động từ, hình ảnh, nguồn (ảnh có sẵn hay cần sinh), người có mặt. Động từ là hành động của nhân vật (*giữ lại, tìm, trao*), không phải tính từ mô tả không khí.
7. **Âm thanh có lý do.** Nhạc (tempo, chỗ drop, chỗ nghỉ), SFX gắn với hành động trên hình, chỗ im lặng.
8. **Chữ ký.** Chỉ ở cuối phim. Nếu được thì đặt nó vào câu chuyện, ví dụ làm dòng cuối, nhưng phải trên footage thật và không vẽ đạo cụ.
9. **Sản xuất:** shot cần sinh mới, model và độ phân giải dự kiến, ước giá, đề xuất trần `B`, asset tái dùng.
10. **Rủi ro** và **câu cần Tuệ chốt** (tối đa 3).

## Tra film-library cho G0

| Câu hỏi | Gợi ý query | Chủ đề |
|---|---|---|
| Ý chính có đủ hai vế chưa | `controlling idea value cause` | WRITING SCREENPLAY |
| Motif biến đổi thế nào | `motif repetition`, `motif develop` | FILM THEORY |
| Phim ngắn mở và kết thế nào | `short film opening`, `ending image` | WRITING A SHORT FILM |
| Setup và payoff | `setup payoff`, `plant payoff` | WRITING SCREENPLAY |
| Ẩn dụ bằng hình hoặc đạo cụ | `visual metaphor prop` | DIRECTING, PRODUCTION DESIGN |

Mỗi G0 trích ít nhất một nguồn đã `read_page`, ghi đúng `page_label`.

## K-check: tự phản biện trước khi gửi Tuệ

Học theo cách chấm K1–K7 của `<STUDIO>/docs/script-critique.md`, sửa lại cho phim không thoại. Mỗi mục cho điểm /10 và một câu bằng chứng (có mốc thời gian).

| K | Câu hỏi |
|---|---|
| K1 | Khung 0 đầy và đang chuyển động chưa? Read đầu tiên xong trước 1,5 s chưa? |
| K2 | Hết 5 s, người lạ có tự đặt đúng câu test không? Họ thấy được vật hay hành động nào để đặt câu đó? |
| K3 | Mỗi beat có động từ của nhân vật chưa, hay chỉ có không khí? |
| K4 | Motif có đổi nghĩa ở payoff không, hay chỉ lặp lại? Có bị lặp đến nhàm không? |
| K5 | Có shot nào cần code vẽ vật thể không? (phải bằng 0) |
| K6 | Nhân vật có khoá đủ để không lẫn mặt không? Shot nào có hai người? |
| K7 | Có khả thi trong trần `B` không? Shot khó nhất là shot nào, có phương án dự phòng không? |

Điểm thấp nhất là việc phải sửa trước khi gửi. Nếu chỉ sửa được bằng hiệu ứng thì quay lại ý chính.
