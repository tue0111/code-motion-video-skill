# setup.ps1 — chuẩn bị thư mục phim một lần (cần mạng). Chạy trong thư mục phim:
#   powershell -ExecutionPolicy Bypass -File center\setup.ps1
# Kiểm tra node/ffmpeg/codex, cài playwright + chromium vào project, ghi kết quả ra logs\setup.txt (UTF-8) để Center đọc.
$Root = (Get-Location).Path
New-Item -ItemType Directory -Force -Path (Join-Path $Root "logs") | Out-Null
$out = Join-Path $Root "logs\setup.txt"
function Log($s) { Write-Host $s; $s | Out-File -Append -Encoding utf8 $out }
"setup $(Get-Date -Format s) in $Root" | Out-File -Encoding utf8 $out

# Tìm ffmpeg kể cả khi vừa cài bằng winget mà PATH của tiến trình chưa cập nhật
function Add-FfmpegToPath {
  if (Get-Command ffmpeg -ErrorAction SilentlyContinue) { return }
  $cands = @("$env:LOCALAPPDATA\Microsoft\WinGet\Links", "C:\ffmpeg\bin", "$env:ProgramFiles\ffmpeg\bin")
  $pk = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Directory -Filter "Gyan.FFmpeg*" -ErrorAction SilentlyContinue
  foreach ($p in $pk) { $cands += (Get-ChildItem $p.FullName -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1 | ForEach-Object { $_.DirectoryName }) }
  foreach ($c in $cands) { if ($c -and (Test-Path (Join-Path $c "ffmpeg.exe"))) { $env:PATH = "$c;$env:PATH"; return } }
}
Add-FfmpegToPath

function Check($name, $arg) {
  $c = Get-Command $name -ErrorAction SilentlyContinue
  if ($c) { $v = (& $name $arg 2>&1 | Select-Object -First 1); Log "OK   $name  $v  ($($c.Source))" } else { Log "MISS $name" }
}
Check node "--version"; Check npm "--version"; Check ffmpeg "-version"; Check ffprobe "-version"; Check codex "--version"; Check python "--version"
if (-not (Test-Path (Join-Path $Root "package.json"))) { npm init -y | Out-Null }
if (-not (Test-Path (Join-Path $Root "node_modules\playwright"))) { npm i -D playwright 2>&1 | ForEach-Object { Log "$_" } }
npx playwright install chromium 2>&1 | ForEach-Object { Log "$_" }
if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) { Log "THIẾU ffmpeg: chạy INSTALL-FFMPEG.cmd (winget install Gyan.FFmpeg)" }
Log "DONE"
