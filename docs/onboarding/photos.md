# Onboarding — Photos (PKPilot0001)

- App card ID: `photos`
- Live URL: https://hyangdan2.github.io/PKPilot0001/ — checked 2026-11-10, HTTP 200, page title `HD2Lab | Photos (PKPilot0001)`
- Source: https://github.com/HyangDan2/PKPilot0001 (standalone repository; the app previously lived under `HyangDan2/HyangDan2.github.io/PKPilot0001` and was moved out)
- Category / tags: `Photo` / PWA · EXIF · Filter
- Thumbnail: `assets/apps/photos.jpg` — 16:9 capture of the live app in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels downsampled), resized to 960×540. Captured 2026-11-16 in the Soft Iris light theme with the `모든 사진` tab selected: the `HD2Lab | Photos` header, the 보관함 title with the 20-item count, the guest-mode notice, and the November 2026 grid. The library holds the app's own mock photo set.

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
