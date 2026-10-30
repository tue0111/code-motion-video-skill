#!/usr/bin/env python3
"""Tạo beat grid (khung/giây cho từng phách) để hình và âm thanh dùng chung một hệ thời gian.

Dùng: beat_grid.py --bpm 120 --fps 60 --duration 15 [--offset 0.0] [--beats-per-bar 4] > timeline.json
Mỗi mốc tính từ thời gian rồi mới làm tròn sang khung (không cộng dồn số khung đã làm tròn).
"""
import argparse, json

p = argparse.ArgumentParser()
p.add_argument("--bpm", type=float, required=True)
p.add_argument("--fps", type=float, required=True)
p.add_argument("--duration", type=float, required=True, help="giây")
p.add_argument("--offset", type=float, default=0.0, help="giây tới phách mạnh đầu tiên của file nhạc thật")
p.add_argument("--beats-per-bar", type=int, default=4)
a = p.parse_args()

spb = 60.0 / a.bpm
beats, i = [], 0
while True:
    t = a.offset + i * spb
    if t >= a.duration:
        break
    beats.append({"beat": i, "bar": i // a.beats_per_bar, "downbeat": i % a.beats_per_bar == 0,
                  "time": round(t, 4), "frame": round(t * a.fps)})
    i += 1

print(json.dumps({
    "bpm": a.bpm, "fps": a.fps, "duration_seconds": a.duration,
    "duration_frames": round(a.duration * a.fps), "frame_index_base": 0,
    "seconds_per_beat": spb, "frames_per_beat": a.fps * spb,
    "seconds_per_bar": spb * a.beats_per_bar, "offset": a.offset, "beats": beats,
}, ensure_ascii=False, indent=2))
