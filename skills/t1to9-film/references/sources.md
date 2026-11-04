# Nguồn tri thức: gọi thế nào, dùng vào việc gì

Đã kiểm từng nguồn ngày 2026-11-04. Nguồn đổi thì sửa file này, không sửa SKILL.md.

Đường dẫn trên máy viết dạng khoá `<…>` (ví dụ `<T1_KNOWLEDGE>`). Giá trị thật của từng máy để trong `paths.local.md` cạnh `SKILL.md`. File này không commit; mẫu ở `templates/paths.example.md`. Thiếu khoá nào thì hỏi người làm phim, đừng đoán.

## 1. MCP `film-library`: sách điện ảnh

- Server `<FILM_LIBRARY_MCP>/server.py`, user scope. Có 77 sách, 15.019 trang, 12 chuyên mục: EDITING, DIRECTING, WRITING SCREENPLAY, WRITING A SHORT FILM, CINEMATOGRAPHY, FILM THEORY…
- Tool: `library_info`, `list_books(topic)`, `search(query, book?, topic?, limit)`, `read_page(book, page, context)`.
- **Cách tra:**
  1. `search` bằng tiếng Anh, 2–4 từ khoá của cơ chế cần tìm (ví dụ `controlling idea value cause`, `cut on action`, `motif repetition`). Kết quả xếp theo mức khớp: phrase, rồi near, rồi all_words.
  2. Snippet có vẻ đúng thì `read_page` để đọc đủ ý. Đừng trích từ snippet bị cắt ngang.
  3. Ghi vào tài liệu phim: `Tác giả, *Tên sách*, page_label N`, kèm một câu diễn đạt lại.
- `page_label` là trang PDF hoặc mục EPUB, có thể lệch vài trang so với số in. Không trộn hai hệ trang.
- Sách có bản quyền. Chỉ diễn đạt lại, không dán đoạn văn vào file nào, nhất là file sẽ lên GitHub.
- Search khớp từ khoá chưa chắc đúng ý. Ví dụ: `controlling idea` trong *Story* khớp page_label 119, nhưng trang đó nói về subplot. Định nghĩa nằm ở page_label 63.

**Trích dẫn đã kiểm** (dùng lại được, vẫn nên đọc lại trang khi cần):

| Ý | Nguồn | Người kiểm |
|---|---|---|
| Controlling idea = giá trị ở cao trào + nguyên nhân chính dẫn tới nó | McKee, *Story*, page_label 63 | Astra, Claude 2026-11-04 |
| Khi phải đánh đổi khi cắt: cảm xúc, rồi câu chuyện, rồi nhịp; eye-trace và không gian xếp sau | Murch, *In the Blink of an Eye* (rev. 2nd), page_label 16 | Astra, Claude |
| Một chi tiết thành motif khi được lặp lại và mang nghĩa | Pramaggiore & Wallis, *Film: A Critical Introduction*, page_label 33 | Claude |
| Motif được phát triển và biến đổi ở các cảnh sau, không chỉ lặp nguyên | Bordwell & Thompson, *Film Art*, page_label 299 | Claude (snippet) |
| Nhịp cảm nhận phụ thuộc nội dung, cỡ cảnh và chuyển động, không chỉ độ dài shot | Reisz & Millar, *The Technique of Film Editing*, page_label 85 | Astra |
| Cắt giữa hành động để che chỗ đổi góc; muốn match action thì hai shot phải có hành động khớp nhau | Katz, *Film Directing Shot by Shot*, page_label 197–198, 405; Bordwell, *Film Art* page_label 514 | Astra, Claude |

## 2. MCP VSC (Vibeshot): style, prompt, chuyển động

- Gọi `vsc_whoami` một lần đầu phiên để xem hạn mức ngày (search 800, detail 400, media 120).
- **Luật server: search trước, chọn 3–5 mục, rồi mới lấy chi tiết.** Không lấy chi tiết hàng loạt.
- `vsc_search(library, keywords, filters)`. Keywords truyền cả tiếng Trung lẫn tiếng Anh.

| Thư viện | Dùng cho | Lấy chi tiết bằng |
|---|---|---|
| `lexicon` (1.617 style) | Style ảnh: định nghĩa, đặc trưng, khuôn prompt, negative, style dễ nhầm. Đây là nguồn style mặc định | `vsc_get_style(id)` |
| `gallery` | Cách người khác viết prompt cho kiểu ảnh hoặc video tương tự. Lọc `media_type`, `model` (`seedance`…) | `vsc_get_prompt(id)`. **Ghi tên tác giả** |
| `motion` (664) | Chuyển động máy và chuyển cảnh. Lọc `technique`: camera, beat-sync, transformation, transition | `vsc_get_motion(id)`. Có sẵn câu mô tả chuyển động/máy để dùng lại |
| `sref` | Chỉ khi Tuệ muốn dùng Midjourney sref | `vsc_get_sref` |

- Bộ chuyển cảnh trong `motion` hữu ích cho prompt i2v có "tay cắt": CAM-117 干净甩镜 (khung đầu và cuối đều rõ, cắt được), CAM-116 无缝接续, CAM-120 叠化定住 (đoạn cuối chậm dần để giữ khung), CAM-115 匹配推进 (đẩy đều một chiều, dùng cho match cut), CAM-014 甩摇.
- Nội dung VSC là tham chiếu, không phải asset của mình. Không đưa prompt hay ảnh của người khác lên repo public.

## 2b. aicameramovements.com: chuyển động máy cho i2v

- Đây là thư viện miễn phí cho cộng đồng: 46 chuyển động máy chia 7 nhóm, mỗi cái một prompt theo khuôn Movement / Speed / Framing / End. Trang dựng prompt của site tách SUBJECT / LOCATION / SCENE ACTION / MOOD khỏi phần chuyển động máy.
- Bản chưng cất đã nằm ở `camera-moves.md`, nên khi làm phim không cần mở lại trang. Chỉ mở lại để kiểm xem site có chuyển động mới hay không: tải 1 trang, không cào video.

## 3. T1 knowledge: cấu trúc prompt zh-CN

- **Bản chính: `<T1_KNOWLEDGE>`** (GitHub `tue0111/t1-visual-knowledge`, v2.8.0, khớp origin ngày 2026-11-04). Có skill `.claude/skills/t1-visual-prompt`.
  - Thứ tự đọc: `AGENTS.md`, `system/01_MINDSET.md`, `system/03_WORKFLOW.md`, `system/LEARNINGS.md`. Tra `system/02_KNOWLEDGE.md` theo trục chính. Nhiều người, series hay tham chiếu thì tra thêm `system/05_CRAFT.md`. Cơ chế hành động và đường nhìn ở `system/06_FILM_GROUNDING.md`.
  - Khuôn 3 phần 【母版锁】【分镜】【通用负面提示词】 nằm ở `system/04_TEMPLATES.md`.
  - Lint: `python <T1_KNOWLEDGE>/tools/t1lint.py --no-brand --strict --allow S <file>` (đã chạy thử PASS ngày 2026-11-04). **Phim luôn dùng `--no-brand`**, vì chữ ký chỉ đóng ở hậu kỳ cuối phim.
  - Ảnh lỗi: chạy "Vòng sửa" trong `03_WORKFLOW.md`, rồi thêm một dòng vào `system/LEARNINGS.md` của repo đó. Repo đó là kho riêng, nên ghi vào đó cần Tuệ đồng ý.
- Bản cũ: `<T1_PROMPT_OS_LEGACY>` (`MASTER_INDEX.md`, `T1_TO_9_VISUAL_PROMPT_OS_v2\core\03,08,09,10`). Dùng để tra sâu album engine (khoá mẹ, xoay trục, attractor) và negative engine 3 tầng. Nếu hai bản mâu thuẫn thì theo bản GitHub. Lưu ý: luật brand mặc định của OS là in "T1 to 9" ở góc phải dưới ảnh. **Phim bỏ luật này.**

## 4. Nhà cung cấp sinh hình và âm

Skill không phụ thuộc riêng vào Sumi. Nhà cung cấp nào cũng phải đi qua giao thức chi tiền trong SKILL.md.

**Sumi Studio (MCP `sumi-studio`)**
- `doctor` cho biết scope và số dư. Số dư chỉ để tham khảo, không suy ra là đủ tiền.
- `list_models(taskType="image_to_video")` liệt kê model, `get_model(model, taskType)` cho biết input, giới hạn và notices. Đọc notices cho Tuệ nếu có liên quan.
- Chi tiền theo thứ tự: `estimate_task` (miễn phí), `quote_task` (ra quoteId), báo Tuệ, `create_generation_task` với đúng payload đã quote, `wait_task`/`get_task`. Lấy file gốc bằng `get_asset_download_url` (tính vào lượt tải tháng).
- Ảnh có mặt người tốn thêm phí đăng ký chân dung (phim cũ là +2 điểm mỗi ảnh). Phí này phải nằm trong báo giá.
- Quy tắc model rút từ phim cũ và từ 古一: cảnh nặng hiệu ứng, cảnh hero thì Seedance 2.5; cảnh diễn của người thì 2.0; cảnh đơn giản thì 2.0 Fast hoặc Mini. Danh sách và giá đổi theo thời gian, nên luôn `list_models` và quote lại, không dùng giá cũ.
- Nhạc: `music_generation` (Suno). Video i2v dặn **không có BGM**. BGM ghép một lần ở hậu kỳ.

**Codex imagegen** (sinh ảnh tĩnh): giao prompt đã lint cho Codex. Lượt ảnh tốn quota của Tuệ, ghi số lượt vào ledger theo đơn vị riêng, không gọi là "miễn phí".

## 4b. Giao việc cho Codex

- Lệnh: `codex exec -C <thư mục việc> -s workspace-write --skip-git-repo-check "Đọc TASK.md…"`. Chạy ngầm, chỉ cho ghi vào `out/`, Center soát rồi mới chép vào nơi dùng.
- **Codex exec không gọi được MCP film-library**: chính sách duyệt là `never`, nên mọi lệnh gọi tool bị chặn (đã gặp ngày 2026-11-04). Phần trích sách do Center tự làm, hoặc bật quyền MCP cho Codex trước khi giao.
- Giao nguồn web cho Codex dưới dạng file đã tải sẵn (tải 1 lần), không để Codex tự cào.

## 5. Jev (TypeSafe, tùy chọn)

- Gọi qua `node <PREV_FILM>/tools/jev.mjs req.json`. Script này spawn `<JEV_SERVER>/index.js`. Tham số `criteria` phải là dict.
- Trước khi dùng thì nạp skill `anthropic-skills:jev-decision-practices`.
- **Jev chỉ thấy mô tả mình viết, không thấy pixel.** Mô tả phải trung tính: ghi số đo (ngón tay, hướng nhìn, trạng thái đạo cụ, độ hợp màu), không ghi nhận xét kiểu "bố cục đẹp nhất". Không được để lộ ứng viên mình đang thích.
- Ghi kết quả gồm choice, xác suất và độ tin. Kết quả là ý kiến phụ, không thay việc soi ảnh, không thay Tuệ duyệt, không mở quyền chi tiền.

## 6. Code tái dùng từ phim trước

`<PREV_FILM>/tools/`, chạy bằng Python 3.12 (`<PY312>`, đã có cv2, numpy, librosa):

| File | Làm gì | Lưu ý |
|---|---|---|
| `render.py` | Renderer từng khung: timeline JSON → MP4. Có clip, thẻ, flash, chuyển cảnh, grain, chữ ký | Có state toàn cục (`LOOK`, cache clip). Clip hết nguồn thì bị kẹp vào khung cuối mà không báo. Chép sang phim mới rồi sửa, đừng import thẳng |
| `blend.py` | So 3 preset grade (`--compare`), chỉ chuẩn hoá WB | Không ép phơi sáng hay tương phản về một trung bình |
| `sfx.py` | SFX tổng hợp + mix theo cue | Âm tổng hợp vẫn phải nghe |
| `sheet.py` | Contact sheet | |
| `cutout.py` | Tách chủ thể | |
| `jev.mjs` | Cầu nối Jev | |

Beat grid: dùng `beat_grid.py` và `beats.py` của skill anh em `code-motion-video` (cùng repo, thư mục `skills/code-motion-video/scripts/`). Không chép sang đây.
