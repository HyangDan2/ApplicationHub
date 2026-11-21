# Local QA evidence

Date: 2026-10-20 (Asia/Seoul)

Scope: local implementation, no deployment. No Git commit exists because this folder is not a Git repository. Public-content digest: `c4f02d7652a59934486573bdc63501cb561bf55e60bc426501fb8ac71dcf81ca`. This digest identifies catalog/body content, not a complete source-code revision.

Environment: macOS, Node 24.19.0 from the desktop bundled runtime, Chromium 156.0.8078.4 via Playwright 1.64.1.

## Results

- `npm run verify`: passed after fixes; 7 catalog records validated, 6 unit tests passed, 6 published pages built, 8 browser tests passed.
- `npm run check:links`: completed with 0 destinations. Samples contain no external source links; no live external material was verified.
- Local preview returns the actual generated pages beneath `/EduHub/` on port 4174.
- Browser checks cover search/filter combinations, direct detail access and reload, return-state restoration, Back navigation, empty/error/retry states, keyboard activation, draft exclusion, asset requests, unsafe metadata, long text, and widths 360/390/768/1440.
- Unit checks cover Korean body search, Latin case handling, ordering, invalid dates, duplicate IDs, unsafe URLs, missing paths, escaping symlinks, and inert Markdown/code examples.
- Initial verification caught a decorative orbit overflowing at 768px; the intermediate layout was corrected. A test incorrectly used the textbox role for a search input; its selector now uses searchbox. The full suite passed afterward.
- Desktop, mobile index, and mobile detail screenshots were visually inspected. Code blocks scroll within the content area.

Historical sample screenshots were removed with sample content before publication.

## Limits

No physical iOS/Android device checks, Safari/Firefox acceptance, hosted verification, or public deployment occurred. No actual owner learning record was supplied. Six labeled agent-authored samples are for local acceptance only. The external-only detail branch and actual external destination interactions have not been exercised with real owner sources. The preview has no auto-reload; rebuild and refresh after edits.

## Navigation integration — 2026-10-20

Supersedes earlier catalog counts: 8 records validate, 7 publish (one real course and six samples). EduHub verify passed: 6 unit tests and 9 browser tests, including the local nested-course round trip and separate intro launch. The retained preview on port 4174 was restarted and a 390px round trip also passed.

EDPilot0001 build and npm test passed (math/SVM, NumPy references, static links, basic notebooks, advanced cases/figures). Its browser suite passed 51 page/viewports (17 pages × 1440/390/320), five labs, theme persistence, no-JavaScript reading, and download hashes. Numerical source code was unchanged; regenerated SVG decimal differences reflect the local Node runtime. Advanced notebook regeneration was not required or run.

The course's direct Web-HQ return is replaced by EduHub in source and generated local pages. Web-HQ navigation is asserted on Hub index/detail headers. No publication or hosted round-trip acceptance occurred. The live course still has its previous navigation until deployed.

## Release cleanup — 2026-10-20

Removed all six samples, the draft, their Markdown and onboarding notes, and obsolete sample screenshots. Exactly one course remains: edpilot0001. Browser tests now exercise the actual single-course catalog; contract tests use intercepted responses instead of requiring a sibling checkout in CI. Real public round-trip acceptance is performed after both deployments.

Release verification before initial push: catalog validation passed with one course, all 6 unit and 9 Chromium browser tests passed, and both external destinations returned successful responses. Production build used PUBLIC_URL=https://hyangdan2.github.io/EduHub/. EDPilot0001's previously validated integration is committed as 5d1a144; hosted acceptance remains pending until Actions completes.

## Hosted acceptance — 2026-10-20

- EduHub initial release: a02d25de6381b24416f35ac1fa08f47080d6ef2c, [Actions run](https://github.com/HyangDan2/EduHub/actions/runs/39442637640), build and deploy successful.
- EDPilot0001: 5d1a144ea9251f5a8aea891663fcd248cac1672f, [Actions run](https://github.com/HyangDan2/EDPilot0001/actions/runs/39442550768), build and deploy successful.
- `PUBLIC_URL=https://hyangdan2.github.io/EduHub/ npm run verify:hosted` passed against the public release digest. Confirmed intro-page reload, launch to course, direct nested chapter, and return to the Hub card.
- Exactly one published record and one generated detail page remain. Production artifacts contain no localhost/loopback links. Earlier local-only and sample results above are historical.
- Physical devices remain untested.

## ApplicationHub revamp — 2026-11-10

Scope: local verification of the rebuilt catalog. No deployment. The repository rename to `ApplicationHub` was requested and refused by the connected GitHub App (`gh repo rename` → HTTP 403), so the site still serves from `/EduHub/`.

Environment: Node 24.19.0 (`.nvmrc`), Playwright 1.64.1 with Chromium 156.0.8078.4, Linux.

- `npm run validate`: `Validated 4 apps (4 published).`
- `npm test`: 8 unit checks passed — catalog order, Korean/Latin search with AND terms, category/query round-trip, draft/maintenance exclusion, duplicate ID and duplicate launch URL rejection, unsafe URL rejection, bad thumbnail/evidence path and invalid date rejection, symlink escape rejection.
- `npm run build`: `Built 4 published apps in dist/ (base /ApplicationHub/).`
- `npm run test:e2e`: 13 Chromium checks passed — exact launch destinations, layouts at 360/390/768/1440 with no horizontal overflow and all thumbnails at natural width 960, search/category/reset/history state, catalog failure retry, broken-thumbnail placeholder, draft and hostile metadata handling, brand header plus cross-hub and icon links, keyboard focus and Enter activation, long titles at 140% text, reduced motion.
- `npm run check:links`: 11 external destinations (four app launches, four repositories, Web-HQ, GameHub, TechnicalHub) returned HTTP 200.
- Visual review: full-page desktop (1440) and mobile (390) captures in [evidence](evidence/) were inspected after the palette, card, and hero-art changes.

### Fixes found during this run

- A leftover reference to the removed `#status` element made the catalog render its error state; the reference was deleted.
- A rotated decorative orbit overflowed the viewport by 4 px at 768 px; the second orbit was narrowed and the hero clips horizontal overflow.
- The browser test attempted to click a correctly disabled reset button after Back navigation; the assertion now checks the disabled state, then filters and resets.

### Not verified

- Base-path handling was checked in three build modes: no `PUBLIC_URL` (`/ApplicationHub/`), `GITHUB_REPOSITORY=HyangDan2/EduHub` with `PUBLIC_URL=https://hyangdan2.github.io/EduHub/` (`/EduHub/`, no warning), and `GITHUB_REPOSITORY=HyangDan2/ApplicationHub` with the stale `/EduHub/` value (corrected to `/ApplicationHub/` with a warning).
- No hosted acceptance (`verify:hosted`), no physical iOS/Android device test, and no Safari/Firefox run.
- The app screenshots show each app's own cover/library view; individual app features and their data handling were not re-tested here (see each `docs/onboarding/<id>.md`).

## Full-card links and Midpoint registration — 2026-11-13

Scope: local verification before publication. No deployment at the time of this run.

Environment: Node 24.19.0 (`.nvmrc`), Playwright 1.64.1 with Chromium (headless), Linux.

- `npm run validate`: `Validated 5 apps (5 published).`
- `npm test`: 8 unit checks passed, including the new `midpoint` record (schema, asset, evidence, date, unique ID and launch URL).
- `npm run build`: `Built 5 published apps in dist/ (base /ApplicationHub/)`, built with `PUBLIC_URL=https://hyangdan2.github.io/ApplicationHub/`.
- `npm run test:e2e`: 14 Chromium checks passed — including the new full-card link check (every published card is one `a.app-card[href]`, no `.action-link` and no nested interactive element remains, and clicking the card title navigates to the launch URL) and the existing layouts at 360/390/768/1440, search/category/history state, failure retry, broken thumbnail, draft and hostile metadata, brand and cross-hub links, keyboard focus, long titles, and reduced motion.
- `npm run check:links`: 13 external destinations returned HTTP 200 (five app launches, five repository or source links, Web-HQ, GameHub, TechnicalHub). A 200 does not establish content accuracy.
- Live check of the new destination: https://hyangdan2.github.io/PKPilot0002/ returned HTTP 200, page title `HD2Lab | Midpoint (PKPilot0002)`; Chromium at 1440×810 loaded it with no page or console errors, and the transit presets 강남역 + 홍대입구역 produced a midpoint near 이촌역 with two equal 5.63 km distances and a 100% fairness score. The card thumbnail is a 960×540 resize of that capture.
- Visual review: desktop 1440 and mobile 390 captures plus a hovered-card capture were inspected. No horizontal overflow at any tested width, the Midpoint card renders in the third slot, and the `.card-open` hint turns orange with the border on hover and focus.

### Not verified

- Hosted acceptance (`verify:hosted`) for this release is recorded in the next section after deployment.
- No physical iOS/Android device test and no Safari/Firefox run.
- Midpoint's drive mode, alternative midpoint modes, share-link round trips, routing deep links, and live Overpass restaurant/cafe lookups were not exercised for this card (see `docs/onboarding/midpoint.md`).

## Hosted acceptance — 2026-11-13

- Release: squash merge of PR #3, commit `393bd6d66cc1fa2d158fba77b6831cf9e1b27b94`, [Actions run 43256426329](https://github.com/HyangDan2/ApplicationHub/actions/runs/43256426329) — build and deploy jobs both succeeded.
- `PUBLIC_URL=https://hyangdan2.github.io/ApplicationHub/ npm run verify:hosted` → `Hosted release verified: 5 apps, launch links and icons intact.` The built release digest matched the public `release.json`.
- https://hyangdan2.github.io/ApplicationHub/ returned HTTP 200 and rendered 5 cards in Chromium 1440×1100 and 390×900 with no page or console errors and no horizontal overflow.
- Card structure on the live page: 5 × `a.app-card`, 0 × `.action-link`, no nested link or button inside a card. Hrefs: AGPilot0002, PKPilot0001, PKPilot0002, AGPilot0007, EDPilot0001. Accessible names: `Open Todo Master`, `Open Photos`, `Open Midpoint`, `Open Film Studio`, `Open Machine Learning Lab`.
- Click-through on the live site: desktop click on the Photos card body → https://hyangdan2.github.io/PKPilot0001/; mobile tap on the Midpoint card → https://hyangdan2.github.io/PKPilot0002/. Both in the same tab.
- Captures: `browser/apphub-live-desktop-2026-11-13.png`, `browser/apphub-live-hover-midpoint-2026-11-13.png`, `browser/apphub-live-mobile-midpoint-2026-11-13.png` (workspace evidence, not part of this repository).

Not verified: physical iOS/Android devices, Safari and Firefox. The Midpoint destination itself was checked only as far as its first screen (see `docs/onboarding/midpoint.md`).

## Shutterplate registration — 2026-11-14

Scope: local verification before publication.

Environment: Node 24.19.0 (`.nvmrc`), Playwright 1.64.1 with headless Chromium, Linux.

- `npm run validate`: `Validated 6 apps (6 published).`
- `npm test`: 8 unit checks passed, including the new `shutterplate` record (schema, asset, evidence file, date, unique ID and launch URL).
- `npm run build`: `Built 6 published apps in dist/ (base /ApplicationHub/)`.
- `npm run test:e2e`: 14 Chromium checks passed. The search and category assertions no longer hardcode card counts; they derive the expected matches from `js/catalog.js`, so a new Photo app no longer breaks them (a `photo` search now returns three cards).
- `npm run check:links`: 15 external destinations returned HTTP 200 (six app launches, six repository or source links, Web-HQ, GameHub, TechnicalHub). A 200 does not establish content accuracy.
- Live check of the new destination: https://hyangdan2.github.io/PKPilot0003/ returned HTTP 200, page title `Shutterplate — HD2Lab Photo Frame Studio`, and loaded in Chromium at 1600×900 with no page or console errors. Frame switching, inline EXIF editing, emblem selection and a JPEG export were exercised on the live site; the details and the untested parts are in `docs/onboarding/shutterplate.md`. The card thumbnail is a 960×540 resize of that 1600×900 capture, taken with the bundled Sony sample loaded.
- Visual review: desktop 1440 full page and mobile 390 captures were inspected. The Shutterplate card renders in the fifth slot, between Film Studio and Machine Learning Lab; its thumbnail loads at a natural size of 960×540, the whole card is one link to `https://hyangdan2.github.io/PKPilot0003/`, and there is no horizontal overflow at 390 px.

### Not verified

- Hosted acceptance for this release is recorded in the next section after deployment.
- No physical iOS/Android device test and no Safari/Firefox run.

## Hosted acceptance — 2026-11-14

- Release: squash merge of PR #6, commit `06e1ae47acc3b0076852f545af330a2d89e1fd07`, [Actions run 43542512967](https://github.com/HyangDan2/ApplicationHub/actions/runs/43542512967) — build and deploy jobs both succeeded.
- `PUBLIC_URL=https://hyangdan2.github.io/ApplicationHub/ npm run verify:hosted` → `Hosted release verified: 6 apps, launch links and icons intact.`
- https://hyangdan2.github.io/ApplicationHub/ returned HTTP 200 and rendered 6 cards in Chromium 1440×1000 and 390×844 with no page or console errors and no horizontal overflow.
- Shutterplate card on the live page: `a.app-card` with href `https://hyangdan2.github.io/PKPilot0003/` and accessible name `Open Shutterplate`, kicker `PHOTO 05`, tags EXIF · 8 Frames · Local Processing · Runs in browser. The thumbnail `assets/apps/shutterplate.jpg` answered HTTP 200 as `image/jpeg`, 88,718 bytes, natural size 960×540.
- Click-through on the live site: a desktop click on the card title and a mobile tap both opened `https://hyangdan2.github.io/PKPilot0003/` in the same tab, and the destination loaded with the title `Shutterplate — HD2Lab Photo Frame Studio`.
- Captures: `browser/apphub-shutterplate-2026-11-14/` (workspace evidence, not part of this repository).

Not verified: physical iOS/Android devices, Safari and Firefox.

## Thumbnail refresh — 2026-11-15

Scope: local verification before publication. Replaces the three app card thumbnails and the share card so every visible HD2Lab mark is the dual-skew `.mark` header set on 2026-11-15 (PR #9), not the retired rounded-box SVG badge.

Environment: Node 24.19.0 (`.nvmrc`), Playwright 1.64.1 with headless Chromium, Linux.

- Captures: `assets/apps/shutterplate.jpg`, `film-studio.jpg`, and `midpoint.jpg` were taken from the live pages (https://hyangdan2.github.io/PKPilot0003/, /AGPilot0007/, /PKPilot0002/) in a 1280×720 Chromium viewport at device scale 2 and downsampled to 960×540. Shutterplate was captured after loading the bundled Sony sample; Midpoint after adding 강남역 and 홍대입구역 from the preset chips (5.63 km + 5.63 km, 100% fairness).
- `assets/branding/share.png` was rebuilt at 1200×630 with the 100px dual-skew mark header and the new Film Studio capture in its third showcase tile; the previous tile still showed the retired rounded-box hero icon.
- `npm run validate`: `Validated 6 apps (6 published).`
- `npm test`: 8 unit checks passed.
- `npm run build`: `Built 6 published apps in dist/ (base /ApplicationHub/).` The built head carries `assets/branding/share.png?v=20261115-thumbs`.
- `npm run test:e2e`: 14 Chromium checks passed, including the thumbnail natural-size check at 360/390/768/1440.
- Visual review: a card mock of the built `dist/` at 1366 px was inspected — the three refreshed thumbnails render at natural size 960×540 with their `Live UI` caption, the dual-skew header is legible at card width, and the grid has no layout shift.

### Not verified

- No physical iOS/Android device test and no Safari/Firefox run. Social preview caches (KakaoTalk and others) may still serve the previous `share.png` until the URL is re-scraped.

## Hosted acceptance — 2026-11-15 (thumbnail refresh)

- Release: squash merge of PR #10, commit `1afb9ab537474dbb88c4c300672fcf0d2c94cda5`, [Actions run 43696750910](https://github.com/HyangDan2/ApplicationHub/actions/runs/43696750910) — build and deploy jobs both succeeded.
- `PUBLIC_URL=https://hyangdan2.github.io/ApplicationHub/ npm run verify:hosted` → `Hosted release verified: 6 apps, launch links and icons intact.`
- https://hyangdan2.github.io/ApplicationHub/ returned HTTP 200. The served `index.html` differs from the local `dist/index.html` only by the `PUBLIC_URL` canonical and `og:url` tags, and its head carries `assets/branding/share.png?v=20261115-thumbs`.
- Asset hashes on the live site match the committed files byte for byte: `assets/apps/shutterplate.jpg` (78,388 B), `assets/apps/film-studio.jpg` (52,321 B), `assets/apps/midpoint.jpg` (145,099 B), `assets/branding/share.png` (185,799 B).
- Live render in Chromium 1440×1100 and 390×900: 6 cards, all thumbnails at natural size 960×540, no console errors, no horizontal overflow (scrollWidth = clientWidth at both widths). The refreshed Midpoint, Film Studio, and Shutterplate cards carry the dual-skew `HD2Lab | <App>` header; the untouched Todo Master and Photos thumbnails already used the same header.
- Captures: `browser/apphub-live-2026-11-15-desktop.png`, `browser/apphub-live-2026-11-15-mobile.png` (workspace evidence, not part of this repository).

Not verified: physical iOS/Android devices, Safari and Firefox. Social preview caches (KakaoTalk and others) keep serving the previous `share.png` until the URL is re-scraped.

## Thumbnail refresh — 2026-11-16 (Soft Iris capture of all seven cards)

Scope: local verification before publication. Every app card thumbnail in `assets/apps/` was re-captured from the live site after the Soft Iris (white & violet) rollout, so no card still shows a pre-Soft Iris dark/orange screen. Catalog content, evidence paths and launch URLs are unchanged; `thumbnailAlt` was updated where the captured screen changed.

Environment: Linux, Node 24.19.0 (`.nvmrc`), Playwright 1.64.1 with headless Chromium.

- Captures: each live page was loaded in a 1280×720 Chromium viewport at device scale 2 (2560×1440 pixels) and downsampled to a 960×540 JPEG (quality 88, 4:4:4).
  - `todo-master.jpg` (70,708 B) — https://hyangdan2.github.io/AGPilot0002/, Soft Iris light theme, All Tasks board with the 33% progress summary and the date-schedule panel.
  - `photos.jpg` (84,775 B) — https://hyangdan2.github.io/PKPilot0001/, `모든 사진` tab so the grid fills the frame.
  - `midpoint.jpg` (181,207 B) — https://hyangdan2.github.io/PKPilot0002/, `강남` + `홍대입구` presets added (5.63 km · 5.63 km, 100% fairness, 이촌역); the sidebar was scrolled to the transport-mode toggle so the fairness card sits in frame.
  - `film-studio.jpg` (152,665 B) — https://hyangdan2.github.io/AGPilot0007/, `?theme=light` is not honoured by the app, so the header's `Switch to light theme` control was used and the bundled Portrait sample opened; the VÆRN signature and its adjustment groups are visible.
  - `shutterplate.jpg` (94,048 B) — https://hyangdan2.github.io/PKPilot0003/, bundled Sony sample loaded, Clean Horizon frame, stage switched to its light background.
  - `dos-player.jpg` (119,332 B) — https://hyangdan2.github.io/PKPilot0006/, shareware DOOM booted to its title screen, page scrolled to the player panel.
  - `machine-learning-lab.jpg` (57,828 B) — https://hyangdan2.github.io/EDPilot0001/. This app was not part of the Soft Iris rollout and keeps its Learning Archive palette; the capture is a fresh 2× supersampled frame of the same cover view.
- Every one of the seven live URLs returned HTTP 200 before its capture.
- `npm run validate`: `Validated 7 apps (7 published).`
- `npm test`: 8 unit checks passed.
- `npm run build`: `Built 7 published apps in dist/ (base /ApplicationHub/).`
- `npm run test:e2e`: 14 Chromium checks passed, including the thumbnail natural-size check at 360/390/768/1440.
- Visual review: the built `dist/` was rendered in Chromium at 1366×900 and 390×844 — 7 cards, every `assets/apps/*.jpg` at natural size 960×540 with its `Live UI` caption, no console errors, no horizontal overflow.

### Not verified

- No physical iOS/Android device test and no Safari/Firefox run. The hosted release is verified after the Pages workflow completes.

## Hosted acceptance — 2026-11-16 (Soft Iris thumbnail refresh)

- Release: squash merge of PR #14, commit `5d3b0a55f8da94d7798d6a02f01200ae8fd839b2`, [Actions run 43892764736](https://github.com/HyangDan2/ApplicationHub/actions/runs/43892764736) — build and deploy jobs both succeeded.
- `PUBLIC_URL=https://hyangdan2.github.io/ApplicationHub/ npm run verify:hosted` → `Hosted release verified: 7 apps, launch links and icons intact.`
- https://hyangdan2.github.io/ApplicationHub/ returned HTTP 200. All seven thumbnails were fetched from the live site and match the committed files byte for byte (sha256):
  - `assets/apps/todo-master.jpg` 70,708 B — `ca9313e4b9866f5e`
  - `assets/apps/photos.jpg` 84,775 B — `6a27f9e5e1222b9d`
  - `assets/apps/midpoint.jpg` 181,207 B — `0ff87bb0ed73ebe6`
  - `assets/apps/film-studio.jpg` 152,665 B — `a4d523e4654df233`
  - `assets/apps/shutterplate.jpg` 94,048 B — `438ed4de0b50df29`
  - `assets/apps/dos-player.jpg` 119,332 B — `5b76698efb38d2ea`
  - `assets/apps/machine-learning-lab.jpg` 57,828 B — `04970738883e5fa8`
- Live render in Chromium at 1440×1000 and 390×844: 7 cards, every thumbnail at natural size 960×540 with its `Live UI` caption, no console errors or page errors, and no horizontal overflow (scrollWidth = clientWidth at both widths).

Not verified: physical iOS/Android devices, Safari and Firefox.

## Hosted acceptance — 2026-11-21 (four apps retired, 15 → 11)

- Release: squash merge of PR #35, commit `4cfb77dc5590cc198600358d5a99d1ea6a3edd03`, [Actions run 44907949997](https://github.com/HyangDan2/ApplicationHub/actions/runs/44907949997) — build and deploy jobs both succeeded.
- CI in that run: `Validated 11 apps (11 published).`, 8 unit checks, 19 Chromium checks (the drawer test drives 390×844 and reads all 11 Apps rows in catalog order), `Built 11 published apps in dist/ (base /ApplicationHub/).`, `check:links` clean.
- Live https://hyangdan2.github.io/ApplicationHub/ returned HTTP 200; `/data/apps.json` serves exactly 11 published ids (`midpoint`, `film-studio`, `shutterplate`, `dos-player`, `markdown-viewer`, `machine-learning-lab`, `vektra-var`, `visna-sol`, `nordlys`, `saga-glitra`, `mynda-ljosa`) and `/release.json` reads `{"count":11}`.
- Page in a real Chromium session: 11 `.app-card` links numbered 01–11, count badge `11`, hero mock `11 APPS`, `Apps` dropdown 11 rows, every thumbnail loaded at 960×540, no console error or unhandled rejection while loading and while filtering (Photo → 05, Reset → 11), no HTTP 4xx/5xx resource, and no mention of `AGPilot0002`, `PKPilot0001`, `PKPilot0016` or `PKPilot0017` anywhere in the document.
- The four retired thumbnails and `docs/onboarding/` notes remain in the repo, unreferenced on purpose.

Not verified here: physical iOS/Android devices, Safari and Firefox. The 1440×1100 / 390×900 card geometry checks from earlier entries still apply (no CSS changed).
