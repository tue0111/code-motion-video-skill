#!/usr/bin/env python3
"""film_qa — QA máy cho phim T1 to 9. Chỉ báo dấu hiệu, không thay mắt và tai.

Chạy bằng Python có numpy + opencv (máy Tuệ: Python312):
  film_qa.py diff     old.json new.json [--ack id,id]   # danh sách shot giữa 2 bản
  film_qa.py lint     timeline.json [--allow-card]       # vật thể vẽ bằng code, watermark
  film_qa.py ranges   timeline.json [--root DIR] [--usable clip=a:b ...]
  film_qa.py color    video.mp4 timeline.json [--n 5]   # L*a*b* + saturation từng đoạn
  film_qa.py loudness video.mp4 [--target -14]
  film_qa.py freeze   video.mp4 [--d 0.5]

timeline.json: {"fps":24, "duration":28.29, "clips":[{"id":"N1", "kind":"video",
  "clip":"clips/N1_480.mp4", "t0":0, "t1":2.879, "speed":0.6, "offset":0,
  "usable":[0,1.6], "hold":{"reason":"...", "approved":"approvals.md#3"}, "required":true}, ...],
  "transitions":[{"t":4.9, "d":0.3, "kind":"whip"}]}
Đọc được timeline của thanh-xuan-ccd (render.py). Thiếu "id" thì lấy đường dẫn clip/img làm id.
Exit 1 khi có lỗi cứng (shot rơi chưa ack, đọc ngoài nguồn, loudness lệch). Cảnh báo không làm fail.
"""
from __future__ import annotations

import argparse
import json
import math
import os
import shutil
import subprocess
import sys
from pathlib import Path


def tool(name: str) -> str:
    env = os.environ.get(name.upper())
    if env:
        return env
    ff_dir = os.environ.get("FFMPEG_DIR")
    if ff_dir:
        for cand in (Path(ff_dir) / f"{name}.exe", Path(ff_dir) / name):
            if cand.exists():
                return str(cand)
    found = shutil.which(name)
    if not found:
        sys.exit(f"thiếu {name}: đặt biến môi trường {name.upper()} hoặc thêm vào PATH")
    return found


def load(path: str) -> dict:
    return json.loads(Path(path).read_text(encoding="utf-8"))


def clip_id(c: dict) -> str:
    return str(c.get("id") or c.get("clip") or c.get("img") or f"{c.get('kind', '?')}@{c.get('t0')}")


def clips(tl: dict) -> list[dict]:
    """Danh sách shot; id trùng (một ảnh dùng 2 lần) được đánh số #2, #3."""
    out, seen = [], {}
    for c in tl.get("clips") or tl.get("shots") or []:
        k = clip_id(c)
        seen[k] = seen.get(k, 0) + 1
        out.append(dict(c, id=k if seen[k] == 1 else f"{k}#{seen[k]}"))
    return out


# Loại lớp bị cấm trong phim T1 to 9: vật thể vẽ bằng code (luật cứng 2).
CODE_PROPS = {"page", "paper", "petals", "petal", "cover", "tape", "handwriting", "lined_page",
              "folded_corner", "cover_tex", "confetti", "leaves"}
EDITORIAL_OK = {"video", "full", "still", "card", "flash", "signature", "outro", "title", "black"}


def cmd_lint(a: argparse.Namespace) -> int:
    tl = load(a.timeline)
    bad = False
    allow_card = a.allow_card
    for c in clips(tl):
        kind = str(c.get("kind", "video"))
        src = c.get("clip") or c.get("img")
        if kind in CODE_PROPS or (not src and kind not in EDITORIAL_OK):
            print(f"LỖI  {c['id']}: lớp '{kind}' không có nguồn ảnh/video, nghi vẽ vật thể bằng code")
            bad = True
        elif kind == "card" and not allow_card:
            print(f"LỖI  {c['id']}: thẻ ảnh cần duyệt ở G2 (chạy lại với --allow-card khi đã có dòng duyệt)")
            bad = True
    text = str(tl.get("stamp", ""))
    if "T1" in text or tl.get("watermark"):
        print("LỖI  watermark/chữ ký chạy suốt phim; chữ ký T1 to 9 chỉ ở cuối")
        bad = True
    elif text:
        on = [c["id"] for c in clips(tl) if c.get("stamp", tl.get("stamp_default", True))]
        if on:
            print(f"CẢNH BÁO chữ code '{text}' (date stamp) trên {len(on)} đoạn: đồ hoạ biên tập, phải có trong animatic G2")
    print("FAIL" if bad else "PASS")
    return 1 if bad else 0


# ---------- diff ----------
def cmd_diff(a: argparse.Namespace) -> int:
    old, new = clips(load(a.old)), clips(load(a.new))
    ack = {x.strip() for x in a.ack.split(",") if x.strip()}
    oi = {clip_id(c): (i, c) for i, c in enumerate(old)}
    ni = {clip_id(c): (i, c) for i, c in enumerate(new)}
    bad = False
    for k, (i, c) in oi.items():
        if k not in ni:
            req = c.get("required", True)
            tag = "ACK" if k in ack else ("LỖI" if req else "bỏ (optional)")
            bad |= req and k not in ack
            print(f"- MẤT     {k}  [{tag}]  ({c.get('t0')}–{c.get('t1')})")
    for k, (i, c) in ni.items():
        if k not in oi:
            print(f"+ THÊM    {k}  ({c.get('t0')}–{c.get('t1')})")
    common = [k for k in ni if k in oi]
    order_old = [k for k in oi if k in ni]
    if common != order_old:
        print(f"~ ĐỔI THỨ TỰ: {order_old} → {common}")
    for k in common:
        o, n = oi[k][1], ni[k][1]
        ch = [f"{f}: {o.get(f)}→{n.get(f)}" for f in ("t0", "t1", "speed", "offset", "usable", "kind")
              if o.get(f) != n.get(f)]
        if ch:
            print(f"~ SỬA     {k}  " + "; ".join(ch))
    print(f"\n{len(old)} → {len(new)} mục. {'FAIL: có shot rơi chưa ack' if bad else 'PASS'}")
    return 1 if bad else 0


# ---------- ranges ----------
def probe_duration(path: Path) -> float | None:
    if not path.exists():
        return None
    out = subprocess.run([tool("ffprobe"), "-v", "error", "-select_streams", "v:0", "-show_entries",
                          "stream=duration:format=duration", "-of", "json", str(path)],
                         capture_output=True, text=True)
    if out.returncode:
        return None
    j = json.loads(out.stdout)
    for s in j.get("streams", []):
        if s.get("duration"):
            return float(s["duration"])
    d = j.get("format", {}).get("duration")
    return float(d) if d else None


def cmd_ranges(a: argparse.Namespace) -> int:
    tl = load(a.timeline)
    fps = float(tl.get("fps", 24))
    root = Path(a.root) if a.root else Path(a.timeline).resolve().parent
    extra = {}
    for u in a.usable or []:
        k, v = u.split("=", 1)
        s, e = v.split(":")
        extra[k] = [float(s), float(e)]
    bad = False
    print(f"{'id':<26}{'nguồn cần':>11}{'dùng được':>15}{'clip dài':>10}  kết quả")
    for c in clips(tl):
        if c.get("kind", "video") != "video" or not c.get("clip"):
            continue
        t0 = float(c["t0"])
        t1 = min(float(c["t1"]), float(tl.get("duration", c["t1"])))
        spd, off = float(c.get("speed", 1.0)), float(c.get("offset", 0.0))
        last_t = (math.ceil(t1 * fps - 1e-9) - 1) / fps          # khung output cuối của đoạn
        need = off + max(last_t - t0, 0) * spd
        dur = probe_duration(root / c["clip"])
        name = Path(c["clip"]).name
        us = c.get("usable") or extra.get(name) or extra.get(clip_id(c))
        lo, hi = (us if us else [0.0, dur if dur is not None else float("inf")])
        lim = min(hi, dur) if dur is not None else hi
        hold = c.get("hold")
        msg = "OK"
        if dur is None:
            msg, bad = "LỖI: không đọc được clip", True
        elif off < lo - 1e-6:
            msg, bad = f"LỖI: bắt đầu {off:.3f}s trước vùng dùng được {lo}", True
        elif need > lim + 0.5 / fps:
            over = need - lim
            if hold and hold.get("approved"):
                msg = f"HOLD đã duyệt ({over:.3f}s: {hold.get('reason', '')})"
            else:
                why = "vượt usable" if us and lim == hi else "vượt độ dài clip (khung cuối bị giữ)"
                msg, bad = f"LỖI: {why} {over:.3f}s", True
        ustr = f"{lo:g}–{hi:g}" if us else "chưa khai"
        print(f"{clip_id(c)[:25]:<26}{need:>10.3f}s{ustr:>15}{(dur or 0):>9.3f}s  {msg}")
        if not us:
            print(f"{'':<26}cảnh báo: chưa khai usable, phải soi từng khung clip này")
    print("\nFAIL" if bad else "\nPASS")
    return 1 if bad else 0


# ---------- color ----------
def cmd_color(a: argparse.Namespace) -> int:
    import cv2
    import numpy as np

    tl = load(a.timeline)
    trans = [(float(t["t"]), float(t.get("d", 0.3))) for t in tl.get("transitions", [])]
    flashes = [float(t) for t in tl.get("flashes", [])]
    cap = cv2.VideoCapture(a.video)
    if not cap.isOpened():
        sys.exit(f"không mở được {a.video}")
    rows = []
    for c in clips(tl):
        t0, t1 = float(c["t0"]), float(c["t1"])
        ts = []
        for k in range(a.n):
            t = t0 + (t1 - t0) * (k + 0.5) / a.n
            near = any(abs(t - x) < d / 2 + 0.12 for x, d in trans) or any(abs(t - f) < 0.2 for f in flashes)
            if not near:
                ts.append(t)
        Ls, As, Bs, Ss = [], [], [], []
        for t in ts:
            cap.set(cv2.CAP_PROP_POS_MSEC, t * 1000)
            ok, fr = cap.read()
            if not ok:
                continue
            f = fr.astype(np.float32) / 255.0
            lab = cv2.cvtColor(f, cv2.COLOR_BGR2LAB)          # float: L 0–100, a/b thật
            hsv = cv2.cvtColor(f, cv2.COLOR_BGR2HSV)
            Ls.append(np.median(lab[..., 0])); As.append(np.median(lab[..., 1]))
            Bs.append(np.median(lab[..., 2])); Ss.append(float(hsv[..., 1].mean()))
        if Ls:
            rows.append((c["id"], t0, t1, float(np.median(Ls)), float(np.median(As)),
                         float(np.median(Bs)), float(np.median(Ss)), str(c.get("group", "cả phim"))))
    if not rows:
        sys.exit("không lấy được mẫu nào")
    refs = {}
    for g in sorted({r[7] for r in rows}):
        rs = [r for r in rows if r[7] == g]
        refs[g] = [float(np.median([r[i] for r in rs])) for i in (3, 4, 5, 6)]
        m = refs[g]
        print(f"Mốc nhóm '{g}' (trung vị): L*={m[0]:.1f} a*={m[1]:+.1f} b*={m[2]:+.1f} S={m[3]:.3f}")
    print(f"{'id':<26}{'t':>13}{'L*':>7}{'a*':>7}{'b*':>7}{'S':>7}  cảnh báo (so với nhóm)")
    for r in rows:
        ref, warn = refs[r[7]], []
        if abs(r[3] - ref[0]) > 5: warn.append(f"ΔL*={r[3]-ref[0]:+.1f}")
        if abs(r[5] - ref[2]) > 3: warn.append(f"Δb*={r[5]-ref[2]:+.1f}")
        if ref[3] > 0.02 and abs(r[6] - ref[3]) / ref[3] > 0.15: warn.append(f"S {100*(r[6]/ref[3]-1):+.0f}%")
        print(f"{r[0][:25]:<26}{r[1]:>6.2f}–{r[2]:<6.2f}{r[3]:>7.1f}{r[4]:>+7.1f}{r[5]:>+7.1f}{r[6]:>7.3f}  "
              + (", ".join(warn) or "-"))
    print("\nChỉ là cảnh báo. Gán \"group\" cho shot cùng điều kiện sáng để so đúng nhóm;"
          " khác màu có chủ đích thì ghi lý do, không ép về trung bình.")
    return 0


# ---------- loudness ----------
def cmd_loudness(a: argparse.Namespace) -> int:
    out = subprocess.run([tool("ffmpeg"), "-hide_banner", "-nostdin", "-i", a.video, "-vn", "-af",
                          f"loudnorm=I={a.target}:TP=-1:LRA=11:print_format=json", "-f", "null", "-"],
                         capture_output=True, text=True, encoding="utf-8", errors="replace")
    err = out.stderr
    i = err.rfind("{")
    if out.returncode or i < 0:
        print(err[-800:]); return 1
    j = json.loads(err[i:err.rfind("}") + 1])
    I, TP, LRA = float(j["input_i"]), float(j["input_tp"]), float(j["input_lra"])
    ok = abs(I - a.target) <= 1 and TP <= -1.0
    print(f"I={I:.2f} LUFS (đích {a.target}±1)  TP={TP:.2f} dBTP (≤ -1)  LRA={LRA:.2f} LU")
    print("PASS (số đo)" if ok else "FAIL")
    print("audio_review vẫn UNTESTED cho tới khi Tuệ nghe đúng file này.")
    return 0 if ok else 1


# ---------- freeze ----------
def cmd_freeze(a: argparse.Namespace) -> int:
    out = subprocess.run([tool("ffmpeg"), "-hide_banner", "-nostdin", "-nostats", "-i", a.video, "-an", "-vf",
                          f"freezedetect=n=0.001:d={a.d}", "-f", "null", "-"],
                         capture_output=True, text=True, encoding="utf-8", errors="replace")
    ev = [l.split("] ", 1)[-1] for l in out.stderr.splitlines() if "freeze_" in l]
    print("\n".join(ev) or "không có freeze event")
    print("Grain/zoom che được khung nguồn bị giữ: luôn chạy thêm `ranges`.")
    return 1 if out.returncode else 0


def main() -> int:
    if hasattr(sys.stdout, "reconfigure"):
        sys.stdout.reconfigure(encoding="utf-8")
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sp = p.add_subparsers(dest="cmd", required=True)
    d = sp.add_parser("diff"); d.add_argument("old"); d.add_argument("new"); d.add_argument("--ack", default="")
    li = sp.add_parser("lint"); li.add_argument("timeline"); li.add_argument("--allow-card", action="store_true")
    r = sp.add_parser("ranges"); r.add_argument("timeline"); r.add_argument("--root"); r.add_argument("--usable", nargs="*")
    c = sp.add_parser("color"); c.add_argument("video"); c.add_argument("timeline"); c.add_argument("--n", type=int, default=5)
    l = sp.add_parser("loudness"); l.add_argument("video"); l.add_argument("--target", type=float, default=-14.0)
    f = sp.add_parser("freeze"); f.add_argument("video"); f.add_argument("--d", type=float, default=0.5)
    a = p.parse_args()
    return {"diff": cmd_diff, "lint": cmd_lint, "ranges": cmd_ranges, "color": cmd_color,
            "loudness": cmd_loudness, "freeze": cmd_freeze}[a.cmd](a)


if __name__ == "__main__":
    sys.exit(main())
