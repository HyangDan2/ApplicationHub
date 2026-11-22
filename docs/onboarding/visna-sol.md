# Onboarding — CodePlayground (PKPilot0013)

> Renamed 2026-11-22: the shelf entry is `CodePlayground` (was `Vísna Sól`). The app repository `PKPilot0013` carries
> the matching title, OG tags and in-app lockup; the dated live checks below were recorded under
> the previous name and are kept as recorded.

- App card ID: `visna-sol`
- Live URL: https://hyangdan2.github.io/PKPilot0013/ — HTTP 200, page title `Vísna Sól — HD2Lab 코딩·CLI 학습 샌드박스`, checked 2026-11-21
- Source: https://github.com/HyangDan2/PKPilot0013 (public; first push 2026-11-21)
- Category / tags: `Learning` / Git Graph · Pyodide · SQLite · Local Sandbox
- Thumbnail: `assets/apps/visna-sol.jpg` — 16:9 capture of the live Git track in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels downsampled), resized to 960×540. Captured 2026-11-21: the HD2Lab | Vísna Sól lockup with the four track tabs, the repository explorer and 4/5 mission list, `app.js` in the editor, `git merge` / `git log --oneline` in the terminal, and the rebase mission card above a four-commit graph with `main` and `feature` chips.

## What this record claims

- A VS Code-style educational sandbox with four tracks, each with five guided missions plus a free-sandbox mode: Git, Python, Linux, SQL.
- Git runs on a purpose-built in-memory engine: `init`, `status`, `add`, `commit`, `branch`, `switch`/`checkout`, `merge`, `rebase`, `reset`, `cherry-pick`, `restore`, `rm`, `show`, `log`, `diff`, with an SVG commit graph, HEAD/branch decorations and working-tree / staging state.
- Python is real CPython 3.13 through Pyodide (WASM), loaded from `cdn.jsdelivr.net` the first time the Python track runs; `Ctrl+Enter` or `python <file>.py` executes the open file.
- Linux is a POSIX-ish shell over an in-memory file system: `pwd`, `ls`, `cd`, `mkdir`, `touch`, `cat`, `echo`, `cp`, `mv`, `rm`, `grep`, `wc`, `head`, `tail`, `find`, `tree`, pipes and `>` / `>>` redirects.
- SQL is real SQLite through sql.js, whose wasm is served from the app's own origin, against a bundled `departments` / `employees` / `sales` sample database.
- Missions pass only when the real command or program produced the real result; progress persists in `localStorage`.
- Desktop layout is four panes at ≥ 1024 px; below that a compact title bar, mission banner and a four-tab switcher (파일 · 코드 · 터미널 · 결과) with quick-command chips.
- Korean (존댓말) and English UI copy switch instantly with `KO | EN`; the HD2Lab Soft Iris / Navy & Lavender themes switch with the round toggle and are remembered in `localStorage`.
- Deployment: `.github/workflows/deploy.yml` (checkout → Node 22 → `npm ci` → build → `npm test` → configure-pages → upload artifact → deploy-pages) publishes `dist/` with Pages source "GitHub Actions"; no `gh-pages` branch.

## What was verified for this card

- Live URL returns HTTP 200 and renders in Chromium (title, `HD2Lab Vísna Sól` lockup, terminal visible).
- Pages deployment: Actions run `44855641118` (`workflow_dispatch` on `feat/visna-sol`, commit `722e4508`) — build **success** and deploy **success** through the `github-pages` environment. The earlier push run `44854640348` on `main` built successfully but its deploy job was rejected, because that environment's deployment branch policy lists only `feat/visna-sol`; PR #1 (`main` → `feat/visna-sol`) was merged to bring the workflow onto the branch Pages is configured for.
- All four tracks executed on the live site in one desktop run: `git init` / `git add .` / `git commit -m "첫 커밋"` produced a commit in the graph and `git log --oneline` printed it; the Python track printed `안녕하세요, 학습자입니다. / 5` from real Pyodide; `cat ~/logs/access.log | grep 404 | wc -l` returned `3` and `mkdir` / `touch` / `echo >` produced the `practice` folder in the tree; the SQL track ran its mission query and returned the `employees` rows (`김하늘` 6200 first) beside the `departments` / `employees` / `sales` schema.
- Zero console errors, page errors and failed requests during the desktop run and during a separate mobile run.
- No horizontal overflow: `documentElement.scrollWidth - clientWidth` is 0 at 1440×900 (boot, Git, Python, Linux, SQL) and at 390×844 (boot, files, editor, terminal, output, SQL result); all four track tabs stay selectable on mobile.
- `KO | EN` switches the document to `lang="en"` and the mission card to English (`ACTIVE MISSION`, `Initialise the repository`); the theme toggle moves `data-theme` dark → light → dark on the live page.
- The app repository's own Playwright suite passes against the live URL: 5 tests (desktop 1440×900 four-track run, desktop git-graph merge, mobile 390×844 panels, workspace file behaviour, mobile tabs and chips) — `PK13_BASE=https://hyangdan2.github.io/PKPilot0013/ npx playwright test`, 5 passed.
- The app repository's Vitest suite passes locally: 37 tests across Git (14), Linux (10), SQL (9) and missions (4); the same `npm test` step passed in the Pages build job of run `44855641118`.
- Assets on the live origin return HTTP 200 with the expected content types: `assets/index-DBg8b55O.js`, `assets/index-t0gvbDpn.css`, `sqljs/sql-wasm.wasm` (`application/wasm`), `manifest.json`, `og-image.png`, `social-preview.png`, `icon-192.png`, `favicon.svg`, `apple-touch-icon.png`; `og:image`, `twitter:card` and `canonical` meta tags are absolute and point at the live origin.

## Not verified

- iOS Safari and real Android WebView behaviour; the layout checks used Chromium device emulation at 390×844, not a physical device.
- The Python track depends on `cdn.jsdelivr.net` for the Pyodide runtime (~10 MB, first run only). The live run loaded it, but a network that blocks the CDN is untested beyond the app's own fallback message; the other three tracks are fully local.
- Mission-completion persistence across a reload and the free-sandbox mode beyond what the repository's unit and e2e suites cover.
- Accessibility audit (screen reader, keyboard trap behaviour in the terminal) was not performed.

## Licence note

The app repository is MIT. Third-party components (Pyodide, sql.js, React) and their licences are listed in the repository's `THIRD_PARTY_NOTICES.md`.
