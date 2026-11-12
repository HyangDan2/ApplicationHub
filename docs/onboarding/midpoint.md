# Onboarding — Midpoint (PKPilot0002)

- App card ID: `midpoint`
- Live URL: https://hyangdan2.github.io/PKPilot0002/ — checked 2026-11-13, HTTP 200, page title `HD2Lab | Midpoint (PKPilot0002)`
- Source: https://github.com/HyangDan2/HyangDan2.github.io/tree/main/PKPilot0002 (folder inside the Web-HQ repository; no standalone repository exists)
- Category / tags: `Utility` / NAVER Maps · Transit & Drive · Course Pairing
- Thumbnail: `assets/apps/midpoint.jpg` — 16:9 1440×810 capture of the live site (device scale 2), resized to 960×540. The screen shows the transit-mode midpoint between Gangnam and Hongdae with equal 5.63 km distances and a 100% fairness score.

## What this record claims

- Static web application on NAVER Maps Web API v3 with no build step; the only external key is the map key.
- Up to 12 starting points, added by map click, live autocomplete over the built-in station and highway-spot data, or quick-select presets that change with the travel mode.
- Midpoint engine with three views: fairest point (1-center of the minimum enclosing circle, default), balanced point (geometric median), and centroid. Each participant is connected by a dashed line with a straight-line distance, and a fairness index grades how evenly the distances fall.
- Meeting-spot recommendation in two modes: transit (urban rail, KTX/SRT stations, bus terminals) and drive (highway ICs, rest areas, large parking hubs), with long-distance weighting for groups spread more than 50 km apart.
- Nearby restaurants and cafes in-app: built-in snapshots around 30 hubs, and a live OpenStreetMap Overpass lookup for any other coordinate, paired into a first-stop restaurant plus a walkable second-stop cafe course.
- Shareable state in the URL query string (`p`, `n`, `m`, `t`); desktop left panel and mobile bottom sheet.

## What was verified for this card

- The live URL responds, and Chromium 1440×810 loaded the deployed page with no page or console errors.
- On the live site, the transit-mode presets rendered; adding `강남역` and `홍대입구역` produced a midpoint near 이촌역, two equal 5.63 km distances, and a 100% fairness score.
- The card's launch URL is the app's own GitHub Pages deployment; the hub does not host it.
- Behaviour and file layout beyond the above were taken from the project README in the repository, not re-tested by the hub.

## Not verified

- Drive mode, the long-distance weighting, the alternative midpoint modes, share-link round trips, and the routing deep links into Kakao Map, NAVER Map, Kakao Navi, and T map were not exercised for this card.
- Live Overpass restaurant and cafe lookup, the radius widening and retry paths, and the course pairing quality were not re-tested for this card.
- No physical iPhone or Android check, and no Safari or Firefox acceptance. Mobile layout claims come from the project's own screenshots and README.
- Restaurant and cafe data are OpenStreetMap (ODbL) snapshots or live OSM queries; names and opening state can drift from the map providers' own listings.
