# Statelia — onboarding evidence

## What was added

- `data/apps.json` → one `statelia` entry (WO-BRAND-001 · WO-B05):
  ID `statelia`, category `Engineering & Analytics`, version `v1.0.0`,
  engine `Sigrdrifa Engine v1.0`, launch `https://hyangdan2.github.io/PKPilot0018/`,
  repository `HyangDan2/PKPilot0018`, release state `preview`,
  home page `https://hyangdan2.github.io/`, contact `hyperdimensionaldesignlab@gmail.com`
  (WO-BRAND-001 FIX-02: the one official enquiry address).
- `assets/apps/statelia.jpg` — 960×540 card image cropped (no distortion) from the
  official Statelia splash artwork supplied by the PO.
- `assets/apps/statelia-symbol.png` — the official star-and-wings symbol, cropped
  from the same artwork with its background removed (transparent).
- `schema/apps.schema.json` — additive optional fields `symbol`, `version`,
  `engine`, `releaseState`, `releaseNote`, `homepageUrl`, `contactEmail`, and
  `Engineering & Analytics` added to the category enum. Existing entries validate
  unchanged.
- `js/app.js`, `css/style.css` — the card renders the symbol beside the title,
  the version and engine, an honest release line, and the official home page and
  contact as plain text (the card is one link, so no nested anchor is added).
  No download link is offered because **no release artefact is published yet**
  (WO-B05 forbids showing Stable/Available for an unpublished release).

## What is deliberately absent

- **Portable download** — the `Statelia-v1.0.0-Portable.zip` is built and verified
  on the feature branch but not published; the card says so instead of linking a
  dead file.
- The launch URL still serves the previous build until the branding branch is
  merged and deployed, which is the PO's separate approval (FIX-05 step 1–4).

## Checks

    npm run validate   # schema + assets + evidence paths
    npm test           # catalog behaviour
    npm run build      # dist/ with the new card
