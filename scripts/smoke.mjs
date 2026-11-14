// Smoke test via headless Chromium over CDP (no extra packages). Usage: node scripts/smoke.mjs http://localhost:4173/ [outDir]
// Needs Node 22 (global WebSocket) and a Playwright-cached chrome-headless-shell; set CHROME to override.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
const url = process.argv[2] ?? 'http://localhost:4173/', out = process.argv[3] ?? '/tmp/vgtt-smoke';
mkdirSync(out, { recursive: true });
const pw = `${homedir()}/.cache/ms-playwright`;
const shell = readdirSync(pw).find(d => d.startsWith('chromium_headless_shell'));
const chrome = process.env.CHROME ?? `${pw}/${shell}/chrome-headless-shell-linux64/chrome-headless-shell`;
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, [`--remote-debugging-port=${port}`, '--no-sandbox', '--window-size=1600,900', `--user-data-dir=/tmp/vgtt-smoke-profile-${port}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50 && !targets; i++) { await sleep(200); try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { /* retry */ } }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => (ws.onopen = r));
let id = 0; const pending = new Map(); const errors = [];
ws.onmessage = ({ data }) => {
  const m = JSON.parse(data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
  else if (m.method === 'Runtime.consoleAPICalled' && m.params.type === 'error') errors.push(m.params.args.map(a => a.value ?? a.description).join(' '));
};
const send = (method, params = {}) => new Promise(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.result.value;
const shot = async name => writeFileSync(`${out}/${name}.png`, Buffer.from((await send('Page.captureScreenshot')).result.data, 'base64'));
const click = async text => { const ok = await ev(`(() => { const b = [...document.querySelectorAll('button')].find(b => b.textContent.includes(${JSON.stringify(text)})); if (b) b.click(); return !!b; })()`); if (!ok) errors.push(`button not found: ${text}`); await sleep(250); };
const has = async text => ev(`document.body.innerText.includes(${JSON.stringify(text)})`);
const check = async (text, label) => { if (!(await has(text))) errors.push(`missing "${text}" on ${label}`); await shot(label); };
await send('Runtime.enable'); await send('Page.enable'); await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url }); await sleep(1500);
await ev('localStorage.clear()'); await send('Page.navigate', { url }); await sleep(1500);
await check('Hướng dẫn', '0-guide'); await click('Đã hiểu');
await click('Tiên Nô'); await check('Triệu hồi', '1-tien-no'); await click('Quay 10'); await check('Tiên Nô đã có', '1b-quay');
await ev(`document.querySelector('.tcard')?.click()`); await sleep(250); await check('Ngoài chiến đấu', '1c-ho-so'); await click('Đóng'); await click('Quay lại');
await click('Tổ Đội'); await check('Tổ', '2-to-doi'); await click('Quay lại');
await click('Thí Luyện'); await check('Thí Luyện', '3-thi-luyen'); await sleep(500); await shot('3b-thi-luyen'); await click('Quay lại');
await click('Tu Luyện'); await check('Đổi tên', '4-tu-luyen'); await click('Quay lại');
await ev(`document.querySelector('button[aria-label="Cài Đặt"]').click()`); await sleep(250); await check('Phiên bản save', '5-cai-dat');
await click('Xuất save'); await click('Xóa save và chơi lại'); await check('Bấm lần nữa để xóa', '5b-xac-nhan');
ws.close(); proc.kill();
console.log(errors.length ? `FAIL\n${errors.join('\n')}` : `OK, screenshots in ${out}`);
process.exit(errors.length ? 1 : 0);
