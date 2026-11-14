// Generates src/content/tien_no.json from data/tien_no_appearance.json (read-only source).
import { readFileSync, writeFileSync } from 'node:fs';
const src = JSON.parse(readFileSync('data/tien_no_appearance.json', 'utf8'));
const out = src.characters.map(({ id, name, element, rarity, title, role }) => ({ id, name, element, rarity, title, role }));
writeFileSync('src/content/tien_no.json', JSON.stringify(out, null, 2) + '\n');
console.log(`wrote ${out.length} tien no`);
