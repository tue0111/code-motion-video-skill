# Center–Worker: Claude đạo diễn, Codex/GPT thi công

Nguồn: 李岳 "Codex + GPT-6.1 Sol làm motion video" (02/10/2026), video mẫu của tác giả, bài 观默, và giới hạn nền tảng gặp khi dựng.

## Vì sao tách vai
- **GPT-6.1 Sol thi công tốt:** một clip 30 s, 1920×1080, 60 fps, nhạc gốc 144 BPM, asset thật, QR cuối phim, khoảng 22 phút ở fast mode và dưới 4% quota tuần (theo lời tác giả). Nó có thể **học một repo** (awesome-ai-motion) trước khi làm, nhưng hay "học lướt", phải bảo học tiếp.
- **Nó thiếu lớp đạo diễn.** Với prompt một câu ("làm cho cool, 30 giây"), video mẫu ra cảm giác slideshow: 6/8 đoạn cùng bố cục chữ trái ảnh phải, cắt cứng giữa trạng thái, glitch ở khoảng 14,3 s làm hai nhãn chồng nhau. 观默 nhận xét tương tự: Codex không tự bổ sung lớp đạo diễn, chỉ làm cho "chạy được".
- **Claude làm Center:** brief, tham chiếu, shotlist, gate, critic. Phần này cần phán đoán và nhìn ảnh, tốn ít token. Code nặng và render dài đẩy sang quota GPT. Hai quota cộng lại, mỗi bên làm việc mình giỏi.

## Phân quyền
| | Center (Claude) | Worker (Codex) |
|---|---|---|
| Sở hữu | `docs/brief.md`, `style_guide.md`, `shotlist.md`, `review_log.md`, `tasks/**`, `AGENTS.md` | `index.html`, `scenes/**`, `out/**`, `reports/**` |
| Làm | G1–G2 một mình; viết lệnh việc; chấm điểm khung; quyết định sửa gì; nghiệm thu cuối | Code theo lệnh; tự kiểm (`--verify`, `--sheet`, `--strip`); render; báo cáo |
| Không làm | Không code scene khi Worker đang giữ file đó (tránh ghi đè) | Không sửa docs của Center; không tự chấm thẩm mỹ; không làm ngoài phạm vi |

## Kênh liên lạc: thư mục phim là hộp thư
```
film/
  AGENTS.md            luật nhà + giao thức Worker (templates/center/AGENTS.md)
  CLAUDE.md            luật nhà (templates/studio/CLAUDE.md)
  center/watch-tasks.ps1   hộp thư: thấy tasks/queue/TASK-*.md → chạy `codex exec` → reports/
  center/setup.ps1     cài playwright/chromium, kiểm node/ffmpeg/codex → logs/setup.txt
  docs/  tasks/queue/  tasks/done/  reports/  logs/  assets/  lib/  scenes/  out/check/
```
- **Kích hoạt:** người dùng chạy một lần `powershell -ExecutionPolicy Bypass -File center\watch-tasks.ps1` trong thư mục phim. Watcher gọi `codex exec --skip-git-repo-check -C <film> -s workspace-write -c model_reasoning_effort=high -o reports/ID.last.txt "<lệnh>"`. Center tắt từ xa bằng cách ghi file `tasks/STOP`.
- **Vì sao không gõ thẳng vào terminal:** computer use chỉ cấp quyền "xem + click" cho terminal, IDE và File Explorer, không cho gõ phím. Cách làm đã chạy thật: Center ghi `START-CENTER.cmd` vào thư mục phim (`device_commit_files`), mở File Explorer, **double-click** file đó. Nó chạy `setup.ps1` rồi bật `watch-tasks.ps1` trong cửa sổ riêng. Cập nhật watcher thì ghi `tasks/STOP` (watcher cũ tự tắt sau lệnh đang chạy), đẩy script mới, double-click lại. Chỉ xếp lệnh mới vào hàng **sau khi** watcher mới đã chạy, nếu không watcher cũ sẽ nhận lệnh trước khi đọc STOP.
- **Center đọc kết quả:** `device_list_dir reports/` → có `TASK-NN.done.json` là xong → stage `reports/TASK-NN.md` và `out/check/TASK-NN-*.png` → Read ảnh → chấm điểm. Cờ của CLI có thể đổi giữa phiên bản: đọc `logs/codex-exec-help.txt` nếu exit ≠ 0.
- **Sandbox `workspace-write`:** Worker chỉ ghi trong thư mục phim, không có mạng. Mọi thứ cần tải (playwright, font, asset) phải xong ở `setup.ps1` hoặc do Center đưa vào `assets/` trước.

## Vòng làm việc
1. **G1–G2 (chỉ Center):** brief → phân tích tham chiếu → `style_guide.md` (palette hex, font, 6:3:1, nhóm chuyển động, camera) → `shotlist.md` (beat, trạng thái vào/ra, reads, cue âm, **mỗi đoạn một bố cục khác nhau**) → người dùng duyệt.
2. **TASK-01 (G3 khung xương):** Worker dựng `index.html` + `seek(t)`, đặt key pose mỗi shot, chưa cần chuyển động mượt. Bằng chứng: sheet các mốc key pose.
3. **TASK-02..k (G4 rough):** mỗi lệnh 1–3 shot liền nhau, có chuyển cảnh. Lệnh nhỏ thì Worker ít lạc và Center chấm dễ.
4. **Critic sau mỗi báo cáo:** Center xem sheet, strip, phone; chấm 1–10 trên 7 trục; ghi `review_log.md`; viết lệnh sửa **chỉ 3 lỗi lớn nhất**, mỗi lỗi có timestamp, bằng chứng, biến và kết quả mong muốn.
5. **G6:** lệnh render full `--sub 4` + `sfx.mjs`/nhạc + `node scripts/qa.mjs`. Center tự stage MP4, trích khung, nghe lại các mốc cue trước khi nghiệm thu.

## Kết quả chạy thật (02/10/2026, Windows, codex-cli 0.159.3)
- `codex exec -s workspace-write` chạy được Playwright và Chromium **bên trong sandbox**: verify OK trên Windows giống hệt Linux.
- TASK-00 (smoke test và học luật) mất 5,6 phút. Codex theo đúng giao thức: dán nguyên lỗi, giữ PARTIAL, không làm vượt phạm vi, **tự tìm ra lỗi hình** (cột biểu đồ đè lên số) và chỉ ra 3 lỗ hổng giao thức. Đã vá cả ba: phạm vi CLAUDE.md và AGENTS.md, vòng đời lệnh (`done.json` do watcher sở hữu, chạy lại thì dùng ID `TASK-NN-r2`), bảng bằng chứng theo gate.
- Bẫy môi trường: ffmpeg cài qua winget nhưng chưa vào PATH của tiến trình, nên `spawn ffmpeg ENOENT`. Watcher và setup giờ tự tìm trong `%LOCALAPPDATA%\Microsoft\WinGet\Packages\Gyan.FFmpeg*`. PowerShell 5.1: `Tee-Object` và `*>` ghi UTF-16, nên log của Center phải ghi bằng `Out-File -Encoding utf8`. File `.ps1` có tiếng Việt phải là UTF-8 có BOM.

- **Launcher không thấy tên trong Explorer** (cửa sổ khác che danh sách, chỉ còn 1–2 hàng đầu đọc được): đặt mỗi `.cmd` vào **thư mục riêng tên bắt đầu bằng `_`** (`_run/1-WATCHER.cmd`, `cd /d "%~dp0.."`). Thư mục đó lên đầu danh sách, bên trong chỉ có một file ở hàng đầu, double-click chắc trúng. Đừng đoán hàng theo icon.
- **`device_commit_files` có lúc để lại bản cũ trên máy** khi ghi đè cùng tên. Cần chắc chắn thì commit tên mới (`script-v2.ps1`) và trỏ launcher sang đó, rồi kiểm `size` bằng `device_list_dir`.
- **Font khi GitHub raw bị chặn (403) ở sandbox cloud:** lấy từ npm: `npm pack @fontsource-variable/<font>` (registry npm được phép). Gói có woff2 và CSS `unicode-range`. Với CJK, chỉ giữ các chunk phủ đúng ký tự trong brief/shotlist (khoảng 10 chunk, dưới 1 MB), viết lại một `assets/fonts/fonts.css`, rồi commit thẳng vào máy. Không cần chạy script tải trên PC. Worker chờ font bằng `document.fonts.load(font, '<chuỗi CJK>')`.
- Watcher có thể đã tắt (cửa sổ bị đóng). Sau khi xếp lệnh, kiểm `logs/` sau một chu kỳ poll: không có `TASK-NN.log` mới thì chạy lại launcher.

- **Quyết định có tham số bằng Jev (TypeSafe Decisions API, MCP `jev_decide`)** khi Center không tự kiểm được bằng giác quan (ví dụ không nghe được nhạc): đưa số đo + quan sát vào `state`, hỏi kiểu `noul` (accept?), `score` (mức rủi ro theo thang), `choice` (sửa ngay / sau hình / không sửa). Ghi xác suất vào `review_log.md` và vào lệnh việc kế tiếp. Ví dụ thật: TASK-03 nhạc → accept 0,75, đơn điệu 2,92/4, sửa sau hình 0,79.

## Viết lệnh việc cho GPT (điều rút ra)
- **Tách rõ "cái gì" và "làm sao":** Center chốt trạng thái, mốc, cảm giác. Worker chọn cách code. Ghi luật cấm cụ thể ("không dùng lại bố cục chữ trái/ảnh phải của S02"), vì "làm cho cool" sẽ quay về mặc định.
- **Lệnh có tiêu chí kiểm được:** "khung 3,5 s: số 449 nét, không chồng nhãn trong strip 3,4:3,8". Không viết "đẹp hơn".
- **Một lệnh = một gate nhỏ, ≤ khoảng 20 phút Worker.** GPT chậm (22 phút cho cả clip ở fast mode), lệnh lớn thì khó sửa.
- **Bắt học trước khi làm (lần đầu):** TASK-00 cho Worker đọc `AGENTS.md`, `references/*.md` của skill (copy vào `docs/skill/`) và 3–5 case tham chiếu đã chọn, rồi tóm tắt điều sẽ áp dụng vào `reports/TASK-00.md`. Center kiểm tóm tắt đó; nếu học lướt thì giao học tiếp.
- **Vòng sửa dạng timestamp:** "giây 14,2–14,5: hai nhãn chồng nhau trong lúc chuyển → chuyển nhãn bằng swapAlpha, ảnh dùng wipe theo trục X thay vì glitch".
- **Leo thang:** cùng một lỗi sửa 2 lần không xong thì Center đổi cách (đổi kỹ thuật, tách nhỏ lệnh, hoặc tự viết đoạn code mẫu vào lệnh).

## Lệnh học (TASK-00) mẫu
```
Đọc AGENTS.md, CLAUDE.md, toàn bộ docs/skill/*.md và các case trong docs/refs/.
Tóm tắt vào reports/TASK-00.md: (1) 10 luật bạn sẽ áp dụng cho phim này, (2) với mỗi case tham chiếu:
nhịp trung bình giữa các thay đổi, kiểu chuyển cảnh, cách chữ vào/ra, palette, (3) những gì bạn chưa rõ.
Không viết code ở lệnh này.
```
