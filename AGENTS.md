# Hướng dẫn cho Codex / agent khác

Khi được yêu cầu làm video motion, MV, explainer, kinetic type, product film bằng code (HTML/SVG/Canvas/GSAP, HyperFrames, Remotion, p5):

1. Đọc `skills/code-motion-video/SKILL.md` trước khi viết bất kỳ code animation nào.
2. Chỉ mở file trong `skills/code-motion-video/references/` khi bước hiện tại cần.
3. Khởi tạo thư mục phim theo `skills/code-motion-video/references/setup-and-studio.md` (chọn solo hay Center–Worker trước, rồi copy templates đúng mode) và điền brief/G0 trước khi build.
4. Render bằng `skills/code-motion-video/scripts/render.mjs`, QA bằng `scripts/qa_video.sh`.
5. Không build production khi gate 2 (style guide + shotlist + storyboard/animatic tốc độ thật) chưa được người dùng duyệt ghi nhận (artifact, revision, người, timestamp). Im lặng không phải là duyệt.
