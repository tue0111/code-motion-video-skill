@echo off
chcp 65001 >nul
cd /d "%~dp0"
title Center inbox - film-01
echo [1/2] Setup: playwright + chromium, kiem tra node/ffmpeg/codex...
powershell -NoProfile -ExecutionPolicy Bypass -File "center\setup.ps1"
echo [2/2] Hop thu Center -^> Codex dang chay. De cua so nay mo.
powershell -NoProfile -ExecutionPolicy Bypass -NoExit -File "center\watch-tasks.ps1"
