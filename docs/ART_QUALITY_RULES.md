# ART QUALITY & CHARACTER IDENTITY RULES

Status: **MANDATORY**, owner feedback 2026-11-13. Applies to all game art for Vạn Giới Tầm Tiên.

## RULE-ART-001 — Sharp, detailed production assets
- Character master art: **target 2048×3072 px or higher when supported**; portrait **minimum target 1024×1024**; lobby backgrounds **target 3840×2160**. These are production targets, not claims that an AI image automatically has native detail at these dimensions.
- Preserve sharp, legible facial anatomy, clean eyes, hair strands, fabric weave, jewelry, fingers, hands, and weapon silhouettes.
- Reject: blurred faces, inconsistent eyes, malformed hands/fingers, smeared ornaments, merged body/clothing, obvious artifacts, oversharpening halos, and muddy edges.
- Do not falsely label interpolated/upscaled images as genuine high-detail originals.
- **Concept sheets are for approval only.** Do not use crops from a crowded collage as production character portraits or individual game assets. Create and review each character/background/icon independently at its intended resolution.
- UI artwork must not bake functional buttons or dynamic text into background art. Produce separate backgrounds, icons, buttons, borders, portraits, and FX. Each gets a stable asset ID and path in a manifest.
- Export formats: lossless PNG/WebP where appropriate; transparent RGBA for isolated elements; backgrounds without embedded UI; maintain source masters.
- Pixel art is allowed ONLY in Thí Luyện and Bí Cảnh. Main menus, Gacha, profiles, inventory etc. remain semi-realistic xianxia 2D.

## RULE-CHAR-002 — No lookalike Tiên Nô
- **Every Tiên Nô must have a distinctly different facial identity**, not just a hair color, outfit, ornament or eye-color swap.
- Vary face silhouette and proportions, eye shape/spacing/lids, nose bridge/tip, lips, cheekbones, jaw/chin, brow and overall age appearance as appropriate to the adult character.
- Different facial expressions/personality should reinforce, not substitute for, structural differences.
- **No open-mouth/tooth-showing smiles.** Lips remain closed on every portrait and pose.
- Identity must remain consistent across full-body art, bust, card, expressions, poses, and pixel counterpart.
- **Masked-hair review:** compare cropped faces with hair, outfits and jewelry concealed; if two characters are difficult to distinguish, redesign one before acceptance.
- Before accepting new art, compare against a face-only roster contact sheet of all approved characters; manually review for duplicate faces and record approval status. Automated similarity can flag concerns but does not replace visual inspection.
- Do not claim a generated image passed quality gates without inspecting the actual exported asset.

## Acceptance checklist per character
- [ ] Individual high-resolution source exists; dimensions verified.
- [ ] Facial structure clearly distinct from every approved Tiên Nô.
- [ ] Lips closed, no teeth.
- [ ] Eyes/hands/anatomy/ornaments pass visual review.
- [ ] Portrait and full-body images retain same identity.
- [ ] Alpha/background and edges meet game integration requirements.
- [ ] Stable character ID, art asset IDs, filenames, and manifest mappings assigned.
- [ ] Pixel adaptation (Thí Luyện/Bí Cảnh only) recognizable as same character.

## Known problem
The previous 10-character collage shows repetitive facial structure. **It is a concept draft, NOT approved final character art.** Redesign and individually produce unique faces before adding these to the release roster.

## RULE-UI-003 — UI kit sheets may be cropped (owner decision 2026-11-13)
- Exception to RULE-ART-001 for **UI elements only** (frames, buttons, panels, icons, FX), not characters or portraits: generate by sheet on a fixed grid and crop by cell. Prompts: `docs/UI_PROMPTS.md`, generated from `data/ui_registry.json`.
- Rarity tiers N/R/SR/SSR/UR must differ visibly in material, ornament and glow; UR clearly above SSR.
- **Every game entity and asset has one stable ID** (`DOMAIN.TYPE.NAME[.VARIANT]`, UPPER_SNAKE, dot separated), shared by art, data and backend. IDs are never renamed. `data/ui_registry.json` is the source of truth for UI IDs.
