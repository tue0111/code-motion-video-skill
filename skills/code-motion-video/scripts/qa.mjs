// qa.mjs — QA trên chính MP4, chạy được trên Windows/macOS/Linux (chỉ cần ffmpeg + ffprobe).
// Dùng: node scripts/qa.mjs out/final.mp4 [out/qa] [n=12]  → in kết quả + ghi out/qa/qa.json, contact-sheet.png, first-frame.png, phone.png
import { spawnSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
const [V, OUT = 'out/qa', Narg = '12'] = process.argv.slice(2);
if (!V) { console.error('usage: node qa.mjs video.mp4 [out_dir] [n]'); process.exit(1); }
const N = +Narg; mkdirSync(OUT, { recursive: true });
const run = (cmd, args) => spawnSync(cmd, args, { encoding: 'utf8', maxBuffer: 1 << 28 });
const probe = JSON.parse(run('ffprobe', ['-v', 'error', '-show_entries', 'format=duration,size,bit_rate:stream=index,codec_type,codec_name,width,height,r_frame_rate,nb_frames', '-of', 'json', V]).stdout || '{}');
const dur = +(probe.format?.duration || 0);
// khung đen/trống
const sig = run('ffmpeg', ['-v', 'error', '-i', V, '-map', '0:v:0', '-vf', 'scale=64:36,signalstats,metadata=print:key=lavfi.signalstats.YAVG:file=-', '-f', 'null', '-']).stdout;
const ys = [...sig.matchAll(/YAVG=([\d.]+)/g)].map(m => +m[1]);
const dark = ys.map((y, i) => [i, y]).filter(([, y]) => y < 20);
// khung đứng hình (bỏ qua hold có chủ đích: báo đoạn ≥ 0.5 s)
const fr = run('ffmpeg', ['-v', 'info', '-i', V, '-map', '0:v:0', '-vf', 'freezedetect=n=0.001:d=0.5', '-f', 'null', '-']).stderr;
const freezes = [...fr.matchAll(/freeze_start: ([\d.]+)[\s\S]*?freeze_duration: ([\d.]+)/g)].map(m => ({ start: +m[1], dur: +m[2] }));
// ảnh
run('ffmpeg', ['-y', '-v', 'error', '-ss', '0', '-i', V, '-frames:v', '1', `${OUT}/first-frame.png`]);
const fps = Math.max(0.1, N / Math.max(dur, 0.1));
run('ffmpeg', ['-y', '-v', 'error', '-i', V, '-vf', `fps=${fps.toFixed(4)},scale=480:-2,tile=4x${Math.ceil(N / 4)}`, '-frames:v', '1', `${OUT}/contact-sheet.png`]);
run('ffmpeg', ['-y', '-v', 'error', '-i', V, '-vf', `fps=1,scale=360:-2,tile=5x${Math.max(1, Math.ceil(dur / 5))}`, '-frames:v', '1', `${OUT}/phone.png`]);
// loudness
const hasAudio = (probe.streams || []).some(s => s.codec_type === 'audio');
let loud = null;
if (hasAudio) {
  const l = run('ffmpeg', ['-hide_banner', '-nostats', '-i', V, '-map', '0:a:0', '-af', 'loudnorm=print_format=json', '-f', 'null', '-']).stderr;
  const j = l.slice(l.lastIndexOf('{'), l.lastIndexOf('}') + 1); try { const o = JSON.parse(j); loud = { lufs: +o.input_i, truePeak: +o.input_tp }; } catch { }
}
const res = { file: V, duration: dur, streams: probe.streams, frames: ys.length, minY: Math.min(...ys), darkFrames: dark.length, firstDark: dark.slice(0, 5), freezes, audio: hasAudio, loudness: loud,
  images: [`${OUT}/first-frame.png`, `${OUT}/contact-sheet.png`, `${OUT}/phone.png`] };
writeFileSync(`${OUT}/qa.json`, JSON.stringify(res, null, 2));
console.log(`duration ${dur.toFixed(2)}s · ${ys.length} khung · khung tối ${dark.length} · đứng hình ≥0.5s: ${freezes.length} · audio ${hasAudio ? (loud ? `${loud.lufs} LUFS, TP ${loud.truePeak}` : 'có') : 'KHÔNG'}`);
console.log(`ảnh: ${res.images.join(', ')} — MỞ RA XEM`);
