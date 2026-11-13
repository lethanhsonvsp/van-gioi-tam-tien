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
