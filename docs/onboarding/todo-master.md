# Onboarding — Todo Master (AGPilot0002)

- App card ID: `todo-master`
- Live URL: https://hyangdan2.github.io/AGPilot0002/ — checked 2026-11-10, HTTP 200, page title `HD2Lab | Todo Master`
- Source: https://github.com/HyangDan2/AGPilot0002 (public, `main`, last push 2026-11-07)
- Category / tags: `Productivity` / PWA · 오프라인 · 로컬 저장
- Thumbnail: `assets/apps/todo-master.jpg` — 16:9 crop of a 1440×810 capture of the live app, resized to 960×540. The visible tasks are the app's own built-in sample records (`js/services/storage.js` → `getDefaultTodos()`), not user data.

## What this record claims

- The app is a static, framework-free browser app (ES modules) published on GitHub Pages.
- It manages tasks with due dates, priority, categories, subtasks, recurrence, Today Focus, inline/modal editing, multi-delete undo, and backup/restore with duplicate analysis.
- Data is stored in the browser; the app installs as a PWA and works offline through a service worker.
- Keyboard shortcuts and ARIA patterns are documented in the repository README.

## What was verified for this card

- The live URL responds, the page loads in Chromium at 1440×810, and its title matches.
- The description and tags were written from the repository README and the code that implements the defaults.

## Not verified

- No manual exercise of individual features, no keyboard/screen-reader session, and no physical mobile device test were performed for this card.
- The screenshot shows the seeded sample state; persistence across sessions was not re-tested here.
