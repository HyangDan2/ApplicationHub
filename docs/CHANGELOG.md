# Change log

## 2026-11-10 — EduHub → ApplicationHub revamp

- Renamed the product from the learning archive to ApplicationHub: a catalog of HD2Lab's browser apps.
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
