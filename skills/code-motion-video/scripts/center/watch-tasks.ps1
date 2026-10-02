# watch-tasks.ps1 — "hộp thư" Center → Worker.
# Claude (Center) ghi lệnh việc vào tasks\queue\TASK-NN.md; script này gọi Codex (Worker) cho từng lệnh,
# ghi log + báo cáo, chuyển lệnh sang tasks\done\. Chạy MỘT lần trong thư mục phim rồi để đó:
#   powershell -ExecutionPolicy Bypass -File center\watch-tasks.ps1
# Tuỳ chọn: -Sandbox workspace-write (mặc định) | read-only | danger-full-access
#           -Effort high (model_reasoning_effort)  -Model ""  (trống = model mặc định trong config Codex)
#           -Once  (chạy hết hàng đợi rồi thoát)
param(
  [string]$Sandbox = "workspace-write",
  [string]$Effort = "high",
  [string]$Model = "",
  [int]$PollSeconds = 5,
  [switch]$Once
)
$ErrorActionPreference = "Stop"
$Root = (Get-Location).Path
foreach ($d in "tasks\queue", "tasks\done", "reports", "logs") { New-Item -ItemType Directory -Force -Path (Join-Path $Root $d) | Out-Null }
$codex = Get-Command codex -ErrorAction SilentlyContinue
if (-not $codex) { Write-Host "Không thấy lệnh 'codex'. Cài: npm i -g @openai/codex rồi 'codex login'." -ForegroundColor Red; exit 1 }

# Ghi lại khả năng của CLI để Center đọc được (cờ có thể khác giữa các phiên bản)
$ErrorActionPreference = "Continue"
& codex --version *> (Join-Path $Root "logs\codex-version.txt")
& codex exec --help *> (Join-Path $Root "logs\codex-exec-help.txt")
"$(Get-Date -Format s) watcher started in $Root (sandbox=$Sandbox effort=$Effort)" | Out-File -Append -Encoding utf8 (Join-Path $Root "logs\watcher.log")
Write-Host "Center inbox đang chạy trong $Root — chờ tasks\queue\*.md (Ctrl+C để dừng)" -ForegroundColor Cyan

function Invoke-Task($task) {
  $id = [IO.Path]::GetFileNameWithoutExtension($task.Name)
  $log = Join-Path $Root "logs\$id.log"
  $last = Join-Path $Root "reports\$id.last.txt"
  $rel = "tasks/queue/$($task.Name)"
  $prompt = @"
Bạn là WORKER trong studio này. Đọc AGENTS.md (luật nhà + giao thức Worker) rồi thực hiện đúng lệnh việc trong $rel.
Chỉ sửa các file nằm trong phạm vi lệnh cho phép. Chạy đủ các kiểm tra mà lệnh yêu cầu.
Khi xong (hoặc bị chặn), ghi báo cáo theo mẫu templates trong AGENTS.md vào reports/$id.md. Không hỏi lại; nếu thiếu dữ kiện thì ghi STATUS: BLOCKED và lý do.
"@
  $cargs = @("exec", "--skip-git-repo-check", "-C", $Root, "-s", $Sandbox, "-c", "model_reasoning_effort=$Effort", "-o", $last)
  if ($Model) { $cargs += @("-m", $Model) }
  $cargs += $prompt
  "$(Get-Date -Format s) START $id" | Out-File -Append -Encoding utf8 (Join-Path $Root "logs\watcher.log")
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

while ($true) {
  $tasks = Get-ChildItem (Join-Path $Root "tasks\queue") -Filter "TASK-*.md" -ErrorAction SilentlyContinue | Sort-Object Name
  foreach ($t in $tasks) { Invoke-Task $t }
  if ($Once -and -not $tasks) { break }
  # Center có thể ghi tasks\STOP để tắt watcher từ xa
  if (Test-Path (Join-Path $Root "tasks\STOP")) { Remove-Item (Join-Path $Root "tasks\STOP"); Write-Host "STOP nhận từ Center."; break }
  Start-Sleep -Seconds $PollSeconds
}
