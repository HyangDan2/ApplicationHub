# Operations

## Current scope

Repository: `HyangDan2/EduHub` — the product is now ApplicationHub, but the repository rename has not been applied yet (the connected GitHub App has no repository-administration permission, and a rename request returned HTTP 403 `Resource not accessible by integration`). Public URL: https://hyangdan2.github.io/EduHub/ until the rename; https://hyangdan2.github.io/ApplicationHub/ afterwards. Publishing branch: main. Pages source: GitHub Actions.

The site is a static catalog of HD2Lab browser apps. It renders one page from `data/apps.json`; there are no detail pages, and each card links straight to the app's own deployment.

Workflow: `.github/workflows/pages.yml`. PRs validate only; successful main builds upload `dist/` and deploy through the `github-pages` environment. Build jobs have read-only permissions; deployment receives pages/write and OIDC.

## Local workflow

Use Node 24.19.0 and `npm ci`. Install Chromium with `npx playwright install chromium`.

- `npm run dev`: validate/build once, then serve `dist/` at http://127.0.0.1:4174/ApplicationHub/ (the local preview prefix, independent of the repository name).
- `npm run build`: regenerate static output after edits; refresh the preview afterward.
- `npm run verify`: validation, deterministic tests, build, Chromium checks.
- `npm run check:links`: bounded external-link checks separate from local verification.
- `npm run test:e2e`: use the existing build on test-owned port 4175.
- `npm run verify:hosted`: hosted checks; requires `PUBLIC_URL` for the deployed base path (currently `https://hyangdan2.github.io/EduHub/`).

Do not run concurrent builds or two test runs owning port 4175. The preview server binds only to loopback and serves only `dist/` beneath `/ApplicationHub/`; it has no SPA fallback and does not expose source files.

`dist/data/apps.json` holds only published cards with the evidence path removed. `release.json` carries a digest of that public list for later release matching, and `dist/` is the only artifact the workflow uploads.

## Troubleshooting

- Node errors: activate the pinned runtime (`.nvmrc`); older system Node versions are insufficient.
- Stale page: rebuild, then refresh. The preview intentionally has no file watcher.
- Missing cards: check `status` in `data/apps.json`, the validation output, and active filters.
- Port in use: stop the prior owned server or choose `PORT` for the preview; port 4175 is reserved for tests.
- A launch URL fails: verify the app's own deployment first; do not call the card verified. `npm run check:links` reports external HTTP status.
- `verify:hosted` refuses to run: set `PUBLIC_URL` and build the matching release.

## Deployment and recovery

Build with `PUBLIC_URL=https://hyangdan2.github.io/ApplicationHub/` so canonical URLs and the share image are generated. Run `verify` and `check:links`, inspect the diff, commit, and merge to main. Wait for that exact commit's Actions run, then run `verify:hosted` against the matching build. Uploading an artifact is not a completed deployment.

Rollback by reverting the faulty commit and pushing through the same workflow, then re-checking the public site.

## Repository rename note

GitHub does not redirect GitHub Pages project URLs after a repository rename, so the hub's links must switch at the same moment the repository name does.

Current state: the rename to `ApplicationHub` is **pending**. The connected GitHub App cannot rename a repository (`gh repo rename` returned HTTP 403, `Resource not accessible by integration`), and it also cannot edit `.github/workflows/pages.yml` without the `workflows` permission. The code is ready for either name:

- `scripts/build.mjs` derives the public base path from `GITHUB_REPOSITORY`, so a rename changes `/EduHub/` to `/ApplicationHub/` with no code edit.
- If `PUBLIC_URL` still names the other hub path, the build corrects it and prints a warning instead of failing; update the workflow's `PUBLIC_URL` when the `workflows` permission is available.

To finish the rename: rename the repository in GitHub (Settings → Repository name, or grant the App administration permission and re-run `gh repo rename ApplicationHub -R HyangDan2/EduHub --yes`). Then merge the hub PRs that point at `https://hyangdan2.github.io/ApplicationHub/` (Web-HQ, GameHub, TechnicalHub) so no link points at the retired `/EduHub/` path. `HyangDan2/EDPilot0001` still links back to `/EduHub/` from its own header and needs its own update.
