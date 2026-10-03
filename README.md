# code-motion-video

Skill làm video motion bằng code, dùng chung cho Claude (Cowork plugin, account skill) và Codex.

Nguồn tổng hợp: 宝玉 (cơ chế), rari "Motion Engineering" (studio + gate), 观默 (ngôn ngữ chuyển động), 南鸢 nuyoah (17 cú máy, phân cấp 6:3:1), Movez (setup studio, 5 mẫu prompt, critic chấm điểm), cùng các repo HyperFrames, ClaudeAnimationBase, claude-video-studio, pdoom-video, claude-animation-skill, Austerlitz, awesome-opus-5-5-videos. Kho dữ liệu thô không nằm trong repo này.

## Cấu trúc

```
.claude-plugin/plugin.json      manifest plugin Cowork
skills/code-motion-video/
  SKILL.md                      lõi: quy trình 6 gate, luật cứng
  references/                   chi tiết, chỉ đọc khi cần (director-mindset.md: checklist một trang)
  templates/                    brief, style guide, shotlist, review, timeline
  lib/motion.js                 lò xo dạng đóng, track, frameT, loopT, rng, camera 2.5D
  scripts/                      render.mjs, beats.py, sfx.mjs, beat_grid.py, qa_video.sh
  templates/studio/             CLAUDE.md + AGENTS.md (luật nhà cho mỗi project phim)
  templates/center/             AGENTS.md cho Worker (Codex) + mẫu lệnh việc TASK
  scripts/center/               watch-tasks.ps1 (hộp thư Center→Codex, khoá một watcher), setup.ps1
  examples/minimal/             phim 6 s "một hình không cắt" + cues.json
AGENTS.md                       điểm vào cho Codex
```

## Cài

- **Cowork:** cài repo này như một plugin (manifest ở `.claude-plugin/`).
- **Claude account skill:** chỉ nhận một SKILL.md, nên dùng bản lõi `skills/code-motion-video/SKILL.md`.
- **Codex:** clone repo, để `AGENTS.md` ở gốc project hoặc copy `skills/code-motion-video/` vào thư mục skills của Codex.

## Đạo diễn trước, đẹp sau (v0.4.0)

Bài học từ một phim thật (`references/case-film01.md`, theo ghi nhận Center): phim kỹ thuật sạch, Center chấm ≥ 8 mọi trục của rubric 7 trục cũ, vẫn bị chủ phim chê vì **chọn sai loại phim**. Từ v0.4.0:
- **G0** bắt buộc: biết–cảm–làm → chọn loại phim (`references/film-types.md`, 11 loại kèm cấu trúc 15/30/60 s) → câu trả lời mong muốn ở giây 5.
- **G2:** storyboard/animatic tốc độ thật được chủ phim duyệt. Im lặng không phải là duyệt.
- **Rubric mới** (`references/rubric.md`): A1–A3 khán giả (hiểu / muốn / nhớ) + T1–T5 thi công; `mandatory_axes` theo gate; chưa kiểm = UNTESTED.
- **Checklist một trang** (`references/director-mindset.md`): 15 câu hỏi đạo diễn, đọc trước style và ở mỗi lần review. Ví dụ dry-run G0 trên ba brief ngắn: `references/dryrun-g0-examples.md`.
- **30 lỗi hay gặp** kèm cách phát hiện bằng máy (`references/failure-modes.md`) và chuỗi 15 bước brief → phim (`references/director-decision-chain.md`).

## Ba bên: Claude đạo diễn · Astra dò lỗi · Sol thi công

Claude giữ brief, style guide, shotlist, chấm rubric, chốt nghiệm thu. Astra (model GPT cao nhất) lập kế hoạch, phản biện và dò lỗi. Sol (GPT) code và render theo lệnh việc.
Hai bên nói chuyện qua file trong thư mục phim: `tasks/queue/TASK-NN.md` → `reports/TASK-NN.md` + `out/check/*.png`. Mỗi root chỉ một watcher (khoá `tasks\watcher.lock`); chọn model/effort cho từng lệnh bằng dòng `model: <slug>` / `effort: <level>` trong 5 dòng đầu của TASK.

```powershell
# trong thư mục phim (Windows)
powershell -ExecutionPolicy Bypass -File center\setup.ps1        # playwright + chromium, kiểm node/ffmpeg/codex
powershell -ExecutionPolicy Bypass -File center\watch-tasks.ps1  # hộp thư: thấy TASK mới → codex exec (sandbox workspace-write)
```

Chi tiết: `skills/code-motion-video/references/center-worker.md`.

## v0.4.1 (K-02: audit Astra)

Astra rà toàn bộ v0.4.0 (SKILL + 17 references + 11 templates), ra 22 finding (2 blocker, 16 major, 4 minor); bản này vá cả 22:
- **Gate/rubric đồng bộ:** G0 ≠ duyệt timing, G2 = animatic đúng revision có người duyệt; prompt mẫu, luật nhà, review template dùng A/T + `mandatory_axes` + TESTED/UNTESTED/NOT_APPLICABLE; bỏ luật "mọi điểm ≥ 8" cũ.
- **Mode trước khi khởi tạo:** solo hay Center–Worker dùng đúng `AGENTS.md`; tên file đích chuẩn `docs/style_guide.md`, `docs/review_log.md`; route A là mặc định duy nhất.
- **Một watcher mỗi root:** `watch-tasks.ps1` có khoá `tasks\watcher.lock` (PID); chạy lần hai thì báo đỏ và thoát.
- **`model:` / `effort:` theo từng lệnh:** hai dòng tùy chọn trong 5 dòng đầu file TASK ghi đè `-Model`/`-Effort`; TASK có `task_kind` (production / planning / doc-review / utility).
- **Ngoại lệ có tên:** MV (câu hỏi giây 5 và mốc A riêng), loop (kiểm T↔0 và bước seam, không ép ảnh cuối = ảnh đầu), read dài/hold, nghỉ trước đỉnh; type tách khỏi delivery format; shot bao chứa setup + action + read + transition.
- **Template có chỗ ghi bằng chứng:** brief (revision, approval, claim/asset manifest), shotlist (read, claim/proof ID), review (evidence status).
- **Khác:** downbeat của `beats.py` chỉ là ứng viên; LUFS đo bằng loudnorm; regex `rg` đưa ra ngoài bảng; case film-01 gắn nhãn reported; camera orbit vs parallax ước lệ.
- Thêm `references/director-mindset.md` và `references/dryrun-g0-examples.md`. Không đổi code render hay example.

## Thử nhanh

```bash
cd skills/code-motion-video/examples/minimal
npm i -D playwright && npx playwright install chromium
cp ../../scripts/render.mjs .
node render.mjs --sel canvas --verify 0,1,2.2,3.7,5.9          # determinism
node render.mjs --sel canvas --sheet 0,0.5,1,1.5,2,2.5,3,3.5,4,4.5,5,5.5 --cols 6
node render.mjs --sel canvas --sub 4                            # out/silent.mp4, motion blur
node ../../scripts/sfx.mjs cues.json out/sfx.wav --dur 6 --bed 120
ffmpeg -i out/silent.mp4 -i out/sfx.wav -af loudnorm=I=-14:TP=-1 -c:v copy -c:a aac -shortest out/final.mp4
bash ../../scripts/qa_video.sh out/final.mp4
```

Yêu cầu: Node 18+, Chromium (qua Playwright), ffmpeg. Đo beat nhạc thật cần thêm `pip install numpy librosa soundfile`.
