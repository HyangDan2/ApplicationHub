# Change log

## 2026-11-22 — Social card follows the 11-app catalog

- Re-rendered `assets/branding/share.png` (1200×630) on the unchanged `HD2's Diary` card layout: the chip now reads `11 apps`, and the right-hand summary card carries the current published counts from `data/apps.json` — Productivity 1 (Markdown Viewer), Photo 5 (Film Studio · Shutterplate · Vektra Vár +2), Utility 2 (Midpoint · DOS Player), Learning 3 (ML Lab · Vísna Sól · Sága Glitra).
- `og:image` / `twitter:image` cache buster → `?v=20261122-og` in `scripts/build.mjs`. `og:title`, `og:description`, `og:image:alt`, the favicon set and the page itself are unchanged.

## 2026-11-21 — Four apps retired from the shelf (15 → 11)

- `data/apps.json`: removed `todo-master` (AGPilot0002), `photos` (PKPilot0001), `hljya-hljom` (PKPilot0016) and `slinga` (PKPilot0017) at the owner's request. The catalog now publishes 11 apps: Midpoint, Film Studio, Shutterplate, DOS Player, HD2Markdown Viewer, Machine Learning Lab, Nordlys, Vektra Vár, Vísna Sól, Sága Glitra, Mynda Ljósa.
- The `Apps` dropdown, the mobile `Apps` accordion and the cards all render from the catalog, so they now list the same 11 entries in the same order. The 224px scroll window and the one-group-at-a-time accordion behaviour are unchanged.
- Hero mock: the lead tile and the second tile no longer name the retired apps (`Midpoint / fairest center`, `Plates`), and the counter reads `11 APPS`.
- The meta/OG description no longer offers to-dos and photos as examples; it now names film developing, photo plates, a coding sandbox and machine-learning practice.
- Tests: the unit search assertions and the two Chromium checks that used the retired ids now use Midpoint, Shutterplate and DOS Player (`midpoint`, `shutterplate`, `dos-player`); the app-count, drawer-scroll and accordion assertions stay catalog-driven.
- The four thumbnails (`assets/apps/todo-master.jpg`, `photos.jpg`, `hljya-hljom.jpg`, `slinga.jpg`) and their `docs/onboarding/*.md` notes stay in place, unreferenced, so any of the apps can be registered again without recapturing them.

## 2026-11-21 — Diary-style social card

- Replaced `assets/branding/share.png` (1200×630) with the `HD2's Diary` share-card layout: Soft Iris wash, dual-skew `.mark` + `HD2Lab | ApplicationHub` header, `Pick your / next app.` headline, the page's own description and two chips on the left, and one white summary card on the right listing the four published categories with their app counts (Productivity 2, Photo 4, Utility 2, Learning 2 — 10 published apps).
- `og:image` / `twitter:image` cache buster → `?v=20261121-og` in `scripts/build.mjs`. `og:title`, `og:description`, the favicon set, and the GoatCounter snippet are unchanged.

## 2026-11-18 — Markdown Viewer registered

- Registered Markdown Viewer (PKPilot0008) as the eighth published app: `id: markdown-viewer`, category `Productivity`, tags GFM / Frontmatter / Share Links, launch URL https://hyangdan2.github.io/PKPilot0008/, sort order 37, thumbnail `assets/apps/markdown-viewer.jpg` (960×540 from a 16:9 crop of a live 1919×992 Chromium capture), evidence `docs/onboarding/markdown-viewer.md`.
- The decorative hero browser mock now reads `08 APPS`, matching the eight published cards.
- The four dead `repositoryUrl` values and their `Source:` lines were already repointed on `main` before this branch, so this entry does not touch them.

## 2026-11-18 — Shared hub navigation (desktop tabs + mobile drawer)

- Replaced the old in-header link row (`Browse Apps`, `GameHub ↗`, `TechnicalHub ↗`, `Web-HQ ↗`) with the Web-HQ category tabs: `Home · Apps · Play · Tech · Diary · About` in `.header-nav`, rendered from the `HQ` / `HUBS` / `ABOUT` tables in `scripts/build.mjs`. `Apps` carries `.is-active` and `aria-current="page"`; the separate Web-HQ action link is gone now that `Home` and the drawer cover it.
- Added the mobile menu: a 44×44 `.menu-button` (≡) replaces the tabs at `<= 820px`, and `js/nav.js` unfolds the right `.mobile-drawer` over a blurred `.drawer-backdrop`. The drawer lists `00 / HQ`, `01 / APPS`, `02 / PLAY`, `03 / EXPLORE`, `04 / DIARY`, `05 / ABOUT` with the current hub highlighted (`aria-current="page"`); Escape, the close button, the backdrop, and a link tap all close it, focus returns to the ≡ button, and `body.drawer-open` hides the floating `#theme-toggle`.
- Header markup is now `.site-header > .header-inner.shell` (bar border spans the viewport, content keeps the shell width), matching Web-HQ. Stylesheet cache buster moved to `?v=20261118-hub-nav`.
- Tests: the brand check now asserts the six tabs, their exact destinations, the single `aria-current`, and that `.web-hq-link` / `.hub-link` are gone; a new Chromium check drives the drawer (44×44 button, `aria-expanded`, `body.drawer-open`, six drawer entries ending in `05 / ABOUT → /about/`, hidden theme toggle, Escape restores focus). `npm run verify` passes: 7 apps validated, 8 unit checks, 18 Chromium checks.

## 2026-11-16 — Hero mock counter follows the catalog

- The decorative hero browser mock read `05 APPS`; it now reads `07 APPS`, matching the seven published apps the catalog count badge shows.

## 2026-11-16 — Soft Iris (white & violet) design language

- Re-skinned the hub to the Soft Iris language from `HyangDan2/Server-HQ` (`HD2Lab/hub-common.css`): ground `#FAFAFD`, panels `#FFFFFF`, soft panel `#F4F1FC`, raised panel `#F7F5FD`, line `#E8E4F2`, strong line `#D4CCE8`, text `#1D192B`, muted `#68627A`, dim `#8A839C`, accent `#8B6CE8`, hover `#7655D9`, small-text accent `#6B4CD6`, `color-scheme: light`. Small accent labels (kicker, count, index hints, guide numbers) use `--accent-text` so they stay above 5:1 contrast on the light ground; the accent word, mark, dividers, and buttons stay `#8B6CE8` (white text on violet for primary actions).
- Converted the hero browser mock to the light palette: white window on a `#E3DBFD` hairline, `#F7F5FD` chrome bar, `#C4B5FD` window dots, and a `#F1ECFE` lead tile with a violet border; the orbit rings, crosses, and radial wash became violet at low alpha.
- `.mark` now draws in `#8B6CE8` (dual-skew geometry unchanged), and the favicon set was regenerated from the Soft Iris SVG (`#FAFAFD` round square, `#E8E4F2` hairline, `#8B6CE8` glyph) for `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, and `favicon.ico`.
- Regenerated `assets/branding/share.png` (1200×630) on the same card skeleton — 100px dual-skew mark, `HD2Lab | ApplicationHub` at 62px, `Pick your next app.`, three app tiles, footer — in Soft Iris, and moved the `og:image` / `twitter:image` cache buster to `?v=20261116-soft-iris`. The card counter now reads `07 APPS · NO INSTALL`, matching the seven published apps.
- `theme-color` is `#FAFAFD`; the missing-thumbnail `assets/apps/placeholder.svg` and the fallback text colors were re-inked for the light ground.
- Tests: `npm run validate` (7 apps), 8 unit checks, 14 Chromium checks pass; headless 1440×900 and 390×844 render with 0 console errors and 0 horizontal overflow.

## 2026-11-15 — Catalog thumbnails and share card refreshed to the dual-skew header

- Re-captured the three out-of-date app card thumbnails from their live pages, so every card image now carries the unified `[.mark] HD2Lab | <App>` header instead of the retired rounded-box SVG badge: `assets/apps/shutterplate.jpg` (editor with the bundled Sony sample, 8-frame strip, EXIF inspector), `assets/apps/film-studio.jpg` (landing with the dual-skew hero mark and the nine film signatures), `assets/apps/midpoint.jpg` (Gangnam + Hongdae transit midpoint, 100% fairness). Each is a 16:9 1280×720 Chromium capture at device scale 2, downsampled to 960×540.
- Regenerated `assets/branding/share.png`: same 1200×630 HD2Lab layout and 100px dual-skew mark header, with the embedded Film Studio mini card showing the new landing capture instead of the retired rounded-box hero icon. The `og:image` / `twitter:image` cache buster moved to `?v=20261115-thumbs`.
- Recorded the new capture basis in `docs/onboarding/shutterplate.md`, `film-studio.md`, and `midpoint.md`.

## 2026-11-13 — Full-card links and Midpoint registration

- Made the whole card the launch link: `card()` now renders `<a class="app-card" href="<launchUrl>" target="_self" aria-label="Open <title>">` instead of an `<article>` plus a separate action button. An entry that is not published or has an unsafe destination still builds as an inert `<article class="app-card unavailable">`.
- Removed the `Open App ↗` button (`.action-link`) and replaced it with `.card-open`, a quiet "Open app ↗" hint line inside the card link that turns orange on hover or keyboard focus. Cards now highlight with an orange border, a small lift, and a soft shadow on hover and `:focus-visible`; the reduced-motion rule removes all of it.
- Registered Midpoint (PKPilot0002) as the fifth published app: `id: midpoint`, category `Utility`, tags NAVER Maps / Transit & Drive / Course Pairing, launch URL https://hyangdan2.github.io/PKPilot0002/, sort order 25, thumbnail `assets/apps/midpoint.jpg` (960×540 from a live 1440×810 capture), evidence `docs/onboarding/midpoint.md`.
- Updated the guide copy to "Click any card and the app opens right here, in the same tab." and the hero art counter to `05 APPS`.
- Tests: added a Chromium check that every card is the single link, that no `.action-link` or nested interactive element remains, and that clicking the card body navigates to the launch URL (14 browser checks, 8 unit checks).

## 2026-11-10 — English localization

- Localized the whole interface to English: page title and meta description, header navigation ("Browse Apps"), skip link, hero copy and CTA, catalog heading, search placeholder and reset button, filter chips ("All"), loading, empty, error, and maintenance messages, guide section, collection bottom bar, and card labels ("Live UI", "Official Art", "Runs in browser", "Open App ↗" with `aria-label="Open <title>"`).
- Translated the four catalog entries in `data/apps.json` (`description`, `tags`, `thumbnailAlt`) to English; product names and launch URLs are unchanged.
- Updated unit and Chromium tests to the English interface and search terms, and the hosted acceptance check to the new action label.

## 2026-11-10 — EduHub → ApplicationHub revamp

- Renamed the product from the learning archive to ApplicationHub: a catalog of HD2Lab's browser apps. The repository rename is still pending; the build derives its base path from the repository name, so the site keeps working at `/EduHub/` until then.
- Replaced the record catalog with `data/apps.json` and `schema/apps.schema.json`; Todo Master (AGPilot0002), Photos (PKPilot0001), Film Studio (AGPilot0007), and Machine Learning Lab (EDPilot0001) are registered as published apps.
- Rebuilt the card component to the GameHub spec: 16:9 `card-image` with caption, category `card-kicker` plus index, title/subtitle/description, `card-meta` pills, and an `action-link` that opens the app.
- Rebranded to HD2Lab orange (`--accent: #ff824f`) on `#101110` with the dual-skew `.mark` header (`HD2Lab` / `ApplicationHub`), hub navigation (GameHub, TechnicalHub, Web-HQ), the standard favicon set, and a new 1200×630 share image.
- Removed the Markdown detail pages, `content/`, `render.mjs`, and the EDPilot0001 course proxy; filtering, keyword search, and URL/history state moved onto the app catalog.
- Rewrote validation, the preview server, link checks, hosted acceptance, unit tests, and the Chromium suite for apps (`verify`: 8 unit + 13 browser checks).
- Moved the former EduHub guides to `docs/legacy/` and rewrote README, AGENTS, and OPERATIONS for the new product.

## 2026-10-20 — Local implementation

- Added a GameHub-inspired dark/lime learning archive with a CSS notebook illustration and readable record cards.
- Added Korean full-text search, subject/type filters, URL/history state, and filter-preserving detail navigation.
- Added build-time Markdown pages, tables of contents, related records, and catalog-driven source links.
- Added six explicitly labeled sample records and an excluded draft. No actual learning history is claimed.
- Added schema/path/date/URL validation, safe Markdown rendering, local checks, and Chromium browser tests.
- Added loopback-only preview on port 4174 and independent browser-test server on port 4175.
- No remote repository, publishing workflow, or deployment was created.

## 2026-10-20 — Hub hierarchy

Added Web-HQ navigation to the shared Hub header, registered EDPilot0001 with direct learning and separate intro actions, and integrated local course-to-Hub return with a highlighted card anchor. Added integration/return harness documents and updated the porting contract. No deployment.

## First public release

Removed all sample records and their files, leaving only EDPilot0001. Removed the LOCAL PREVIEW badge. Added main-branch Pages deployment with validation and separate external-link checks.
