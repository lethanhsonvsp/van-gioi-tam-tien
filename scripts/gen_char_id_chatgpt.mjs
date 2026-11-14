// Generates docs/CHAR_ID_CHATGPT.md: one ID-sheet prompt per Tiên Nô for ChatGPT image generation.
// Run: node scripts/gen_char_id_chatgpt.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const d = JSON.parse(readFileSync('data/tien_no_appearance.json', 'utf8'));
const bg = c => d.elementBackgrounds[c.element];
const prompt = c => `Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, ${bg(c)} elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred ${bg(c)} atmospheric background. She wears a plain high-collar robe covering shoulders and chest (her real outfit comes later). Canvas 1024x1024.
Apparent age ${c.apparentAge}, adult woman, beautiful and harmonious, clearly feminine, smooth ageless skin (no wrinkles, no nasolabial folds, no under-eye bags), natural fair skin; the element colour only in the background and rim light.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: ${c.face.shape}; forehead ${c.face.forehead}; cheekbones ${c.face.cheekbones}; jaw ${c.face.jaw}; chin ${c.face.chin}.
- Eyes: ${c.eyes.shape}, ${c.eyes.spacing} spacing, ${c.eyes.depth}, ${c.eyes.eyelid}, ${c.eyes.iris} iris. Brows: ${c.brows}.
- Nose: ${c.nose}.
- LIPS (most important, must not look like any other character's lips): ${c.lips}. Lips closed, no teeth, no smile. Mouth: ${c.mouth}.
- Ears: ${c.ears}. Hair: ${c.hair}.
Expression: ${c.expression}.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Symmetric eyes, correct anatomy.`;
let md = `# Tiên Nô ID sheet prompts for ChatGPT (generated, do not edit: edit data/tien_no_appearance.json)

Why: the Codex batch (2026-11-14) gave all ten faces the same template (oval face, V chin, same nose and lips). These prompts push each structure and the lips harder. ID sheets use a covered robe because they only check the face; FULL and CARD come after the faces are approved.

## How to use
1. One chat per character in Project TT-gacha. Attach \`docs/reference/tien_no_style_target.png\`.
2. From the second character on, also attach the face crops of the characters already approved and add: "This new face must be clearly different from these: different face shape, eyes, nose and especially lips."
3. Check each result: lips shape and colour differ from every approved face, closed lips, whole head and ornaments inside the frame, no animal ears unless the profile says so. Redo the whole image if it fails.
4. Save \`<ID>.ID.png\` (1024x1024) in \`assets/characters/<ID>/\`. Approval needs the face-only contact sheet of all ten.

| Tiên Nô | ID | Lips |
|---|---|---|
${d.characters.map(c => `| ${c.name} | ${c.id} | ${c.lips} |`).join('\n')}
`;
for (const c of d.characters) md += `\n## ${c.name} — ${c.id}\n\n\`\`\`text\n${prompt(c)}\n\`\`\`\n`;
writeFileSync('docs/CHAR_ID_CHATGPT.md', md);
