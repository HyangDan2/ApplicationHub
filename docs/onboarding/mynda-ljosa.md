# Onboarding — FrameBuilder (PKPilot0015)

> Renamed 2026-11-22: the shelf entry is `FrameBuilder` (was `Mynda Ljósa`). The app repository `PKPilot0015` carries
> the matching title, OG tags and in-app lockup; the dated live checks below were recorded under
> the previous name and are kept as recorded.

- App card ID: `mynda-ljosa`
- Live URL: https://hyangdan2.github.io/PKPilot0015/ — HTTP 200, page title `Mynda Ljósa — HD2Lab 커스텀 4컷 프레임 스튜디오`, checked 2026-11-21
- Source: https://github.com/HyangDan2/PKPilot0015 (public)
- Category / tags: `Photo` / 4-Cut Frames · Canvas Editor · JSON Preset · Share Link
- Thumbnail: `assets/apps/mynda-ljosa.jpg` — 16:9 capture of the live app in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels), resized to 960×540. Captured 2026-11-21 with a frame selected and the right-hand drawer open: the Classic Strip four-cut plate with its four artwork slots, and the frame properties (name, `1×4 · 600×1800` size, background, gradient, perforation, PNG overlay) beside it.

## What this record claims

- A canvas studio for the four-cut frame itself: slots 1–4 are dragged and resized on a free canvas with snap guides, grid and fit/50 %/100 % zoom, instead of picking from a fixed list of plates.
- Five presets: 클래식 1×4 스트립, 노르딕 2×2 그리드, 다크 시네마 1×4 (film perforation), 매거진 비대칭 콜라주, and a 포토부스 PNG overlay template; canvas size presets keep the cells in proportion (`1×4 · 600×1800`, `2×2 · 1200×1600`, `3:4 · 1200×1600`, `1:1 · 1200×1200`).
- The properties drawer covers canvas preset, background colour, two-colour gradient, perforation, a transparent PNG overlay above or below the photos, text with `{{date}}`-style variables, and the HD2Lab emblem.
- Sharing: the design saves to an IndexedDB library (`hd2_custom_frames_v1`) and exports as a `.shutterframe.json` and as an `lz-string` compressed `#frame=` link, which Shutterplate and Nordlys read with the same shared `public/shutterframe.js` engine and print as-is; both apps can also be opened straight from chips in this app.
- Layout: the top bar carries only the dual-skew mark, `HD2Lab | Mynda Ljósa`, `KO | EN`, the theme toggle and `⋮`; the left drawers hold presets/library and layers/order, the right drawer holds frame/property editing, a bottom capsule holds zoom and grid, and the save/share chips float bottom-right. Below 1024 px the same drawers open as bottom sheets.
- Korean polite speech and English switch instantly across the header, floating buttons, drawers, modals and toasts; Navy & Lavender (dark, default) and Soft Iris light are both token-driven. No upload, no account.

## What was verified for this card

- Live URL returns HTTP 200. `<title>`, `og:title` and `twitter:title` are all `Mynda Ljósa — HD2Lab 커스텀 4컷 프레임 스튜디오`; `og:image` is `https://hyangdan2.github.io/PKPilot0015/og-image.png?v=20261121-og2` (HTTP 200, declared 1200×630); `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` and `manifest.json` all return 200.
- The app opened on a `Classic Strip` frame (`600×1800px · 4컷`) with four artwork slots and the `MYNDA LJÓSA` heading on the plate.
- `프레임 · 속성 편집` opened the right drawer with the name field, the four canvas-size buttons, W/H, background colour, the light-background switch, gradient, background image, perforation (side/film, colour, width/height/gap) and PNG overlay sections.
- The preset drawer listed all five presets with their descriptions; choosing `노르딕 2×2 그리드` re-laid the canvas and the readout changed to `1200×1600px · 4컷`.
- Theme: `data-theme` switched `navy` → `iris` and back from the title bar.
- Language: `EN` set `<html lang="en">`, and `KO` returned the interface to Korean.
- No horizontal overflow — `scrollWidth - clientWidth` is 0 at 1440×900 (canvas with the properties drawer open) and at 390×844; zero console errors, page errors and failed requests on both.

## Not verified

- Saving to the IndexedDB library, the `.shutterframe.json` download, and the `#frame=` deep link actually opening the frame inside Shutterplate or Nordlys; no file or link was produced or followed.
- Slot dragging and resizing, snap guides, text/sticker/sprite/background-image tools, the PNG overlay upload and the emblem controls were not driven.
- The mobile bottom-sheet behaviour (the 390×844 pass only rendered the default canvas).
- iOS Safari and real Android WebView; the mobile pass used device emulation at 390×844.
- Accessibility audit.

## Licence note

The repository has no `LICENSE` file as of 2026-11-21 (GitHub reports no detected licence). Its README names Vite + React 19 + TypeScript, `lz-string`, and the shared `public/shutterframe.js` engine that the three HD2Lab apps use.
