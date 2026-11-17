// HD2Lab hub theme: Soft Iris light (default) ↔ Navy & Lavender dark.
// The <head> snippet applies the stored theme before first paint; this binds
// the floating toggle, keeps the theme-color meta in sync, and keeps the
// button's accessible name current. The button itself is icon-only (44×44):
// CSS shows the moon in light mode and the sun in dark mode.
(() => {
  const STORAGE_KEY = 'hd2-theme';
  const root = document.documentElement;
  const toggle = document.querySelector('#theme-toggle');
  if (!toggle) return;

  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = theme => {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    if (meta) meta.setAttribute('content', dark ? '#0B1020' : '#FAFAFD');
    const label = dark ? 'Switch to light mode' : 'Switch to dark mode';
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', label);
    toggle.setAttribute('title', label);
  };

  apply(root.dataset.theme === 'dark' ? 'dark' : 'light');

  toggle.addEventListener('click', () => {
    const next = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // Storage can be blocked (private mode); the toggle still works for this page.
    }
    apply(next);
  });
})();
