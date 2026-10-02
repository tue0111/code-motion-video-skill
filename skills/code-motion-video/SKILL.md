---
name: code-motion-video
description: Làm video motion bằng code (HTML/SVG/Canvas/GSAP, HyperFrames, Remotion, p5) rồi render từng khung ra MP4: brief đạo diễn, timeline, vật lý chuyển động, âm thanh, contact sheet, QA.
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

## Quy trình 6 gate

| Gate | Việc | Bằng chứng |
|---|---|---|
| 1 | Brief + asset thật + tham chiếu | `brief.md`, danh sách asset |
| 2 | Style guide + shotlist + beat grid | **người dùng duyệt trước khi build** |
| 3 | Key pose / khung tĩnh đại diện | stills |
| 4 | Rough cut + contact sheet + strip chuyển cảnh | `reviews/` |
| 5 | Sửa 3 lỗi lớn nhất, render lại đúng đoạn đó | ảnh trước/sau |
| 6 | Âm thanh, từng tỷ lệ, QA trên MP4 | output `scripts/qa_video.sh` |

Luật cứng:
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

## Determinism (mọi renderer)

Cấm `Date.now()`, `performance.now()`, timer, `requestAnimationFrame`, CSS transition/keyframes, `Math.random()` không seed, tải mạng lúc render, `repeat: -1`, tích phân từng khung. Mọi thứ là hàm thuần của t. Chờ font/ảnh sẵn sàng. Khoá font và thư viện ở local. Seek test: A → B → A phải ra cùng ảnh.

## Âm thanh là đồng hồ

Có lời dẫn thì làm voice trước, lấy timestamp, hình bám theo. MV thì bài hát là đồng hồ: đo beat thật, tính offset. Dựng beat grid trước animation: `scripts/beat_grid.py --bpm 120 --fps 60 --duration 15`. SFX sinh từ chuyển động. Contact sheet không chứng minh được sync, phải nghe.

## Review — model không xem video, nhưng xem được ảnh

Render rồi **mở ảnh ra nhìn thật**: contact sheet (mỗi beat), strip (mọi khung quanh chuyển cảnh), crop (mặt, tay, chữ). Critic: "Chỉ phán xét khung đã render. Tìm 3 lỗi lớn nhất, mỗi lỗi có khung, bằng chứng, biến cần sửa. Vá đúng đoạn đó rồi render lại." QA cuối chạy trên chính MP4: `scripts/qa_video.sh out/video.mp4`.

## Đọc thêm khi cần (đừng nạp hết một lúc)

| File | Đọc khi |
|---|---|
| `references/brief-and-shotlist.md` | Viết brief 8 mục, style guide, shotlist, reads |
| `references/motion-language.md` | Thiết kế chuyển động, vật lý, ánh sáng, nhóm đối tượng |
| `references/audio-timing.md` | Voice, MV, BPM ↔ fps, SFX |
| `references/renderers-and-determinism.md` | Chọn HyperFrames / Remotion / tự viết; bẫy HyperFrames; mẫu renderer |
| `references/review-and-qa.md` | Contact sheet, checklist khung, QA trên MP4 |
| `references/delivery-and-ethics.md` | 16:9 vs 9:16, cấu trúc studio, prompt contract, chi phí, pháp lý |
| `templates/` | brief, director-brief-8, style-guide, shotlist, review, timeline mẫu |
| `scripts/render.mjs` + `examples/minimal/` | Renderer Playwright + FFmpeg đã chạy thử (`--stills=…` hoặc full MP4) |

Thư mục studio cho mỗi phim: `brief.md · style-guide.md · shotlist.md · timeline.json · assets/ · src/ · reviews/ · out/`. Copy template vào đó trước khi bắt đầu.

Kho kiến thức gốc (bài dịch, repo HyperFrames, ClaudeAnimationBase, claude-video-studio) có thể nằm ở `C:\Users\Admin\Documents\Knowledge film Claude Codex` trên máy người dùng. Tra API chi tiết ở đó thay vì đoán.
