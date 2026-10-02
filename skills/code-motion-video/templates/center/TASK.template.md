# TASK-NN — <tên ngắn, động từ>

**Gate:** G3 stills | G4 rough cut | G5 sửa lỗi | G6 final
**Ngân sách:** ~<N> phút Worker · effort <medium/high>

## Mục tiêu (một câu)
<Người xem sẽ thấy/hiểu gì sau lệnh này>

## Bối cảnh cần đọc
- docs/brief.md · docs/style_guide.md · docs/shotlist.md (các shot: S0x–S0y)
- <báo cáo/ảnh trước, nếu là vòng sửa: reports/TASK-MM.md, out/check/...>

## Phạm vi
- Được sửa: <file/cảnh cụ thể>
- **Ngoài phạm vi:** <những gì KHÔNG được đụng>

## Yêu cầu cụ thể
1. <mốc thời gian / khung> — <trạng thái vào> → <trạng thái ra> — <chuyển động, lò xo, camera> — <cue âm>
2. ...
(Vòng sửa: mỗi lỗi ghi **timestamp → bằng chứng nhìn thấy → biến cần sửa → kết quả mong muốn**)

## Tiêu chí nghiệm thu (Worker tự kiểm, Center kiểm lại)
- [ ] `node render.mjs --verify <mốc>` OK
- [ ] Khung <t> : <điều phải thấy>
- [ ] Không chồng chữ / tràn khung trong `--strip <a:b>`
- [ ] <tiêu chí riêng>

## Bằng chứng phải nộp
- `node render.mjs --sheet <mốc> --out out/check/TASK-NN-sheet.png`
- `node render.mjs --strip <a:b> --out out/check/TASK-NN-strip.png`
- (G6) `node render.mjs --sub 4` + `out/final.mp4` + `node scripts/qa.mjs out/final.mp4 out/qa`
