// render.mjs — node render.mjs --stills=0.5,2,4   |   node render.mjs [--audio=a.mp3]
import { chromium } from 'playwright';            // hoặc puppeteer-core + executablePath Chrome
import { spawn } from 'node:child_process'; import { mkdirSync } from 'node:fs';
const args = Object.fromEntries(process.argv.slice(2).map(a => { const [k, v] = a.replace(/^--/, '').split('='); return [k, v ?? true]; }));
const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage(); await page.goto('file://' + process.cwd() + '/index.html');
await page.evaluate(() => window.__ready); const P = await page.evaluate(() => window.PROJECT);
await page.setViewportSize({ width: P.w, height: P.h });
const shot = async (t, f) => { await page.evaluate(t => window.renderFrame(t), t); await page.locator('canvas').screenshot({ path: f, type: 'jpeg', quality: 92 }); };
if (args.stills) { mkdirSync('out/check', { recursive: true }); for (const t of String(args.stills).split(',').map(Number)) await shot(t, `out/check/t${t.toFixed(2)}.jpg`); }
else { mkdirSync('out/frames', { recursive: true }); const N = Math.round(P.duration * P.fps);
  for (let n = 0; n < N; n++) await shot(n / P.fps, `out/frames/f${String(n).padStart(5, '0')}.jpg`);
  await new Promise((ok, bad) => spawn('ffmpeg', ['-y', '-loglevel', 'error', '-framerate', String(P.fps), '-i', 'out/frames/f%05d.jpg',
    ...(args.audio ? ['-i', args.audio, '-map', '0:v', '-map', '1:a', '-c:a', 'aac', '-b:a', '192k', '-shortest'] : []),
    '-c:v', 'libx264', '-crf', '17', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', 'out/video.mp4'], { stdio: 'inherit' }).on('close', c => c ? bad(c) : ok())); }
await browser.close();
