# Onboarding — Markdown Viewer (PKPilot0008)

- App card ID: `markdown-viewer`
- Live URL: https://hyangdan2.github.io/PKPilot0008/ — checked 2026-11-18, page rendered, title `Markdown Viewer 사용법 · HD2Lab Markdown Viewer`
- Source: https://github.com/HyangDan2/PKPilot0008 — standalone repository (created 2026-11-17)
- Category / tags: `Productivity` / GFM · Frontmatter · Share Links
- Thumbnail: `assets/apps/markdown-viewer.jpg` — 16:9 capture of the live site in a 1919×992 Chromium viewport: the frame is a 1632×918 centre crop (16:9) downsampled to 960×540, saved as a progressive JPEG (quality 88, 4:4:4). The page is scrolled to the viewer panel with the bundled sample document rendered: the `HD2Lab | Markdown Viewer` header, the `파일 열기 · 텍스트 붙여넣기 · 샘플 문서` / `공유 링크 복사 · 인쇄 / PDF · HTML 저장` bar, the URL row, `sample-markdown.md` with its 166 단어 · 683 자 · 1 분 읽기 counts, the contents list, the document title `Markdown Viewer 사용법` with its tag chips, the frontmatter card expanded to its five fields (title · date · category · summary · tags), and the first body paragraph.

## What this record claims

- A read-only Markdown viewer with no backend and no build step: HTML, CSS and plain JavaScript, served from GitHub Pages. markdown-it (GFM tables, strikethrough, linkify), highlight.js, DOMPurify and lz-string are vendored under `js/vendor/`, so no CDN is needed.
- Input: `.md` / `.markdown` / `.txt` file picker and drag & drop anywhere on the page, a paste dialog (`Ctrl/⌘ + Enter` renders), `?url=…` loading with an explanation when the host sends no CORS headers, and `#md=…` / `?md=…` share links in which the document is compressed with lz-string.
- Render: YAML frontmatter is parsed into the document header (title, category · date, summary, tags) and listed in a collapsible frontmatter card; every code block gets a language badge and a copy button; headings get stable ids and feed the table of contents (sidebar on desktop, toggle panel on mobile).
- Safety: every rendered document passes through DOMPurify — `script`, `style`, `iframe`, `form`, `object`, `embed`, inline event handlers and `javascript:` URLs are removed.
- Output: `인쇄 / PDF` uses `window.print()` with a dedicated print stylesheet, and `HTML 저장` exports a standalone HTML file with the rendered document and an embedded stylesheet.
- The interface language is Korean (the app's own UI); the hub card is English like the rest of the catalog.

## What was verified for this card

- The deployed page loaded and rendered in Chromium at a 1919×992 viewport with no horizontal overflow (`documentElement.scrollWidth` 1904 against a 1919 px viewport).
- The bundled `sample-markdown.md` renders on first load without any interaction: the file bar reports 166 단어 · 683 자 · 1 분 읽기, the document title and its `#markdown` `#viewer` `#hd2lab` chips render, and the contents list holds four entries (이 뷰어가 하는 일, 지원하는 문법, 코드, 공유와 인쇄).
- The frontmatter card toggled open on the live page and listed five fields — title `Markdown Viewer 사용법`, date `2026-11-17`, category `notes`, summary, and tags `markdown, viewer, hd2lab`.
- The rendered sample shows the GFM surface the card describes: a pipe table, `- [x]` / `- [ ]` checklist items (rendered read-only), a blockquote, and two fenced code blocks (`js`, `css`) each with a language badge and a `복사` button.
- The toolbar renders `파일 열기`, `텍스트 붙여넣기`, `샘플 문서`, `공유 링크 복사`, `인쇄 / PDF`, `HTML 저장`, a URL field with `불러오기`, and the floating Navy & Lavender theme toggle.

## Not verified

- File open, drag & drop, the paste dialog, `?url=` loading (including the CORS failure message), the share-link round trip, `인쇄 / PDF`, and `HTML 저장` were not exercised for this card.
- DOMPurify sanitisation was not attacked with a crafted document; the claim comes from the project README and the vendored library.
- Mobile and tablet layouts, the mobile contents toggle, and light/dark switching beyond the default light theme were not re-tested, and there was no physical iPhone or Android check, nor Safari or Firefox acceptance.
- The card's English keywords come from the app's README and the live screen; the Korean interface copy is the app's own.
- The capture came from this session's Chromium at 1919×992 and was cropped to 16:9, not the 1280×720 viewport used for the earlier cards; the framing was chosen to show the reader panel rather than the landing hero.
