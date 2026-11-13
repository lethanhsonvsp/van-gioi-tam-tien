# UI frame prompts (generated, do not edit — edit data/ui_registry.json)

Scope: game frame only. No characters. One prompt per sheet: copy the whole code block into the image tool.

## Rarity tiers (reference)
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.

## After generation
Crop each cell, export PNG named by ID (e.g. `UI.FRAME.ITEM.SSR.png`) into `assets/ui/<SHEET.ID>/`. Green sheets: key green to transparent. Black FX sheet: keep black, game uses additive blend. Review SSR vs UR side by side before accepting.

## SHEET.RARITY_FRAMES

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 4096x2560, exact grid of 5 columns × 3 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Frames only, centre empty/transparent-looking flat fill. Columns are rarities N,R,SR,SSR,UR, in that order. Rows: item slot frame (square), card frame (portrait 2:3), name plate (wide banner).
Rarity tiers, each visibly different in material, ornament and glow:
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.
Cells, left to right, top to bottom:
1. row 1, col 1: square item slot frame, N tier
2. row 1, col 2: square item slot frame, R tier
3. row 1, col 3: square item slot frame, SR tier
4. row 1, col 4: square item slot frame, SSR tier
5. row 1, col 5: square item slot frame, UR tier
6. row 2, col 1: portrait 2:3 card frame, N tier
7. row 2, col 2: portrait 2:3 card frame, R tier
8. row 2, col 3: portrait 2:3 card frame, SR tier
9. row 2, col 4: portrait 2:3 card frame, SSR tier
10. row 2, col 5: portrait 2:3 card frame, UR tier
11. row 3, col 1: wide name plate banner, N tier
12. row 3, col 2: wide name plate banner, R tier
13. row 3, col 3: wide name plate banner, SR tier
14. row 3, col 4: wide name plate banner, SSR tier
15. row 3, col 5: wide name plate banner, UR tier
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.FRAME.ITEM.N |
| 2 | UI.FRAME.ITEM.R |
| 3 | UI.FRAME.ITEM.SR |
| 4 | UI.FRAME.ITEM.SSR |
| 5 | UI.FRAME.ITEM.UR |
| 6 | UI.FRAME.CARD.N |
| 7 | UI.FRAME.CARD.R |
| 8 | UI.FRAME.CARD.SR |
| 9 | UI.FRAME.CARD.SSR |
| 10 | UI.FRAME.CARD.UR |
| 11 | UI.PLATE.N |
| 12 | UI.PLATE.R |
| 13 | UI.PLATE.SR |
| 14 | UI.PLATE.SSR |
| 15 | UI.PLATE.UR |

## SHEET.FX_RARITY

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 4096x1638, exact grid of 5 columns × 2 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Pure solid black #000000 background (glows will be used with additive blending, so nothing but light on black).
Columns are rarities N,R,SR,SSR,UR. Row 1: summon glow burst (radial). Row 2: card shine sweep overlay. Glow colour and intensity follow the rarity table; N is nearly none.
Rarity tiers, each visibly different in material, ornament and glow:
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.
Cells, left to right, top to bottom:
1. row 1, col 1: radial summon glow burst, N tier
2. row 1, col 2: radial summon glow burst, R tier
3. row 1, col 3: radial summon glow burst, SR tier
4. row 1, col 4: radial summon glow burst, SSR tier
5. row 1, col 5: radial summon glow burst, UR tier
6. row 2, col 1: diagonal card shine sweep, N tier
7. row 2, col 2: diagonal card shine sweep, R tier
8. row 2, col 3: diagonal card shine sweep, SR tier
9. row 2, col 4: diagonal card shine sweep, SSR tier
10. row 2, col 5: diagonal card shine sweep, UR tier
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | FX.GLOW.N |
| 2 | FX.GLOW.R |
| 3 | FX.GLOW.SR |
| 4 | FX.GLOW.SSR |
| 5 | FX.GLOW.UR |
| 6 | FX.SHINE.N |
| 7 | FX.SHINE.R |
| 8 | FX.SHINE.SR |
| 9 | FX.SHINE.SSR |
| 10 | FX.SHINE.UR |

## SHEET.BUTTONS

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 4096x2048, exact grid of 4 columns × 4 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
No text on buttons. Columns are states: normal, hover, pressed, disabled. Rows: primary (gold), secondary (jade), danger (crimson), tab.
Cells, left to right, top to bottom:
1. row 1, col 1: primary gold button, normal state
2. row 1, col 2: primary gold button, hover state
3. row 1, col 3: primary gold button, pressed state
4. row 1, col 4: primary gold button, disabled state
5. row 2, col 1: secondary jade button, normal state
6. row 2, col 2: secondary jade button, hover state
7. row 2, col 3: secondary jade button, pressed state
8. row 2, col 4: secondary jade button, disabled state
9. row 3, col 1: danger crimson button, normal state
10. row 3, col 2: danger crimson button, hover state
11. row 3, col 3: danger crimson button, pressed state
12. row 3, col 4: danger crimson button, disabled state
13. row 4, col 1: tab button, normal state
14. row 4, col 2: tab button, hover state
15. row 4, col 3: tab button, pressed state
16. row 4, col 4: tab button, disabled state
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.BTN.PRIMARY.NORMAL |
| 2 | UI.BTN.PRIMARY.HOVER |
| 3 | UI.BTN.PRIMARY.PRESSED |
| 4 | UI.BTN.PRIMARY.DISABLED |
| 5 | UI.BTN.SECONDARY.NORMAL |
| 6 | UI.BTN.SECONDARY.HOVER |
| 7 | UI.BTN.SECONDARY.PRESSED |
| 8 | UI.BTN.SECONDARY.DISABLED |
| 9 | UI.BTN.DANGER.NORMAL |
| 10 | UI.BTN.DANGER.HOVER |
| 11 | UI.BTN.DANGER.PRESSED |
| 12 | UI.BTN.DANGER.DISABLED |
| 13 | UI.BTN.TAB.NORMAL |
| 14 | UI.BTN.TAB.HOVER |
| 15 | UI.BTN.TAB.PRESSED |
| 16 | UI.BTN.TAB.DISABLED |

## SHEET.PANELS

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 4096x3072, exact grid of 4 columns × 3 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Empty containers, no text, nothing inside. Left to right, top to bottom as listed.
Cells, left to right, top to bottom:
1. row 1, col 1: large ornate window panel, dark indigo glass interior, gold and jade trim
2. row 1, col 2: small square panel, same style, simpler trim
3. row 1, col 3: dialog box panel with cloud-scroll corners
4. row 1, col 4: long thin horizontal top bar, ornate ends
5. row 2, col 1: thin horizontal divider line with small central jade ornament
6. row 2, col 2: horizontal strip that holds tabs, empty
7. row 2, col 3: empty horizontal progress bar frame, hollow inside
8. row 2, col 4: horizontal bar fill, glossy crimson red, no frame
9. row 3, col 1: horizontal bar fill, glowing gold, no frame
10. row 3, col 2: horizontal bar fill, glowing cyan-blue, no frame
11. row 3, col 3: small round red notification badge, empty
12. row 3, col 4: rounded horizontal capsule frame for a currency counter, empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.PANEL.MAIN |
| 2 | UI.PANEL.SMALL |
| 3 | UI.PANEL.POPUP |
| 4 | UI.PANEL.HEADER_BAR |
| 5 | UI.DIVIDER.H |
| 6 | UI.TAB_BAR |
| 7 | UI.BAR.FRAME |
| 8 | UI.BAR.FILL.HP |
| 9 | UI.BAR.FILL.EXP |
| 10 | UI.BAR.FILL.ENERGY |
| 11 | UI.BADGE.NOTIFY |
| 12 | UI.PILL.CURRENCY |

## SHEET.ICON_RESOURCE

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 2048x1024, exact grid of 4 columns × 2 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Currency and material icons, one object per cell, centred, no text.
Cells, left to right, top to bottom:
1. row 1, col 1: spirit stone: faceted pale blue glowing crystal
2. row 1, col 2: immortal jade: polished violet-white jade gem with inner light
3. row 1, col 3: round gold coin with square hole and cloud engraving
4. row 1, col 4: summon talisman: golden paper charm with glowing seal
5. row 2, col 1: level-up elixir pill: shiny red-gold pill with swirling aura
6. row 2, col 2: shard: broken fragment of a glowing violet crystal card
7. row 2, col 3: energy: cyan qi flame orb
8. row 2, col 4: experience: glowing gold rolled scroll
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | ICON.RES.LINH_THACH |
| 2 | ICON.RES.TIEN_NGOC |
| 3 | ICON.RES.XU |
| 4 | ICON.RES.THE_TRIEU_HOI |
| 5 | ICON.RES.DAN_TANG_CAP |
| 6 | ICON.RES.MANH_TIEN_NO |
| 7 | ICON.RES.NANG_LUONG |
| 8 | ICON.RES.KINH_NGHIEM |

## SHEET.ICON_ELEMENT

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 2048x1024, exact grid of 4 columns × 2 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Element emblems, same style and size, distinct silhouettes.
Cells, left to right, top to bottom:
1. row 1, col 1: wood element emblem, green leaf and branch
2. row 1, col 2: water element emblem, blue wave
3. row 1, col 3: fire element emblem, red-orange flame
4. row 1, col 4: earth element emblem, ochre mountain
5. row 2, col 1: thunder element emblem, violet lightning bolt
6. row 2, col 2: ice element emblem, pale cyan snowflake crystal
7. row 2, col 3: mystic element emblem, swirling deep purple void spiral
8. row 2, col 4: dark element emblem, black crescent with dark mist
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | ICON.ELEM.MOC |
| 2 | ICON.ELEM.THUY |
| 3 | ICON.ELEM.HOA |
| 4 | ICON.ELEM.THO |
| 5 | ICON.ELEM.LOI |
| 6 | ICON.ELEM.BANG |
| 7 | ICON.ELEM.HUYEN |
| 8 | ICON.ELEM.AM |

## SHEET.ICON_FUNCTION

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect, gold and jade trim.
Sprite sheet, canvas 2560x2048, exact grid of 5 columns × 4 rows, equal cells, thin empty gutter between cells, nothing crossing cell borders. Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Lobby menu icons, one per cell. The last cell is left empty.
Cells, left to right, top to bottom:
1. row 1, col 1: cultivation: meditation lotus with rising qi
2. row 1, col 2: breakthrough: glowing golden core cracking outward
3. row 1, col 3: companion roster: ornate folding fan with jade tassel
4. row 1, col 4: equipment: crossed sword and armor plate
5. row 1, col 5: summon: glowing summoning altar with light pillar
6. row 2, col 1: trial tower: multi-tier pagoda
7. row 2, col 2: secret realm: swirling portal gate in mountain
8. row 2, col 3: team: three overlapping banner flags
9. row 2, col 4: inventory: embroidered storage pouch
10. row 2, col 5: shop: merchant pavilion with lantern
11. row 3, col 1: guild: sect gate archway
12. row 3, col 2: ranking: gold stele with laurel
13. row 3, col 3: mail: sealed letter with flying crane
14. row 3, col 4: journal: bound book with brush
15. row 3, col 5: quests: unrolled scroll with seal mark
16. row 4, col 1: events: firework lantern
17. row 4, col 2: benefits: gift box with ribbon
18. row 4, col 3: daily login: calendar tablet with sun
19. row 4, col 4: settings: bronze gear with cloud pattern
20. row 4, col 5: leave empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | ICON.FN.CULTIVATION |
| 2 | ICON.FN.BREAKTHROUGH |
| 3 | ICON.FN.TIEN_NO |
| 4 | ICON.FN.EQUIPMENT |
| 5 | ICON.FN.GACHA |
| 6 | ICON.FN.TRIAL |
| 7 | ICON.FN.SECRET_REALM |
| 8 | ICON.FN.TEAM |
| 9 | ICON.FN.INVENTORY |
| 10 | ICON.FN.SHOP |
| 11 | ICON.FN.GUILD |
| 12 | ICON.FN.RANKING |
| 13 | ICON.FN.MAIL |
| 14 | ICON.FN.JOURNAL |
| 15 | ICON.FN.QUESTS |
| 16 | ICON.FN.EVENTS |
| 17 | ICON.FN.BENEFITS |
| 18 | ICON.FN.DAILY_LOGIN |
| 19 | ICON.FN.SETTINGS |
