---
name: code-motion-video
description: Làm video motion bằng code (HTML/SVG/Canvas/GSAP, HyperFrames, Remotion, p5) rồi render từng khung ra MP4: tư duy đạo diễn (chọn loại phim, 5 giây đầu, animatic duyệt sớm), timeline, vật lý chuyển động, âm thanh, rubric khán giả + thi công, contact sheet, QA.
---

# Code Motion Video

Model không sinh pixel video. Model **viết chương trình trả lời "khung ở thời điểm t trông thế nào?"**; trình duyệt headless chụp từng khung; FFmpeg ghép khung + âm thanh thành MP4.

```
frame = render(t, shotlist, assets, style_tokens, seed)      t = n / fps
```

Khung 240 phải render được trực tiếp, không cần phát lại 0–239.

## Phạm vi — nói thật trước khi hứa

- **Mạnh:** motion graphics, UI/product film, kinetic type, data story, explainer, pixel art, flat cutout, MV lời. Chữ đúng, khớp lời/nhịp tới từng khung, sửa cục bộ, render lại giống hệt.
- **Yếu:** người/động vật/cảnh chân thực, 2D vẽ tay từng khung, nhân vật 3D. Với các cảnh này, lấy footage thật hoặc model video (Seedance, Kling, Veo, Runway) đưa vào timeline; Claude lo edit, chữ, âm thanh, đóng gói.
- Độ tin cậy theo phong cách: pixel ★5 · flat/motion graphics ★5 · 2D vẽ tay p5.brush ★4 · 2D từ tranh qua motion-transfer ★4 · 3D ★1 (chỉ khi có model tốt).

## Năm lớp — không gộp thành một bước

```
DIRECTOR   phim nói gì, người xem nhớ một câu gì
REFERENCE  trông/cảm thấy thế nào → style-guide.md
TIMELINE   mỗi beat đổi gì → shotlist.md, reads, beat grid
RENDERER   mỗi khung tạo ra thế nào → code seekable + deterministic
CRITIC     lỗi gì, khung nào, vì sao, sửa biến nào
```

Output rập khuôn (chữ to giữa màn hình, gradient neon, mọi thứ fade-in cùng lúc, logo cuối) đến từ **quyết định bị bỏ trống**. Xoá khoảng trống trước khi render. Cảm giác cao cấp đến từ **bớt tự do**: một hình biến đổi xuyên suốt, ít màu, overshoot nhẹ, không có hai thứ chuyển động giống nhau.

## Quy trình: G0 + 6 gate

**Đạo diễn trước, đẹp sau.** Phim kỹ thuật sạch vẫn có thể hỏng vì chọn sai loại phim: film-01 chấm ≥ 8 mọi trục thi công mà chủ phim vẫn chê "chán", trong khi hai phim demo đơn giản hơn lại được khen (`references/case-film01.md`).

| Gate | Việc | Bằng chứng |
|---|---|---|
| **0** | **Biết–cảm–làm → loại phim → 5 s đầu.** Sau phim người xem nói lại gì, cảm gì, làm gì? Chọn type chính/phụ trong `references/film-types.md` **trước** style. Viết câu trả lời mong muốn cho "đây là gì, giúp gì?" ở giây 5. Mỗi beat: động từ → claim → proof → read | type + lý do + loại bị loại; beat sheet; manifest asset/quyền |
| 1 | Brief + asset thật + tham chiếu | `brief.md`, danh sách asset |
| 2 | Style guide + shotlist + beat grid + **storyboard/animatic tốc độ thật** (âm tạm) | **chủ phim ghi duyệt type, câu chuyện, hook trước khi build. Im lặng không phải là duyệt.** |
| 3 | Key pose / khung tĩnh đại diện | stills |
| 4 | Rough cut + contact sheet + strip chuyển cảnh | `reviews/` |
| 5 | Sửa 3 lỗi lớn nhất, render lại đúng đoạn đó | ảnh trước/sau |
| 6 | Âm thanh, từng tỷ lệ, QA trên MP4 | output `scripts/qa_video.sh` |

Luật cứng:
- Không bù câu chuyện yếu bằng hiệu ứng. Người xem chưa hiểu thì quay lại G0/G2 (type, story, copy), không thêm set-piece. Chủ phim chê look mà người xem vẫn hiểu thì giữ logic, sửa style.
- Thiếu asset bắt buộc (logo, màn hình UI thật) là blocker: hỏi, không vẽ bản giả. Không bịa màn hình, chức năng, số liệu.
- Tham chiếu mơ hồ: hỏi hoặc làm 1 khung thử, đừng render 900 khung sai.
- "Xong" là khi bằng chứng (khung đã xem, âm đã nghe) cho thấy phim đạt, không phải khi lệnh render exit 0.
- Hỏi trước khi tải gói lớn (Chrome ~400 MB, mediapipe ~600 MB, Blender ~1 GB) hoặc dùng dịch vụ trả phí. Chuẩn bị gói prompt để người dùng tự bấm.
- Chạy dài thì báo tiến độ bằng dòng ngắn và xoá file trung gian.

## Luật chuyển động cốt lõi

- **Lệch pha:** chủ thể đi trước, phụ đáp lại muộn hơn, camera trễ vài khung, môi trường/dư chấn sau cùng. Cùng đồng hồ t nhưng khác hàm. Mỗi thời điểm một sự kiện chính.
- **Một hành động đầy đủ:** chuẩn bị → kéo giãn → va đập (khớp tiếng) → nén → overshoot → ổn định → phản ứng thứ cấp. Biến dạng phải có nguyên nhân. Không reset vận tốc về 0 khi đổi trạng thái.
- **Reads:** người xem chỉ xem một lần. Mỗi điều cần hiểu có đủ khung để mắt tìm thấy, hiểu và ghi nhận. Một read một lúc; hành động nhanh, ý nghĩa giữ lâu.
- Mọi đường nối có transition có động cơ; kết vần với mở đầu.
- **Phân cấp 6:3:1:** khoảng 60% nền yên, 30% chuyển tiếp dẫn mắt, 10% điểm neo tương phản cao. Chiếm nhiều diện tích ≠ thu hút nhất. Muốn giữ phong cách rực thì lập phân cấp bằng độ sáng thay vì xoá màu.
- **Camera:** mỗi shot một chuyển động chính. Ghi khung đầu, cái gì di chuyển (vị trí / hướng / tiêu cự), hướng và tốc độ, khung cuối, cái gì giữ nguyên. Dolly có parallax, zoom thì không; đừng dùng `scale()` toàn khung để giả dolly.

## Determinism (mọi renderer)

Cấm `Date.now()`, `performance.now()`, timer, `requestAnimationFrame`, CSS transition/keyframes, `Math.random()` không seed, tải mạng lúc render, `repeat: -1`, tích phân từng khung. Mọi thứ là hàm thuần của t. Khoá font và thư viện ở local.
- `node render.mjs --verify <mốc>` phải OK trước khi review (hash giống nhau khi seek khác thứ tự). Font canvas nạp muộn sẽ làm FAIL; `render.mjs` đã có bước warm-up.
- Lò xo dạng đóng (`lib/motion.js`): giá trị đổi đích nhiều lần thì dùng `track()` (cộng một lò xo mỗi lần đổi), không khởi động lại. Chữ/số cần đọc khi có motion blur thì dùng `frameT(t, fps)`.
- Loop: khung 0 phải đầy đủ (không "pop in" từ rỗng); đo `diff(t0, t_end − 1/fps)` ≈ 0.

## Nhịp thở

Đỉnh là chỗ hút chú ý, đi qua một hoặc vài trục: màu, chuyển động, scale, độ sáng, âm, câu chuyện. Không bắt buộc mọi trục cùng lên một lúc. Nghỉ là chỗ để mắt và tai hồi lại. **Trước mỗi đỉnh lớn phải có nghỉ ≥ 1 s.** Hai đỉnh lớn không được đứng liền nhau. Khoảng nghỉ vẫn sống (trôi, thở) nhưng không đòi chú ý.

## Âm thanh là đồng hồ

Có lời dẫn thì làm voice trước, lấy timestamp, hình bám theo. MV thì bài hát là đồng hồ: đo beat thật, tính offset. Dựng beat grid trước animation: `scripts/beat_grid.py --bpm 120 --fps 60 --duration 15`. SFX sinh từ chuyển động. Ghép hai bài khác tempo: đổi ở chỗ không có lớp nhịp chồng nhau (dừng đúng phách, vào trọn một ô nhịp build, đáp trên downbeat), và cú cắt hình trùng chỗ đổi nhịp. Demo/explainer thì voice/read/hành động có thể là đồng hồ chính. Contact sheet không chứng minh được sync, phải nghe.

## Review — model không xem video, nhưng xem được ảnh

Render rồi **mở ảnh ra nhìn thật**: `render.mjs --sheet` (mỗi beat một khung), `--strip a:b` (mọi khung quanh chuyển cảnh, cú máy), crop (mặt, tay, chữ), test cỡ điện thoại 360 px (còn đọc được, còn thấy điểm neo không; ảnh cỡ nhỏ bắt được lỗi mà ảnh lớn bỏ sót, vd số bị nhoè vì blur).

Critic: "Làm đạo diễn khó tính, không phải tác giả tự hào. Chỉ phán xét khung đã render." Chấm theo `references/rubric.md`, **hai bảng riêng**:
- **Khán giả:** A1 hiểu ngay lợi ích, A2 muốn và biết bước tiếp, A3 nhớ đúng thương hiệu.
- **Thi công:** T1 sự thật và proof, T2 đọc được và phân cấp, T3 chuyển động phục vụ ý, T4 âm và sync, T5 tái lập và file giao.

Mỗi trục có ngưỡng chốt trước rough. **Chưa kiểm = N/A**, N/A ở trục bắt buộc thì chưa qua cổng. Model tự chấm A1–A3 chỉ là dự đoán; điểm thật cần người chưa đọc brief, hoặc chủ phim (ghi rõ là ai). Tìm 3 lỗi lớn nhất (đối chiếu `references/failure-modes.md`), mỗi lỗi có timestamp, bằng chứng và biến cần sửa. Vá, render lại đúng đoạn đó (`--range`), chấm lại. Tách execution_status (Worker) khỏi acceptance_status (Center/chủ phim). QA cuối chạy trên chính MP4: `scripts/qa_video.sh out/final.mp4`. Freeze/black detector dùng whitelist theo mục đích (giữ để đọc, poster).

## Setup và route

Cần agent có shell (Claude Code / Codex / Cowork) để render và tự nhìn khung. Mỗi project phim có `CLAUDE.md` + `AGENTS.md` (luật nhà, copy từ `templates/studio/`). Mặc định route A: một `index.html` có `window.seek(t)` + `scripts/render.mjs`. Muốn Remotion/HyperFrames thì phải nói rõ (Opus tự chọn route A). Effort: medium để sửa, xhigh cho phim mới, max cho flagship. Mỗi thương hiệu một phiên.

## Đọc thêm khi cần (đừng nạp hết một lúc)

| File | Đọc khi |
|---|---|
| `references/film-types.md` | **G0:** chọn loại phim (TVC, demo app/web, explainer, launch trailer, social short 9:16, manifesto, MV, recap, data film, UGC montage, case study): biết–cảm–làm, hook, chất liệu, cấu trúc 15/30/60 s, khi nào KHÔNG chọn |
| `references/director-decision-chain.md` | 15 bước brief → phim, câu hỏi bắt buộc, đầu ra kiểm được, quy tắc dừng |
| `references/rubric.md` | Chấm A1–A3 (khán giả) + T1–T5 (thi công), mốc 4/6/8/10, N/A, cách test 5 s |
| `references/failure-modes.md` | 30 lỗi đạo diễn và vận hành, dấu hiệu, cách phát hiện bằng máy, sửa đúng tầng |
| `references/case-film01.md` | Case thật: v1 → v2 bị chê → bài học, phản biện của Astra/Sol, quyết định Jev |
| `references/center-worker.md` | **Claude làm Center, Astra (GPT) plan và dò lỗi, Sol làm Worker:** phân quyền, hộp thư `watch-tasks.ps1`, cách viết lệnh việc cho GPT, vòng critic, đẩy GitHub qua Worker |
| `references/setup-and-studio.md` | **Bắt đầu project:** cài đặt, khởi tạo thư mục phim, bộ công cụ, lệnh ffmpeg kiểm tra, bảng bẫy đã gặp thật |
| `references/prompt-patterns.md` | Viết prompt: one-liner (chỉ test engine), thương hiệu (asset thật), tham chiếu, spec XML (một hình không cắt), brief đạo diễn qua đêm, prompt critic |
| `references/prior-art.md` | Repo nào lấy gì; 7 con đường sản xuất; 3 giai đoạn nghiệm thu; so chi phí |
| `references/brief-and-shotlist.md` | Viết brief 8 mục, style guide, shotlist, reads |
| `references/motion-language.md` | Thiết kế chuyển động, vật lý, ánh sáng, nhóm đối tượng |
| `references/camera-moves.md` | Chọn và code 17 chuyển động camera (dolly/zoom/truck/orbit/whip…), viết camera cho prompt model video |
| `references/visual-hierarchy-631.md` | Bố cục, màu, ánh sáng, mật độ chi tiết theo 6:3:1; thumbnail test; khung prompt cảnh |
| `references/audio-timing.md` | Voice, MV, BPM ↔ fps, SFX |
| `references/renderers-and-determinism.md` | Chọn HyperFrames / Remotion / tự viết; bẫy HyperFrames; mẫu renderer |
| `references/review-and-qa.md` | Contact sheet, checklist khung, QA trên MP4 |
| `references/delivery-and-ethics.md` | 16:9 vs 9:16, cấu trúc studio, prompt contract, chi phí, pháp lý |
| `templates/` | brief, director-brief-8, style-guide, shotlist, review, timeline mẫu |
| `lib/motion.js` | spring, track, indicator, swapAlpha, frameT, loopT, rng, kf, pulse, camera 2.5D |
| `scripts/render.mjs` | Render pipe ffmpeg, `--sub` blur, `--range`, `--stills`, `--sheet`, `--strip`, `--verify` |
| `scripts/center/` · `templates/center/` | watch-tasks.ps1, setup.ps1 · AGENTS.md cho Worker, mẫu TASK |
| `scripts/beats.py` · `sfx.mjs` · `beat_grid.py` · `qa.mjs` (đa nền tảng) · `qa_video.sh` | Đo beat nhạc · tổng hợp SFX/nền · lưới BPM↔fps · QA MP4 |
| `examples/minimal/` | Phim 6 s "một hình không cắt" + cues.json, đã qua verify, critic 3 lỗi, loop seam, blur |

Thư mục mỗi phim: `CLAUDE.md · AGENTS.md · docs/ (brief, style_guide, shotlist, review_log) · refs/ · assets/ · lib/ · index.html · render.mjs · out/`. Lệnh khởi tạo ở `references/setup-and-studio.md`.

Kho kiến thức gốc (bài dịch, repo HyperFrames, ClaudeAnimationBase, claude-video-studio) có thể nằm ở `C:\Users\Admin\Documents\Knowledge film Claude Codex` trên máy người dùng. Tra API chi tiết ở đó thay vì đoán.
