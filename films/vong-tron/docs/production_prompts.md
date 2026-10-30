# Prompt production — image-to-video (chỉ chạy SAU khi G2 được duyệt)

Đề xuất: **Kling 3.0 (`kling-v3`), mode `pro`, sound `off`**. Ước tính ~69 credit / clip 5 s (Sumi, 30/10/2026).
Lý do: ra 1080p (Seedance 2.0 Fast chỉ 720p, phải phóng lên 1080×1350 sẽ mềm), giá gần bằng, có negative prompt.
Quy trình: chạy **S1 thử trước** → xem khung (mặt, khuyên tai, tay) → nếu ổn mới chạy 6 clip còn lại.
Clip dài hơn shot để có tay cầm cắt; chỉ dùng đoạn giữa ổn định nhất.

Negative chung (mọi clip):
`face change, different person, extra fingers, deformed hands, morphing jewelry, changing earrings, flower changes color, text, watermark, fast motion, camera shake, zoom burst, sudden head turn`

Câu khoá chung (thêm cuối mỗi prompt):
`Keep her face, the pearl-shell earrings, the gold flower ring and the purple orchid in her hair exactly as in the image. Slow, calm, cinematic, natural afternoon light.`

| Shot | Ảnh | Độ dài clip | Prompt |
| --- | --- | --- | --- |
| S1 | p2 | 5 s | A gentle breeze lifts loose strands of her hair across her cheek and ripples the sheer organza sleeve; she stays in profile, blinks once softly. Camera: very slow push-in toward her face. The orange paper umbrella in the foreground barely sways. |
| S2 | p4 | 5 s | She walks slowly toward the camera along the stone path holding the orange paper umbrella; the long sheer organza panels of her áo dài flow behind her in the wind. Camera: slow dolly-in, stable. Background palace stays still. |
| S3 | p1 | 5 s | Seated in the carved wooden chair, she slowly turns the umbrella handle so the orange paper umbrella rotates a little; wind moves her sleeve and hair. She keeps looking into the lens. Camera: slow truck from left to right. |
| S4 | p5 | 5 s | Almost still. Her fingers slowly pass one wooden prayer bead forward; the tassel sways slightly. Sheer sleeve breathes in a faint breeze. Camera: locked off, no movement. |
| S5 | p6 | 5 s | Low angle. Wind lifts the long organza sleeves and the sheer fabric in the foreground drifts across the frame; she slowly raises her gaze. Camera: slow tilt up from her waist to her face. |
| S6 | p7 | 5 s | She stands holding the wooden comb; the organza panels flutter gently; leaves in the foreground sway. Camera: slow steady push-in toward the round carved stone window on the right of the frame. |
| S7 | p3 | 7 s | She leans over the round mirror on the grass, touching her hair near the orchid; she lowers her eyes toward her reflection; sheer sleeves move softly in the breeze; the reflection in the mirror mirrors her movement. Camera: very slow pull-out. |

Ghi chú:
- S4 rủi ro cao nhất (ngón tay + chuỗi hạt). Nếu hỏng: giữ ảnh tĩnh + parallax bằng code (đã có trong animatic) — đây là cảnh nghỉ nên tĩnh vẫn đúng ý.
- S6: iris cần cửa sổ tròn **ở nguyên vị trí** cuối clip → camera chỉ push nhẹ trong clip; cú dồn mạnh vào cửa sổ do code làm trên khung cuối.
- **Nhạc (tuỳ chọn):** Suno v6 (`chirp-v6`), instrumental, ~14 credit/lần. Tags: `vietnamese dan tranh, bamboo flute, ambient, soft pad, 80 bpm, D minor pentatonic, calm, nostalgic, no drums`. durationSec 40 (cắt 24 s theo phrase thật rồi chỉnh lại mốc cắt theo beat đo được).
- **Ngân sách ước tính:** 6 × ~69 + S7 7 s (~97) ≈ **510 credit** + nhạc 14–28 + 1–2 lần chạy lại (~140) ⇒ **~550–680 / 3.150 credit**.
