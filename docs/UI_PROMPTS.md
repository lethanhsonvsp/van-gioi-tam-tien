# UI frame prompts (generated, do not edit — edit data/ui_registry.json)

Scope: game frame only. No characters. Semi-realistic 2D xianxia UI art, NOT pixel art. Theme: moonlit blue-violet sect, gold and jade trim.

## Global prompt (prepend to every sheet)
Flat solid #00FF00 background, perfectly aligned grid, equal cells, thin empty gutter between cells, nothing crossing cell borders, no text, no letters, no numbers, no watermark, no baked UI labels. Every element sharp, centred in its cell, consistent lighting from top-left, consistent style across the whole sheet. Cells are filled left to right, top to bottom in the exact order of the table.

## Rarity tiers (each tier must be visibly different in material, ornament and glow)
- N: Phàm: plain dull bronze/iron, no glow, no ornament, thin border.
- R: Linh: jade green-blue, simple clean lines, faint soft glow.
- SR: Huyền: violet and silver, small cloud/lotus ornaments, medium glow.
- SSR: Thiên: polished gold, engraved dragon/phoenix scrollwork, strong warm glow, corner jewels.
- UR: Tiên: celestial multi-hue (gold, white, aurora cyan-magenta), wings/halo ornaments, floating light particles, intense radiance. Must look clearly grander than SSR, not just brighter.

## After generation
Ask GPT to crop each cell and export as PNG with the ID as filename, e.g. `UI.FRAME.ITEM.SSR.png`, green removed to transparent. Put files in `assets/ui/<SHEET.ID>/`. Review SSR vs UR side by side before accepting.

## SHEET.RARITY_FRAMES
Canvas 4096x2560, 5 columns × 3 rows.

Frames only, centre empty/transparent-looking flat fill. Columns are rarities N,R,SR,SSR,UR, in that order. Rows: item slot frame (square), card frame (portrait 2:3), name plate (wide banner).

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | UI.FRAME.ITEM.N |
| 2 | 1 | 2 | UI.FRAME.ITEM.R |
| 3 | 1 | 3 | UI.FRAME.ITEM.SR |
| 4 | 1 | 4 | UI.FRAME.ITEM.SSR |
| 5 | 1 | 5 | UI.FRAME.ITEM.UR |
| 6 | 2 | 1 | UI.FRAME.CARD.N |
| 7 | 2 | 2 | UI.FRAME.CARD.R |
| 8 | 2 | 3 | UI.FRAME.CARD.SR |
| 9 | 2 | 4 | UI.FRAME.CARD.SSR |
| 10 | 2 | 5 | UI.FRAME.CARD.UR |
| 11 | 3 | 1 | UI.PLATE.N |
| 12 | 3 | 2 | UI.PLATE.R |
| 13 | 3 | 3 | UI.PLATE.SR |
| 14 | 3 | 4 | UI.PLATE.SSR |
| 15 | 3 | 5 | UI.PLATE.UR |

## SHEET.FX_RARITY
Canvas 4096x1638, 5 columns × 2 rows.

Columns are rarities N,R,SR,SSR,UR. Row 1: summon glow burst (radial). Row 2: card shine sweep overlay. Glow colour and intensity follow the rarity table; N is nearly none.

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | FX.GLOW.N |
| 2 | 1 | 2 | FX.GLOW.R |
| 3 | 1 | 3 | FX.GLOW.SR |
| 4 | 1 | 4 | FX.GLOW.SSR |
| 5 | 1 | 5 | FX.GLOW.UR |
| 6 | 2 | 1 | FX.SHINE.N |
| 7 | 2 | 2 | FX.SHINE.R |
| 8 | 2 | 3 | FX.SHINE.SR |
| 9 | 2 | 4 | FX.SHINE.SSR |
| 10 | 2 | 5 | FX.SHINE.UR |

## SHEET.BUTTONS
Canvas 4096x2048, 4 columns × 4 rows.

No text on buttons. Columns are states: normal, hover, pressed, disabled. Rows: primary (gold), secondary (jade), danger (crimson), tab.

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | UI.BTN.PRIMARY.NORMAL |
| 2 | 1 | 2 | UI.BTN.PRIMARY.HOVER |
| 3 | 1 | 3 | UI.BTN.PRIMARY.PRESSED |
| 4 | 1 | 4 | UI.BTN.PRIMARY.DISABLED |
| 5 | 2 | 1 | UI.BTN.SECONDARY.NORMAL |
| 6 | 2 | 2 | UI.BTN.SECONDARY.HOVER |
| 7 | 2 | 3 | UI.BTN.SECONDARY.PRESSED |
| 8 | 2 | 4 | UI.BTN.SECONDARY.DISABLED |
| 9 | 3 | 1 | UI.BTN.DANGER.NORMAL |
| 10 | 3 | 2 | UI.BTN.DANGER.HOVER |
| 11 | 3 | 3 | UI.BTN.DANGER.PRESSED |
| 12 | 3 | 4 | UI.BTN.DANGER.DISABLED |
| 13 | 4 | 1 | UI.BTN.TAB.NORMAL |
| 14 | 4 | 2 | UI.BTN.TAB.HOVER |
| 15 | 4 | 3 | UI.BTN.TAB.PRESSED |
| 16 | 4 | 4 | UI.BTN.TAB.DISABLED |

## SHEET.PANELS
Canvas 4096x3072, 4 columns × 3 rows.

Empty containers, no text, nothing inside. Left to right, top to bottom as listed.

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | UI.PANEL.MAIN |
| 2 | 1 | 2 | UI.PANEL.SMALL |
| 3 | 1 | 3 | UI.PANEL.POPUP |
| 4 | 1 | 4 | UI.PANEL.HEADER_BAR |
| 5 | 2 | 1 | UI.DIVIDER.H |
| 6 | 2 | 2 | UI.TAB_BAR |
| 7 | 2 | 3 | UI.BAR.FRAME |
| 8 | 2 | 4 | UI.BAR.FILL.HP |
| 9 | 3 | 1 | UI.BAR.FILL.EXP |
| 10 | 3 | 2 | UI.BAR.FILL.ENERGY |
| 11 | 3 | 3 | UI.BADGE.NOTIFY |
| 12 | 3 | 4 | UI.PILL.CURRENCY |

## SHEET.ICON_RESOURCE
Canvas 2048x1024, 4 columns × 2 rows.

Currency and material icons, one object per cell, centred, no text.

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | ICON.RES.LINH_THACH |
| 2 | 1 | 2 | ICON.RES.TIEN_NGOC |
| 3 | 1 | 3 | ICON.RES.XU |
| 4 | 1 | 4 | ICON.RES.THE_TRIEU_HOI |
| 5 | 2 | 1 | ICON.RES.DAN_TANG_CAP |
| 6 | 2 | 2 | ICON.RES.MANH_TIEN_NO |
| 7 | 2 | 3 | ICON.RES.NANG_LUONG |
| 8 | 2 | 4 | ICON.RES.KINH_NGHIEM |

## SHEET.ICON_ELEMENT
Canvas 2048x1024, 4 columns × 2 rows.

Element emblems, same style and size, distinct silhouettes.

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | ICON.ELEM.MOC |
| 2 | 1 | 2 | ICON.ELEM.THUY |
| 3 | 1 | 3 | ICON.ELEM.HOA |
| 4 | 1 | 4 | ICON.ELEM.THO |
| 5 | 2 | 1 | ICON.ELEM.LOI |
| 6 | 2 | 2 | ICON.ELEM.BANG |
| 7 | 2 | 3 | ICON.ELEM.HUYEN |
| 8 | 2 | 4 | ICON.ELEM.AM |

## SHEET.ICON_FUNCTION
Canvas 2560x2048, 5 columns × 4 rows.

Lobby menu icons, one per cell. The last cell is left empty.

| Cell | Row | Col | ID |
|---|---|---|---|
| 1 | 1 | 1 | ICON.FN.CULTIVATION |
| 2 | 1 | 2 | ICON.FN.BREAKTHROUGH |
| 3 | 1 | 3 | ICON.FN.TIEN_NO |
| 4 | 1 | 4 | ICON.FN.EQUIPMENT |
| 5 | 1 | 5 | ICON.FN.GACHA |
| 6 | 2 | 1 | ICON.FN.TRIAL |
| 7 | 2 | 2 | ICON.FN.SECRET_REALM |
| 8 | 2 | 3 | ICON.FN.TEAM |
| 9 | 2 | 4 | ICON.FN.INVENTORY |
| 10 | 2 | 5 | ICON.FN.SHOP |
| 11 | 3 | 1 | ICON.FN.GUILD |
| 12 | 3 | 2 | ICON.FN.RANKING |
| 13 | 3 | 3 | ICON.FN.MAIL |
| 14 | 3 | 4 | ICON.FN.JOURNAL |
| 15 | 3 | 5 | ICON.FN.QUESTS |
| 16 | 4 | 1 | ICON.FN.EVENTS |
| 17 | 4 | 2 | ICON.FN.BENEFITS |
| 18 | 4 | 3 | ICON.FN.DAILY_LOGIN |
| 19 | 4 | 4 | ICON.FN.SETTINGS |
