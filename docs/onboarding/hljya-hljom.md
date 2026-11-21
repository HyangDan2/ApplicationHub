# Onboarding — Hlýja Hljóm (PKPilot0016)

- App card ID: `hljya-hljom`
- Live URL: https://hyangdan2.github.io/PKPilot0016/ — HTTP 200, page title `Hlýja Hljóm — HD2Lab 올코덱 로컬 음악 플레이어`, checked 2026-11-21
- Source: https://github.com/HyangDan2/PKPilot0016 (public; first push 2026-11-21)
- Category / tags: `Utility` / All Codecs · ffmpeg.wasm · Local Playback · 10-Band EQ
- Thumbnail: `assets/apps/hljya-hljom.jpg` — 16:9 capture of the live app in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels downsampled), resized to 960×540. Captured 2026-11-21: the HD2Lab | Hlýja Hljóm bar, the console paused on a tagged MP3 with its embedded cover, `MP3` and `브라우저 디코더` chips, 44.1 kHz · 2ch · 1411 kbps, the seek bar and transport, the spectrum strip and `다음 곡`, and the library rail with four tracks (`AIFF`, `WAV`, `WAV`, `MP3`).

## What this record claims

- Opens one file or a whole folder from the front end alone: `한 곡 열기` (file picker) and `워크스페이스(폴더) 열기` (File System Access API with a `webkitdirectory` fallback, `하위 폴더 포함` switch), plus drag-and-drop of files or folders.
- All-codec playback through `CodecRouter`: the codec is named from the extension **and** the container signature, then decoded by the browser or by ffmpeg.wasm. Native: MP3, AAC, M4A, WAV, FLAC, OGG, Opus, WebM. Through ffmpeg.wasm: WMA, APE, AC-3, DTS, AIFF, ALAC (including ALAC hidden inside `.m4a`), MKA, Musepack, WavPack, TTA, DSD. A native decode the browser rejects falls back to ffmpeg automatically and the chip changes to `ffmpeg.wasm`.
- Two decks on one Web Audio graph: gapless hand-off on the sample boundary, or a 0–12 s crossfade with a gain ramp; the next native track is decoded in the background so the hand-off has something to start.
- 10-band graphic EQ (32 Hz – 16 kHz, eight peaking bands between a low and a high shelf, ±12 dB) with Flat, Warm, Bass Boost, Vocal, Classical and Electronic presets, master gain, stereo balance and bypass — all live.
- `AnalyserNode` spectrum or waveform on canvas; `.lrc` sync lyrics that attach automatically when a same-named sheet is selected, scroll to the active line and seek on click; MediaSession metadata and transport; output-device picker where `setSinkId` and more than one device exist.
- IndexedDB library: tags parsed in the browser (ID3v2.2/2.3/2.4 + ID3v1, FLAC Vorbis comments, MP4 `ilst`, Ogg, RIFF `INFO`), embedded artwork as a data URL, search across title/artist/album/codec, six sort columns, favourites, play counts, and the queue order restored on the next visit.
- Korean (존댓말) and English UI switch instantly with `KO | EN`; Navy & Lavender (dark, default) and Soft Iris (light) share the HD2Lab tokens (`#0B1020 / #12192E / #1A2340 / #A78BFA` dark, `#FAFAFD / #FFFFFF / #F4F1FC / #8B6CE8` light) and the 17×22 dual-skew `.mark`; no analytics, no uploads.
- Deployment: `.github/workflows/deploy.yml` (checkout → Node 22 → `npm ci` → `tsc --noEmit` → `npm test` → `npm run build` → configure-pages → upload artifact → deploy-pages) publishes `dist/` with Pages source "GitHub Actions".

## What was verified for this card

- Pages deployment: Actions run [44883851652](https://github.com/HyangDan2/PKPilot0016/actions/runs/44883851652) (push to `main`, commit `6da84d0`) — build **success** and deploy **success**. Two earlier runs had failed in 0 s because the workflow referenced `upload-pages-artifact@v3` without the `actions/` prefix; the reference was corrected in `f495bab` and the following run went green.
- Live URL returns HTTP 200 and renders the built bundle (`/PKPilot0016/assets/index-*.js`), not the repository source.
- Metadata on the live origin: `<title>`, `og:title` and `twitter:title` are all exactly `Hlýja Hljóm — HD2Lab 올코덱 로컬 음악 플레이어`; `og:image` is `https://hyangdan2.github.io/PKPilot0016/og-image.png?v=20261121-og`, served HTTP 200 as a 1200×630 PNG; `og:image:width/height` say 1200/630; `favicon.ico`, `favicon.svg`, `favicon-32x32.png`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`, `manifest.json` all return 200.
- The share card is the HD2's Diary OG layout (Soft Iris wash, 40 px grid, dual-skew mark, Inter/JetBrains Mono/Noto Sans KR, right-hand `FEATURES` card with four rows), rendered by `work/og-unify/render_app_og.py` from `tools/og-card.json` — not the earlier rounded-tile picture.
- Native journey on the live site: a 12 s WAV opened with its `.lrc` — title `Autumn Letter`, codec chip `WAV`, engine chip `브라우저 디코더`, 4 lyric lines with one active, clock advanced 0:02 → 0:03, library showed 2 rows.
- ffmpeg.wasm journey on the live site: a 4 s AIFF (a container Chromium cannot decode) — the chip switched to `ffmpeg.wasm`, codec `AIFF`, the status bar reached `ffmpeg 준비됨`, and playback advanced to 0:02 about 6 s after opening (the ~32 MB core was fetched from `unpkg.com/@ffmpeg/core@0.12.6/dist/esm/`).
- EQ preset `Bass Boost` set the 32 Hz band to `+7.0`; the ten sliders are vertical; bypass toggles.
- Theme and language on the live page: `data-theme` flipped to `iris`, `KO | EN` switched the interface to English (`Open a song`) and the document to `lang="en"`.
- No horizontal overflow: `documentElement.scrollWidth - clientWidth` is 0 at 1440×900 (empty console, playing, EQ, lyrics) and at 390×844 (empty, playing, EQ), with the mobile mini-player visible and working.
- Zero console errors, page errors and failed requests across the desktop, ffmpeg and mobile runs on the live origin.
- The app repository's own suites: `npx tsc --noEmit` clean, `npm test` 57/57 (codec router, sniffing, EQ + transition planning, LRC, IndexedDB library, tag parsers, queue), `npm run test:e2e` 21/21 across desktop 1440×900 and mobile 390×844 (including the gated AIFF → ffmpeg.wasm test), all re-run on the final commit.

## Not verified

- The folder picker (`showDirectoryPicker`) and drag-and-drop of a directory were not driven by automation — both need a native dialog or a real drag; the `webkitdirectory` fallback file input is the only folder path exercised, and only indirectly.
- Only AIFF stood in for the whole ffmpeg.wasm list; WMA, APE, AC-3, DTS, ALAC, MKA, DSD files were not played from real samples.
- iOS Safari and real Android WebView; the browser here was Chromium, and the mobile checks used device emulation at 390×844, not a physical device.
- Long-session behaviour (hours of playback, dozens of 30-minute tracks in the library, the audio cache cap) and MediaSession on a real lock screen were not exercised.
- Accessibility audit (screen reader, focus order through the EQ sliders) was not performed.

## Licence note

The app repository is MIT. Third-party components: React, Vite, `@ffmpeg/ffmpeg` and the ffmpeg.wasm core (LGPL 2.1 for the core build), `fake-indexeddb` and Playwright for tests. The MP3 fixture used in tests and the catalog screenshot is a public-domain silence file from `anars/blank-audio`; the WAV/AIFF/LRC fixtures are generated by `tools/make_test_audio.py`.
