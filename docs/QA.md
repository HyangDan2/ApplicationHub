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
