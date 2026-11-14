// Generates docs/CHAR_ID_CHATGPT.md: one ID-sheet prompt per Tiên Nô for ChatGPT image generation.
// Run: node scripts/gen_char_id_chatgpt.mjs
import { readFileSync, writeFileSync } from 'node:fs';
const d = JSON.parse(readFileSync('data/tien_no_appearance.json', 'utf8'));
const bg = c => d.elementBackgrounds[c.element];
const prompt = c => `Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, ${bg(c)} elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred ${bg(c)} atmospheric background. Her real outfit is visible from the shoulders down to the chest: ${c.outfit.split(',').slice(0, 2).join(',')}. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
The face LOOKS about ${Math.min(Math.max(c.apparentAge,20),27)} years old (immortal youth, never aged), adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: ${c.skinTone}. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: ${c.face.shape}; forehead ${c.face.forehead}; cheekbones ${c.face.cheekbones}; jaw ${c.face.jaw}; chin ${c.face.chin}.
- Eyes: ${c.eyes.shape}, ${c.eyes.spacing} spacing, ${c.eyes.depth}, ${c.eyes.eyelid}, ${c.eyes.iris} iris. Brows: ${c.brows}.
- Nose: ${c.nose}.
- LIPS (most important, must not look like any other character's lips): ${c.lips}. Lips closed, no teeth, no smile. Mouth: ${c.mouth}.
- Ears: ${c.ears}.
- Eye makeup: ${c.makeup}. Distinguishing mark: ${c.mark}.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): ${c.jewelry}.
- Head and gaze: ${c.pose}.
- Body (visible from the shoulders to the chest): ${c.body.type}; shoulders ${c.body.shoulders}; bust ${c.bust} (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): ${c.hairStyle}. Hair colour and ornaments: ${c.hair}.
Expression: ${c.expression}.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.`;
let md = `# Tiên Nô ID sheet prompts for ChatGPT (generated, do not edit: edit data/tien_no_appearance.json)

Why: the Codex batch (2026-11-14) gave all ten faces the same template (oval face, V chin, same nose and lips). These prompts push each structure and the lips harder. ID sheets show her real neckline (ChatGPT accepted it in the first test). If the image tool refuses an image, do not reword to get around it: report it, and use a plain high-collar robe for that ID sheet only, since the sheet only checks the face.

## How to use
1. One chat per character in Project TT-gacha. Attach \`docs/reference/tien_no_style_target.png\`.
2. From the second character on, also attach the face crops of the characters already approved and add: "This new face must be clearly different from these: different face shape, eyes, nose and especially lips."
3. Check each result: lips shape and colour differ from every approved face, closed lips, whole head and ornaments inside the frame, no animal ears unless the profile says so. Redo the whole image if it fails.
4. Save \`<ID>.ID.png\` (1024x1024) in \`assets/characters/<ID>/\`. Approval needs the face-only contact sheet of all ten.

## Quy tắc chung (bắt buộc cho cả 10 nhân vật)
- Phong cách: tranh game gacha tiên hiệp, render CG bán hiện thực, đã lý tưởng hóa. Không phải ảnh chụp, không phải người thật. Ảnh mẫu \`docs/reference/tien_no_style_target.png\` chỉ lấy phong cách render và ánh sáng, không sao chép mặt, màu da, trang sức.
- Mọi nhân vật SEXY 100% nhưng phải THANH TAO, CÓ TIÊN KHÍ, không giống gái bán hoa: gợi cảm nhờ đường cắt tiên hiệp (cổ khoét sâu, vai và lưng trần, xẻ cao, voan mỏng, váy ngắn kèm tất), luôn có dải lụa, tay áo, khăn bay; họa tiết mây, sen, hạc, phượng; ngọc, pha lê, vàng; hào quang khí hệ; tóc và vạt váy bay nhẹ như không trọng lượng; dáng đứng thanh nhã. KHÔNG MẶC QUẦN: dùng váy xẻ, sườn xám, áo choàng hoặc váy ngắn kèm tất và giày hợp vai trò. CẤM: bikini, đồ lót, áo ngực hay quần lót lộ, khố nhỏ, vẻ hở kiểu lả lơi, bộ tộc, vải nhựa bóng rẻ tiền. Mức hở tùy phong cách từng người, đúng dòng Outfit. Giới hạn cứng: không khỏa thân, vùng nhạy cảm luôn che bằng vải hoặc kim loại đặc, không xuyên thấu ở chỗ đó. Người lớn, tuổi 18-35.
- Mỗi người một khuôn mặt, kiểu tóc, màu da sáng (khác sắc ngầm, không da sẫm hay rám), dấu riêng, trang sức riêng, dáng đầu riêng; môi khác hẳn nhau. Môi khép, không lộ răng, không cười.
- Thứ tự mỗi nhân vật: ảnh ID, chờ Chủ tịch duyệt mặt, rồi FULL, rồi CARD (khối trong \`docs/CHAR_PROMPTS.md\`). Chưa làm FULL và CARD khi chưa có "đã duyệt ID".
- Làm tuần tự từng người, mỗi người một chat. Tự kiểm 5 điểm: môi, khung mặt, mặt đẹp nữ tính, cả đầu và trâm trong khung, một người duy nhất. Hỏng thì tạo lại cả ảnh, không vá.
- Nếu công cụ tạo ảnh từ chối, báo lại, không sửa chữ để lách.

| Tiên Nô | ID | Lips |
|---|---|---|
${d.characters.map(c => `| ${c.name} | ${c.id} | ${c.lips} |`).join('\n')}
`;
for (const c of d.characters) if (/high-collar|plain robe covering/i.test(prompt(c).replace(/NO high collar[^.]*\./g, ''))) throw new Error(`covered outfit text in ${c.id}`);
for (const c of d.characters) md += `\n## ${c.name} — ${c.id}\n\n\`\`\`text\n${prompt(c)}\n\`\`\`\n`;
writeFileSync('docs/CHAR_ID_CHATGPT.md', md);
