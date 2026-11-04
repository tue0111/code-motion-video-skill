# Cổng G0–G6: vào cần gì, ra phải có gì

Dựa trên đề xuất cổng của Codex Astra (`<PREV_FILM>/reports/TASK-03-astra.md` §4), đã rút gọn cho một người làm. Một phim chỉ cần **một** `shots.json`, **một** `ledger.md` và **một** `approvals.md`. Đừng đẻ ra hàng chục báo cáo.

## Thư mục phim

```text
<phim>/
  docs/g0.md          kịch bản G0 (templates/g0.md)
  prompts/shots.md    prompt ảnh zh-CN + prompt i2v
  shots.json          danh sách shot, nguồn sự thật cho dựng và diff (templates/shots.json)
  cuts.md             cut map: chỗ nào hard cut, chỗ nào nhấn, vì sao
  ledger.md           sổ chi: quote, gửi, xong, lỗi, hoàn (templates/ledger.md)
  approvals.md        ai duyệt gì, bản nào, lúc nào (templates/approvals.md)
  img/raw  img/graded  clips/  audio/  review/  out/  tools/
```

## Quy tắc duyệt

- Một dòng duyệt gồm: cổng, artifact và revision (tên file + sha256 8 ký tự đầu), phạm vi (shot nào, gói chi nào), câu nguyên văn của Tuệ, thời điểm. Không tự ghi thay Tuệ. Câu "ok làm tiếp" trong chat thì chép đúng câu đó.
- Đổi nhạc, đổi story hoặc đổi pick quan trọng thì các duyệt phụ thuộc mất hiệu lực, phải duyệt lại ở cổng tương ứng. Đổi CRF hay mã hoá thì chỉ cần QA lại.
- Cổng chỉ chặn phần cần đầu vào còn thiếu. Ví dụ đang chờ duyệt G0 thì vẫn được dựng beat grid từ nhạc có sẵn.

## G0 · Kịch bản

- **Vào:** ý tưởng của Tuệ, nhạc tạm hoặc mood, asset có sẵn.
- **Làm:** theo `g0-script.md`. Tra film-library cho ý chính, motif và cấu trúc. Tự phản biện G0 bằng K-check trước khi gửi.
- **Ra:** `docs/g0.md` có trần `B`, số vòng thử, danh sách asset tái dùng.
- **Chi trước cổng:** 0.

## G1 · Tham chiếu và prompt

- **Vào:** G0 đã duyệt.
- **Làm:** VSC lexicon/gallery cho style, T1 knowledge cho cấu trúc, viết `prompts/shots.md` theo `prompts.md`. Lập `shots.json`: mỗi shot có id, beat, người có mặt, động từ, trạng thái đạo cụ vào/ra, máy, ánh sáng, vai trò trong câu chuyện, `required`.
- **Hard test giải phẫu** (nếu cần) là một lệnh riêng cho những ca rủi ro của *chính shot list này*, không phải nguồn để chọn shot.
- **Ra:** prompt đã lint PASS, gửi Codex hoặc nhà cung cấp ảnh sinh.
- **Chi:** chỉ quota ảnh đã nói ở G0. Nhạc thử (nếu có) đi theo giao thức chi tiền.

## G2 · Animatic

- **Vào:** ảnh đã soi và chọn (soi raw trước, grade sau), nhạc thật, beat grid đã nghe để xác nhận phách.
- **Làm:** grade thử 2–3 preset trên 2–3 ảnh đại diện (`blend.py --compare`). Animatic tốc độ thật bằng ảnh tĩnh và Ken Burns nhẹ trên nhạc thật. Viết `cuts.md` theo `cut-grammar.md`. Chọn model và độ phân giải cho từng shot, rồi `estimate_task`.
- **Ra:** `review/animatic.mp4` + sheet + bảng giá (pilot + batch + dự phòng). **Tuệ duyệt story, hook, timing, look, thẻ ảnh (nếu dùng), gói pilot.**
- Shot bị cắt khỏi animatic thì không sinh video.

## G3 · Pilot rồi batch

- **Vào:** gói pilot đã duyệt.
- **Làm:** quote rồi chạy **1 clip** khó nhất (cận tay, hai người, đạo cụ đổi trạng thái). Soi từng khung theo `qa.md` §i2v, ghi `usable`. Pilot đạt thì quote cả batch. Clip nào hỏng thì sửa prompt hoặc đổi coverage. Không retry mù.
- **Ra:** strip từng clip, `usable` trong `shots.json`, ledger cập nhật. **Tuệ duyệt batch** trước khi chạy.

## G4 · Rough cut

- **Vào:** footage đã soi, nhạc, cut map.
- **Làm:** dựng theo `shots.json`. Chạy QA máy (`qa.md`). Review mù: xem MP4 ở tốc độ thật trước khi đọc lý do của chính mình, ghi lỗi theo timestamp.
- **Ra:** `out/vN.mp4`, sheet, `film_qa.py diff` so với bản trước, bảng màu, loudness. Gửi Tuệ kèm tối đa 3 lỗi ưu tiên.

## G5 · Sửa

- Chỉ sửa đúng lỗi Tuệ chốt. Ưu tiên sửa màu hoặc timing trước khi tính chuyện sinh lại. Sinh lại thì đi giao thức chi tiền.
- Mỗi bản mới: diff shot (không được âm thầm làm rơi shot), QA hồi quy vùng sửa, before/after.

## G6 · Giao

- Tuệ xem và nghe đúng file (ghi sha256) trên điện thoại và tai nghe. Ghi `audio_review` = PASS hoặc lỗi kèm thời điểm.
- Đặt tên FINAL không có nghĩa là đã nghiệm thu. Chỉ dòng duyệt G6 trong `approvals.md` mới tính.
- Sau phim: thêm bài học mới vào `references/case-*.md` của skill (hoặc file case mới), và vào `LEARNINGS.md` của t1-visual-knowledge nếu là bài học về prompt ảnh (hỏi Tuệ trước).

## Ngân sách theo cổng

`B` do Tuệ chốt ở G0. Gợi ý chia, Tuệ có thể đổi:

| Mốc | Lũy kế tối đa |
|---|---|
| Trước G2 | nhạc thử, ≤ 3% B |
| Pilot (G3) | ≤ 12% B |
| Batch (G3) | ≤ 80% B |
| Dự phòng G5 | 20% còn lại. Không tự mở, mỗi gói sửa cần Tuệ duyệt |

Báo giá cao hơn phần còn lại thì phải sửa kế hoạch (hạ độ phân giải, đổi model, bỏ shot), không tự vượt trần.
