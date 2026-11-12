# Hướng dẫn cho Codex / agent khác

Repo có hai skill. Chọn đúng skill trước khi làm:
- Phim ngắn T1 to 9 từ ảnh sinh ra (image → i2v, 9:16, 20–60 s): đọc `skills/t1to9-film/SKILL.md`, rồi chỉ đọc file của cổng đang làm. Chưa có G0 được duyệt thì không viết prompt ảnh. Đường dẫn trên máy nằm trong `skills/t1to9-film/paths.local.md`; thiếu thì hỏi.
- Video motion dựng bằng code: làm theo các bước dưới.

## code-motion-video

Khi được yêu cầu làm video motion, MV, explainer, kinetic type, product film bằng code (HTML/SVG/Canvas/GSAP, HyperFrames, Remotion, p5):

1. Đọc `skills/code-motion-video/SKILL.md` trước khi viết bất kỳ code animation nào.
2. Chỉ mở file trong `skills/code-motion-video/references/` khi bước hiện tại cần.
3. Khởi tạo thư mục phim theo `skills/code-motion-video/references/setup-and-studio.md` (chọn solo hay Center–Worker trước, rồi copy templates đúng mode) và điền brief/G0 trước khi build.
4. Phiên có tool `vsc_*` (Vibe Shot Club): khi cần cú máy, động tác, phong cách hay prompt model video thì tra theo `skills/code-motion-video/references/vsc-lookup.md`. Không chép nội dung VSC vào repo.
5. Render bằng `skills/code-motion-video/scripts/render.mjs`, QA bằng `scripts/qa_video.sh`.
6. Không build production khi gate 2 (style guide + shotlist + storyboard/animatic tốc độ thật) chưa được người dùng duyệt ghi nhận (artifact, revision, người, timestamp). Im lặng không phải là duyệt.
