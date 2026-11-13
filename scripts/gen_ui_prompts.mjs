// Generates docs/UI_PROMPTS.md from data/ui_registry.json. Run: node scripts/gen_ui_prompts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const r = JSON.parse(readFileSync('data/ui_registry.json', 'utf8'));
const rar = Object.entries(r.rarities).map(([k, v]) => `- ${k}: ${v}`).join('\n');
let md = `# UI frame prompts (generated, do not edit — edit data/ui_registry.json)

Scope: game frame only. No characters. Semi-realistic 2D xianxia UI art, NOT pixel art. Theme: moonlit blue-violet sect, gold and jade trim.

## Global prompt (prepend to every sheet)
Flat solid #00FF00 background, perfectly aligned grid, equal cells, thin empty gutter between cells, nothing crossing cell borders, no text, no letters, no numbers, no watermark, no baked UI labels. Every element sharp, centred in its cell, consistent lighting from top-left, consistent style across the whole sheet. Cells are filled left to right, top to bottom in the exact order of the table.

## Rarity tiers (each tier must be visibly different in material, ornament and glow)
${rar}

## After generation
Ask GPT to crop each cell and export as PNG with the ID as filename, e.g. \`UI.FRAME.ITEM.SSR.png\`, green removed to transparent. Put files in \`assets/ui/<SHEET.ID>/\`. Review SSR vs UR side by side before accepting.
`;
for (const s of r.sheets) {
  md += `\n## ${s.id}\nCanvas ${s.size}, ${s.cols} columns × ${s.rows} rows.\n\n${s.desc}\n\n| Cell | Row | Col | ID |\n|---|---|---|---|\n`;
  s.cells.forEach((id, i) => { if (id) md += `| ${i + 1} | ${Math.floor(i / s.cols) + 1} | ${i % s.cols + 1} | ${id} |\n`; });
}
writeFileSync('docs/UI_PROMPTS.md', md);
const ids = r.sheets.flatMap(s => s.cells).filter(Boolean);
console.assert(new Set(ids).size === ids.length, 'duplicate ids');
r.sheets.forEach(s => console.assert(s.cells.length === s.cols * s.rows, s.id + ' cell count'));
