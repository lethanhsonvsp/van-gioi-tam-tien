// DOM audit run in the page (via Runtime.evaluate) at every screenshot of scripts/playthrough.mjs. Returns a list of violations (strings).
// Only the top layer is scanned: an open .modal / .summon-pop hides everything behind it. Text inside `.tech` (collapsed technical details) is exempt from the word list.
// phone = viewport height < 480: text >= 13 px and tap targets >= 44 px; otherwise text >= 12 px. Sizes are effective: each element's own rendered/layout width ratio, so every ancestor transform (stage scale, scale() effects) counts.
// Lobby: feature cards, left buttons, top buttons and bottom-bar icons on even grids (see the lobby block below).
// Also: card text inside the frame window (.tcard .win): name/title band >= 10 stage px from it, other labels >= 4; text >= 4 px from the edge of its card/row/window; no scroll area inside another scrolling area.
export const scanJs = phone => `(() => {
  const MIN = ${phone ? 13 : 12}, PHONE = ${phone}, r = [];
  const root = document.querySelector('.summon-pop') ?? document.querySelector('.modal') ?? document.body;
  const stage = document.querySelector('.stage'), k = stage && stage.offsetWidth ? stage.getBoundingClientRect().width / stage.offsetWidth : 1;
  const ks = e => { const w = e.offsetWidth; return w ? e.getBoundingClientRect().width / w : k; };
  const seen = e => e.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && !e.closest('.float');
  const tag = e => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\\s+/).join('.') : '');
  const say = (e, s) => tag(e) + ' "' + (s ?? e.textContent).trim().slice(0, 28) + '"';
  // Intended cut: only the text element itself or its direct parent may carry the ellipsis / line-clamp (a far ancestor must not excuse clipped text).
  const cut = e => [e, e.parentElement].some(p => { const s = p && getComputedStyle(p); return s && (s.textOverflow === 'ellipsis' || s.webkitLineClamp !== 'none'); });
  const scrolls = e => { for (let p = e.parentElement; p; p = p.parentElement) { const o = getComputedStyle(p); if (/auto|scroll/.test(o.overflowY + o.overflowX)) return true; } return false; };
  // False when the text's centre is scrolled out of view inside a scroll container (scroll clipping) or in the lines cut off by an intended line-clamp / ellipsis.
  const shown = (e, b) => { for (let p = e; p; p = p.parentElement) { const o = getComputedStyle(p); if (/auto|scroll/.test(o.overflowY + o.overflowX) || (o.webkitLineClamp !== 'none' || o.textOverflow === 'ellipsis') && /hidden|clip/.test(o.overflow)) { const c = p.getBoundingClientRect(); const x = (b.left + b.right) / 2, y = (b.top + b.bottom) / 2; if (y < c.top || y > c.bottom || x < c.left || x > c.right) return false; } } return true; };
  const hit = (a, b) => Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 && Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 2;
  const WORDS = [/\\b(HOA|MOC|BANG|HUYEN|AM|THUY|LOI|THO|NONE)\\b/, /alpha/i, /undefined/, /NaN/, /\\[object/, /tick/i, /Hạt giống/, /số tạm/];

  // Text pieces: one entry per line box of each visible text node.
  const texts = [];
  const walk = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  for (let n; (n = walk.nextNode());) {
    const e = n.parentElement, s = n.textContent.trim();
    if (!s || !seen(e)) continue;
    if (!e.closest('.tech')) for (const w of WORDS) if (w.test(s)) r.push('chữ cấm ' + w + ': ' + say(e, s));
    const cs = getComputedStyle(e), px = parseFloat(cs.fontSize) * k, lh = (parseFloat(cs.lineHeight) || parseFloat(cs.fontSize) * 1.2) * k;
    if (px < MIN - 0.2) r.push('chữ ' + px.toFixed(1) + 'px < ' + MIN + ': ' + say(e, s));
    const range = document.createRange(); range.selectNodeContents(n);
    for (const g of range.getClientRects()) {
      if (g.width <= 1 || g.height <= 1) continue;
      // Glyph boxes are taller than the line box; compare line boxes so tight line-heights do not count as overlap.
      const h = Math.min(g.height, lh), m = (g.top + g.bottom) / 2, b = { left: g.left, right: g.right, top: m - h / 2, bottom: m + h / 2 };
      // Ellipsis text is painted only inside its own box: measure that part.
      if (cut(e)) { const c = e.getBoundingClientRect(); b.left = Math.max(b.left, c.left); b.right = Math.min(b.right, c.right); }
      if (shown(e, b)) texts.push({ e, s, b });
    }
  }

  for (const { e, s, b } of texts) {
    // Clipped by an overflow:hidden ancestor (ellipsis / line-clamp are intended).
    for (let p = e; p && p !== document.body; p = p.parentElement) {
      const st = getComputedStyle(p);
      if (p !== e && /auto|scroll/.test(st.overflowY + st.overflowX)) break;
      if (/hidden|clip/.test(st.overflowX + st.overflowY) && !cut(e)) {
        const c = p.getBoundingClientRect();
        if (b.left < c.left - 1 || b.right > c.right + 1 || b.top < c.top - 1 || b.bottom > c.bottom + 1) { r.push('chữ bị cắt: ' + say(e, s)); break; }
      }
    }
    if (!cut(e) && /hidden|clip/.test(getComputedStyle(e).overflow) && (e.scrollWidth > e.clientWidth + 1 || e.scrollHeight > e.clientHeight + 1)) r.push('chữ tràn hộp: ' + say(e, s));
    // Text spilling out of its button / card.
    const btn = e.closest('button');
    if (btn) { const c = btn.getBoundingClientRect(); if (b.left < c.left - 1 || b.right > c.right + 1 || b.top < c.top - 1 || b.bottom > c.bottom + 1) r.push('chữ tràn nút: ' + say(e, s)); }
    // Off screen while not in a scroll container.
    if (!scrolls(e) && (b.right > innerWidth + 1 || b.bottom > innerHeight + 1 || b.left < -1 || b.top < -1)) r.push('chữ ra ngoài màn: ' + say(e, s));
    // Covered by another element (checked at the centre of the line).
    const x = (b.left + b.right) / 2, y = (b.top + b.bottom) / 2;
    if (x > 0 && y > 0 && x < innerWidth && y < innerHeight) {
      const top = document.elementFromPoint(x, y);
      if (top && top !== e && !e.contains(top) && !top.contains(e) && !top.closest('.float')) r.push('chữ bị che bởi ' + tag(top) + ': ' + say(e, s));
    }
  }
  // Card text inside the frame window; text clear of the edges of its card / row / window.
  const BOX = '.tcard, .pv-row, .unit, .pill, .profile-card, .pop-window, .screen-panel, .owned';
  const gap = (b, c) => Math.min(b.left - c.left, c.right - b.right, b.top - c.top, c.bottom - b.bottom);
  for (const { e, s, b } of texts) {
    const card = e.closest('.tcard'), win = card?.querySelector(':scope > .win');
    if (win) { const need = (e.closest('.tinfo') ? 10 : 4) * ks(card), g = gap(b, win.getBoundingClientRect()); if (g < need - 0.5) r.push('chữ sát viền khung thẻ (' + g.toFixed(1) + ' < ' + need.toFixed(1) + '): ' + say(e, s)); }
    const box = e.closest(BOX);
    // A box that scrolls vertically cuts its content at the top / bottom by design: only the side gaps count there.
    const vs = box && /auto|scroll/.test(getComputedStyle(box).overflowY) && box.scrollHeight > box.clientHeight + 1, sides = (b, c) => Math.min(b.left - c.left, c.right - b.right);
    if (box) { const need = 4 * ks(box), g = (vs ? sides : gap)(b, box.getBoundingClientRect()); if (g < need - 0.5) r.push('chữ sát mép ' + tag(box).split('.').slice(0, 2).join('.') + ' (' + g.toFixed(1) + ' px): ' + say(e, s)); }
  }
  // Tien No cards: name / title text at least 4 stage px from the element emblem and from the labels (MỚI, copies, in party).
  const sep = (a, c) => Math.max(c.left - a.right, a.left - c.right, c.top - a.bottom, a.top - c.bottom);
  for (const card of root.querySelectorAll('.tcard')) {
    if (!seen(card)) continue;
    const need = 4 * ks(card), em = card.querySelector('.portrait .pic')?.getBoundingClientRect();
    const labels = [...card.querySelectorAll('.new, .badges span')].filter(seen).map(e => ({ e, b: e.getBoundingClientRect() }));
    for (const { e, s, b } of texts) {
      if (!e.closest('.tinfo') || e.closest('.tcard') !== card) continue;
      if (em && sep(b, em) < need - 0.5) r.push('chữ sát huy hiệu hệ (' + sep(b, em).toFixed(1) + ' < ' + need.toFixed(1) + '): ' + say(e, s));
      for (const l of labels) if (sep(b, l.b) < need - 0.5) r.push('chữ sát nhãn (' + sep(b, l.b).toFixed(1) + '): ' + say(e, s) + ' x ' + say(l.e));
    }
  }
  // Nested scrolling: a scroll area that really scrolls inside another one (or inside a scrolling page).
  const scroller = e => { const o = getComputedStyle(e); return /auto|scroll/.test(o.overflowY) && e.scrollHeight > e.clientHeight + 1 && e.clientHeight > 0 && e.checkVisibility(); };
  const sc = [...document.querySelectorAll('*')].filter(e => (root.contains(e) || e.contains(root)) && scroller(e));
  for (const a of sc) for (const c of sc) if (a !== c && a.contains(c)) r.push('cuộn lồng nhau: ' + tag(a) + ' > ' + tag(c));
  if (sc.length && document.documentElement.scrollHeight > innerHeight + 1) r.push('cuộn lồng nhau: trang > ' + tag(sc[0]));
  // Text over text, text under a button it does not belong to, button over button.
  const btns = [...root.querySelectorAll('button, input, textarea')].filter(seen).map(e => ({ e, b: e.getBoundingClientRect() })).filter(({ e, b }) => shown(e, b));
  for (let i = 0; i < texts.length; i++) for (let j = i + 1; j < texts.length; j++) {
    const a = texts[i], c = texts[j];
    if (a.e !== c.e && !a.e.contains(c.e) && !c.e.contains(a.e) && hit(a.b, c.b)) r.push('chữ chồng chữ: ' + say(a.e, a.s) + ' x ' + say(c.e, c.s));
  }
  for (const t of texts) for (const { e, b } of btns) if (!e.contains(t.e) && hit(t.b, b)) r.push('nút đè chữ: ' + say(e) + ' x ' + say(t.e, t.s));
  for (let i = 0; i < btns.length; i++) for (let j = i + 1; j < btns.length; j++) {
    const a = btns[i], c = btns[j];
    if (!a.e.contains(c.e) && !c.e.contains(a.e) && hit(a.b, c.b)) r.push('chồng nút: ' + say(a.e) + ' x ' + say(c.e));
  }
  for (const { e, b } of btns) {
    if (PHONE && (b.width < 43.5 || b.height < 43.5)) r.push('chạm ' + Math.round(b.width) + 'x' + Math.round(b.height) + ' < 44: ' + say(e, e.textContent || e.ariaLabel || ''));
    if (!scrolls(e) && (b.right > innerWidth + 1 || b.bottom > innerHeight + 1 || b.left < -1 || b.top < -1)) r.push('nút ra ngoài màn: ' + say(e, e.textContent || e.ariaLabel || ''));
  }
  // Lobby grids: same size, same step across and down (<= 1 px). Feature cards also: gap across = gap down, right edge on the drawn edge of the
  // last round button (UI.BTN.ROUND drawn part ends at 421/512 of its image), bottom row clear of the bottom bar by at least that gap.
  const lobby = root === document.body && document.querySelector('.lobby');
  const near = (a, b) => Math.abs(a - b) <= 1;
  const steps = v => { const c = [...v].sort((a, b) => a - b).filter((x, i, s) => !i || x - s[i - 1] > 1); return c.slice(1).map((x, i) => x - c[i]); };
  const even = (name, sel) => {
    const bs = [...lobby.querySelectorAll(sel)].map(e => e.getBoundingClientRect()), f = n => n.toFixed(1);
    if (!bs.every(b => near(b.width, bs[0].width) && near(b.height, bs[0].height))) r.push('lưới ' + name + ' lệch cỡ: ' + bs.map(b => f(b.width) + 'x' + f(b.height)).join(' '));
    for (const k of ['left', 'top']) { const s = steps(bs.map(b => b[k])); if (!s.every(x => near(x, s[0]))) r.push('lưới ' + name + ' bước ' + k + ' lệch: ' + s.map(f).join(' ')); }
    return bs;
  };
  if (lobby) {
    even('nút trái', '.side-item .round'); even('nút trên', '.top-buttons .round'); even('icon thanh dưới', '.bottom-icon');
    const bs = even('thẻ chức năng', '.feature'), w = bs[0].width, h = bs[0].height;
    const gx = steps(bs.map(b => b.left))[0] - w, gy = steps(bs.map(b => b.top))[0] - h;
    if (!near(gx, gy)) r.push('thẻ chức năng: khe ngang ' + gx.toFixed(1) + ' khác khe dọc ' + gy.toFixed(1));
    const img = lobby.querySelector('.top-buttons .round:last-child img'), ri = img && img.getBoundingClientRect(), right = Math.max(...bs.map(b => b.right));
    if (ri && !near(right, ri.left + ri.width * 421 / 512)) r.push('thẻ chức năng: lề phải ' + right.toFixed(1) + ' không thẳng nút tròn ' + (ri.left + ri.width * 421 / 512).toFixed(1));
    const bar = lobby.querySelector('.bottom').getBoundingClientRect(), low = Math.max(...bs.map(b => b.bottom));
    if (bar.top - low < gy - 1) r.push('thẻ chức năng: hàng cuối cách thanh dưới ' + (bar.top - low).toFixed(1) + ' < khe ' + gy.toFixed(1));
  }
  if (document.documentElement.scrollWidth > innerWidth + 1) r.push('cuộn ngang trang: ' + document.documentElement.scrollWidth + ' > ' + innerWidth);
  return [...new Set(r)];
})()`;
