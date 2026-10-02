# code-motion-video

Skill làm video motion bằng code, dùng chung cho Claude (Cowork plugin, account skill) và Codex.

Nguồn tổng hợp: 宝玉 (cơ chế), rari "Motion Engineering" (studio + gate), 观默 (ngôn ngữ chuyển động), 南鸢 nuyoah (17 cú máy, phân cấp 6:3:1), Movez (setup studio, 5 mẫu prompt, critic chấm điểm), cùng các repo HyperFrames, ClaudeAnimationBase, claude-video-studio, pdoom-video, claude-animation-skill, Austerlitz, awesome-opus-5-5-videos. Kho dữ liệu thô không nằm trong repo này.

## Cấu trúc

```
.claude-plugin/plugin.json      manifest plugin Cowork
skills/code-motion-video/
  SKILL.md                      lõi: quy trình 6 gate, luật cứng
  references/                   chi tiết, chỉ đọc khi cần
  templates/                    brief, style guide, shotlist, review, timeline
  lib/motion.js                 lò xo dạng đóng, track, frameT, loopT, rng, camera 2.5D
  scripts/                      render.mjs, beats.py, sfx.mjs, beat_grid.py, qa_video.sh
  templates/studio/             CLAUDE.md + AGENTS.md (luật nhà cho mỗi project phim)
  examples/minimal/             phim 6 s "một hình không cắt" + cues.json
AGENTS.md                       điểm vào cho Codex
```

## Cài

- **Cowork:** cài repo này như một plugin (manifest ở `.claude-plugin/`).
- **Claude account skill:** chỉ nhận một SKILL.md, nên dùng bản lõi `skills/code-motion-video/SKILL.md`.
- **Codex:** clone repo, để `AGENTS.md` ở gốc project hoặc copy `skills/code-motion-video/` vào thư mục skills của Codex.

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
