# Onboarding — Slinga (PKPilot0017)

- App card ID: `slinga`
- Live URL: https://hyangdan2.github.io/PKPilot0017/ — HTTP 200, page title `Slinga — HD2Lab 스레드 워크스페이스`, checked 2026-11-21
- Source: https://github.com/HyangDan2/PKPilot0017 (public)
- Category / tags: `Productivity` / Threaded Notes · Hashtags · Micro Feed · JSON / Markdown
- Thumbnail: `assets/apps/slinga.jpg` — 16:9 capture of the live app in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels), resized to 960×540. Captured 2026-11-21 after loading the five sample threads: the `HD2Lab | Slinga` bar with `스레드 5개 · 기기 안 저장`, the empty composer with `+ 타래 잇기`, the `전체 5 / 북마크 2` tabs and tag chips, the three-part thread on its spine, and the search, tags and backup rail.

## What this record claims

- A thread workspace with no landing page: the composer is the first block under the title bar. A post holds up to 500 characters (counter in view, post button disabled while empty), up to four images at 12 MB each before an in-canvas downscale to 1280 px.
- **타래 잇기 (Add to thread)** adds the next part of the same thread inside the composer, so a whole chain is written and checked before it is published; blank trailing parts drop out and each part can carry its own images.
- `#해시태그` typing produces **자동 인식** chips under the composer and coloured (tappable) tags inside every post.
- Timeline cards join the parts of a thread with a vertical spine; like, reply, quote repost, bookmark, per-part edit and thread delete sit on the card, and a single thread exports as a 2× PNG card.
- Explore has **전체 / 북마크 / #태그** tabs, a live keyword search over posts, replies and hashtags, and a tag strip.
- The rail (desktop) / the drawer (phone) holds search, thread and bookmark counts, all tags, the autosave state, snapshots, and the JSON / Markdown export and import buttons.
- Five sample threads load from the empty state with one press and never duplicate.
- Korean (존댓말) and English UI switch with `KO | EN`; Navy & Lavender (dark, default) and Soft Iris (light) share the HD2Lab tokens and the dual-skew `.mark`. No account, no upload, no analytics.
- Storage is IndexedDB with a localStorage mirror, written 350 ms after each change; snapshots and JSON/Markdown backups are the only ways data leaves the browser.
- Deployment: GitHub Pages serves the built `dist/` from the repository's `gh-pages` branch (Pages source branch `gh-pages`, build type legacy, HTTPS enforced), because the connected GitHub App cannot push `.github/workflows/`; `deploy.yml` is kept beside the repository for the day the workflow can be installed.

## What was verified for this card

- Live URL returns HTTP 200 and serves the built bundle (`/PKPilot0017/assets/index-CoKyTM_n.js`), not the repository source. `<title>`, `og:title` and `twitter:title` are all exactly `Slinga — HD2Lab 스레드 워크스페이스`; `og:image` is `https://hyangdan2.github.io/PKPilot0017/og-image.png?v=20261121-og` declared 1200×630; `favicon.ico`, `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png` and `manifest.json` all return 200.
- Empty state: heading `아직 스레드가 없습니다`, composer placeholder `무슨 생각을 이어 가고 있나요? #해시태그도 붙여 보세요.`, and the `샘플 타래 5개 불러오기` button.
- Samples: one press loaded five threads — tabs `전체 5` and `북마크 2`, five cards, and the first card labelled `이어진 글 3개` on its spine.
- Chained post on the live site: typed a first part, pressed `+ 타래 잇기`, typed a second part, both carrying `#검증`; the **자동 인식** chip row appeared, `게시` posted, the card count went 5 → 6, the header read `스레드 6개`, and the newest thread showed `이어진 글 2개`.
- Search: `Sllinga` produced the `조건에 맞는 스레드가 없습니다` state; `Slinga` narrowed the feed to the two threads containing the word. The bookmarks tab showed exactly the two bookmarked samples.
- Thread menu: `편집 · 카드 PNG로 저장 · 삭제`. `스냅샷 저장` confirmed with `스냅샷을 저장했습니다.`
- Theme: `data-theme` switched `navy` → `iris`, with the page ground reading `rgb(250, 250, 253)`; switching back returned to `navy` and the choice persisted through the reload.
- Language: `EN` set `<html lang="en">`, the composer placeholder to `What are you carrying forward? Add a #hashtag too.` and the tabs to `All 6`; `KO` returned the document to `ko`.
- Persistence: after a full reload the six threads were still there (IndexedDB).
- No horizontal overflow: `scrollWidth - clientWidth` is 0 at 1440×900 (samples, chained post, theme and language switches) and at 390×844 (samples, drawer open and closed). On the phone the rail is replaced by the `탐색과 보관 열기` drawer (360×776, 22 px from the right and bottom edges) with its search box and `스냅샷 저장`.
- Zero console errors, page errors and failed requests across the desktop and mobile runs on the live origin.

## Not verified

- iOS Safari and real Android WebView; the mobile run used device emulation at 390×844, not a physical device.
- Image attachment (picker, drag-and-drop, four-image limit, the 1280 px downscale) — no image was posted.
- JSON / Markdown export and re-import round trip, and the actual PNG card file written by `카드 PNG로 저장`.
- Reply, like, quote, per-part edit and thread delete beyond what the sample threads already show; long sessions with hundreds of threads and the ~2.5 M character localStorage mirror cutoff.
- Accessibility audit (screen reader, focus order through the composer and thread actions).

## Licence note

The repository carries no `LICENSE` file as of 2026-11-21 (GitHub reports no detected licence). It is a React + Vite + TypeScript application; its own suites are Vitest unit tests and Playwright desktop 1440×900 / phone 390×844 runs, per its README.
