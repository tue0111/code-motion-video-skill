// sfx.mjs — tổng hợp SFX (và nhạc nền đơn giản) từ danh sách cue, cùng timeline với hình.
// Dùng: node sfx.mjs cues.json out/sfx.wav [--dur 15] [--bed 120]
//   cues.json: [{"t":0.5,"type":"click"},{"t":1.0,"type":"whoosh","gain":0.8}, ...]
//   --bed BPM: thêm kick + hat + pad đơn giản theo BPM (thay bằng nhạc có license khi có)
// Ghép với video: ffmpeg -i out/silent.mp4 -i out/sfx.wav -af loudnorm=I=-14:TP=-1 -c:v copy -c:a aac -shortest out/final.mp4
import { readFileSync, writeFileSync } from 'node:fs';
const argv = process.argv.slice(2);
const opt = (k, d) => { const i = argv.indexOf('--' + k); return i >= 0 ? Number(argv[i + 1]) : d; };
const SR = 48000, cues = JSON.parse(readFileSync(argv[0], 'utf8'));
const DUR = opt('dur', Math.max(0, ...cues.map(c => c.t)) + 2), BED = opt('bed', 0);
const L = new Float32Array(Math.ceil(DUR * SR)), R = new Float32Array(L.length);
let s = 42; const noise = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;   // seed cố định
const TAU = 2 * Math.PI;
const VOICES = {   // [độ dài s, hàm(t) → mẫu]
  click:  [0.05, t => Math.sin(TAU * 1800 * t) * Math.exp(-t * 90) * 0.5],
  tick:   [0.03, t => Math.sin(TAU * 3200 * t) * Math.exp(-t * 160) * 0.35],
  pop:    [0.15, t => Math.sin(TAU * (600 + 900 * t) * t) * Math.exp(-t * 30) * 0.4],
  thump:  [0.50, t => Math.sin(TAU * (90 - 60 * t) * t) * Math.exp(-t * 9) * 0.9],
  whoosh: [0.35, t => noise() * Math.sin(Math.PI * Math.min(1, t / 0.35)) * 0.25],
  rise:   [0.80, t => noise() * Math.pow(t / 0.8, 2) * 0.22 + Math.sin(TAU * (200 + 600 * t) * t) * t * 0.08],
  chime:  [1.20, t => [1, 2.01, 3.02].reduce((a, h, i) => a + Math.sin(TAU * 880 * h * t) * Math.exp(-t * (3 + 2 * i)) / (i + 1), 0) * 0.18],
};
function add(t0, len, fn, gain = 1, pan = 0) {
  const st = Math.floor(t0 * SR), gl = gain * Math.cos((pan + 1) * Math.PI / 4), gr = gain * Math.sin((pan + 1) * Math.PI / 4);
  for (let i = 0; i < len * SR && st + i < L.length; i++) { if (st + i < 0) continue; const v = fn(i / SR); L[st + i] += v * gl; R[st + i] += v * gr; }
}
for (const c of cues) { const v = VOICES[c.type]; if (!v) { console.error('không có voice:', c.type); continue; } add(c.t, v[0], v[1], c.gain ?? 1, c.pan ?? 0); }
if (BED) {
  const spb = 60 / BED, chords = [[220, 277.2, 329.6], [196, 246.9, 293.7], [174.6, 220, 261.6], [196, 246.9, 293.7]];
  for (let b = 0, t = 0; t < DUR; b++, t = b * spb) {
    add(t, 0.4, VOICES.thump[1], b % 4 === 0 ? 0.55 : 0.35);
    add(t + spb / 2, 0.05, x => noise() * Math.exp(-x * 120) * 0.08, 1, 0.3);
    if (b % 4 === 0) { const ch = chords[(b / 4) % 4]; add(t, spb * 4, x => ch.reduce((a, f) => a + Math.sin(TAU * f * x), 0) * Math.min(1, x * 4) * Math.min(1, (spb * 4 - x) * 4) * 0.035); }
  }
}
const n = L.length, buf = Buffer.alloc(44 + n * 4), soft = x => Math.tanh(x * 1.2);   // soft-clip
buf.write('RIFF', 0); buf.writeUInt32LE(36 + n * 4, 4); buf.write('WAVEfmt ', 8); buf.writeUInt32LE(16, 16);
buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22); buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28);
buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34); buf.write('data', 36); buf.writeUInt32LE(n * 4, 40);
for (let i = 0; i < n; i++) { buf.writeInt16LE(Math.round(soft(L[i]) * 32767), 44 + i * 4); buf.writeInt16LE(Math.round(soft(R[i]) * 32767), 46 + i * 4); }
writeFileSync(argv[1], buf);
console.log(`wrote ${argv[1]} · ${DUR.toFixed(2)}s · ${cues.length} cues${BED ? ' · bed ' + BED + ' BPM' : ''}`);
