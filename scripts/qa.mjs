// npm run qa: starts the Vite dev server, runs scripts/playthrough.mjs (with the DOM audit) per size and seed, stops the server by PID.
// Usage: node scripts/qa.mjs [outDir]  (screenshots in <outDir>/seed<S>/<size>/). Env: VGTT_SEEDS="1" (comma list, default 1), VGTT_SIZES="1920x1080,1280x720,844x390".
// Exit 1 if any run has a violation, error or crash; every failure says which seed/size, the exit status and where the screenshots are.
import { spawn, spawnSync } from 'node:child_process';
const out = process.argv[2] ?? '/tmp/vgtt-qa-after', port = 5199, url = `http://localhost:${port}/`;
const seeds = (process.env.VGTT_SEEDS ?? '1').split(','), sizes = (process.env.VGTT_SIZES ?? '1920x1080,1280x720,844x390').split(',');
const vite = spawn('node_modules/.bin/vite', ['--port', String(port), '--strictPort'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let up = false;
for (let i = 0; i < 60 && !up; i++) { await sleep(500); try { up = (await fetch(url)).ok; } catch { /* starting */ } }
const failed = [];
if (!up) failed.push('vite không lên');
else for (const seed of seeds) for (const size of sizes) {
  console.log(`\n=== seed ${seed} · ${size}`);
  const dir = `${out}/seed${seed}/${size}`;
  const r = spawnSync('node', ['scripts/playthrough.mjs', url, dir, size], { stdio: 'inherit', env: { ...process.env, VGTT_SEED: seed }, timeout: 600000 });
  if (r.status !== 0) failed.push(`seed ${seed} · ${size}: ${r.error ? r.error.message : r.signal ? `bị dừng bởi ${r.signal}` : `mã thoát ${r.status}`}, xem dòng VI PHẠM/LỖI ở trên, ảnh ${dir}`);
}
vite.kill();
console.log(failed.length ? `\nQA: HỎNG\n${failed.join('\n')}` : `\nQA: ĐẠT ${seeds.length} hạt giống x ${sizes.length} khổ`);
process.exit(failed.length ? 1 : 0);
