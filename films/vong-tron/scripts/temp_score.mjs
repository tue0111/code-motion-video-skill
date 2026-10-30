// temp_score.mjs — NHẠC TẠM cho animatic: đàn gảy (Karplus–Strong) ngũ cung + pad drone + whoosh voan + chuông ở iris.
// Chỉ để duyệt nhịp; bản production thay bằng nhạc có quyền dùng. Seed cố định → render lại giống hệt.
// Dùng: node scripts/temp_score.mjs out/temp.wav
import { writeFileSync } from 'node:fs';
const SR = 48000, DUR = 24, BPM = 80, B = 60 / BPM, TAU = 2 * Math.PI;
const L = new Float32Array(DUR * SR), R = new Float32Array(DUR * SR);
let s = 7; const noise = () => (s = (s * 1664525 + 1013904223) >>> 0) / 2147483648 - 1;
const hz = m => 440 * Math.pow(2, (m - 69) / 12);
function put(i, v, pan) { if (i >= 0 && i < L.length) { L[i] += v * Math.cos((pan + 1) * Math.PI / 4); R[i] += v * Math.sin((pan + 1) * Math.PI / 4); } }

// Đàn gảy: Karplus–Strong, tắt dần dài, hơi nhấn giọng (bend lên nhẹ ở đầu nốt kiểu đàn tranh)
function pluck(t0, midi, gain = 0.32, pan = 0, len = 2.6) {
  const f = hz(midi), N = Math.round(SR / f), buf = new Float32Array(N);
  for (let i = 0; i < N; i++) buf[i] = noise();
  const st = Math.round(t0 * SR);
  for (let i = 0, p = 0; i < len * SR; i++) {
    const a = buf[p], b = buf[(p + 1) % N];
    buf[p] = 0.4985 * (a + b); p = (p + 1) % N;
    put(st + i, a * gain * Math.min(1, i / 60), pan);
  }
}
// Ngũ cung trên D: D F G A C
const SC = [62, 65, 67, 69, 72, 74, 77, 79];
// Câu nhạc theo ô nhịp (3 s = 4 phách); mỗi phần tử [phách, bậc]; ô 4 (NGHỈ) và ô 6 thưa hơn
const BARS = [
  [[0, 3], [1.5, 4], [3, 2]],
  [[0, 0], [2, 1], [3, 2]],
  [[0, 3], [1, 4], [2.5, 5]],
  [[0, 2]],
  [[0, 1], [1.5, 2], [3, 3]],
  [[0, 4], [3, 5]],
  [[0, 7], [0.5, 5], [1, 4], [2, 3]],
  [[0, 2], [2, 0]],
];
BARS.forEach((bar, k) => bar.forEach(([beat, deg], j) => pluck(k * 3 + beat * B, SC[deg], 0.3, (j % 2 ? 0.25 : -0.2))));

// Pad drone D–A, thở theo ô nhịp, nhỏ hẳn ở ô 4 rồi mở lại
for (let i = 0; i < L.length; i++) {
  const t = i / SR, bar = Math.floor(t / 3);
  const env = Math.min(1, t / 1.5) * Math.min(1, (DUR - t) / 2.5) * (bar === 3 ? 0.55 : 1) * (0.85 + 0.15 * Math.sin(TAU * t / 6));
  const v = (Math.sin(TAU * 73.42 * t) + 0.6 * Math.sin(TAU * 110 * t) + 0.3 * Math.sin(TAU * 146.83 * t + Math.sin(TAU * 0.2 * t))) * 0.045 * env;
  put(i, v, 0);
}
// Whoosh voan: khung 0 và cú quét 2.55–3.6
function whoosh(t0, len, gain, pan) { let lp = 0; for (let i = 0; i < len * SR; i++) { lp += 0.06 * (noise() - lp); put(Math.round(t0 * SR) + i, lp * Math.sin(Math.PI * i / (len * SR)) * gain, pan); } }
whoosh(0, 1.6, 0.9, -0.3); whoosh(2.55, 1.05, 1.3, 0.4);
// Chuông nhỏ khi cửa sổ mở ra gương (17.55) và khi chữ hiện (20.2)
function chime(t0, f, gain) { for (let i = 0; i < 3 * SR; i++) { const t = i / SR; put(Math.round(t0 * SR) + i, [1, 2.76, 5.4].reduce((a, h, j) => a + Math.sin(TAU * f * h * t) * Math.exp(-t * (1.2 + j * 1.5)) / (j + 1), 0) * gain, 0.1); } }
chime(17.55, hz(86), 0.10); chime(20.2, hz(81), 0.07);

const n = L.length, out = Buffer.alloc(44 + n * 4), soft = x => Math.tanh(x * 1.1);
out.write('RIFF', 0); out.writeUInt32LE(36 + n * 4, 4); out.write('WAVEfmt ', 8); out.writeUInt32LE(16, 16);
out.writeUInt16LE(1, 20); out.writeUInt16LE(2, 22); out.writeUInt32LE(SR, 24); out.writeUInt32LE(SR * 4, 28);
out.writeUInt16LE(4, 32); out.writeUInt16LE(16, 34); out.write('data', 36); out.writeUInt32LE(n * 4, 40);
for (let i = 0; i < n; i++) { out.writeInt16LE(Math.round(soft(L[i]) * 32767), 44 + i * 4); out.writeInt16LE(Math.round(soft(R[i]) * 32767), 46 + i * 4); }
writeFileSync(process.argv[2] || 'out/temp.wav', out);
console.log('wrote', process.argv[2] || 'out/temp.wav');
