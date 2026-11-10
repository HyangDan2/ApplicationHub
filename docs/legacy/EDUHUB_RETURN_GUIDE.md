# Educational Site Return-to-EduHub Harness

## Fixed hierarchy

Educational site ↔ EduHub → Web-HQ. The course's cross-site return action is “← EduHub”. Web-HQ navigation belongs to EduHub. Preserve the course's own home, curriculum, previous/next, lab, and reference navigation.

Use an ordinary same-tab anchor to the configured absolute Hub URL plus `#entry-<course-id>`. EDPilot0001 currently targets `https://hyangdan2.github.io/EduHub/#entry-edpilot0001`. The Hub URL is confirmed for deployment. Validate the public round trip after publishing.

Never use `history.back()`, referrer-based routing, an iframe, or an arbitrary query-string return destination. Return must work after direct entry or a bookmarked nested page.

## EDPilot0001 implementation

Edit `tools/render_site.py::header`, not generated HTML. The shared `.hub-link` replaces the former `.hq-link` Web-HQ action. Rebuild to propagate it to the main page, all chapters, labs, and appendices. The root entry redirects to main.html and retains its existing fallback link.

Update `tests/browser_check.py` to assert the EduHub destination. Keep the theme namespace `mlstudy-theme` and existing browser behavior intact. Do not clear storage, add unsaved-progress promises, or alter numerical algorithms for navigation work.

Use the existing header layout, visible focus, keyboard activation, and mobile reflow. Keep the destination discoverable without covering learning content. Preserve no-JavaScript readability and print behavior.

## Verification and publishing boundary

Use the course's environment and run `npm run build`, `npm test`, and `npm run test:browser`. Run Notebook reproduction when numerical sources change. Browser checks cover the generated pages under the project subpath at 320/390/1440 widths.

For end-to-end local verification, use EduHub's preview server: it serves both built projects and rewrites these exact navigation destinations in HTTP responses only. Inspect direct chapter entry → EduHub card → course and Hub detail → course.

Neither a successful local round trip nor generated HTML establishes a successful deployed round trip. Deploy only when requested, then verify both exact public sites. Report local/source state separately from live state.
