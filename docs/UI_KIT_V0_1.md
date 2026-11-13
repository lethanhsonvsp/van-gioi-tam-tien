# Vạn Giới Tầm Tiên — UI Concept Kit v0.1

This directory contains the source-of-truth manifest and TypeScript UI action IDs for the first UI concept kit. **The 20 PNG images are not yet uploaded to GitHub** because the connected GitHub write actions accept UTF-8 text only.

- Local package: `VanGioiTamTien_UI_Kit_v0_1.zip` (provided in the ChatGPT conversation).
- Extract ZIP at repository root to install `concept/`, `ui/`, `data/`, and `src/` files; review before committing.
- All referenced images are **concept sheets or crops**, not production-ready transparent assets.
- Do not present missing images as deployed, or clickable UI IDs as implemented gameplay.
- Follow `docs/ART_QUALITY_RULES.md` and `CLAUDE.md`.

To add images from the ZIP locally:
```bash
unzip VanGioiTamTien_UI_Kit_v0_1.zip -d /tmp/vgtt-ui-kit
cp -r /tmp/vgtt-ui-kit/concept ./
mkdir -p ui
cp -r /tmp/vgtt-ui-kit/ui/* ui/
git add concept ui
git commit -m "Add UI concept preview PNGs"
git push
```

The image paths in `data/asset_manifest.json` are not valid until the PNG files have been added.
