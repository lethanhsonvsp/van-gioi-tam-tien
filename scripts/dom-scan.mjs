// DOM audit run in the page (via Runtime.evaluate) at every screenshot of scripts/playthrough.mjs. Returns a list of violations (strings).
// Only the top layer is scanned: an open .modal / .summon-pop hides everything behind it. Text inside `.tech` (collapsed technical details) is exempt from the word list.
// phone = viewport height < 480: text >= 13 px and tap targets >= 44 px; otherwise text >= 12 px. Sizes are effective: each element's own rendered/layout width ratio, so every ancestor transform (stage scale, scale() effects) counts.
// Also: card text inside the frame window (.tcard .win): name/title band >= 10 stage px from it, other labels >= 4; text >= 4 px from the edge of its card/row/window; no scroll area inside another scrolling area.
export const scanJs = phone => `(() => {
  const MIN = ${phone ? 13 : 12}, PHONE = ${phone}, r = [];
  const root = document.querySelector('.summon-pop') ?? document.querySelector('.modal') ?? document.body;
  const stage = document.querySelector('.stage'), k = stage && stage.offsetWidth ? stage.getBoundingClientRect().width / stage.offsetWidth : 1;
  const ks = e => { const w = e.offsetWidth; return w ? e.getBoundingClientRect().width / w : k; };
  const seen = e => e.checkVisibility({ opacityProperty: true, visibilityProperty: true }) && !e.closest('.float');
  const tag = e => e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\\s+/).join('.') : '');
  const say = (e, s) => tag(e) + ' "' + (s ?? e.textContent).trim().slice(0, 28) + '"';
  const cut = e => { for (let p = e; p && p !== document.body; p = p.parentElement) { const s = getComputedStyle(p); if (s.textOverflow === 'ellipsis' || s.webkitLineClamp !== 'none') return true; } return false; };
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
    if (box) { const need = 4 * ks(box), g = gap(b, box.getBoundingClientRect()); if (g < need - 0.5) r.push('chữ sát mép ' + tag(box).split('.').slice(0, 2).join('.') + ' (' + g.toFixed(1) + ' px): ' + say(e, s)); }
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
  if (document.documentElement.scrollWidth > innerWidth + 1) r.push('cuộn ngang trang: ' + document.documentElement.scrollWidth + ' > ' + innerWidth);
  return [...new Set(r)];
})()`;
