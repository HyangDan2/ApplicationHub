# EduHub Integration Harness

## Navigation contract

The hierarchy is **educational site ↔ EduHub → Web-HQ**. EduHub owns the Web-HQ link (`https://hyangdan2.github.io/`) in its shared header, including detail pages. Educational sites return to EduHub rather than bypassing it to Web-HQ.

Each course has a stable catalog ID, `kind: course`, and a validated HTTPS `learningUrl`. Its primary card/title action opens that learning URL in the same tab. A separate “자료 소개” link opens the Hub detail page; that page also provides “학습 시작”. Do not duplicate learning URLs in handwritten cards. Keep source repository links in `sources`.

Render a stable `entry-<id>` card anchor. Return destinations use the Hub root plus that anchor. Direct course entry must still have a working return route. This implementation returns to the unfiltered catalog and highlights the course; cross-site filter restoration is not implemented.

## Registration workflow

Inspect course source and actual deployed content, record the inspected revision and evidence under `docs/onboarding/<id>.md`, preserve existing IDs, validate the catalog, build and test. Do not infer the owner's study date. Distinguish published course availability from unpublished return-link changes.

## Local integration

`npm run dev` serves the Hub at `/EduHub/` on port 4174. The preview server also mounts sibling `../EDPilot0001/output/site` at `/EDPilot0001/`. Build that course first using its own environment and commands. Missing sibling output results in a 404; it is not replaced with a fake page.

Only local HTTP responses rewrite the configured EDPilot0001 learning destination and its EduHub return link. Generated distribution files retain absolute HTTPS destinations. No runtime hostname guessing or arbitrary return URL is used. The preview mapping is explicit in `scripts/serve.mjs`; when adding another local course, add a bounded route mapping without exposing its source tree.

## Acceptance

Run `npm run verify`, including the actual local round trip through a nested chapter and the detail-page launch action. Verify Web-HQ href on index and detail pages; verify no direct Web-HQ link remains in the course header. Check card anchor visibility after return, mobile layouts, same-tab links, and direct entry.

Deployment is now authorized. Before publishing, confirm the Hub public URL and course return configuration, inspect distribution files for loopback destinations, deploy each project through its authorized workflow, and verify the real public round trip. Source edits alone do not update the live course.
