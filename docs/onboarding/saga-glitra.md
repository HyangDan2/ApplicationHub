# Onboarding — Sága Glitra (PKPilot0014)

- App card ID: `saga-glitra`
- Live URL: https://hyangdan2.github.io/PKPilot0014/ — HTTP 200, page title `Sága Glitra — HD2Lab 강의 라이브러리 · 마크다운 스터디 스튜디오`, checked 2026-11-21
- Source: https://github.com/HyangDan2/PKPilot0014 (public; MIT)
- Category / tags: `Learning` / Markdown Slides · KaTeX · Mermaid · Study Room
- Thumbnail: `assets/apps/saga-glitra.jpg` — 16:9 capture of the live app in a 1600×900 Chromium viewport (device scale 2, so 3200×1800 pixels), resized to 960×540. Captured 2026-11-21 in the sample deck's slide 3: the slide rail with all five slides, the code slide's `TS` and `BASH` blocks with copy buttons above its checkboxes, and that slide's own note in the right-hand note panel above the 25:00 focus timer.

## What this record claims

- A study room in three rooms: a landing lecture library, a slide deck rail on the left, a 16:9 slide stage in the middle, and a note panel on the right that is bound 1:1 to the slide currently on stage.
- The landing library lists every deck saved in this browser with title, tags, slide and note counts and study progress, with live search over title/summary/tags, tag chips and ten-item pagination; `+ 새 강의 만들기`, `.md 가져오기` and `.study.json 복원` start from there.
- Slides render Markdown as GFM (tables, strikethrough, checklists): code blocks get a language badge and copy button with highlight.js, `$…$` / `$$…$$` render through KaTeX, ` ```mermaid ` fences render diagrams, and the result is sanitised by DOMPurify.
- Learning aids: three-state study status per slide, `==keyword==` masking (tap to reveal, reveal-all toggle, a mask counter), a highlighter and pen layer over the slide stored as normalised 0–1 coordinates in IndexedDB, and a 25-minute focus timer.
- Presentation and export: full-screen present mode with `←`/`→`/`Space`, swipe and `Esc`; export of slides only, notes only, a slide+note combined `.md`, a ZIP bundle, the full `.study.json` backup, and a print stylesheet that lays each slide beside its note.
- Deck operations: import by file, drag-and-drop or paste with `---` or `##` splitting (previewed before import), slide add/duplicate/delete/drag-sort, and multiple decks through a deck dropdown.
- Korean UI; Soft Iris (light) default and Navy & Lavender dark through the header toggle, remembered locally. No server: everything is in IndexedDB.

## What was verified for this card

- Live URL returns HTTP 200. `<title>`, `og:title` and `twitter:title` are all `Sága Glitra — HD2Lab 강의 라이브러리 · 마크다운 스터디 스튜디오`; `og:image` is `https://hyangdan2.github.io/PKPilot0014/og-image.png?v=20261121-og` (HTTP 200, declared 1200×630); `favicon.ico`, `favicon.svg`, `apple-touch-icon.png` and `manifest.json` all return 200.
- Landing: the library showed one deck (the built-in sample: 5 slides, 0 % studied) and its card opened the study room.
- Study room: the rail listed all five slides; choosing slide 2 put `1. 수식도 그대로 — $E = mc^2$` on stage with the maths rendered; choosing slide 3 put the code slide on stage with `TS` and `BASH` blocks, copy buttons and the checklist; slide 4 rendered its Mermaid diagram on the live page (captured in `work/apphub-slinga/saga-glitra-live-1600x900.png`).
- Focus timer: `타이머 시작` started the countdown — the dial read `24:58` with `집중 중` two seconds later — and `타이머 리셋` returned it to `25:00`.
- Theme: `data-theme` switched `light` → `dark` and back from the header toggle.
- No horizontal overflow — `scrollWidth - clientWidth` is 0 at 1440×900 (landing and study room) and at 390×844; zero console errors, page errors and failed requests on both.

## Not verified

- The mask reveal (`==keyword==` open/close and the counter), the highlighter and pen layer, presentation mode, and the drag-sort/duplicate/delete palette were not driven.
- `.md` import, `.study.json` restore, ZIP export, the combined slide+note `.md` and the print/PDF output were not exercised; no exported file was inspected.
- Multi-deck switching and the deck dropdown; pagination and tag filtering in the library (it held a single deck).
- iOS Safari and real Android WebView; the mobile pass used device emulation at 390×844 and the phone drawer was not opened.
- Accessibility audit.

## Licence note

The repository is MIT. Its README names `markdown-it`, highlight.js, KaTeX, Mermaid, DOMPurify and fflate as the bundled third-party libraries.
