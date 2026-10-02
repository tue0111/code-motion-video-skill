# Repo và dự án tham khảo: lấy gì từ đâu

Kiểm tra ngày 02/10/2026. Đọc source trước khi tái sử dụng và giữ đúng license.

| Repo | Loại | Lấy gì |
|---|---|---|
| heygen-com/hyperframes (Apache-2.0) | Framework HTML + GSAP | Hợp đồng composition, luật determinism, 21 skill (`/hyperframes`, `music-to-video`, `product-launch-video`…) |
| Remotion (`npx skills add remotion-dev/skills`) | Framework React | `useCurrentFrame`, `<Sequence>`, `spring`, `random(seed)`, `remotion still --frame` |
| JohnHeibel/ClaudeAnimationBase (MIT) | Kit p5.js + p5.brush | ANIMATION_GUIDE (luật handmade/alive/one piece, **reads** cho timing), `render.mjs` có sheet/strip/crop/crop-at |
| JohnHeibel/PDoomVideo | Case MV 156 s | Mẫu subagent theo chương: `ANIMATION_GUIDE.md` cho subagent, `STORYBOARD.md` sau lượt đầu, `src/ch/` |
| mexicat/pdoom-video (MIT) | Engine MV 3D three.js | Frame có beat/bar/đặc trưng audio, motion blur sub-frame `--samples auto`, 4K thật bằng `--scale 2` |
| a252937166/claude-video-studio (MIT) | Quy trình pixel/flat, MV, edit | Bảng chọn style theo độ tin cậy, lời theo ô nhịp cho AI music + đo offset, QA checklist, bẫy HyperFrames |
| buildwithhanif/claude-animation-skill (MIT) | Plugin Claude, Node canvas, không cần browser | **Detail bible** (mỗi bề mặt: nền → texture → mép), rig có giải phẫu, `verify` (khung giống nhau khi render khác thứ tự), render theo giai đoạn không ghi đè file tốt, bảng **traps**, `sound.mjs`/`music.mjs`/`chiptune.mjs` |
| WinterArc21/Battle-of-Austerlitz-Film | Phim lịch sử 5:01 WebGL2 | Địa hình thật (SRTM), mặt trời đúng góc; `events.js` **sinh cue âm từ chính hình** (mỗi phát súng, loạt bắn, vó ngựa, kèm khoảng cách và pan; âm đi 343 m/s nên súng xa nghe trễ); narration Kokoro TTS offline; render chunk resume được; filter Kuwahara cho look hội hoạ |
| athemeroy/awesome-opus-5-5-videos (CC BY 4.0) | Dataset 1.401 file / 168 case | 7 con đường sản xuất; ghép tác vụ với renderer + điều kiện fail; **3 giai đoạn nghiệm thu**; so chi phí cùng deliverable; "brief contagion" |
| guanmo-ai/awesome-ai-motion | Gallery 384 mục | Tham chiếu, prompt gốc công khai (65 mục), link code/demo |
| lemomo-ai/lemo-opuscar | Hệ thống 39 style | DIRECTOR.md, TECHNIQUE.md, hướng dẫn theo style, AGENTS.md (một brief trước khi sản xuất) |
| francozanardi/papermotion | Engine cắt giấy | Vật lý deterministic, rig, render offline, frame grab, contact sheet |
| makevoid/motion-graphics-music-video-skill | Plugin Claude | MV motion graphics |

## 7 con đường sản xuất (athemeroy): chọn trước khi build

| Đường | Ai tạo pixel | Kiểm tra |
|---|---|---|
| 2D vẽ bằng code | Canvas/SVG/p5 do Opus viết | Code public có khớp cảnh, timing, asset không |
| Explainer giáo dục | Manim/SVG/Remotion + TTS | Mọi dữ kiện, công thức, đơn vị, phát âm. Ảnh đẹp không phải là kiểm chứng sự thật |
| 3D / real-time | Three.js/WebGL/Blender | Là capture chương trình, scene render hay output model video |
| Biến đổi nguồn có sẵn | Footage, audio, file của người dùng | Nguồn đóng góp gì (diễn xuất, âm thanh) |
| Pipeline model video ngoài | Seedance/Kling/Veo/Runway | Công cụ nào tạo pixel chuyển động, Opus chỉ đạo phần nào |
| Capture app/game | Chương trình chơi được | Deliverable là chương trình, video chỉ là bản ghi |
| Hỗn hợp | Nhiều nguồn | Đầu vào, ngân sách, cách chấm có so sánh được không |

Hiệu ứng có tên giống nhau nhưng tiêu chí nghiệm thu khác nhau. "Kim loại lỏng" có thể là style phản chiếu, cũng có thể là thể tích đúng vật lý. "Từ trường" có thể là đường minh hoạ, cũng có thể là quỹ đạo đối chiếu dữ liệu. "Vỡ" có thể là transition đồ hoạ, cũng có thể là gãy vật liệu có va chạm. Chốt tiêu chí trước rồi mới chọn shader, renderer toán học hay solver vật lý.

## 3 giai đoạn nghiệm thu

1. **Brief + keyframe:** mục đích, điều người xem phải hiểu, kích thước, thời lượng, fps, các đổi shot và trạng thái, chữ và thương hiệu cố định, nguồn gốc asset, ràng buộc vật lý hoặc dữ kiện. Duyệt storyboard và sheet keyframe trước khi render full.
2. **Mẫu chuyển động ngắn:** render 2–4 s **khó nhất**. Xem 12–24 khung liền kề, che khuất, tiếp xúc, tốc độ, mối nối loop, biên phụ đề. Code: cố định seed, render lại sau khi seek khác thứ tự. Mô phỏng: bake timeline.
3. **Full + bàn giao tái lập được:** xem và nghe toàn phim. Kiểm thời lượng, fps, độ phân giải, chữ, mức âm, đồng bộ. Giao MP4, project sửa được, lệnh render, danh sách asset và dịch vụ thật sự đã dùng, các khẳng định còn chưa kiểm chứng.

## So chi phí cho đúng

Tách riêng: lượt gọi model và bill thật (giá niêm yết chỉ là ước tính); tool ngoài và asset (credit ảnh/video/TTS, license); công người và làm lại (chuẩn bị tham chiếu, duyệt, sửa prompt, render hỏng, fact-check); thời gian tới bản nháp đầu so với bản được duyệt. Chỉ so trên **cùng brief, thời lượng, độ phân giải và tiêu chí nghiệm thu**.
