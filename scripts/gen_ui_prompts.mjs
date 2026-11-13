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

## After generation
Crop each cell, export PNG named by ID (e.g. \`UI.FRAME.ITEM.SSR.png\`) into \`assets/ui/<SHEET.ID>/\`. Green sheets: key green to transparent. Black FX sheet: keep black, game uses additive blend. Review SSR vs UR side by side before accepting.
`;
for (const s of r.sheets) {
  const usesRarity = s.cells.some(id => /\.(N|R|SR|SSR|UR)$/.test(id));
  const cells = s.cells.map((id, i) => `${i + 1}. row ${Math.floor(i / s.cols) + 1}, col ${i % s.cols + 1}: ${id ? look(id) : 'leave empty'}`).join('\n');
  md += `\n## ${s.id}\n\n\`\`\`text
${STYLE}
Sprite sheet, canvas ${s.size}, exact grid of ${s.cols} columns × ${s.rows} rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
${bgRule(s.bg ?? '#00FF00')}
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
