# ApplicationHub agent entry point

Repository: `HyangDan2/ApplicationHub` (renamed from `EduHub` on 2026-11-10). Public URL: https://hyangdan2.github.io/ApplicationHub/. Publishing branch: main. Pages source: GitHub Actions.

Read this file, then [docs/OPERATIONS.md](docs/OPERATIONS.md) before deployment and [README.md](README.md) for the catalog workflow. The learning-archive guides in `docs/legacy/` describe the retired EduHub product; they are history, not the current contract.

## Fixed contract

- Static HTML/CSS/JavaScript. `data/apps.json` is the only app list; do not hardcode cards.
- `schema/apps.schema.json` validates the catalog; `scripts/validate-catalog.mjs` also checks asset and evidence files, safe HTTPS destinations, unique IDs, and unique launch URLs.
- Only `published` apps enter `dist/`, the search data, and `release.json`. `draft` and `maintenance` entries stay out of every public artifact.
- Every app card links to the app's own live URL in the same tab. The hub does not host the apps.
- Documentation stays in English; the interface stays Korean.
- Preserve the apps' own repositories and deployments. Changes to an app are separate work in that app's repository.
- Do not claim deployment, hosted acceptance, or device testing that was not actually performed.

## Card component contract

Cards follow the GameHub spec, and ApplicationHub should stay visually interchangeable with GameHub:

- `.card-image` — 16:9 thumbnail with an `.image-caption` label ("실제 화면" / "공식 소개 이미지")
- `.card-kicker` — category in caps plus the two-digit `.card-index`
- `.card-title`, `.card-subtitle`, `.card-description`
- `.card-meta` — `.meta-pill` tags plus the fixed "브라우저에서 바로" pill
- `.action-link` — "앱 열기 ↗" with `aria-label="<title> 열기"`

## Brand

- Ground `#101110`, panels `#1b1d1a`, signature orange `--accent: #ff824f`.
- Header: `.mark` (HD2Lab dual-skew mark), `HD2Lab` wordmark, `<em>ApplicationHub</em>`, then links to GameHub, TechnicalHub, and Web-HQ.
- Icons: `assets/branding/favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `favicon.ico`, plus a 1200×630 `share.png`.

## Commands

Node 24.19.0, `npm ci`.

- `npm run dev` — build once, then preview at `http://127.0.0.1:4174/ApplicationHub/`.
- `npm run validate` — schema, assets, evidence, dates, URLs.
- `npm test` — unit tests for filtering, state, and validation.
- `npm run build` — clean `dist/` with `PUBLIC_URL` canonical links.
- `npm run test:e2e` — Chromium checks against the existing `dist/` on port 4175.
- `npm run verify` — validate, test, build, and browser checks.
- `npm run check:links` — external destination checks.
- `npm run verify:hosted` — hosted release acceptance; requires `PUBLIC_URL` ending in `/ApplicationHub/`.

## Onboard an app

Inspect the app's repository and deployed site, capture a 16:9 screenshot, write the catalog entry and `docs/onboarding/<id>.md`, validate, and follow the authorized publishing workflow. Record exact evidence, and keep unverified behaviour listed as unverified. A repeated request updates the same entry (same `id`) rather than adding a duplicate.
