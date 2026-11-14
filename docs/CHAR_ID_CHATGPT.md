# Tiên Nô ID sheet prompts for ChatGPT (generated, do not edit: edit data/tien_no_appearance.json)

Why: the Codex batch (2026-11-14) gave all ten faces the same template (oval face, V chin, same nose and lips). These prompts push each structure and the lips harder. ID sheets show her real neckline (ChatGPT accepted it in the first test). If the image tool refuses an image, do not reword to get around it: report it, and use a plain high-collar robe for that ID sheet only, since the sheet only checks the face.

## How to use
1. One chat per character in Project TT-gacha. Attach `docs/reference/tien_no_style_target.png`.
2. From the second character on, also attach the face crops of the characters already approved and add: "This new face must be clearly different from these: different face shape, eyes, nose and especially lips."
3. Check each result: lips shape and colour differ from every approved face, closed lips, whole head and ornaments inside the frame, no animal ears unless the profile says so. Redo the whole image if it fails.
4. Save `<ID>.ID.png` (1024x1024) in `assets/characters/<ID>/`. Approval needs the face-only contact sheet of all ten.

## Quy tắc chung (bắt buộc cho cả 10 nhân vật)
- Phong cách: tranh game gacha tiên hiệp, render CG bán hiện thực, đã lý tưởng hóa. Không phải ảnh chụp, không phải người thật. Ảnh mẫu `docs/reference/tien_no_style_target.png` chỉ lấy phong cách render và ánh sáng, không sao chép mặt, màu da, trang sức.
- Mọi nhân vật SEXY 100% nhưng phải THANH TAO, CÓ TIÊN KHÍ, không giống gái bán hoa: gợi cảm nhờ đường cắt tiên hiệp (cổ khoét sâu, vai và lưng trần, xẻ cao, voan mỏng, váy ngắn kèm tất), luôn có dải lụa, tay áo, khăn bay; họa tiết mây, sen, hạc, phượng; ngọc, pha lê, vàng; hào quang khí hệ; tóc và vạt váy bay nhẹ như không trọng lượng; dáng đứng thanh nhã. KHÔNG MẶC QUẦN: dùng váy xẻ, sườn xám, áo choàng hoặc váy ngắn kèm tất và giày hợp vai trò. CẤM: bikini, đồ lót, áo ngực hay quần lót lộ, khố nhỏ, vẻ hở kiểu lả lơi, bộ tộc, vải nhựa bóng rẻ tiền. Mức hở tùy phong cách từng người, đúng dòng Outfit. Giới hạn cứng: không khỏa thân, vùng nhạy cảm luôn che bằng vải hoặc kim loại đặc, không xuyên thấu ở chỗ đó. Người lớn, tuổi 18-35.
- Mỗi người một khuôn mặt, kiểu tóc, màu da sáng (khác sắc ngầm, không da sẫm hay rám), dấu riêng, trang sức riêng, dáng đầu riêng; môi khác hẳn nhau. Môi khép, không lộ răng, không cười.
- Thứ tự mỗi nhân vật: ảnh ID, chờ Chủ tịch duyệt mặt, rồi FULL, rồi CARD (khối trong `docs/CHAR_PROMPTS.md`). Chưa làm FULL và CARD khi chưa có "đã duyệt ID".
- Làm tuần tự từng người, mỗi người một chat. Tự kiểm 5 điểm: môi, khung mặt, mặt đẹp nữ tính, cả đầu và trâm trong khung, một người duy nhất. Hỏng thì tạo lại cả ảnh, không vá.
- Nếu công cụ tạo ảnh từ chối, báo lại, không sửa chữ để lách.

| Tiên Nô | ID | Lips |
|---|---|---|
| Lạc Thanh Y | CHAR.TIEN_NO.LAC_THANH_Y | small soft lips with a slightly plumper lower lip, natural peach-pink, gentle rounded cupid bow |
| Mộ Dung Tuyết | CHAR.TIEN_NO.MO_DUNG_TUYET | razor-thin, perfectly straight lips like a drawn line, no cupid bow, pale cool rose, almost colourless |
| Diễm Vô Tâm | CHAR.TIEN_NO.DIEM_VO_TAM | wide mouth with a very full plump lower lip and a thin upper lip, deep crimson lipstick, sensual and defined |
| Bạch Linh Nhi | CHAR.TIEN_NO.BACH_LINH_NHI | tiny heart-shaped lips with a strong pointed cupid bow and glossy bright pink colour |
| Tần Nguyệt Dao | CHAR.TIEN_NO.TAN_NGUYET_DAO | wide medium lips, corners slightly turned down giving a stern look, matte dusty rose |
| Liễu Như Yên | CHAR.TIEN_NO.LIEU_NHU_YEN | full soft plump lips, both lips equally full, flat cupid bow, warm coral, relaxed |
| Hàn Nguyệt Sương | CHAR.TIEN_NO.HAN_NGUYET_SUONG | long thin firm horizontal lips, muted pale mauve, no gloss, very controlled |
| Sở Hồng Liên | CHAR.TIEN_NO.SO_HONG_LIEN | prominent full upper lip with sharp crisp corners and a bold saturated red lipstick |
| Vân Mộng Dao | CHAR.TIEN_NO.VAN_MONG_DAO | small delicate thin straight lips, pale natural peach, understated and quiet |
| Cổ U Lan | CHAR.TIEN_NO.CO_U_LAN | wide thin lips with level corners, matte plum-brown, mature and composed |

## Lạc Thanh Y — CHAR.TIEN_NO.LAC_THANH_Y

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, deep green elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred deep green atmospheric background. Her real outfit is visible from the shoulders down to the chest: white and jade-green layered gauze saintess gown with a deep plunging neckline and bare shoulders, lotus-embroidered halter collar. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: young woman beauty (about 23); adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: porcelain white with a warm pink undertone. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: soft round face, full cheeks, length close to width; forehead medium height, rounded; cheekbones low, soft; jaw rounded soft jaw; chin small rounded chin.
- Eyes: almond eyes, average spacing, shallow, thin double eyelid, warm brown iris. Brows: softly curved, medium thickness, gently arched.
- Nose: small nose, low-medium bridge, round tip, narrow wings.
- LIPS (most important, must not look like any other character's lips): small soft lips with a slightly plumper lower lip, natural peach-pink, gentle rounded cupid bow. Lips closed, no teeth, no smile. Mouth: small mouth, thin upper lip, slightly fuller lower lip, corners very slightly lifted.
- Ears: small, close to head, attached lobes.
- Eye makeup: almost bare face, peach blush, sparse natural lashes, no eyeliner. Distinguishing mark: no mark, bare smooth forehead.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): white jade flower hairpin and small jade stud earrings only.
- Head and gaze: neck medium length, head slightly lowered, gentle kind gaze.
- Body (visible from the shoulders to the chest): graceful balanced build, soft lines; shoulders narrow; bust medium, natural and soft (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: soft see-through air bangs (thin wispy fringe) over the forehead, two long face-framing strands; BACK: straight black hair falling to the waist, upper half gathered in a round bun with a white jade flower; silhouette tall and narrow. Hair colour and ornaments: long straight black hair to the waist, half-up bun with white jade flower pin, middle part.
Expression: calm soft gaze, lips closed with a faint gentle curve.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Mộ Dung Tuyết — CHAR.TIEN_NO.MO_DUNG_TUYET

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, icy pale blue elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred icy pale blue atmospheric background. Her real outfit is visible from the shoulders down to the chest: frost-silver qipao-style gown with a keyhole plunging neckline and bare shoulders, sheer ice-blue sleeves drifting like mist. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: mature alluring beauty, a poised young mỹ phụ (about 29), refined defined features and a womanly composed gaze; adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: cool pale white with a faint blue undertone. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: delicate diamond face with soft cheeks and high cheekbones; forehead narrow, smooth; cheekbones high but softly padded; jaw softly tapered delicate jaw; chin small softly pointed chin.
- Eyes: long narrow eyes, small opening, average spacing, medium, hooded inner fold, pale ice blue iris. Brows: slim graceful long brows with a soft gentle arch and a slight upward tail.
- Nose: slender straight nose with a refined small tip.
- LIPS (most important, must not look like any other character's lips): razor-thin, perfectly straight lips like a drawn line, no cupid bow, pale cool rose, almost colourless. Lips closed, no teeth, no smile. Mouth: straight horizontal mouth, both lips thin, flat cupid bow.
- Ears: medium, thin rims.
- Eye makeup: no makeup; eyebrows and lashes silver-white like her hair. Distinguishing mark: no mark.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): ice-crystal crown and a single long ice-crystal earring on one ear only.
- Head and gaze: long neck, three-quarter view, chin level, cold distant gaze.
- Body (visible from the shoulders to the chest): tall and slender, long limbs; shoulders medium; bust small to medium, slender and refined (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: no bangs, forehead fully bare, hair swept sleekly back from a sharp hairline, two thin long strands in front of the ears; BACK: one very high tight ponytail of silver-white hair falling to the hips, ice-crystal crown; silhouette sharp and vertical. Hair colour and ornaments: long straight silver-white hair, high ponytail with ice crystal crown, no bangs.
Expression: neutral, sharp level gaze, lips firmly closed.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Diễm Vô Tâm — CHAR.TIEN_NO.DIEM_VO_TAM

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, red-orange elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred red-orange atmospheric background. Her real outfit is visible from the shoulders down to the chest: black and crimson gown with a plunging neckline open to the navel, bare back to the hips. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: elegant mature beauty, a graceful mỹ phụ nhân (about 32) with flawless ageless skin but unmistakably womanly: defined refined features, fuller lips, a serene knowing gaze, NOT girlish; adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: warm ivory with a rosy undertone. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: soft square-oval face, gently defined jaw corners; forehead medium, smooth; cheekbones medium-high; jaw softly defined jaw, slightly wider than average; chin soft rounded chin.
- Eyes: deep-set eyes with visible sockets, slightly close spacing, deep, deep double eyelid, dark crimson iris. Brows: thick, low, slightly angled brows.
- Nose: nose with a gentle convex curve on the bridge, medium width, defined tip.
- LIPS (most important, must not look like any other character's lips): wide mouth with a very full plump lower lip and a thin upper lip, deep crimson lipstick, sensual and defined. Lips closed, no teeth, no smile. Mouth: wide mouth, thin upper lip, full lower lip, corners level.
- Ears: medium, detached lobes with ruby earrings.
- Eye makeup: smoky deep red eyeshadow, long dramatic eyeliner, thick curled lashes. Distinguishing mark: a beauty mole below the right corner of the mouth.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): ruby teardrop earrings and a red spider-lily hair ornament.
- Head and gaze: head tilted about 10 degrees, sideways glance from the corner of the eyes.
- Body (visible from the shoulders to the chest): hourglass figure; shoulders medium; bust full and curvy, the most voluptuous of the roster (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: deep side part with a long dramatic side-swept fringe sweeping across the forehead over one brow; BACK: voluminous heavy wavy black hair with red undertone falling past the chest in big waves; silhouette wide and lush. Hair colour and ornaments: long thick wavy black hair with red undertone, side part, red spider-lily ornament.
Expression: half-lidded knowing gaze, lips closed, faint asymmetric curve.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Bạch Linh Nhi — CHAR.TIEN_NO.BACH_LINH_NHI

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, violet-pink elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred violet-pink atmospheric background. Her real outfit is visible from the shoulders down to the chest: lavender and pink off-shoulder wrap dress with a sweetheart neckline and bare shoulders, short layered tulle skirt. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: youthful, sweet, girl-like beauty (about 20); adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: milk white with pink flush on cheeks and nose tip. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: heart face, wide forehead, small chin; forehead wide, rounded; cheekbones medium; jaw short tapered jaw; chin small short chin.
- Eyes: large round eyes, wide opening, slightly wide spacing, shallow, double eyelid, violet with gold ring iris. Brows: short, softly curved, light brows.
- Nose: short nose, slightly upturned tip, low bridge.
- LIPS (most important, must not look like any other character's lips): tiny heart-shaped lips with a strong pointed cupid bow and glossy bright pink colour. Lips closed, no teeth, no smile. Mouth: small mouth, heart-shaped lips, defined cupid bow.
- Ears: white fox ears on top of head (spirit race), small human ears hidden.
- Eye makeup: pink-violet glitter on the lids, short round eyeliner, clear lower lashes. Distinguishing mark: two thin pink fox-style streaks at the outer eye corners.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): tiny bells and lavender ribbon, no dangling earrings.
- Head and gaze: head tilted about 15 degrees, looking up playfully.
- Body (visible from the shoulders to the chest): petite, small frame; shoulders narrow; bust small and petite, youthful (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: short fluffy side-swept bangs, round full fringe above large eyes; BACK: white hair to mid-back with bouncy soft waves and curled ends, lavender ribbon tied at one side; silhouette round and soft. Hair colour and ornaments: shoulder-to-back length white hair with soft waves, side bangs, lavender ribbon.
Expression: lively eyes, lips closed with a playful slight curve.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Tần Nguyệt Dao — CHAR.TIEN_NO.TAN_NGUYET_DAO

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, purple-black elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred purple-black atmospheric background. Her real outfit is visible from the shoulders down to the chest: black and deep-violet halter qipao-dress with a deep criss-cross laced plunging neckline and bare shoulders and arms, short side-slit skirt over black stockings and tall boots. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: young woman beauty (about 27); adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: pale neutral porcelain with a faint grey undertone, matte. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: long slim oval-rectangular face with soft cheeks, graceful not bony; forehead medium, sloping slightly; cheekbones medium, softly padded; jaw soft straight narrow jaw; chin long narrow softly rounded chin.
- Eyes: eyes with hidden inner fold (mono-hooded), medium opening, average spacing, medium, hidden fold, dark grey iris. Brows: thin softly arched brows, slightly lowered, delicate.
- Nose: long slender nose with a softly pointed tip and a narrow bridge.
- LIPS (most important, must not look like any other character's lips): wide medium lips, corners slightly turned down giving a stern look, matte dusty rose. Lips closed, no teeth, no smile. Mouth: wide mouth with slightly downturned corners, medium lips.
- Ears: small, close to head.
- Eye makeup: grey smoke along the lower lash line, short straight lashes. Distinguishing mark: a thin pale scar crossing the tail of the left eyebrow.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): no earrings, only a dark purple hair cord.
- Head and gaze: chin tucked, eyes looking up, shoulders slightly forward.
- Body (visible from the shoulders to the chest): toned athletic build; shoulders medium; bust medium, firm and athletic (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: choppy uneven blunt bangs cut at brow level, hair tucked behind the ears; BACK: one long tight low braid down the back with a dark purple cord, nothing loose; silhouette close to the head, severe. Hair colour and ornaments: long straight black hair in a low tight braid, uneven bangs, dark purple hair cord.
Expression: unreadable, watchful, lips closed.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Liễu Như Yên — CHAR.TIEN_NO.LIEU_NHU_YEN

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, deep green elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred deep green atmospheric background. Her real outfit is visible from the shoulders down to the chest: emerald silk underbust corset gown with a sweetheart neckline, bare shoulders and cleavage. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: elegant mature beauty, a graceful mỹ phụ nhân (about 35) with flawless ageless skin but unmistakably womanly: defined refined features, fuller lips, a serene knowing gaze, NOT girlish; adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: warm peach ivory. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: pear face, fuller lower cheeks and jaw; forehead narrow, low; cheekbones low; jaw full rounded jaw; chin full rounded chin.
- Eyes: soft sweet gently downturned doe eyes, charming, average spacing, medium, soft double eyelid, amber iris. Brows: soft natural sparse brows, gently downturned.
- Nose: low soft nose, rounded wide tip.
- LIPS (most important, must not look like any other character's lips): full soft plump lips, both lips equally full, flat cupid bow, warm coral, relaxed. Lips closed, no teeth, no smile. Mouth: full lips, flat cupid bow, medium width.
- Ears: medium, detached lobes with jade studs.
- Eye makeup: earthy warm brown tones, no eyeliner. Distinguishing mark: a small mole on the left cheek.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): jade bud earrings and a wooden hairpin, no gold.
- Head and gaze: relaxed shoulders, eyelids slightly lowered.
- Body (visible from the shoulders to the chest): soft full figure; shoulders medium; bust full and soft, generous (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: no bangs, centre part with soft loose strands falling at both cheeks; BACK: low loose messy bun at the nape with a wooden hairpin and small herb sprigs; silhouette low and relaxed. Hair colour and ornaments: long black hair in a low loose bun with wooden hairpin and small herb sprigs, middle part.
Expression: calm knowing gaze, lips closed, at ease.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Hàn Nguyệt Sương — CHAR.TIEN_NO.HAN_NGUYET_SUONG

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, electric blue elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred electric blue atmospheric background. Her real outfit is visible from the shoulders down to the chest: navy and silver battle gown with a sculpted metal bustier neckline, bare shoulders. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: mature alluring beauty, a poised young mỹ phụ (about 30), refined defined features and a womanly composed gaze; adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: light beige, clear and healthy. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: lightly angular feminine face with soft cheeks, strong but graceful; forehead high, flat; cheekbones high with soft fullness; jaw clean soft jawline; chin small firm rounded chin.
- Eyes: elegant phoenix eyes, long with softly lifted outer corners, luminous, average spacing, medium-deep, thin double eyelid, steel grey with blue glint iris. Brows: elegant straight brows of medium thickness, gently tapered, neat and feminine, not heavy.
- Nose: slim nose with narrow wings and a refined bridge.
- LIPS (most important, must not look like any other character's lips): long thin firm horizontal lips, muted pale mauve, no gloss, very controlled. Lips closed, no teeth, no smile. Mouth: long horizontal mouth, thin lips.
- Ears: medium, close to head.
- Eye makeup: no makeup, only strong dark eyebrows. Distinguishing mark: a small silver lightning mark in the middle of the forehead.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): plain small silver hoop earrings and a metal hair crown.
- Head and gaze: strong neck, square shoulders, looking straight into the camera.
- Body (visible from the shoulders to the chest): martial build, developed shoulders and back; shoulders broad; bust medium, firm, sculpted by training (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: no bangs, all hair pulled tight back and up, forehead and ears bare, small braids along both sides of the head; BACK: high warrior topknot with a metal crown; silhouette tall, tight and angular. Hair colour and ornaments: long black hair in a high warrior topknot with braided sides, metal hair crown.
Expression: direct steady gaze, lips firmly closed.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Sở Hồng Liên — CHAR.TIEN_NO.SO_HONG_LIEN

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, red-orange elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred red-orange atmospheric background. Her real outfit is visible from the shoulders down to the chest: crimson and gold royal gown with a high mandarin collar and a large diamond cutout from collarbone to navel, sleeveless. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: young woman beauty (about 25); adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: golden ivory with a peach glow. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: inverted triangle face, wide forehead, tapered jaw; forehead wide, slightly high; cheekbones high; jaw tapered jaw; chin medium pointed chin.
- Eyes: upturned eyes, outer corners higher, average spacing, medium, double eyelid, golden amber iris. Brows: high arched brows with sharp tails.
- Nose: straight nose with a fuller tip.
- LIPS (most important, must not look like any other character's lips): prominent full upper lip with sharp crisp corners and a bold saturated red lipstick. Lips closed, no teeth, no smile. Mouth: fuller upper lip, sharp defined corners, medium width.
- Ears: medium, gold phoenix earrings.
- Eye makeup: gold shimmer on the lids, red eyeliner flicked upward at the tail. Distinguishing mark: a red phoenix flower decal in the middle of the forehead.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): large gold phoenix earrings and a gold phoenix crown.
- Head and gaze: chin raised, looking down at the viewer.
- Body (visible from the shoulders to the chest): tall balanced build; shoulders medium; bust medium to full, elegant (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: thick blunt straight full bangs cut straight across the brows (hime cut) with long cheek-length side locks; BACK: very long straight black hair to the hips, gold phoenix crown on top; silhouette a heavy straight curtain. Hair colour and ornaments: long black hair with blunt straight bangs, side locks, gold phoenix crown.
Expression: chin slightly raised, confident gaze, lips closed.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Vân Mộng Dao — CHAR.TIEN_NO.VAN_MONG_DAO

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, ocean blue elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred ocean blue atmospheric background. Her real outfit is visible from the shoulders down to the chest: deep blue sheer silk wrap robe draped over one shoulder with a deep plunging neckline, fully backless and open on the other side down to the hip. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: young woman beauty (about 26); adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: neutral ivory, matte. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: long slim face with soft cheeks, delicate; forehead high, arched hairline; cheekbones medium-low; jaw slim jaw; chin long soft chin.
- Eyes: monolid eyes, no visible crease, medium-narrow opening, slightly wide spacing, shallow, monolid, dark blue-black iris. Brows: thin long gently curved brows.
- Nose: small nose with a low bridge, small tip.
- LIPS (most important, must not look like any other character's lips): small delicate thin straight lips, pale natural peach, understated and quiet. Lips closed, no teeth, no smile. Mouth: small mouth, straight horizontal lips, thin.
- Ears: small, detached lobes, pearl drops.
- Eye makeup: nearly bare, a faint light-blue streak at the outer eye corners. Distinguishing mark: a tear mole under the left eye.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): pearl drop earrings and a jade formation-disc hairpin.
- Head and gaze: head bowed, distant gaze not looking at the viewer.
- Body (visible from the shoulders to the chest): slender, narrow shoulders, long limbs; shoulders narrow; bust small to medium, delicate (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: long curtain bangs parted in the centre and swept to both sides of the face; BACK: extremely long straight blue-black hair to the knees, upper section tied half-up with a jade formation-disc hairpin; silhouette extremely long and thin. Hair colour and ornaments: very long straight blue-black hair, half-up with a jade formation-disc hairpin, middle part.
Expression: focused thoughtful gaze, lips closed.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```

## Cổ U Lan — CHAR.TIEN_NO.CO_U_LAN

```text
Chinese xianxia gacha card illustration in the style of the attached reference: stylized semi-realistic 3D-rendered game art (CG render, polished and idealized like a premium mobile gacha character, NOT a photograph, NOT a realistic portrait), delicate beautiful feminine face with large expressive eyes and detailed lashes, glossy lips, luminous flawless porcelain skin, ornate hair ornaments and gold jewelry, earthy gold elemental glow, floating light particles and petals, dreamy cinematic lighting, rich saturated colours. If it looks like a camera photo or a real person, it is wrong. IDENTITY SHEET, face check: ONE woman, front view, head turned 0 degrees, camera at eye level, head and shoulders, centred. Zoomed out: crown to chin takes about 50% of the image height, at least 100 px of empty background above the highest ornament, all hair and ornaments fully inside the frame. Softly blurred earthy gold atmospheric background. Her real outfit is visible from the shoulders down to the chest: ochre and bronze one-shoulder drape gown with a deep neckline, bare midriff and arms. NO high collar, NO covered shoulders, NO plain robe: show bare shoulders, collarbone and the neckline of this outfit. Canvas 1024x1024.
Age impression: elegant mature beauty, a graceful mỹ phụ nhân (about 34) with flawless ageless skin but unmistakably womanly: defined refined features, fuller lips, a serene knowing gaze, NOT girlish; adult woman, a STUNNING breathtaking beauty (mỹ nhân tuyệt sắc, never plain, tired, stern or aged), harmonious, clearly feminine and soft (gentle brows, fuller cheeks, never masculine, androgynous or gaunt, even when the structure is angular), smooth youthful skin (no wrinkles, no under-eye bags). SKIN TONE: light golden ivory, the warmest of the roster but still fair. The element colour only in the background and rim light, never on the skin.
THIS FACE MUST LOOK CLEARLY DIFFERENT FROM EVERY OTHER CHARACTER. Do NOT use the generic face (oval face, pointed V-shaped chin, same nose, same pink lips). Build it from these structures:
- Face: wide face with high cheekbones and full soft cheeks, never hollow or gaunt; forehead medium, flat; cheekbones high and wide with full soft cheeks; jaw wide soft jaw; chin soft rounded chin.
- Eyes: calm almond eyes with softly hooded lids, serene and alluring, wide spacing, softly set, soft double eyelid, light gold-brown iris. Brows: natural softly curved medium brows.
- Nose: long nose with a rounded tip, medium width.
- LIPS (most important, must not look like any other character's lips): wide thin lips with level corners, matte plum-brown, mature and composed. Lips closed, no teeth, no smile. Mouth: wide mouth, thin lips, level corners.
- Ears: large, long lobes.
- Eye makeup: soft bronze outline around the eyes, no shimmer. Distinguishing mark: three small earth-seal dots on the forehead.
- Jewelry (ONLY this, nothing else; no forehead jewel and no long dangling earrings unless listed): heavy round bronze earrings on elongated lobes.
- Head and gaze: head perfectly upright and still, looking into the distance.
- Body (visible from the shoulders to the chest): tall and firm build; shoulders broad; bust medium to full, solid and mature (adult natural proportions; her bust size must differ from the other characters).
- HAIRSTYLE (every character has her own: do NOT use the generic long dark hair with a centre part and a plain updo; the front fringe and the back must follow this): FRONT: side part with the hair brushed back off the forehead, no bangs, a few short strands at the temples; BACK: long straight ash-grey hair gathered in a low ponytail bound with bronze rings, falling over one shoulder; silhouette plain and mature. Hair colour and ornaments: long straight ash-grey hair, low ponytail bound with bronze rings, no bangs.
Expression: still, quiet steady gaze, lips closed.
Draw exactly one person. Stylized CG game art, not a photograph, not photoreal skin texture, not a real person. Adult woman's face. No text, no letters, no watermark, no frame, no UI. Not pixel art, not ink wash, not watercolor, not brush painting, not anime chibi. Correct anatomy.
```
