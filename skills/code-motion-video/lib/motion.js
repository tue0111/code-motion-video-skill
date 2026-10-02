// motion.js — chuyển động thuần theo t (seek-safe). Dùng: <script src="lib/motion.js"></script> → window.M
// Mọi hàm là hàm thuần của thời gian: render khung 812 không cần mô phỏng 0–811.
(function (root) {
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const lerp = (a, b, k) => a + (b - a) * k;
  const seg = (t, a, b) => clamp((t - a) / (b - a));
  const ease = k => (k = clamp(k), k < .5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);
  const easeOut = k => 1 - Math.pow(1 - clamp(k), 3);
  const easeIn = k => Math.pow(clamp(k), 3);

  // Lò xo tắt dần dạng đóng, 0 → 1. k = độ cứng, d = giảm chấn. z < 1 có overshoot.
  function spring(t, k = 170, d = 26) {
    if (t <= 0) return 0;
    const w0 = Math.sqrt(k), z = d / (2 * w0);
    if (z < 1) {
      const wd = w0 * Math.sqrt(1 - z * z);
      return 1 - Math.exp(-z * w0 * t) * (Math.cos(wd * t) + (z * w0 / wd) * Math.sin(wd * t));
    }
    return 1 - Math.exp(-w0 * t) * (1 + w0 * t); // z >= 1: coi như tới hạn, không overshoot
  }

  // Preset theo nhóm đối tượng (MICRO UI snap, panel/camera vừa, chữ lớn nặng, mascot nảy rõ)
  const SPRING = { snappy: [320, 30], default: [170, 26], heavy: [90, 22], playful: [200, 12] };

  // Một giá trị đổi đích nhiều lần: CỘNG một lò xo cho mỗi lần đổi, không khởi động lại.
  // keys: [[time, value], ...] sắp theo thời gian. Vận tốc liên tục qua mọi lần đổi.
  function track(t, keys, k = 170, d = 26) {
    let v = keys[0][1];
    for (let i = 1; i < keys.length; i++) v += (keys[i][1] - keys[i - 1][1]) * spring(t - keys[i][0], k, d);
    return v;
  }

  // Thanh chỉ báo co giãn: mép trước cứng hơn mép sau → kéo dài khi di chuyển.
  function indicator(t, stops, width = 120) {
    const lead = track(t, stops, 320, 30), trail = track(t, stops, 140, 22);
    return { left: Math.min(lead, trail), right: Math.max(lead, trail) + width };
  }

  // Chữ trong hộp đang biến hình: vào SAU khi morph bắt đầu, ra TRƯỚC morph kế tiếp.
  const swapAlpha = (t, tIn, tOut) => Math.min(clamp((t - tIn - 0.08) / 0.12), clamp((tOut - 0.1 - t) / 0.1));

  // Lượng tử hoá t về đầu khung: dùng cho CHỮ/SỐ phải đọc được, để motion blur (sub-frame) không trộn
  // nhiều giá trị khác nhau thành vệt nhoè. Chuyển động hình khối vẫn dùng t liên tục.
  const frameT = (t, fps) => Math.floor(t * fps + 1e-6) / fps;

  // Loop liền mạch: khung cuối = khung đầu (cả vị trí lẫn vận tốc con trỏ).
  const loopT = (t, dur) => ((t % dur) + dur) % dur;

  // Nhiễu có seed — không bao giờ dùng Math.random.
  function rng(seed) {
    return () => {
      seed |= 0; seed = seed + 0x6D2B79F5 | 0;
      let x = Math.imul(seed ^ seed >>> 15, 1 | seed);
      x = x + Math.imul(x ^ x >>> 7, 61 | x) ^ x;
      return ((x ^ x >>> 14) >>> 0) / 4294967296;
    };
  }
  const hash = i => { const s = Math.sin(i * 12.9898 + 78.233) * 43758.5453; return s - Math.floor(s); };

  // Keyframe nhiều điểm, giá trị số hoặc mảng.
  function kf(t, keys, e = ease) {
    if (t <= keys[0][0]) return keys[0][1];
    for (let i = 1; i < keys.length; i++) if (t <= keys[i][0]) {
      const [t0, a] = keys[i - 1], [t1, b] = keys[i], k = e((t - t0) / (t1 - t0));
      return Array.isArray(a) ? a.map((x, j) => lerp(x, b[j], k)) : lerp(a, b, k);
    }
    return keys[keys.length - 1][1];
  }

  // Nhịp: pulse = 1 đúng phách rồi tắt dần. beats từ beats.json hoặc lưới BPM.
  const beatGrid = (bpm, offset = 0) => t => (t - offset) / (60 / bpm);
  const pulse = (t, bpm, offset = 0, decay = 6) => { const b = (t - offset) * bpm / 60; return b < 0 ? 0 : Math.exp(-decay * (b - Math.floor(b)) * 60 / bpm); };

  // Camera 2.5D: dolly đổi cz (có parallax), zoom đổi focal (không parallax).
  function project(x, y, z, cam) {
    const s = cam.focal / Math.max(1e-3, z - cam.cz);
    return { x: (x - cam.cx) * s + cam.W / 2 + (cam.pan || 0), y: (y - cam.cy) * s + cam.H / 2 + (cam.tilt || 0), s };
  }

  const api = { clamp, lerp, seg, ease, easeIn, easeOut, spring, SPRING, track, indicator, swapAlpha, frameT, loopT, rng, hash, kf, beatGrid, pulse, project };
  if (typeof module !== 'undefined') module.exports = api; else root.M = api;
})(typeof window !== 'undefined' ? window : globalThis);
