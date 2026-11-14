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
