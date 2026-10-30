#!/usr/bin/env bash
# QA trên chính file MP4 (preview không đủ): stream, khung đen, khung đầu, contact sheet trích từng khung, loudness.
# Dùng: qa_video.sh video.mp4 [out_dir=qa] [n_frames=12]
set -euo pipefail
command -v ffmpeg >/dev/null && command -v ffprobe >/dev/null || { echo "cần ffmpeg + ffprobe trong PATH"; exit 2; }
V=${1:?usage: qa_video.sh video.mp4 [out_dir] [n]}; OUT=${2:-qa}; N=${3:-12}
mkdir -p "$OUT"
echo "== streams"
ffprobe -v error -show_entries format=duration,size,bit_rate:stream=index,codec_type,codec_name,width,height,r_frame_rate,nb_frames -of compact "$V"
DUR=$(ffprobe -v error -show_entries format=duration -of csv=p=0 "$V")
echo "== khung đen/trống (YAVG < 20)"
ffmpeg -v error -i "$V" -map 0:v:0 -vf "scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-" -f null - 2>/dev/null \
  | awk -F= '/YAVG/{v=$2+0;n++;if(min==""||v<min)min=v;if(v<20){low++;if(low<=5)printf "  khung tối #%d (Y=%.1f)\n",n-1,v}} END{printf "  %d khung · Y min %.1f · khung tối %d\n",n,min,low+0}'
echo "== khung đầu (phải là cover có thiết kế)"
ffmpeg -v error -y -ss 0 -i "$V" -map 0:v:0 -frames:v 1 "$OUT/first-frame.png" && echo "  $OUT/first-frame.png"
echo "== contact sheet ($N khung, trích riêng từng khung)"
rm -f "$OUT"/f-*.png
for i in $(seq 0 $((N-1))); do
  T=$(awk -v d="$DUR" -v i="$i" -v n="$N" 'BEGIN{printf "%.3f", d*(i+0.5)/n}')
  ffmpeg -v error -y -ss "$T" -i "$V" -map 0:v:0 -frames:v 1 -vf "scale=480:-2" "$OUT/f-$(printf %02d "$i").png"
done
COLS=4; ffmpeg -v error -y -i "$OUT/f-%02d.png" -filter_complex "tile=${COLS}x$(( (N+COLS-1)/COLS ))" -frames:v 1 "$OUT/contact-sheet.png"
echo "  $OUT/contact-sheet.png  (MỞ RA XEM: chữ, safe area, khung rò rỉ)"
echo "== loudness"
ffmpeg -hide_banner -nostats -i "$V" -map 0:a:0? -af volumedetect -f null - 2>&1 | grep -E "mean_volume|max_volume" | sed 's/^.*\] /  /' || echo "  (không có audio)"
