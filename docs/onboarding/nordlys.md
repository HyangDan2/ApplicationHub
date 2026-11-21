# Onboarding — Nordlys (PKPilot0011)

- App card ID: `nordlys`
- Live URL: https://hyangdan2.github.io/PKPilot0011/ — HTTP 200, page title `Nordlys — HD2Lab Film & Frame Studio`, checked 2026-11-21
- Source: https://github.com/HyangDan2/PKPilot0011 (public; MIT)
- Category / tags: `Photo` / 69 Filters · 13 Frames · WebGL2 · WebCodecs
- Thumbnail: `assets/apps/nordlys.jpg` — 16:9 capture of the live app in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels), resized to 960×540. Captured 2026-11-21 after opening the `Landscape` sample: the film rail with `VESTRA` chosen and its graded thumbnails, the framed plate (Sony maker mark, shot data) on stage, and the `세부 보정` sliders on the right.

## What this record claims

- Film Studio and Shutterplate combined in one browser studio: photos and clips share a single stage, and the same screen grades colour and prints a plate.
- Grading is WebGL2: 9 HD2Lab films, `RETRO 90`, and 58 Margarine looks (69 filters in the picker), with exposure, white balance, highlights, shadows, contrast, white/black, W/R/G/B tone curves, Color Lab (8-band HSL, Color Focus, RGB Base), two-pass sharpening, halation/glow, 7-segment date stamping and 3D LUT.
- Framing is the Shutterplate canvas: 13 plate styles — 11 single plates (Clean Horizon … Editorial Cover) that take photos **and** clips, plus 2 four-cut plates (Contact Sheet, FYRA 04) for photos only, reached through a separate 4-cut window with SLOT 1–4 management.
- Input: one picker/drop area for JPEG · PNG · WebP (up to 4 photos) and MP4 · MOV · WebM (play, scrub, trim, sound toggle), EXIF parsed automatically; bundled samples (a landscape, a cafe portrait, a studio portrait, and a 6-second clip with audio) open straight into the editor.
- Output: the original 1:1 photo under the plate, or an H.264 clip with sound, through the single `저장 / 공유` action. Everything runs on the device — no upload, no CDN, no analytics.
- Screen: bottom film strip, filter modal with live thumbnails, frame modal, 4-cut window, detail panels (light · colour · texture · video), Color Lab and Camera Effects windows, and a Tone Curve overlay drawn over the graded plate; Navy & Lavender and Soft Iris themes.
- Deployment: pages are served from the repository's `main` branch build at `/PKPilot0011/`.

## What was verified for this card

- Live URL returns HTTP 200. `<title>`, `og:title` and `twitter:title` are all `Nordlys — HD2Lab Film & Frame Studio`; `og:image` is `https://hyangdan2.github.io/PKPilot0011/og-image.png?v=20261121-og` (HTTP 200, declared 1200×630); `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` and `manifest.json` all return 200.
- The `Landscape` sample opened the editor (the `저장 / 공유` action appeared) with `VESTRA` already applied, and the stage rendered the graded, framed preview image.
- Choosing `AURVEN` in the film rail moved the selection and re-rendered the stage's preview; the `프레임 13` tab lists 11 single-plate options (the two four-cut plates live behind the separate 4-cut button, as the app documents).
- The `더 보기` menu opens the workspace rows (`홈 / 랜딩 화면`, `사진 · 영상 교체`, `EXIF 값으로 되돌리기`, `미디어 비우기`, `엠블럼 색상`) and the sample rows.
- Theme: `data-theme` switched `dark` → `light` and back from the title bar.
- No horizontal overflow — `scrollWidth - clientWidth` is 0 at 1440×900 (landing and editor) and at 390×844; zero console errors, page errors and failed requests on both.

## Not verified

- The video pipeline: no clip was imported, trimmed, played with sound, or exported; H.264 + audio encoding, the Android Chrome audio resume path and the HDR/HLG guard were not exercised.
- The four-cut window (SLOT 1–4 management, Contact Sheet / FYRA 04 output) and the 69-filter modal grid were not driven.
- `저장 / 공유` was not pressed, so no exported photo or video file was inspected.
- The Tone Curve overlay, Color Lab, Camera Effects and the frame-detail editing controls were not operated.
- iOS Safari and real Android WebView; the mobile pass used device emulation at 390×844.
- Accessibility audit.

## Licence note

The repository is MIT.
