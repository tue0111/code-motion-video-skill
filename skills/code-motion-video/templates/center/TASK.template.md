model: <slug>
effort: <level>
<!-- Hai dòng đầu là tùy chọn và phải nằm trong 5 dòng đầu file: xóa cả dòng nếu dùng model/effort mặc định của watcher. watch-tasks.ps1 đọc `model: <slug>` (vd gpt-6.1-sol) và `effort: low|medium|high|xhigh`, ghi đè -Model/-Effort cho đúng lệnh này. Giữ nguyên placeholder `<...>` thì watcher bỏ qua dòng đó. -->
# TASK-NN — <tên ngắn, động từ>

```text
Role: WORKER | PLANNER/BUG-HUNTER
Task kind: production | planning | doc-review | utility
Gate: G0 | G1 | G2 | G3 | G4 | G5 | G6 | không áp dụng
Model requested: <tên yêu cầu (khớp dòng model: ở đầu file nếu có), không phải bằng chứng model thực>
Allowed writes: <danh sách path>
Report: reports/<ID>.md
```
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

## Tiêu chí nghiệm thu và bằng chứng (Worker tự kiểm, Center kiểm lại)
> Chỉ giữ nhánh phù hợp với `Task kind`. Xóa placeholder chưa dùng trước khi xếp task.

**Planning / doc-review:** source revision và phạm vi đã đọc; findings có vị trí/evidence/cách sửa; kiểm phép tính/liên kết; báo model thực và scope. Không yêu cầu render.

**Production:** giữ verify, sheet, strip, phone, MP4 QA theo gate.
- [ ] `node render.mjs --verify <mốc>` OK
- [ ] Khung <t> : <điều phải thấy>
- [ ] Không chồng chữ / tràn khung trong `--strip <a:b>`
- [ ] <tiêu chí riêng>
- Bằng chứng: `node render.mjs --sheet <mốc> --out out/check/TASK-NN-sheet.png` · `node render.mjs --strip <a:b> --out out/check/TASK-NN-strip.png`
- (G6) `node render.mjs --sub 4` + `out/final.mp4` + `node scripts/qa.mjs out/final.mp4 out/qa`

**Utility:** chỉ kiểm kết quả tiện ích được giao.
