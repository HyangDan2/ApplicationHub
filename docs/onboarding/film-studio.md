# Onboarding — Film Studio (AGPilot0007)

- App card ID: `film-studio`
- Live URL: https://hyangdan2.github.io/AGPilot0007/ — checked 2026-11-10, HTTP 200, page title `Film Studio | HD2Lab`
- Source: https://github.com/HyangDan2/AGPilot0007 (public, `main`, last push 2026-11-09)
- Category / tags: `Photo` / WebGL2 · PWA · 로컬 처리
- Thumbnail: `assets/apps/film-studio.jpg` — 16:9 crop of a 1440×810 capture of the live landing screen, resized to 960×540.

## What this record claims

- Browser-based photographic film simulation built with React 19, TypeScript, Vite, and Tailwind CSS v4; the colour engine runs on WebGL2/GLSL ES 3.00.
- Nine original film profiles (FS-001 … FS-009) grounded in sensitometric curves and dye-coupling behaviour.
- 3D LUT sampling, linear-space exposure and white balance, tone curves, luminance-modulated grain.
- Recipes are kept in IndexedDB; photos are decoded and processed in device memory with no server upload, analytics, or paid API.
- Two-stage export through the Web Share API or a direct file download, and offline PWA support.

## What was verified for this card

- The live URL responds and the landing screen (Open Photograph, Calibration Samples, nine film signatures) renders in Chromium at 1440×810.
- Claims come from the project README and the repository's technology table.

## Not verified

- Exported image fidelity, GPU behaviour on low-end devices, and the Web Share flow on real phones were not tested for this card.
- No manual colour-accuracy comparison against the described film stocks.
