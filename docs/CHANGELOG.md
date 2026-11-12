# Change log

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
