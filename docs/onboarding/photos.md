# Onboarding — Photos (PKPilot0001)

- App card ID: `photos`
- Live URL: https://hyangdan2.github.io/PKPilot0001/ — checked 2026-11-10, HTTP 200, page title `HD2Lab | Photos (PKPilot0001)`
- Source: https://github.com/HyangDan2/HyangDan2.github.io/tree/main/PKPilot0001 (folder inside the Web-HQ repository; no standalone repository exists)
- Category / tags: `Photo` / PWA · EXIF · 필터
- Thumbnail: `assets/apps/photos.jpg` — 16:9 crop of a 1440×810 capture of the live Library screen, resized to 960×540. The library holds the app's own mock photo set.

## What this record claims

- iOS Photos-style static web application built with vanilla ES2022 modules and no build step, served from GitHub Pages.
- Year / month / day / all photos segments, sticky date groups, albums, favourites, secret album, EXIF panel, filter adjustment, and guest/member states.
- Membership uses a demo passcode shipped in the client bundle; this is a presentation feature, not access control.
- Installable PWA; photos and state stay in the browser.

## What was verified for this card

- The live URL responds and the Library renders in Chromium at 1440×810 with the guest banner and photo grid.
- Claims were taken from the project README inside the repository.

## Not verified

- Member-mode views, the secret album unlock, filter maths, and offline behaviour were not re-tested for this card.
- No physical iPhone or Android test. The demo passcode and the security boundary are documented by the project itself.
