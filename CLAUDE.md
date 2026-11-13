# CLAUDE.md — Project instructions for Claude Code

Read `MEMORY.md` before making architectural or visual decisions. The owner has final authority. Do not silently override locked design choices.

## Product constraints
- Product: **Vạn Giới Tầm Tiên**, web-first idle gacha cultivation RPG.
- **Only Thí Luyện and Bí Cảnh use pixel art.** All other UI and character cards use polished semi-realistic 2D xianxia art. This is a hard requirement.
- Thí Luyện: six-character auto-battle in 2D pixel.
- Bí Cảnh: instanced HD-2D exploration with Manual/Auto toggle. Each player owns up to 6 playable cultivators (six lives), but only 1 is active and visible at a time; player may switch the active cultivator. For 3 players, 3 visible characters and up to 18 lives total.
- Multiplayer online is NOT already implemented just because AI companions exist. Never present simulation as live co-op.

## Responsibilities
You are the **lead developer**: code architecture, implementation, integration, tests, builds, performance, and documentation.
ChatGPT leads design/art/specification and reviews balance/quality. Owner approves major changes.

## Engineering rules
1. Use **TypeScript** as the main programming language. Keep game logic decoupled from React/renderer/network layers.
2. Use React for management UI if appropriate; PixiJS for pixel battles. Evaluate Phaser vs Three.js with a small HD-2D proof-of-concept before committing to a second engine.
3. One canonical data model for characters, HP, skills, equipment, teams, and progression. Do not create separate incompatible character systems for tower and exploration.
4. Implement explicit mode state machines (menu / battle / exploration / transitions), deterministic battle simulation where practical, and validation for save/load.
5. Prefer data-driven character/skill/item definitions with schema validation. Support Vietnamese text and future i18n.
6. Avoid unnecessary packages and huge binary assets; optimize texture atlases and dispose of unused GPU resources.
7. Verify all claims with code/tests. Before reporting “done”, run build, relevant tests, and smoke-test the affected mode. Report commands, pass/fail, and known gaps.
8. Preserve v1.1 feature breadth as a reference, but inspect actual source before claiming parity. Don't copy old monolithic HTML architecture blindly.
9. GitHub Pages hosts static frontend only. Online multiplayer needs a backend with authoritative room/session state, authentication, and synchronization.
10. Never push directly to `main` for large changes without owner approval; use `feature/<scope>` branches and review diffs.

## Suggested layout (adapt to actual repo)
```
src/
  app/           # React screens, navigation
  core/          # shared rules, entities, progression, saves
  systems/       # gacha, inventory, economy, missions
  battle/        # auto-battle engine, pixel rendering adapter
  exploration/   # Bí Cảnh movement, swapping, events, auto navigation
  network/       # future online protocol
  content/       # schema-validated data
assets/
  portraits/     # semi-realistic 2D only
  characters/    # pixel sprites for Thí Luyện and Bí Cảnh
  maps/          # HD-2D Bí Cảnh
tests/
```

## Definition of done
- Works in Firefox/Chrome on Linux.
- Correct visual style per screen; no accidental global pixelization.
- Manual and Auto exploration switch reliably.
- 6-slot roster swap never renders all six from the same player at once.
- Solo and party life counts are correct, with individual HP preserved.
- Save/reload and navigation work without data loss.
- Tests/build and actual deployment status are reported accurately.

## Unresolved design decisions
Swap cooldown; death/revive; party size limit; reward sharing; offline auto; definitive HD-2D engine; multiplayer hosting. Ask owner before locking any of these.

## Locked visual and character rules (2026-11-13)
- Lobby reference selected: **Nguyệt Dạ Thanh Vân**, moonlit blue-violet sect courtyard, waterfalls, central spirit crystal. Implement as functional responsive UI, not a static screenshot.
- **Player is the protagonist**, cultivates and progresses independently of Gacha.
- All Gacha recruits are **Tiên Nô**, with distinct identities, backgrounds, social roles, personalities and abilities.
- **Every Tiên Nô must have a unique face**. Hair/clothing changes alone do not establish uniqueness. Distinguish facial anatomy and proportions; compare new portraits against existing roster. **No smiles showing teeth, lips closed.** Maintain identity across 2D and pixel versions.
- Ask owner whether the player protagonist counts within the six Bí Cảnh slots/lives before changing party mechanics.

## Confirmed roster implementation — Option A (2026-11-13)
- Bí Cảnh roster per player: **1 mandatory protagonist + up to 5 Tiên Nô**; total **6 slots and at most 6 lives**.
- Reserve one slot for the protagonist. Do not allow a sixth Tiên Nô to replace the protagonist.
- Render **exactly one active character per player** on the exploration map. Swapping does not reset HP/status of inactive characters.
- Three co-op players: up to **18 lives**, exactly **3 visible characters** when all three are present.
- Previous documentation question about protagonist vs six slots is RESOLVED: protagonist is included in the six.

## Launch roster / UI scope update (2026-11-13)
- Initial Gacha roster: **10 female Tiên Nô**. **Male Tiên Nô: Coming Soon**, excluded from current Gacha pools and summon results. Do not interpret this as restricting the player's own protagonist gender.
- Preserve unique face and closed-mouth portrait requirements. Keep nonpixel main UI; pixel art only for Thí Luyện and Bí Cảnh.
- Two new general UI concepts were generated, but the owner has not selected a final revision; do not replace the approved Nguyệt Dạ Thanh Vân lobby without confirmation.

## Mandatory art QA (2026-11-13)
- Read and enforce `docs/ART_QUALITY_RULES.md` (RULE-ART-001 and RULE-CHAR-002) before generating, reviewing or integrating any character or UI assets.
- Previous 10-character collage is NOT approved production art: faces are too similar. Rebuild portraits individually, verify dimensions, unique face anatomy and closed lips. Do not cut production portraits from collages.
