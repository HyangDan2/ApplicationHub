# HD2Lab ApplicationHub

**Public site:** https://hyangdan2.github.io/ApplicationHub/

A catalog of HD2Lab's browser apps, styled and structured like GameHub: a catalog-driven grid of 16:9 cards with a category filter and keyword search, where clicking anywhere on a card opens that app in the same tab. Every app runs in the browser with no install and no account.

**Local preview:** http://127.0.0.1:4174/ApplicationHub/

`data/apps.json` is the only app list. GitHub Actions validates the catalog, runs the unit and Chromium tests, builds `dist/`, and deploys `main` to GitHub Pages.

## Setup

Use Node **24.19.0** (`.nvmrc`), then:

```sh
npm ci
npx playwright install chromium
npm run dev
```

`dev` builds once and serves `dist/` on port 4174. After source edits, run `npm run build` and refresh; there is no file watcher. Browser tests own port 4175.

## Checks

```sh
npm run verify
npm run check:links
```

`verify` validates, runs unit tests, builds, and tests the production output in Chromium. `check:links` performs external destination checks separately. `npm run verify:hosted` needs `PUBLIC_URL` and a matching built release.

## Add or update an app

1. Add the card entry to `data/apps.json`: stable `id`, title, subtitle, description, category, tags, a 16:9 thumbnail under `assets/apps/`, the real `launchUrl`, and `status`.
2. Save a 16:9 screenshot of the deployed app as `assets/apps/<id>.jpg` (960×540). Do not include personal data; an app's own sample records are fine.
3. Record what was verified in `docs/onboarding/<id>.md` — including what was **not** verified.
4. Run `npm run verify`. Set `status` to `draft` or `maintenance` to keep an app off the public site.

Do not invent a launch URL, a feature, or an update date. Only `published` apps enter the public page, the search data, and the release digest.

[Operations](docs/OPERATIONS.md) · [QA evidence](docs/QA.md) · [Change log](docs/CHANGELOG.md)

## Relationship to the other hubs

Navigation is ApplicationHub ↔ GameHub / TechnicalHub ↔ Web-HQ. ApplicationHub opens apps in the same tab from the card itself; each app owns its own back navigation. The retired learning-archive guides are kept for reference in [`docs/legacy/`](docs/legacy/README.md).
