# Onboarding — DOS Player (PKPilot0006)

- App card ID: `dos-player`
- Live URL: https://hyangdan2.github.io/PKPilot0006/ — checked 2026-11-16, HTTP 200, page title `HD2Lab | DOS Player (PKPilot0006)`
- Source: https://github.com/HyangDan2/PKPilot0006 (standalone repository; the app previously lived under `HyangDan2/HyangDan2.github.io/PKPilot0006` and was moved out). Added in PR #51, squash-merged as `235b020`.
- Category / tags: `Utility` / js-dos · DOSBox WASM · Retro Games
- Thumbnail: `assets/apps/dos-player.jpg` — 16:9 capture of the live site in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels downsampled), resized to 960×540. Captured 2026-11-16 with shareware DOOM booted and sitting on its title screen: the `HD2Lab | DOS Player` header with the `실행 중 · DOOM` chip, the player with DOOM's title art and its `NEW GAME / OPTIONS / LOAD GAME` menu inside the bezel, the `바로실행용` library (Digger, DOOM, Dhrystone 2), the key guide and the local-file dropzone. The page is scrolled to the player panel.

## What this record claims

- A static, build-free instant-play player for DOS software: HTML, CSS and plain JavaScript. The emulator is js-dos v8.5.4 (DOSBox compiled to WebAssembly), loaded as an ES module from `https://v8.js-dos.com/latest/js-dos.js` with its stylesheet.
- Three public, pre-built bundles boot with one click. They are linked from the js-dos project's own CDN and are not redistributed by this repository:

  | Bundle | URL | Bytes | Origin |
  |---|---|---|---|
  | Digger | `https://v8.js-dos.com/bundles/digger.jsdos` | 26,875 | Windmill Software, 1983 — contains `DIGGER.COM` |
  | DOOM (shareware, episode 1) | `https://v8.js-dos.com/bundles/doom.jsdos` | 5,539,791 | id Software, 1993 |
  | Dhrystone 2 | `https://v8.js-dos.com/bundles/dhry2.jsdos` | 178,752 | contains `dhry_2.exe` + `DOS4GW.EXE` — a DOS/4GW benchmark, not a FreeDOS boot image |

- The first bundle (Digger) is selected on load and boots from a single press of the `▶ 실행` veil; `Dos()` is called inside that click so the browser's audio autoplay policy does not block the emulator. Choosing another library card calls `stop()` on the running instance and boots the new bundle. `?game=doom` / `?game=dhrystone` deep-links straight to a bundle, and the last choice is remembered in `localStorage`.
- A local `.jsdos` or `.zip` file can be dropped anywhere on the page or picked through the dropzone; it is opened with `URL.createObjectURL(file)` and is never uploaded. The note under the dropzone says so on the page.
- Player controls: native Fullscreen API on the screen shell (with an in-fullscreen exit button, because js-dos consumes the Escape key), mute through `setVolume(0|1)`, and restart through `stop()` + re-boot. A touch gamepad sends real `KeyboardEvent`s (with `keyCode`) to the emulator for arrows, Enter, Space, Ctrl, Esc, Y and N.
- js-dos injects its own chrome; the app hides the collapsed sidebar, its spacer, the background image and js-dos's Dhrystone boot overlay with CSS, and keeps its own toolbar instead. `mouseCapture` is off so the "Click to capture mouse" overlay does not cover the screen.
- Interface language is Korean (the app's own UI); the hub card is English like the rest of the catalog.

## What was verified for this card

- Every bundle URL answered HTTP 200 with `curl`, returning `access-control-allow-origin` for the `Origin: https://hyangdan2.github.io` request, so the CDN is CORS-usable from GitHub Pages.
- Each of the three bundles was booted in headless Chromium and rendered a real screen, not just an error page: Digger's title screen and, after Enter, its playfield; DOOM's id-credits screen and its main menu; Dhrystone 2's benchmark result window (`VAX 96.95`, `Cycles MAX 89950`). Boot times after the first load: Digger 2.7 s, DOOM 2.6 s, Dhrystone 1.6 s.
- The same three booted again on the deployed site: `https://hyangdan2.github.io/PKPilot0006/` loaded with zero console errors, zero page errors, zero failed requests and zero responses ≥ 400; `document.documentElement.scrollWidth - innerWidth` was 0.
- Deployed file hashes matched the repository after the merge: `index.html`, `style.css`, `app.js`, `manifest.json`, `og-image.png`, `favicon.ico`, `favicon.svg`, `icon-192.png` and `README.md` all had identical SHA-256 digests locally and on the live URL.
- Local `.jsdos` loading was exercised with the real Digger bundle through the hidden file input; the player reported `01 / RUNNING`, and the filename, size (`digger.jsdos · 26 KB · 로컬 파일`) and title appeared in the player bar.
- The touch gamepad was exercised on DOOM: one ArrowDown press from the pad changed the captured frame by a mean of 63 levels of pixel difference, i.e. the key reached the emulator rather than staying in the page.
- Mute toggled `aria-pressed="true"` with the label reading `무음`; fullscreen entered and left through the app's own buttons in headless Chromium; restart produced a fresh canvas.
- Layout: zero horizontal overflow at 1440×900, 390×844, 320, 768 and 1024 px. On a 390×844 viewport the 325×203 canvas fills the 328×205 shell. No unnamed buttons, no images without `alt`, one `h1`, no duplicate `id`s.
- Only `v8.js-dos.com` and `hyangdan2.github.io` were contacted while booting a bundled game.

## Not verified

- No physical iPhone or Android check, and no Safari, Firefox or in-app-browser (KakaoTalk) acceptance; the mobile checks above are Chromium viewports with touch emulation, not device testing. Touch input, audio output and the soft-keyboard path on real phones remain unverified.
- Games other than Digger, DOOM and Dhrystone 2 were not tried; the js-dos CDN returned 404 for about sixty other public bundle names (keen4, prince, wolf3d, duke3d, tetris, sopwith, alley, supaplex and others), so a fourth public bundle could not be offered.
- A plain `.zip` without the `.jsdos/dosbox.conf` bundle layout was not tested; only `.jsdos` files are confirmed to open. A malformed archive produces the app's generic boot-timeout message on the page, which was not exercised.
- Long-run stability (audio dropouts, saving inside the emulator, cloud saves are disabled) and multi-tens-of-megabytes bundles were not measured.
- Bundle licensing beyond "the js-dos project publishes these files" was not assessed; Digger and Dhrystone 2 are labelled Freeware and Benchmark on the card, DOOM as Shareware.
