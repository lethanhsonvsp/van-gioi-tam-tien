# MEMORY.md — Vạn Giới Tầm Tiên

> Project memory, authoritative decisions as of 2026-11-13. Update only when owner explicitly approves a change.

## Identity
- Game: **Vạn Giới Tầm Tiên** (formerly Tiên Môn Linh Giới 2.0).
- Repo: `lethanhsonvsp/van-gioi-tam-tien`.
- Core: **Idle Gacha RPG tiên hiệp**, NOT a seamless open-world MMORPG.
- Rebuild with modular architecture. The original `TienMonLinhGioi_v1.1_Windows.zip` is a feature reference, not necessarily the target codebase.
- Vietnamese UI first; internationalization-ready.
- Web-first, Firefox/Chrome on Linux; Windows packaging later.

## Non-negotiable art direction
- **Pixel Art ONLY in Thí Luyện and Bí Cảnh.**
- Main menu, Gacha, cultivator roster/profile, equipment, inventory, store, missions, breakthrough, rankings and other management screens: **high-quality semi-realistic 2D xianxia art**. No pixel UI overhaul.
- Thí Luyện: 2D pixel sprites, 6-unit automatic battle.
- Bí Cảnh: instanced HD-2D / 2.5D pixel exploration; manual movement and optional auto-exploration.
- Each cultivator has consistent visual identity across two asset sets: (1) semi-realistic full-body/portrait/card; (2) pixel character with animations for the two gameplay modes.
- Style: semi-realistic 3D-rendered-to-2D feel for nonpixel artwork; NOT watercolor/ink wash.

## Gameplay
- Retain/replicate the feature breadth of v1.1 as reference: gacha/pity, character collection and progression, team setup, skills, equipment/upgrades/dismantling, tower/dungeons, missions, shop, logs, persistence. Verify actual v1.1 source before asserting exact behavior.
- Thí Luyện: six cultivators simultaneously in auto battle.
- Bí Cảnh: instanced exploration with treasure, events, enemies, puzzles and rewards; manual/auto toggle; switching to manual by player input.
- **Each player brings up to six cultivators = up to six lives; only ONE of that player's cultivators is visible/active at a time.** Swap active cultivator as battle circumstances require. Swapped-out characters retain their individual HP/status per agreed rules.
- Party means multiple human players joining the same Bí Cảnh, NOT each player showing six characters at once. A 3-player party has up to 3 simultaneously visible cultivators and 18 total lives. Formula: total lives = players × up to 6. Party player cap not yet decided.
- Real-time multiplayer is a future implementation target. AI party simulation is NOT equivalent to actual multiplayer.
- Respawn/revive, swap cooldown, party reward distribution, and offline auto-exploration are NOT finalized.

## Technology
- Primary language: **TypeScript**. UI language: Vietnamese.
- Proposed: React for management UI, PixiJS for 2D battle, Phaser or Three.js for HD-2D (benchmark before committing), Node.js + TypeScript for online backend, PostgreSQL for player data, JSON schemas for game definitions.
- Use one authoritative character/progression model, shared battle logic, explicit state boundaries, testable modules.
- GitHub Pages is static hosting only; real multiplayer requires a separate backend. Don't imply GitHub Pages hosts WebSocket servers or databases.

## Roles and workflow
- Owner: final decisions and acceptance.
- ChatGPT: game/product direction, art assets, specifications, balance review and QA.
- Claude Code: lead implementation, UI, gameplay integration, build, runtime tests and optimization.
- Git: `main` stable/playable; feature branches for changes; optional `dev` integration branch. Avoid simultaneous edits to the same files.
- Investigate and reproduce bugs before fixes; verify builds and test actual gameplay. No invented test results, links, assets or deployment claims.
- A generated picture/mockup is not automatically a usable animated sprite or integrated game feature.

## Next priorities
1. Inventory and verify all actual features in the v1.1 ZIP.
2. Make the unified web demo genuinely playable, with nonpixel menus and pixel-only Thí Luyện/Bí Cảnh.
3. Build a reliable character data model and dual-art asset pipeline.
4. Implement six-life swap rules in Bí Cảnh and AI-only party prototype clearly labeled as simulation.
5. Add backend multiplayer only after single-player mechanics and state synchronization are stable.

## Locked decisions — 2026-11-13: protagonist, Tiên Nô, lobby
- **Selected lobby concept: Nguyệt Dạ Thanh Vân (concept 2)**, moonlit blue-violet sect courtyard, waterfall, central spirit crystal, ornate xianxia UI. Reference is visual direction, not production-ready UI.
- **The player is the protagonist and cultivates personally**: own realm, spiritual roots, techniques, breakthroughs, equipment and combat progression. Never replace player protagonist with a gacha recruit.
- **All gacha-recruited characters are called Tiên Nô** in Vietnamese UI and game lore. Each Tiên Nô has distinct identity, origin/social status, personality, biography, cultivation attributes and skills. Examples: thánh nữ, ma nữ, kiếm tu, đan sư, yêu tộc, công chúa, tán tu, trưởng lão, tiên tử.
- **Hard character-art rules:** every Tiên Nô has a genuinely distinct face (eyes, nose, lips, jaw, cheekbones and facial proportions). Changing only hairstyle or costume does not count. **No tooth-showing smiles: lips must stay closed.** Preserve face identity across portraits, full-body, poses and pixel sprites. Compare each new design against the roster.
- Keep player and Tiên Nô conceptually distinct in the domain model even where progression systems are shared.
- Open question: Does the protagonist occupy one of the six Bí Cảnh slots/lives or exist in addition to six Tiên Nô? Ask owner before implementation.
