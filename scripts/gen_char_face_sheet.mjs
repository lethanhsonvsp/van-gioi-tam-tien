// Generates docs/CHAR_FACE_SHEET_CHATGPT.md: ONE review image with all ten faces (approval only, never cropped into production art).
// Run: node scripts/gen_char_face_sheet.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const d = JSON.parse(readFileSync('data/tien_no_appearance.json', 'utf8'));
const cell = (c, i) => `Cell ${i + 1} (${c.name}, looks about ${Math.min(Math.max(c.apparentAge,20),27)} years old, immortal youth): face: ${c.face.shape}; jaw ${c.face.jaw}; chin ${c.face.chin}; cheekbones ${c.face.cheekbones}. Eyes: ${c.eyes.shape}, ${c.eyes.iris} iris, ${c.eyes.eyelid}. Brows: ${c.brows}. Nose: ${c.nose}. LIPS: ${c.lips}. Skin: ${c.skinTone}. Eye makeup: ${c.makeup}. Mark: ${c.mark}. Hair: ${c.hairStyle}. Hair colour and ornaments: ${c.hair}. Jewelry only: ${c.jewelry}. Head and gaze: ${c.pose}. Expression: ${c.expression}.`;
const prompt = `ONE single image, a face line-up for design review: a grid of 2 rows x 5 columns, ten equal square cells with thin dark gaps, each cell a head-and-shoulders portrait of a DIFFERENT woman, front view, eye level, same scale, same soft studio-style gacha lighting, plain softly blurred dark neutral background in every cell (no element colours), so only the faces and hair differ. Style: stylized semi-realistic 3D-rendered xianxia gacha game art (polished CG, idealized beauty, NOT a photograph, NOT photoreal skin). EVERY ONE of the ten women must be a STUNNING, breathtaking beauty (mỹ nhân tuyệt sắc), all at the same top level of beauty: no plain, tired, stern, severe, aged, heavy-lidded or harsh face, no face less beautiful than the others; all look about 20-27 years old with youthful smooth skin (immortal youth). Render style like the approved Lạc Thanh Y portrait: idealized gacha CG with large luminous eyes, long lashes, glossy lips and porcelain-smooth skin, NOT photoreal skin pores. EVERY face must read as clearly FEMININE and soft even when the structure is angular or mature: gentle brows (never heavy or masculine), fuller cheeks, soft jaw, long lashes; no masculine, androgynous, gaunt, hollow-cheeked or harsh faces. All ten are beautiful, harmonious, clearly feminine adults, smooth youthful skin, lips closed, no teeth, no smile. The ten faces must be CLEARLY DIFFERENT people when the hair is hidden: different face shape and outline, eyes, nose, and above all different lips (shape and colour). Do not reuse one template face. Hair, ornaments and jewelry must follow each cell. Shoulders show a simple neckline only. Row 1 = cells 1-5 left to right, row 2 = cells 6-10. No text, no numbers, no labels, no watermark.
${d.characters.map(cell).join('\n')}`;
const md = `# Face line-up for review (generated, do not edit: edit data/tien_no_appearance.json)

Review image only (RULE-ART-001: concept sheets are for approval and must never be cropped into production art). One ChatGPT image with all ten faces so the owner can check that the faces, lips and hair differ before mass production. Cell order is fixed: 1 Lạc Thanh Y, 2 Mộ Dung Tuyết, 3 Diễm Vô Tâm, 4 Bạch Linh Nhi, 5 Tần Nguyệt Dao, 6 Liễu Như Yên, 7 Hàn Nguyệt Sương, 8 Sở Hồng Liên, 9 Vân Mộng Dao, 10 Cổ U Lan.

## Prompt

\`\`\`text
${prompt}
\`\`\`
`;
writeFileSync('docs/CHAR_FACE_SHEET_CHATGPT.md', md);
