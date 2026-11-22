# Onboarding — ObjectLens (PKPilot0012)

> Renamed 2026-11-22: the shelf entry is `ObjectLens` (was `Vektra Vár`). The app repository `PKPilot0012` carries
> the matching title, OG tags and in-app lockup; the dated live checks below were recorded under
> the previous name and are kept as recorded.

- App card ID: `vektra-var`
- Live URL: https://hyangdan2.github.io/PKPilot0012/ — HTTP 200, page title `Vektra Vár — HD2Lab 객체 탐지 스튜디오`, checked 2026-11-20
- Source: https://github.com/HyangDan2/PKPilot0012 (public, `main`, first push 2026-11-20)
- Category / tags: `Photo` / YOLO11n · ONNX Runtime · WebGPU · Local Inference
- Thumbnail: `assets/apps/vektra-var.jpg` — 16:9 capture of the live studio in a 1280×720 Chromium viewport (device scale 2, so 2560×1440 pixels downsampled), resized to 960×540. Captured 2026-11-20: the HD2Lab | Vektra Vár lockup with the `WASM` engine badge, a street photo with 21 boxes, and the confidence / IoU / COCO class panel.

## What this record claims

- Client-side object detection with a bundled YOLO11n ONNX model (COCO 80 classes, 640×640 input, 10.9 MB) served from the app's own origin.
- All inference runs in a dedicated Web Worker through onnxruntime-web, with the execution provider picked at runtime in the order WebGPU → WebGL → WASM. The badge and the engine panel report the provider that actually built the session.
- Inputs: multiple photos (file picker, drag and drop, two bundled samples), a local video file played frame by frame, and the webcam with front/back switching.
- Controls: confidence and IoU sliders, COCO 80 class chips with live counts, box / label / selected-class mosaic toggles, PNG export of the annotated frame and JSON export of source-pixel boxes.
- Model download is cached with the Cache API after the first visit; the ONNX Runtime wasm runtime is served from `public/ort/`, not a CDN.
- Soft Iris (light) and Navy & Lavender (dark) themes, HD2Lab dual-skew lockup, full favicon set and a 1200×630 OG card.
- GitHub Pages deployment: `gh-pages` branch artifact published by the repository's Pages configuration; the repository also carries `.github/workflows/deploy.yml` (tsc → vitest → build → Playwright → deploy-pages) for Actions-based publishing.

## What was verified for this card

- Live URL returns HTTP 200 and renders in Chromium.
- A bundled sample detects real objects on the live site: 21 detections across 3 classes (car, person, traffic light) from `sample-street.jpg`.
- `models/yolo11n.onnx`, `ort/ort-wasm-simd-threaded.jsep.wasm`, `og-image.png`, `manifest.json`, all five favicon assets and `samples/sample-street.jpg` return HTTP 200 with the expected content types on the live origin.
- `og:image`, `twitter:card`, `canonical` and `manifest` meta tags are present and absolute.
- No horizontal overflow: `documentElement.scrollWidth - innerWidth` is 0 at 1440×900 and at 390×844, on the landing page and in the studio with detections drawn.
- Theme toggle switches `data-theme` between light and dark on the live page.
- Console: 0 errors and 0 page errors during the live run.
- Automated checks in the app repository: `tsc --noEmit` clean, 30 Vitest unit tests (letterbox, NMS, YOLO decode, inverse mapping, JSON export), 6 Playwright E2E tests.

## Not verified

- WebGPU and WebGL execution paths on a real GPU device. The verification browser (headless Chromium in a container) exposes no WebGPU adapter, and onnxruntime-web's WebGL provider cannot resolve the model's `Split` operator (opset 22), so the live badge reads `WASM` there. The automatic fallback chain itself was exercised and reported correctly.
- Video playback and webcam capture on the live site — both need a local media file or a camera permission prompt, so this card only records their implementation in the repository, not a live run.
- iOS Safari behaviour; the live layout check was made with Chromium device emulation at 390×844.
- Inference speed on other devices: the container measured roughly 280–440 ms per 640×640 frame on WASM.

## Licence note

The bundled model is an Ultralytics YOLO11 export and carries AGPL-3.0; the app code is MIT. The two sample photographs are Unsplash License. Details are in the app repository's `THIRD_PARTY_NOTICES.md`.
