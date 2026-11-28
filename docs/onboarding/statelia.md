# Statelia — onboarding evidence

## What was added

- `data/apps.json` → one `statelia` entry (WO-BRAND-001 · WO-B05):
  ID `statelia`, category `Engineering & Analytics`, version `v1.0.0`,
  engine `Sigrdrifa Engine v1.0`, launch `https://hyangdan2.github.io/PKPilot0018/`,
  repository `HyangDan2/PKPilot0018`, release state `stable`,
  home page `https://hyangdan2.github.io/`, contact `hyperdimensionaldesignlab@gmail.com`
  (WO-BRAND-001 FIX-02: the one official enquiry address).
- `assets/apps/statelia.jpg` — 960×540 card image cropped (no distortion) from the
  official Statelia splash artwork supplied by the PO.
- `assets/apps/statelia-symbol.png` — the official star-and-wings symbol, cropped
  from the same artwork with its background removed (transparent).
- `schema/apps.schema.json` — additive optional fields `symbol`, `version`,
  `engine`, `releaseState`, `releaseNote`, `releaseUrl`, `downloadUrl`, `homepageUrl`,
  `contactEmail`, and `Engineering & Analytics` added to the category enum. Existing
  entries validate unchanged.
- `js/app.js`, `css/style.css` — the card renders the symbol beside the title,
  the version and engine, the release line, and the official home page and contact as
  plain text (the card is one link, so no nested anchor is added). An entry that
  carries `releaseUrl` or `downloadUrl` gets a `.card-actions` row **beside** the card
  (a `.card-shell` wrapper, no nested link); entries without those two fields are
  appended to the grid exactly as before.

## Release state — v1.0.0 published (2026-11-28)

- Release: https://github.com/HyangDan2/PKPilot0018/releases/tag/v1.0.0
- Portable download:
  https://github.com/HyangDan2/PKPilot0018/releases/download/v1.0.0/Statelia-v1.0.0-Portable.zip
- The card therefore reads `v1.0.0 is published — the portable build downloads from the
  release.` and offers `Release notes` and `Portable download` in the action row. The
  `Preview build` text is gone because the release it was describing now exists.
- The launch URL serves the Statelia build: `main` was merged (PKPilot0018 `905b50b`,
  corrected at `9c267ff`) and Pages deployed before this card was flipped to `stable`.

## What is deliberately absent

- No licence key, account or paywall: the product is a static page and the portable file.
- No per-app detail page: the card links straight to the product and to its release.

## Checks

    npm run validate   # schema + assets + evidence paths
    npm test           # catalog behaviour (10)
    npm run build      # dist/ with the new card
    npm run test:e2e   # Chromium checks (22)
