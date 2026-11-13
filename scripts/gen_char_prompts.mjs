// Generates docs/CHAR_PROMPTS.md from data/tien_no_appearance.json. Run: node scripts/gen_char_prompts.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import assert from 'node:assert';

const d = JSON.parse(readFileSync('data/tien_no_appearance.json', 'utf8'));
const cs = d.characters;

// RULE-CHAR-002: faces must differ structurally; hair, colour and outfit do not count.
const faceKey = c => [c.face.shape, c.eyes.shape, c.nose, c.mouth].join('|');
assert.equal(new Set(cs.map(c => c.id)).size, cs.length, 'duplicate character id');
assert.equal(new Set(cs.map(faceKey)).size, cs.length, 'two characters share the same core face');
for (const c of cs) {
  assert.ok(c.apparentAge >= 18 && c.apparentAge <= 35, c.id + ' apparent age out of 18-35');
  assert.ok(d.elementBackgrounds[c.element], c.id + ' unknown element');
}

const STYLE = 'Semi-realistic xianxia fantasy character art, rendered like a high-quality 3D render then exported to 2D, sharp detailed face, clean eyes, natural skin, beautiful harmonious adult woman.';
const NEG = 'Lips closed, no teeth visible, no open-mouth smile. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy: five fingers per hand, symmetric eyes, no merged clothing.';

const face = c => [
  `Apparent age ${c.apparentAge}.`,
  `Face: ${c.face.shape}; forehead ${c.face.forehead}; cheekbones ${c.face.cheekbones}; jaw ${c.face.jaw}; chin ${c.face.chin}.`,
  `Eyes: ${c.eyes.shape}, ${c.eyes.spacing} spacing, ${c.eyes.depth} sockets, ${c.eyes.eyelid}, ${c.eyes.iris} iris.`,
  `Brows: ${c.brows}. Nose: ${c.nose}. Mouth: ${c.mouth}. Ears: ${c.ears}.`,
].join('\n');

const prompts = c => {
  const bg = d.elementBackgrounds[c.element];
  return {
    id: `${STYLE}
IDENTITY SHEET, used only to check the face. Front view, head turned 0 degrees, camera at eye level, neutral studio light, plain mid-grey background.
Head and shoulders, face fills most of the frame, hair pulled back away from the face so the full face outline, forehead, jaw and ears are visible. No jewellery on the face, no heavy makeup.
${face(c)}
Expression: neutral, ${c.expression}.
Canvas 1024x1024.
${NEG}`,
    full: `${STYLE}
Full body, standing, whole figure from head to feet visible with empty space around, plain light-grey background, three-quarter view (about 30 degrees), camera at eye level.
${face(c)}
Hair: ${c.hair}.
Body: height about ${c.body.heightCm} cm, ${c.body.type}; shoulders ${c.body.shoulders}, waist ${c.body.waist}, hips ${c.body.hips}, muscle ${c.body.muscle}.
Role: ${c.role}. Outfit: ${c.outfit}.
Aura: ${c.aura}. Expression: ${c.expression}. Posture: ${c.posture}.
Same face as the identity sheet. Canvas 1024x1536.
${NEG}`,
    card: `${STYLE}
Character card art, portrait 2:3, waist-up to knee-up, dynamic but readable pose, ${bg} ${c.element.toLowerCase()} element atmosphere and light in the background.
${face(c)}
Hair: ${c.hair}.
Role: ${c.role}. Outfit: ${c.outfit}.
Aura: ${c.aura}. Expression: ${c.expression}. Posture: ${c.posture}.
Same face and body as the identity sheet and full-body art. Keep the face clear and unobstructed. No card border (the game draws the rarity frame). Canvas 1024x1536.
${NEG}`,
  };
};

let md = `# Tiên Nô character prompts (generated, do not edit — edit data/tien_no_appearance.json)

Status: ${d.status}

## Order of work for each character (RULE-CHAR-002)
1. **ID** identity sheet (front, eye level). Review: compare with every approved face with hair hidden; if two look alike, redesign one before going on.
2. **FULL** full body, same face.
3. **CARD** card art, same face.
Pixel versions only after all three agree.

Each character gets its own chat/image. Never make a group collage and never crop characters out of one.
Save files as \`<ID>.ID.png\`, \`<ID>.FULL.png\`, \`<ID>.CARD.png\` in \`assets/characters/<ID>/\`.

| Tiên Nô | ID | Element | Age | Role |
|---|---|---|---|---|
${cs.map(c => `| ${c.name} | ${c.id} | ${c.element} | ${c.apparentAge} | ${c.role} |`).join('\n')}
`;
for (const c of cs) {
  const p = prompts(c);
  md += `\n## ${c.name} — ${c.id}\n\n### ID\n\`\`\`text\n${p.id}\n\`\`\`\n\n### FULL\n\`\`\`text\n${p.full}\n\`\`\`\n\n### CARD\n\`\`\`text\n${p.card}\n\`\`\`\n`;
}
writeFileSync('docs/CHAR_PROMPTS.md', md);
