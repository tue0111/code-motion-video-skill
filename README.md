# code-motion-video

Skill làm video motion bằng code, dùng chung cho Claude (Cowork plugin, account skill) và Codex.

Nguồn tổng hợp: bài 宝玉 (cơ chế), rari "Motion Engineering" (studio + gate), 观默 (ngôn ngữ chuyển động), cùng các repo HyperFrames, ClaudeAnimationBase, claude-video-studio, pdoom-video. Kho dữ liệu thô không nằm trong repo này.

## Cấu trúc

```
.claude-plugin/plugin.json      manifest plugin Cowork
skills/code-motion-video/
  SKILL.md                      lõi: quy trình 6 gate, luật cứng
  references/                   chi tiết, chỉ đọc khi cần
  templates/                    brief, style guide, shotlist, review, timeline
  scripts/                      render.mjs, qa_video.sh, beat_grid.py
  examples/minimal/             trang canvas mẫu cho render.mjs
AGENTS.md                       điểm vào cho Codex
```

## Cài

- **Cowork:** cài repo này như một plugin (manifest ở `.claude-plugin/`).
- **Claude account skill:** chỉ nhận một SKILL.md, nên dùng bản lõi `skills/code-motion-video/SKILL.md`.
- **Codex:** clone repo, để `AGENTS.md` ở gốc project hoặc copy `skills/code-motion-video/` vào thư mục skills của Codex.

## Thử nhanh

```bash
cd skills/code-motion-video/examples/minimal
npm i playwright            # hoặc dùng bản cài sẵn
node ../../scripts/render.mjs --stills=0,0.8,2
node ../../scripts/render.mjs && bash ../../scripts/qa_video.sh out/video.mp4
```

Yêu cầu: Node 18+, Chrome/Chromium, ffmpeg.
