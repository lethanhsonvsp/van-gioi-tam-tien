// Generates src/content/tien_no.json from data/tien_no_appearance.json (read-only) and the roster table in docs/ALPHA_TIEN_NO_ROSTER.md.
import { readFileSync, writeFileSync } from 'node:fs';
const src = JSON.parse(readFileSync('data/tien_no_appearance.json', 'utf8'));
// Table row: | Name | Than phan | He | Co che chien dau | Vai tro ngoai chien dau | Do hiem |
const rows = Object.fromEntries(readFileSync('docs/ALPHA_TIEN_NO_ROSTER.md', 'utf8').split('\n')
  .filter(l => l.startsWith('|')).map(l => l.split('|').slice(1, -1).map(c => c.trim())).filter(c => c.length >= 6).map(c => [c[0], c]));
const out = src.characters.map(({ id, name, element, rarity, title, role }) => {
  const r = rows[name];
  if (!r) throw new Error(`no roster row for ${name}`);
  return { id, name, element, rarity, title, role, roleVi: r[4], combatVi: r[3] };
});
writeFileSync('src/content/tien_no.json', JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${out.length} tien no`);
