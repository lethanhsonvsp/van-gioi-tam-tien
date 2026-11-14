// Full-loop playthrough via headless Chromium over CDP (no extra packages). Usage: node scripts/playthrough.mjs [url] [outDir] [WxH]
// Needs Node 22 and a Playwright-cached chrome-headless-shell; set CHROME to override. Logs step timings and console errors.
import { spawn } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync } from 'node:fs';
import { homedir } from 'node:os';
import { scanJs } from './dom-scan.mjs';
// VGTT_SEED fixes the gacha and battle seeds (page reads ?seed=), so a run repeats exactly.
const base = process.argv[2] ?? 'http://localhost:5199/';
const url = process.env.VGTT_SEED ? `${base}?seed=${process.env.VGTT_SEED}` : base, out = process.argv[3] ?? '/tmp/vgtt-play';
const [W, H] = (process.argv[4] ?? '1280x720').split('x').map(Number);
mkdirSync(out, { recursive: true });
const pw = `${homedir()}/.cache/ms-playwright`;
const shell = readdirSync(pw).find(d => d.startsWith('chromium_headless_shell'));
const chrome = process.env.CHROME ?? `${pw}/${shell}/chrome-headless-shell-linux64/chrome-headless-shell`;
const port = 9300 + Math.floor(Math.random() * 500);
const proc = spawn(chrome, [`--remote-debugging-port=${port}`, '--no-sandbox', `--window-size=${W},${H}`, `--user-data-dir=/tmp/vgtt-play-profile-${port}`, 'about:blank'], { stdio: 'ignore' });
const sleep = ms => new Promise(r => setTimeout(r, ms));
let targets;
for (let i = 0; i < 50 && !targets; i++) { await sleep(200); try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { /* retry */ } }
const ws = new WebSocket(targets.find(t => t.type === 'page').webSocketDebuggerUrl);
await new Promise(r => (ws.onopen = r));
let id = 0; const pending = new Map(); const errors = []; const steps = [];
ws.onmessage = ({ data }) => {
  const m = JSON.parse(data);
  if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  else if (m.method === 'Runtime.exceptionThrown') errors.push(m.params.exceptionDetails.exception?.description ?? m.params.exceptionDetails.text);
  else if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type)) errors.push(`${m.params.type}: ` + m.params.args.map(a => a.value ?? a.description).join(' '));
};
const send = (method, params = {}) => new Promise(r => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })); });
const ev = async expr => (await send('Runtime.evaluate', { expression: expr, returnByValue: true })).result.result.value;
// Every shot runs the DOM audit (scripts/dom-scan.mjs): banned words, clipped/overlapping/covered text, text size, tap size (phone).
const bad = new Map();
const shot = async name => {
  for (const v of (await ev(scanJs(H < 480))) ?? []) bad.set(`${name}: ${v}`, 1);
  writeFileSync(`${out}/${W}x${H}-${name}.png`, Buffer.from((await send('Page.captureScreenshot')).result.data, 'base64'));
};
const text = () => ev('document.body.innerText');
const click = async label => { const ok = await ev(`(() => { const b = [...document.querySelectorAll('button')].find(b => !b.disabled && (b.textContent.includes(${JSON.stringify(label)}) || b.ariaLabel === ${JSON.stringify(label)})); if (b) b.click(); return !!b; })()`); if (!ok) errors.push(`button missing/disabled: ${label}`); await sleep(250); return ok; };
const save = () => ev(`JSON.parse(localStorage.getItem('vgtt.save'))`);
const summary = s => s && `${s.player.name} Lv${s.player.level} cleared=${s.trial.cleared} floor=${s.trial.floor} LT=${s.currency.LINH_THACH} thẻ=${s.tickets} TN=${s.tienNo.length} party=${s.party.filter(Boolean).length}`;
const step = async (name, fn) => { const t = Date.now(); await fn(); const ms = Date.now() - t; steps.push([name, ms]); console.log(`${(ms / 1000).toFixed(1).padStart(6)}s  ${name}`); };
const waitEnd = async (max = 120000) => { const t = Date.now(); while (Date.now() - t < max) { if (await ev(`!!document.querySelector('.verdict')`)) return await ev(`document.querySelector('.verdict').textContent`); await sleep(200); } return 'TIMEOUT'; };

// Mid-battle shot: pause the replay, scrub to the middle tick, check no verdict is shown yet, then resume.
const midBattle = async () => {
  await click('Tạm dừng');
  const mid = await ev(`(() => { const i = document.querySelector('input[aria-label="Tua trận"]'); if (!i) return -1; const v = Math.floor(Number(i.max) / 2); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set.call(i, String(v)); i.dispatchEvent(new Event('input', { bubbles: true })); return v; })()`);
  await sleep(250);
  if (mid < 1 || await ev(`!!document.querySelector('.verdict')`)) errors.push('tran giua: khong dung duoc giua tran');
  await shot('08-tran-giua'); await click('Tiếp tục');
};
await send('Runtime.enable'); await send('Page.enable');
await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: 1, mobile: W < 600 });
await send('Page.navigate', { url }); await sleep(1500);
await ev('localStorage.clear()'); await send('Page.navigate', { url }); await sleep(1500);
let passed = 0; const NAME = 'Tử Vân Tử';
await step('lobby + guide', async () => { await shot('00-guide'); await click('Đã hiểu'); await shot('01-lobby'); });
await step('doi ten', async () => { await click('Tu Luyện'); await ev(`(() => { const i = document.querySelector('input[aria-label="Tên nhân vật"]'); const set = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value').set; set.call(i, ${JSON.stringify(NAME)}); i.dispatchEvent(new Event('input', { bubbles: true })); })()`); await sleep(200); await click('Đổi tên'); await shot('02-tu-luyen'); await click('Về sảnh'); });
await step('quay 10', async () => { await click('Tiên Nô'); await click('Quay 10'); await sleep(300); await shot('03-quay10'); const sv = await save(); if (sv.party.filter(Boolean).length < 2) errors.push('quay 10: doi khong tu co Tien No'); if (!(await text()).includes('Đã vào đội')) errors.push('quay 10: thieu nhan Đã vào đội'); await click('Đóng'); });
await step('ho so', async () => { await ev(`document.querySelector('.tcard')?.click()`); await sleep(250); await shot('04-ho-so'); await click('Đóng'); });
await step('vao doi', async () => { for (let i = 0; i < 4; i++) { await ev(`document.querySelectorAll('.owned .tcard')[${i}]?.click()`); await sleep(200); if (await ev(`document.body.innerText.includes('Vào đội')`)) await click('Vào đội'); await click('Đóng'); } await shot('05-roster'); await click('Về sảnh'); await click('Tổ Đội'); await shot('06-to-doi'); await click('Về sảnh'); });
console.log('save:', summary(await save()));
await click('Thí Luyện'); await shot('07-thi-luyen-truoc');
{ const t = await text(); if (!t.includes('Đội của bạn') || !t.includes('Quái') || !t.includes('Thắng lần đầu')) errors.push('thi luyen: thieu ban xem truoc doi/quai/thuong'); }
for (let f = 1; f <= 5; f++) {
  let verdict;
  await step(`tang ${f} tran`, async () => { await click('Bắt đầu'); if (f === 1) await midBattle(); else if (f === 2) await click('Bỏ qua'); else if (f === 3) await click('Tua nhanh'); else await sleep(1500); verdict = await waitEnd(); await sleep(300); await shot(`09-tang${f}-${verdict}`); if (f === 1) { if (await click('Chiến báo')) { const t = await text(); if (!t.includes('Khiên đỡ') || !t.includes('Quái')) errors.push('chien bao: thieu bang chi tiet'); await shot('09b-chien-bao-mo'); await click('Chiến báo'); } else errors.push('thieu nut Chien bao'); if (!(await click('Chi tiết kỹ thuật'))) errors.push('thieu nut Chi tiet ky thuat'); else if (!(await text()).includes('Sao chép hạt giống')) errors.push('thieu nut Sao chep hat giong'); await click('Chi tiết kỹ thuật'); } });
  console.log('   ->', verdict, summary(await save()));
  if (verdict === 'Thắng') { passed = f; if (f < 5) await click('Tầng kế'); } else break;
}
await click('Về sảnh');
await step('tu luyen cap', async () => { await click('Tu Luyện'); for (let i = 0; i < 5; i++) if (await ev(`!!([...document.querySelectorAll('button')].find(b => !b.disabled && b.textContent.includes('Tu Luyện (−')))`)) await click('Tu Luyện (−'); await shot('10-tu-luyen-sau'); await click('Về sảnh'); });
console.log('save:', summary(await save()));
await step('quay them', async () => { await click('Tiên Nô'); const t = (await save()).tickets; console.log('   thẻ còn', t); await click(t >= 10 ? 'Quay 10' : t >= 1 ? 'Quay 1' : 'Quay 1'); await shot('11-quay-them'); await click('Đóng'); await click('Về sảnh'); });
await step('so tay', async () => { await click('Sổ Tay'); await shot('15-so-tay-tien-no'); const t = await text(); if (!t.includes('Đã gặp') || !t.includes('Chưa gặp')) errors.push('so tay: thieu tong Da gap hoac nhan Chua gap'); await click('Chiêu thức'); await shot('16-so-tay-chieu'); if (!(await text()).includes('Khống chế')) errors.push('so tay: thieu cam nang chieu'); await click('Độ hiếm'); await shot('17-so-tay-do-hiem'); if (!(await text()).includes('bậc cao mạnh hơn')) errors.push('so tay: thieu ghi chu do hiem'); await click('Về sảnh'); });
const before = await save();
await step('reload + kiem tra', async () => { await send('Page.navigate', { url }); await sleep(1500); const after = await save(); const same = JSON.stringify(before) === JSON.stringify(after); console.log('   save giong het truoc reload:', same, summary(after)); if (!same) errors.push('save differs after reload'); await shot('12-sau-reload'); if (!(await text()).includes(NAME)) errors.push('name missing in lobby after reload'); });
await step('cai dat nhap save', async () => {
  await ev(`document.querySelector('button[aria-label="Cài Đặt"]').click()`); await sleep(250); await click('Xuất save');
  const dump = await ev(`document.querySelector('textarea[readonly]').value`); const want = summary(await save()); await click('Ẩn save');
  const fill = v => ev(`(() => { const t = document.querySelector('textarea[aria-label="Dán chuỗi save"]'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(t, ${JSON.stringify(v)}); t.dispatchEvent(new Event('input', { bubbles: true })); })()`);
  const nhap = () => ev(`!![...document.querySelectorAll('button')].find(b => b.textContent.startsWith('Nhập save') && !b.disabled)`);
  await fill(JSON.stringify({ ...JSON.parse(dump), player: { ...JSON.parse(dump).player, level: -3 } })); await sleep(150);
  if (await nhap()) errors.push('nhap save: nut Nhap save bam duoc truoc khi kiem');
  await click('Kiểm tra'); if (!(await text()).includes('Lỗi:') || await nhap()) errors.push('nhap save: save sai khong hien loi hoac van cho nhap'); await shot('18-nhap-loi');
  await fill(dump); await click('Kiểm tra'); if (!(await text()).includes('Hợp lệ:')) errors.push('nhap save: save hop le khong bao hop le'); await shot('19-nhap-hop-le');
  await click('Nhập save'); if (!(await text()).includes('Bấm lần nữa để ghi đè')) errors.push('nhap save: thieu buoc xac nhan hai'); await shot('20-nhap-xac-nhan');
  await click('Bấm lần nữa để ghi đè'); if (!(await text()).includes('Đã nhập save')) errors.push('nhap save: thieu thong bao thanh cong'); await shot('21-nhap-xong');
  const got = summary(await save()); console.log('   sau nhap:', got); if (got !== want) errors.push(`nhap save: trang thai lech ${want} != ${got}`);
  await click('Về sảnh'); if (!(await text()).includes(NAME)) errors.push('nhap save: sanh mat ten sau khi nhap');
});
await step('cai dat xoa save', async () => { await ev(`document.querySelector('button[aria-label="Cài Đặt"]').click()`); await sleep(250); await click('Xóa save'); await click('Bấm lần nữa'); await sleep(300); await shot('13-sau-xoa'); if (!(await text()).includes('Đã xóa save')) errors.push('xoa save: thieu thong bao da xoa'); const s = await save(); console.log('   sau xoa:', summary(s)); if (s.tienNo.length || s.trial.cleared) errors.push('xoa save: chua ve game moi'); await click('Về sảnh'); await shot('14-sanh-moi'); if ((await text()).includes(NAME)) errors.push('sanh sau xoa van con ten cu'); });
console.log(`\nhạt giống: ${process.env.VGTT_SEED ?? 'ngẫu nhiên'}`);
console.log(`\ntầng qua được: ${passed}/5 | tổng ${(steps.reduce((a, s) => a + s[1], 0) / 1000).toFixed(0)}s | viewport ${W}x${H}`);
ws.close(); proc.kill();
console.log(bad.size ? `VI PHẠM DOM ${W}x${H} (${bad.size}):\n${[...bad.keys()].join('\n')}\n` : `DOM ${W}x${H}: 0 vi phạm\n`);
console.log(errors.length ? `LỖI/CẢNH BÁO:\n${errors.join('\n')}` : 'không có lỗi console');
process.exit(errors.length || bad.size ? 1 : 0);
