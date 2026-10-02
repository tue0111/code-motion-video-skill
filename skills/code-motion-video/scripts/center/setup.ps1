# setup.ps1 — chuẩn bị thư mục phim một lần (cần mạng). Chạy trong thư mục phim:
#   powershell -ExecutionPolicy Bypass -File center\setup.ps1
# Kiểm tra node/ffmpeg/codex, cài playwright + chromium vào project, ghi kết quả ra logs\setup.txt để Center đọc.
$Root = (Get-Location).Path
New-Item -ItemType Directory -Force -Path (Join-Path $Root "logs") | Out-Null
$out = Join-Path $Root "logs\setup.txt"
"setup $(Get-Date -Format s) in $Root" | Out-File -Encoding utf8 $out
function Check($name, $cmd) {
  $c = Get-Command $name -ErrorAction SilentlyContinue
  if ($c) { $v = (& $name $cmd 2>&1 | Select-Object -First 1); "OK   $name  $v" | Tee-Object -Append -FilePath $out }
  else { "MISS $name" | Tee-Object -Append -FilePath $out }
}
Check node "--version"; Check npm "--version"; Check ffmpeg "-version"; Check ffprobe "-version"; Check codex "--version"; Check python "--version"
if (-not (Test-Path (Join-Path $Root "package.json"))) { npm init -y | Out-Null }
npm i -D playwright 2>&1 | Tee-Object -Append -FilePath $out | Out-Null
npx playwright install chromium 2>&1 | Tee-Object -Append -FilePath $out | Out-Null
if (Get-Command ffmpeg -ErrorAction SilentlyContinue) { "ffmpeg OK" | Tee-Object -Append -FilePath $out }
else { "THIẾU ffmpeg: winget install Gyan.FFmpeg (rồi mở terminal mới)" | Tee-Object -Append -FilePath $out }
"DONE" | Tee-Object -Append -FilePath $out
