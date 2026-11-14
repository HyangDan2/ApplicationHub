# Onboarding — Shutterplate (PKPilot0003)

- App card ID: `shutterplate`
- Live URL: https://hyangdan2.github.io/PKPilot0003/ — checked 2026-11-14, HTTP 200, page title `Shutterplate — HD2Lab Photo Frame Studio`
- Source: https://github.com/HyangDan2/HyangDan2.github.io/tree/main/PKPilot0003 (folder inside the Web-HQ repository; no standalone repository exists)
- Category / tags: `Photo` / EXIF · 8 Frames · Local Processing
- Thumbnail: `assets/apps/shutterplate.jpg` — 16:9 capture of the live site in a 1600×900 Chromium viewport after loading the bundled Sony sample (device scale 1), resized to 960×540. The screen shows the Clean Horizon plate with its EXIF signature and an unedited ISO 100, the one-line session card, and all eight frames in the library strip.

## What this record claims

- A static, client-side photo frame studio with no build step: HTML, CSS and plain JavaScript, with the EXIF parser bundled locally and no CDN dependency.
- Upload 0 B: parsing, preview and export encoding all happen in the page; the photo is never sent to a server.
- EXIF extraction on load: the bundled Sony sample reported 22 EXIF fields, shown as chips beside the filename and resolution.
- Inline EXIF editing: 16 fields (camera, optics, focal length, aperture, shutter, ISO, date/time, caption/photographer) in the `EXIF 편집` sheet, redrawing the plate as a field changes.
- Eight signature frames — Clean Horizon, Classic Gallery, Dual Deck, Strap Bar, Film Sprocket, Studio Dark, Minimal Edge, Pro Studio — selected from a horizontal library strip of live miniatures.
- Ten emblem options in the `엠블럼` sheet: Sony, Canon, Nikon, Fujifilm, Leica, Hasselblad, Apple, Lumix, OM System and HD2Lab, plus Auto and None.
- Export in the `내보내기` sheet as high-quality JPEG or lossless PNG; the plate canvas is drawn at the photo's own pixel scale rather than a fixed output size.
- Interface language is Korean (the app's own UI); the hub card is English like the rest of the catalog.

## What was verified for this card

- The live URL responds, and Chromium loaded the deployed page with no page or console errors at a 1600×900 viewport.
- `샘플` loaded the bundled Sony a7 IV sample; the plate rendered with the `SONY ILCE-7M4` signature and 35mm · ƒ/1.8 · 1/250s · ISO 100 metadata.
- Frame library: eight `.frame-card` entries were present with the eight names above; choosing Studio Dark redrew the plate (before/after screenshot differs).
- EXIF editing: the ISO field was changed from `ISO 100` to `800` and the plate redrew with the new value.
- Emblems: the sheet offered ten emblems plus Auto and None; on Classic Gallery, choosing Canon changed the plate (before/after screenshot differs). Clean Horizon carries no emblem, so the same change is not visible there.
- Export: the 내보내기 sheet produced `Shutterplate_SONY-ILCE-7M4_202610241732.jpg` (431 KB) from the 1536×1024 sample; the exported file measures 1640×1251, matching the plate chip shown in the stage bar, and the photo is drawn at its native pixel size inside that plate.
- Upload-free: across loading the sample, editing, switching frames and exporting, the page issued no non-GET request and contacted no host other than `hyangdan2.github.io`.
- Mobile layout sanity in Chromium: at 390×844 and 320×640 viewports the document had zero horizontal and zero vertical overflow (document scroll size equals the viewport).

## Not verified

- No physical iPhone or Android check, and no Safari or Firefox acceptance. The mobile checks above are Chromium viewports, not device testing.
- The other seven frames were seen in the strip and in the project's own verification screenshots, but only Studio Dark and Classic Gallery were exercised on the live site for this card.
- PNG export, the JPEG quality slider, the plate ratio presets (Auto · 1:1 · 4:5 · 5:4 · 3:2 · 16:9), film stock and typeface options, the 4096 px export ceiling, and zoom/pan on the canvas were not exercised for this card.
- Behaviour and file layout beyond the above were taken from the project README in the repository, not re-tested by the hub.
- The bundled samples are generated demo frames with injected EXIF metadata (Sony / Fujifilm / Canon), not real photographs.
