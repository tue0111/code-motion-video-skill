"""Kiểm các đường dẫn file viết trong backtick của mọi .md có tồn tại không.
Chạy: python tests/check_links.py   (thoát 1 nếu có đường dẫn hỏng)"""
import os, re, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
files = subprocess.check_output(["git", "ls-files", "-co", "--exclude-standard"], text=True, encoding="utf-8").split("\n")
PAT = re.compile(r"`((?:\.\./|\./|skills/|references/|templates/|scripts/|lib/|examples/)[A-Za-z0-9_./\-]+\.(?:md|py|mjs|js|json|sh|ps1|cmd|html))`")
bad = []
for f in files:
    if not f.endswith(".md") or "/templates/" in f:
        continue
    here = os.path.dirname(f)
    parts = f.split("/")
    skill = os.path.join(*parts[:2]) if parts[0] == "skills" and len(parts) > 2 else None
    for m in PAT.finditer(open(f, encoding="utf-8").read()):
        p = m.group(1)
        if "paths.local" in p or "<" in p:
            continue
        cands = [p, os.path.join(here, p)]
        if skill:
            cands += [os.path.join(skill, p), os.path.join(skill, "references", p)]
        cands += [os.path.join("skills", d, p) for d in os.listdir("skills")]  # viết tắt theo một skill
        if not any(os.path.exists(os.path.normpath(c)) for c in cands):
            bad.append(f"{f} -> {p}")
# mọi file trong film-craft/references phải có trong bảng tra của SKILL.md
idx = open("skills/film-craft/SKILL.md", encoding="utf-8").read()
for n in sorted(os.listdir("skills/film-craft/references")):
    if n.endswith(".md") and f"references/{n}" not in idx:
        bad.append(f"film-craft/SKILL.md thiếu dòng cho references/{n}")
print("\n".join(bad) if bad else "OK")
sys.exit(1 if bad else 0)
