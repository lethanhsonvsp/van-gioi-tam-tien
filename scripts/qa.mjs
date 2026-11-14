// npm run qa: starts the Vite dev server, runs scripts/playthrough.mjs (with the DOM audit) at 1920x1080, 1280x720 and 844x390, stops the server by PID.
// Usage: node scripts/qa.mjs [outDir]  (screenshots in <outDir>/<WxH>/). Exit 1 if any size has a violation or an error.
import { spawn, spawnSync } from 'node:child_process';
const out = process.argv[2] ?? '/tmp/vgtt-qa-after', port = 5199, url = `http://localhost:${port}/`;
const vite = spawn('node_modules/.bin/vite', ['--port', String(port), '--strictPort'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let up = false;
for (let i = 0; i < 60 && !up; i++) { await sleep(500); try { up = (await fetch(url)).ok; } catch { /* starting */ } }
let fail = !up;
if (up) for (const size of ['1920x1080', '1280x720', '844x390']) {
  console.log(`\n=== ${size}`);
  fail = spawnSync('node', ['scripts/playthrough.mjs', url, `${out}/${size}`, size], { stdio: 'inherit' }).status !== 0 || fail;
}
else console.log('vite không lên');
vite.kill();
console.log(fail ? '\nQA: HỎNG' : '\nQA: ĐẠT cả 3 khổ');
process.exit(fail ? 1 : 0);
