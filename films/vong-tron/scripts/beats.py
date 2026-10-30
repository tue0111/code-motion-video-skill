#!/usr/bin/env python3
"""Đo nhịp một bài nhạc thật → beats.json cho animation đọc.

Dùng: python3 beats.py song.wav > beats.json      (cần: pip install numpy librosa soundfile)
- beats:     đổi trạng thái đặt ở đây
- downbeats: khoảnh khắc lớn (giả định 4/4, phách đầu là phách mạnh — kiểm tra lại bằng tai)
- hits:      đỉnh onset, đặt SFX ở đây
Bài trôi nhịp hoặc đổi tempo: dùng beats đo được, đừng dùng lưới BPM cố định.
"""
import sys, json
try:
    import numpy as np, librosa
except ImportError:
    sys.exit("cần: pip install numpy librosa soundfile")

y, sr = librosa.load(sys.argv[1], sr=None, mono=True)
tempo, frames = librosa.beat.beat_track(y=y, sr=sr, units="frames")
beats = librosa.frames_to_time(frames, sr=sr).round(3).tolist()
onset = librosa.onset.onset_strength(y=y, sr=sr)
peaks = librosa.util.peak_pick(onset, pre_max=3, post_max=3, pre_avg=3, post_avg=5, delta=0.5, wait=10)
json.dump({
    "bpm": float(np.atleast_1d(tempo)[0]),
    "duration": round(len(y) / sr, 3),
    "beats": beats,
    "downbeats": beats[::4],
    "hits": librosa.frames_to_time(peaks, sr=sr).round(3).tolist(),
}, sys.stdout, indent=1)
