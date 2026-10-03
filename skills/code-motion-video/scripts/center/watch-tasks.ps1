# watch-tasks.ps1 — "hộp thư" Center → Worker.
# Claude (Center) ghi lệnh việc vào tasks\queue\TASK-NN.md; script này gọi Codex (Worker) cho từng lệnh,
# ghi log + báo cáo, chuyển lệnh sang tasks\done\. Chạy MỘT lần trong thư mục phim rồi để đó:
#   powershell -ExecutionPolicy Bypass -File center\watch-tasks.ps1
# Tuỳ chọn: -Sandbox workspace-write (mặc định) | read-only | danger-full-access
#           -Effort low|medium|high|xhigh (model_reasoning_effort; trống = theo config Codex)  -Model ""  (trống = model mặc định trong config Codex)
#           -Once  (chạy hết hàng đợi rồi thoát)
# Model/effort theo từng lệnh: trong 5 dòng đầu của file TASK có thể ghi "model: <slug>" và/hoặc "effort: <low|medium|high|xhigh>";
#           dòng đó ghi đè -Model/-Effort cho đúng lệnh ấy. Log ghi model/effort đã yêu cầu (không phải model thực chạy).
# Một watcher cho mỗi root: tasks\watcher.lock chứa PID; nếu PID còn sống thì script in lỗi và thoát (exit 1);
#           khoá được xoá khi thoát bình thường (tasks\STOP, -Once, Ctrl+C). Khoá cũ của tiến trình đã chết tự bị ghi đè.
param(
  [string]$Sandbox = "workspace-write",
  [string]$Effort = "",
  [string]$Model = "",
  [int]$PollSeconds = 5,
  [switch]$Once
)
$ErrorActionPreference = "Stop"
$Root = (Get-Location).Path
foreach ($d in "tasks\queue", "tasks\done", "reports", "logs") { New-Item -ItemType Directory -Force -Path (Join-Path $Root $d) | Out-Null }
# Single-instance guard: tasks\watcher.lock chứa PID của watcher đang chạy trong root này
$LockFile = Join-Path $Root "tasks\watcher.lock"
if (Test-Path -LiteralPath $LockFile) {
  $raw = Get-Content -LiteralPath $LockFile -ErrorAction SilentlyContinue | Select-Object -First 1
  $oldPid = 0
  if ($raw) { [void][int]::TryParse(([string]$raw).Trim(), [ref]$oldPid) }
  $oldProc = $null
  if ($oldPid -gt 0 -and $oldPid -ne $PID) { $oldProc = Get-Process -Id $oldPid -ErrorAction SilentlyContinue }
  if ($oldProc -and $oldProc.ProcessName -match 'powershell|pwsh') {
    Write-Host "Đã có watcher đang chạy trong $Root (PID $oldPid). Mỗi root chỉ một watcher: dừng nó trước (ghi tasks\STOP) rồi chạy lại. Khoá: $LockFile" -ForegroundColor Red
    exit 1
  }
}
Set-Content -LiteralPath $LockFile -Value $PID -Encoding ASCII
# Tìm ffmpeg kể cả khi vừa cài bằng winget mà PATH của tiến trình chưa cập nhật
function Add-FfmpegToPath {
  if (Get-Command ffmpeg -ErrorAction SilentlyContinue) { return }
  $cands = @("$env:LOCALAPPDATA\Microsoft\WinGet\Links", "C:\ffmpeg\bin", "$env:ProgramFiles\ffmpeg\bin")
  $pk = Get-ChildItem "$env:LOCALAPPDATA\Microsoft\WinGet\Packages" -Directory -Filter "Gyan.FFmpeg*" -ErrorAction SilentlyContinue
  foreach ($p in $pk) { $cands += (Get-ChildItem $p.FullName -Recurse -Filter ffmpeg.exe -ErrorAction SilentlyContinue | Select-Object -First 1 | ForEach-Object { $_.DirectoryName }) }
  foreach ($c in $cands) { if ($c -and (Test-Path (Join-Path $c "ffmpeg.exe"))) { $env:PATH = "$c;$env:PATH"; return } }
}
Add-FfmpegToPath
$codex = Get-Command codex -ErrorAction SilentlyContinue
if (-not $codex) { Write-Host "Không thấy lệnh 'codex'. Cài: npm i -g @openai/codex rồi 'codex login'." -ForegroundColor Red; Remove-Item -LiteralPath $LockFile -Force -ErrorAction SilentlyContinue; exit 1 }

# Ghi lại khả năng của CLI để Center đọc được (cờ có thể khác giữa các phiên bản)
$ErrorActionPreference = "Continue"
& codex --version *> (Join-Path $Root "logs\codex-version.txt")
& codex exec --help *> (Join-Path $Root "logs\codex-exec-help.txt")
"$(Get-Date -Format s) watcher started in $Root (sandbox=$Sandbox effort=$Effort) ffmpeg=$([bool](Get-Command ffmpeg -ErrorAction SilentlyContinue))" | Out-File -Append -Encoding utf8 (Join-Path $Root "logs\watcher.log")
Write-Host "Center inbox đang chạy trong $Root — chờ tasks\queue\*.md (Ctrl+C để dừng)" -ForegroundColor Cyan

function Invoke-Task($task) {
  $id = [IO.Path]::GetFileNameWithoutExtension($task.Name)
  $log = Join-Path $Root "logs\$id.log"
  $last = Join-Path $Root "reports\$id.last.txt"
  $rel = "tasks/queue/$($task.Name)"
  $prompt = @"
Bạn là thành viên studio (vai ghi trong lệnh: WORKER thi công, hoặc PLANNER/CRITIC). Đọc AGENTS.md (luật nhà + giao thức Worker) rồi thực hiện đúng lệnh việc trong $rel.
Chỉ sửa các file nằm trong phạm vi lệnh cho phép. Chạy đủ các kiểm tra mà lệnh yêu cầu.
Khi xong (hoặc bị chặn), ghi báo cáo theo mẫu templates trong AGENTS.md vào reports/$id.md. Không hỏi lại; nếu thiếu dữ kiện thì ghi STATUS: BLOCKED và lý do.
"@
  $cargs = @("exec", "--skip-git-repo-check", "-C", $Root, "-s", $Sandbox, "-o", $last)
  if ($Effort) { $cargs += @("-c", "model_reasoning_effort=$Effort") }  # trống = theo /model + effort đã chọn trong Codex
  # Model theo từng lệnh: dòng đầu file dạng "model: gpt-6-astra" (và tuỳ chọn "effort: high") ghi đè -Model/-Effort
  $taskModel = $Model; $taskEffort = ""
  foreach ($ln in (Get-Content -Encoding UTF8 -TotalCount 5 $task.FullName)) {
    if ($ln -match '^\s*model:\s*([A-Za-z0-9._-]+)\s*$') { $taskModel = $Matches[1] }
    if ($ln -match '^\s*effort:\s*([a-z]+)\s*$') { $taskEffort = $Matches[1] }
  }
  if ($taskEffort) { $cargs += @("-c", "model_reasoning_effort=$taskEffort") }
  if ($taskModel) { $cargs += @("-m", $taskModel) }
  $cargs += $prompt
  "$(Get-Date -Format s) START $id model=$taskModel effort=$taskEffort" | Out-File -Append -Encoding utf8 (Join-Path $Root "logs\watcher.log")
  Write-Host "[$(Get-Date -Format HH:mm:ss)] Worker nhận $id ..." -ForegroundColor Yellow
  $sw = [Diagnostics.Stopwatch]::StartNew()
  $prev = $ErrorActionPreference; $ErrorActionPreference = "Continue"   # stderr của codex không được làm vỡ vòng lặp
  & codex @cargs *> $log
  $code = $LASTEXITCODE
  $ErrorActionPreference = $prev
  $sw.Stop()
  $mins = [math]::Round($sw.Elapsed.TotalMinutes, 1)
  if (-not (Test-Path (Join-Path $Root "reports\$id.md"))) {
    "STATUS: NO_REPORT`nexit=$code`nXem logs\$id.log và reports\$id.last.txt" | Out-File -Encoding utf8 (Join-Path $Root "reports\$id.md")
  }
  "{`"id`":`"$id`",`"exit`":$code,`"minutes`":$mins,`"finished`":`"$(Get-Date -Format s)`"}" | Out-File -Encoding utf8 (Join-Path $Root "reports\$id.done.json")
  Move-Item -Force $task.FullName (Join-Path $Root "tasks\done\$($task.Name)")
  "$(Get-Date -Format s) END $id exit=$code ${mins}m" | Out-File -Append -Encoding utf8 (Join-Path $Root "logs\watcher.log")
  Write-Host "[$(Get-Date -Format HH:mm:ss)] Xong $id (exit $code, $mins phút)" -ForegroundColor Green
}

try {
  while ($true) {
    $tasks = Get-ChildItem (Join-Path $Root "tasks\queue") -Filter "TASK-*.md" -ErrorAction SilentlyContinue | Sort-Object Name
    foreach ($t in $tasks) { Invoke-Task $t }
    if ($Once -and -not $tasks) { break }
    # Center có thể ghi tasks\STOP để tắt watcher từ xa
    if (Test-Path (Join-Path $Root "tasks\STOP")) { Remove-Item (Join-Path $Root "tasks\STOP"); Write-Host "STOP nhận từ Center."; break }
    Start-Sleep -Seconds $PollSeconds
  }
} finally {
  Remove-Item -LiteralPath $LockFile -Force -ErrorAction SilentlyContinue
}
