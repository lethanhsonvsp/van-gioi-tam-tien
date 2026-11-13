# UI frame prompts (generated, do not edit — edit data/ui_registry.json)

Scope: game frame only. No characters. One prompt per sheet: copy the whole code block into the image tool.

## Rarity tiers (reference)
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.

## After generation (for GPT / any assistant with Python)
Per sheet, run Python on the generated image (canvas and grid are in its prompt):
1. Cut exactly on the grid: cell (r, c) = box (c*W/cols, r*H/rows, (c+1)*W/cols, (r+1)*H/rows). Do not trim, do not resize: every cell keeps its full cell size.
2. Check each cell: the 6 px strip along the right edge must be 100% background colour (tolerance <= 30 per channel). If any cell fails, redraw the WHOLE sheet; never shrink, erase or patch the cell.
3. Make the background transparent (key the chroma colour). The black FX sheet keeps black (game uses additive blend). Single-image sheets (bg "none") are saved as is.
4. Save each cell as `<ID>.png` inside a folder named `<SHEET.ID>/` (skip empty cells).
5. Pack `<SHEET.ID>.zip` containing: the cell PNGs, `_sheet.png` (the original), `_preview.png` (cells on a checkerboard), and `manifest.json` listing for every cell: id, file, w, h, bbox of the non-transparent pixels.
Then place the PNGs in `assets/ui/<SHEET.ID>/`. Review SSR vs UR side by side before accepting.

## SHEET.RARITY_ITEM

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 3 columns × 2 rows, equal cells.
Each cell is 512x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 389x389 px and nothing touches or crosses a cell edge.
One shared outer frame size for the whole set: UR is richer through ornament thickness and detail, never a bigger frame; shrink UR if needed.
Item slot frame is exactly SQUARE, 389x389 px.
The inside of item and card frames is the flat background colour, no scene, mountains or gradient.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Square item slot frames only, one per rarity. Cells go in rarity order N, R, SR, SSR, UR (left to right, top to bottom); the sixth cell is left empty. 
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
4. row 2, col 1: square item slot frame, SSR tier
5. row 2, col 2: square item slot frame, UR tier
6. row 2, col 3: leave empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.FRAME.ITEM.N |
| 2 | UI.FRAME.ITEM.R |
| 3 | UI.FRAME.ITEM.SR |
| 4 | UI.FRAME.ITEM.SSR |
| 5 | UI.FRAME.ITEM.UR |

## SHEET.RARITY_CARD

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 3 columns × 2 rows, equal cells.
Each cell is 512x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 389x389 px and nothing touches or crosses a cell edge.
One shared outer frame size for the whole set: UR is richer through ornament thickness and detail, never a bigger frame; shrink UR if needed.
Card frame is exactly 2:3 portrait, 259x389 px.
The inside of item and card frames is the flat background colour, no scene, mountains or gradient.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Portrait card frames only (exactly 2:3), one per rarity. Cells go in rarity order N, R, SR, SSR, UR (left to right, top to bottom); the sixth cell is left empty. The opening inside every card is plain flat background colour: no painted mist, smoke, gradient, glow or scenery inside the frame. Colours match the item slot frames of the same tier (R is jade green-blue, not plain blue).
Rarity tiers, each visibly different in material, ornament and glow:
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.
Cells, left to right, top to bottom:
1. row 1, col 1: portrait 2:3 card frame, N tier
2. row 1, col 2: portrait 2:3 card frame, R tier
3. row 1, col 3: portrait 2:3 card frame, SR tier
4. row 2, col 1: portrait 2:3 card frame, SSR tier
5. row 2, col 2: portrait 2:3 card frame, UR tier
6. row 2, col 3: leave empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.FRAME.CARD.N |
| 2 | UI.FRAME.CARD.R |
| 3 | UI.FRAME.CARD.SR |
| 4 | UI.FRAME.CARD.SSR |
| 5 | UI.FRAME.CARD.UR |

## SHEET.RARITY_PLATE

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 2 columns × 3 rows, equal cells.
Each cell is 768x341 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 584x259 px and nothing touches or crosses a cell edge.
One shared outer frame size for the whole set: UR is richer through ornament thickness and detail, never a bigger frame; shrink UR if needed.
Name plate is about 4:1, 584x146 px, interior one flat dark colour, pendant and ornaments stay off the edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Wide name plate banners only (about 4:1), one per rarity. Cells go in rarity order N, R, SR, SSR, UR (left to right, top to bottom); the sixth cell is left empty. 
Rarity tiers, each visibly different in material, ornament and glow:
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.
Cells, left to right, top to bottom:
1. row 1, col 1: wide name plate banner, N tier
2. row 1, col 2: wide name plate banner, R tier
3. row 2, col 1: wide name plate banner, SR tier
4. row 2, col 2: wide name plate banner, SSR tier
5. row 3, col 1: wide name plate banner, UR tier
6. row 3, col 2: leave empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.PLATE.N |
| 2 | UI.PLATE.R |
| 3 | UI.PLATE.SR |
| 4 | UI.PLATE.SSR |
| 5 | UI.PLATE.UR |

## SHEET.FX_RARITY

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 5 columns × 2 rows, equal cells.
Each cell is 307x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 233x389 px and nothing touches or crosses a cell edge.
One shared outer frame size for the whole set: UR is richer through ornament thickness and detail, never a bigger frame; shrink UR if needed.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Pure solid black #000000 background (glows will be used with additive blending, so nothing but light on black).
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
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
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 2 rows, equal cells.
Each cell is 384x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
No text on buttons. Columns are states: normal, hover, pressed, disabled. Rows: primary (gold), secondary (jade).
Cells, left to right, top to bottom:
1. row 1, col 1: primary gold button, normal state
2. row 1, col 2: primary gold button, hover state
3. row 1, col 3: primary gold button, pressed state
4. row 1, col 4: primary gold button, disabled state
5. row 2, col 1: secondary jade button, normal state
6. row 2, col 2: secondary jade button, hover state
7. row 2, col 3: secondary jade button, pressed state
8. row 2, col 4: secondary jade button, disabled state
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

## SHEET.BUTTONS_2

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 2 rows, equal cells.
Each cell is 384x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
No text on buttons. Columns are states: normal, hover, pressed, disabled. Rows: danger (crimson), tab.
Cells, left to right, top to bottom:
1. row 1, col 1: danger crimson button, normal state
2. row 1, col 2: danger crimson button, hover state
3. row 1, col 3: danger crimson button, pressed state
4. row 1, col 4: danger crimson button, disabled state
5. row 2, col 1: tab button, normal state
6. row 2, col 2: tab button, hover state
7. row 2, col 3: tab button, pressed state
8. row 2, col 4: tab button, disabled state
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.BTN.DANGER.NORMAL |
| 2 | UI.BTN.DANGER.HOVER |
| 3 | UI.BTN.DANGER.PRESSED |
| 4 | UI.BTN.DANGER.DISABLED |
| 5 | UI.BTN.TAB.NORMAL |
| 6 | UI.BTN.TAB.HOVER |
| 7 | UI.BTN.TAB.PRESSED |
| 8 | UI.BTN.TAB.DISABLED |

## SHEET.PANELS

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 3 rows, equal cells.
Each cell is 384x341 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x259 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Empty containers, no text, nothing inside. Left to right, top to bottom as listed.
Cells, left to right, top to bottom:
1. row 1, col 1: large ornate window panel, deep indigo glass interior, gold chamfered trim
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
12. row 3, col 4: rounded horizontal capsule frame for a currency counter: thin gold rim, deep indigo glass body, empty
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
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 2 rows, equal cells.
Each cell is 384x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
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
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 2 rows, equal cells.
Each cell is 384x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
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
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 3 rows, equal cells.
Each cell is 384x341 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x259 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Lobby menu icons, one per cell.
Cells, left to right, top to bottom:
1. row 1, col 1: cultivation: meditation lotus with rising qi
2. row 1, col 2: breakthrough: glowing golden core cracking outward
3. row 1, col 3: companion roster: ornate folding fan with jade tassel
4. row 1, col 4: equipment: crossed sword and armor plate
5. row 2, col 1: summon: glowing summoning altar with light pillar
6. row 2, col 2: trial tower: multi-tier pagoda
7. row 2, col 3: secret realm: swirling portal gate in mountain
8. row 2, col 4: team: three overlapping banner flags
9. row 3, col 1: inventory: embroidered storage pouch
10. row 3, col 2: shop: merchant pavilion with lantern
11. row 3, col 3: guild: sect gate archway
12. row 3, col 4: ranking: gold stele with laurel
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

## SHEET.ICON_FUNCTION_2

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 4 columns × 3 rows, equal cells.
Each cell is 384x341 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 292x259 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Lobby menu icons, one per cell. Unused cells are left empty.
Cells, left to right, top to bottom:
1. row 1, col 1: mail: sealed letter with flying crane
2. row 1, col 2: journal: bound book with brush
3. row 1, col 3: quests: unrolled scroll with seal mark
4. row 1, col 4: events: firework lantern
5. row 2, col 1: benefits: gift box with ribbon
6. row 2, col 2: daily login: calendar tablet with sun
7. row 2, col 3: settings: bronze gear with cloud pattern
8. row 2, col 4: notifications: golden bell with jade clapper
9. row 3, col 1: leave empty
10. row 3, col 2: leave empty
11. row 3, col 3: leave empty
12. row 3, col 4: leave empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | ICON.FN.MAIL |
| 2 | ICON.FN.JOURNAL |
| 3 | ICON.FN.QUESTS |
| 4 | ICON.FN.EVENTS |
| 5 | ICON.FN.BENEFITS |
| 6 | ICON.FN.DAILY_LOGIN |
| 7 | ICON.FN.SETTINGS |
| 8 | ICON.FN.NOTIFICATIONS |

## SHEET.HUD

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 3 columns × 2 rows, equal cells.
Each cell is 512x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 389x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #FF00FF chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening. This sheet has green parts, so no pink or magenta anywhere in the elements.
HUD parts, empty containers, no text. Cells are separate objects, each fully inside its cell. Magenta #FF00FF is the background because several parts are green: do not use pink, magenta or purple-pink inside any element.
Cells, left to right, top to bottom:
1. row 1, col 1: round ornate avatar frame: polished gold ring with engraved scrollwork, teal-cyan gem at top and bottom, thin indigo inner rim, hollow flat-filled centre
2. row 1, col 2: small shield-shaped level badge, gold trim, teal-cyan gem on top, empty flat indigo centre
3. row 1, col 3: horizontal bar fill, glowing green spirit-power, no frame
4. row 2, col 1: small round button: gold rim, indigo glass body, raised gold plus-sign shape (a shape, not a text character)
5. row 2, col 2: round button base: gold rim with small teal-cyan gem at top, deep indigo glass body, empty centre; shared by mail, bell, settings and left icons
6. row 2, col 3: leave empty
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.FRAME.AVATAR |
| 2 | UI.BADGE.LEVEL |
| 3 | UI.BAR.FILL.LINH_LUC |
| 4 | UI.BTN.PLUS |
| 5 | UI.BTN.ROUND |

## SHEET.HUD_WIDE

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 1 columns × 2 rows, equal cells.
Each cell is 1536x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 1167x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Wide HUD strips, empty, no text, one per row, each about 3:1 or wider.
Cells, left to right, top to bottom:
1. row 1, col 1: dark indigo glass player-name panel, gold trim on the left, fading transparent toward the right, empty
2. row 2, col 1: carved bottom navigation bar, long gold chamfered trim with a teal-cyan gem in the top centre, hollow deep indigo glass interior
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.PANEL.PROFILE |
| 2 | UI.NAV.BOTTOM_BAR |

## SHEET.FEATURE_CARDS

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 2 columns × 2 rows, equal cells.
Each cell is 768x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 584x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Lobby feature cards, no text, no people. Each card is a chamfered-corner frame over a dark indigo glass body; illustration fills the LEFT ~45%, the RIGHT ~55% is empty dark glass reserved for a label added by code.
Cells, left to right, top to bottom:
1. row 1, col 1: feature card, left illustration: lotus platform with meditation cushion and swirling qi
2. row 1, col 2: feature card, left illustration: glowing golden core cracking outward
3. row 2, col 1: feature card, left illustration: jade folding fan with tassels and a hairpin
4. row 2, col 2: feature card, left illustration: crossed sword and armor plate
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.FEATURE_CARD.CULTIVATION |
| 2 | UI.FEATURE_CARD.BREAKTHROUGH |
| 3 | UI.FEATURE_CARD.TIEN_NO |
| 4 | UI.FEATURE_CARD.EQUIPMENT |

## SHEET.FEATURE_CARDS_2

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Sprite sheet, canvas 1536x1024, exact grid of 2 columns × 2 rows, equal cells.
Each cell is 768x512 px; cell borders are invisible (no lines, no gutters drawn). SAFE ZONE: keep 12% of the cell empty on every side, so everything, including glows, particles, wings, halos and pendants, stays inside the central 584x389 px and nothing touches or crosses a cell edge.
 Each element sharp, centred in its cell, same scale within a row, lighting from top-left, one consistent style across the sheet.
Flat solid #00FF00 chroma-key background, no shadows or glow spilling onto the background.
Never use the background colour in the material of any element; the only place it may appear inside an element is an empty frame opening.
Lobby feature cards, no text, no people. Each card is a chamfered-corner frame over a dark indigo glass body; illustration fills the LEFT ~45%, the RIGHT ~55% is empty dark glass reserved for a label added by code.
Cells, left to right, top to bottom:
1. row 1, col 1: feature card, left illustration: summoning altar with light pillar
2. row 1, col 2: feature card, left illustration: multi-tier trial pagoda
3. row 2, col 1: feature card, left illustration: swirling portal gate in a mountain
4. row 2, col 2: feature card, left illustration: three command tokens and banners
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
```

| Cell | ID |
|---|---|
| 1 | UI.FEATURE_CARD.GACHA |
| 2 | UI.FEATURE_CARD.TRIAL |
| 3 | UI.FEATURE_CARD.SECRET_REALM |
| 4 | UI.FEATURE_CARD.TEAM |

## SHEET.BG_LOBBY

```text
Semi-realistic 2D xianxia game UI art, rendered like polished 3D then exported to 2D. Theme: moonlit blue-violet immortal sect.
SHARED MATERIAL for every frame, button, panel, bar and badge (match the approved SHEET.FEATURE_CARDS frame): polished warm gold metal trim with fine engraved scrollwork and chamfered corners, deep indigo-violet glass body, small teal-cyan diamond gem accents. No green jade, no other trim colour, unless a rarity tier or a bar fill colour says otherwise.
Single background image, canvas 1536x1024, no grid, no chroma key, full-bleed.
Single full-bleed background image, not a sprite sheet. Keep the important area inside the centre 16:9 band (about 1536x864) because code crops to 16:9.
NIGHT scene under a large full moon: deep indigo and blue-violet night sky with stars, cool moonlight, NO daylight, NO blue day sky, NO sun. Immortal sect courtyard seen from the plaza: a large glowing blue spirit crystal on a round stone dais at the exact centre, emitting soft cyan light rings; stone stairs behind it rising to a lit main hall; several waterfalls on misty cliffs; a large VIOLET/LAVENDER blossom tree framing the left edge (purple, not pink); stone lanterns with warm glow; tall indigo banners carrying only an emblem. Match the lighting, palette and composition of docs/reference/lobby_target.png but with every UI element, label and person removed. No UI, no people, no text.
No text, no letters, no numbers, no watermark, no characters, no people, no faces. Not pixel art, not ink wash, not watercolor, not brush painting, not flat vector clip art.
No UI elements.
```

| ID |
|---|
| BG.LOBBY.NGUYET_DA |
