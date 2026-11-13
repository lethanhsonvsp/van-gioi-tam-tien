// Generates docs/UI_PROMPTS.md from data/ui_registry.json. Run: node scripts/gen_ui_prompts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const r = JSON.parse(readFileSync('data/ui_registry.json', 'utf8'));
const rar = Object.entries(r.rarities).map(([k, v]) => `- ${k}: ${v}`).join('\n');
const STYLE = 'Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.';
const NEG = 'No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.';
const bgRule = bg => bg === '#000000'
  ? 'Pure solid black #000000 background (glows will be used with additive blending, so nothing but light on black).'
  : `Flat solid ${bg} chroma-key background, no shadows or glow spilling onto the background.`;
// Describe a cell: explicit look, else derive from the sheet description (rarity/state IDs are self-explanatory there).
const NAMES = { 'FRAME ITEM': 'square item slot frame', 'FRAME CARD': 'portrait 2:3 card frame', PLATE: 'wide name plate banner', GLOW: 'radial summon glow burst', SHINE: 'diagonal card shine sweep', 'BTN PRIMARY': 'primary gold button', 'BTN SECONDARY': 'secondary jade button', 'BTN DANGER': 'danger crimson button', 'BTN TAB': 'tab button' };
const look = id => {
  if (r.looks?.[id]) return r.looks[id];
  const parts = id.split('.').slice(1), last = parts.pop(), base = parts.join(' ');
  const name = NAMES[base] ?? base.toLowerCase().replace(/_/g, ' ');
  return r.rarities[last] ? `${name}, ${last} tier` : `${name}, ${last.toLowerCase()} state`;
};

let md = `# UI frame prompts (generated, do not edit — edit data/ui_registry.json)

Scope: game frame only. No characters. One prompt per sheet: copy the whole code block into the image tool.

## Rarity tiers (reference)
${rar}

## After generation (for GPT / any assistant with Python)
Per sheet, run Python on the generated image (canvas and grid are in its prompt):
1. Cut exactly on the grid: cell (r, c) = box (c*W/cols, r*H/rows, (c+1)*W/cols, (r+1)*H/rows). Do not trim, do not resize: every cell keeps its full cell size.
2. Check each cell: the 6 px strip along the right edge must be 100% background colour (tolerance <= 30 per channel). If any cell fails, redraw the WHOLE sheet; never shrink, erase or patch the cell.
3. Make the background transparent (key the chroma colour). The black FX sheet keeps black (game uses additive blend). Single-image sheets (bg "none") are saved as is.
4. Save each cell as \`<ID>.png\` inside a folder named \`<SHEET.ID>/\` (skip empty cells).
5. Pack \`<SHEET.ID>.zip\` containing: the cell PNGs, \`_sheet.png\` (the original), \`_preview.png\` (cells on a checkerboard), and \`manifest.json\` listing for every cell: id, file, w, h, bbox of the non-transparent pixels.
Then place the PNGs in \`assets/ui/<SHEET.ID>/\`. Review SSR vs UR side by side before accepting.
`;
const rules = (s, cw, ch) => {
  const sw = Math.round(cw * 0.76), sh = Math.round(ch * 0.76), kinds = s.cells.join(' ');
  let t = `Each cell is ${cw}x${ch} px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central ${sw}x${sh} px and nothing touches or crosses a cell edge.\n`;
  if (/\.(N|R|SR|SSR|UR)( |$)/.test(kinds)) t += 'One shared outer frame size for the whole set: UR is richer through ornament thickness and detail, never a bigger frame; shrink UR if needed.\n';
  if (kinds.includes('UI.FRAME.ITEM')) t += `Item slot frame is exactly SQUARE, ${Math.min(sw, sh)}x${Math.min(sw, sh)} px.\n`;
  if (kinds.includes('UI.FRAME.CARD')) { const h = Math.min(sh, Math.round(sw * 1.5)); t += `Card frame is exactly 2:3 portrait, ${Math.round(h / 1.5)}x${h} px.\n`; }
  if (kinds.includes('UI.PLATE')) t += `Name plate is about 4:1, ${sw}x${Math.round(sw / 4)} px, interior one flat dark colour, pendant and ornaments stay off the edge.\n`;
  if (/UI\.FRAME\.(ITEM|CARD)/.test(kinds)) t += 'The inside of item and card frames is the flat background colour, no scene, mountains or gradient.\n';
  return t;
};
for (const s of r.sheets) {
  if (s.bg === 'none') {
    md += `\n## ${s.id}\n\n\`\`\`text\n${STYLE}\nSingle background image, canvas ${s.size}, no grid, no chroma key, full-bleed.\n${s.desc}\n${s.cells.map(look).join('\n')}\n${NEG}\nNo UI elements.\n\`\`\`\n\n| ID |\n|---|\n${s.cells.map(id => `| ${id} |`).join('\n')}\n`;
    continue;
  }
  const [W, H] = s.size.split('x').map(Number), cw = Math.round(W / s.cols), ch = Math.round(H / s.rows);
  const usesRarity = s.cells.some(id => /\.(N|R|SR|SSR|UR)$/.test(id));
  const cells = s.cells.map((id, i) => `${i + 1}. row ${Math.floor(i / s.cols) + 1}, col ${i % s.cols + 1}: ${id ? look(id) : 'leave empty'}`).join('\n');
  md += `\n## ${s.id}\n\n\`\`\`text
${STYLE}
Sprite sheet, canvas ${s.size}, exact grid of ${s.cols} columns × ${s.rows} rows, equal cells.
${rules(s, cw, ch)} Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
${bgRule(s.bg ?? '#00FF00')}
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.${s.bg === '#FF00FF' ? ' This sheet has green parts, so no pink or magenta anywhere in the elements.' : ''}
${s.desc}
${usesRarity ? `Rarity tiers, each visibly different in material, ornament and glow:\n${rar}\n` : ''}Cells, left to right, top to bottom:
${cells}
${NEG}
\`\`\`\n\n| Cell | ID |\n|---|---|\n`;
  s.cells.forEach((id, i) => { if (id) md += `| ${i + 1} | ${id} |\n`; });
}
writeFileSync('docs/UI_PROMPTS.md', md);
const ids = r.sheets.flatMap(s => s.cells).filter(Boolean);
console.assert(new Set(ids).size === ids.length, 'duplicate ids');
r.sheets.forEach(s => console.assert(s.cells.length === s.cols * s.rows, s.id + ' cell count'));
Object.keys(r.looks ?? {}).forEach(id => console.assert(ids.includes(id), 'look for unknown id ' + id));
ids.forEach(id => console.assert(r.looks?.[id] || r.rarities[id.split('.').pop()] || /\.(NORMAL|HOVER|PRESSED|DISABLED)$/.test(id), 'no look for ' + id));
