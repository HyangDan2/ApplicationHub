// HD2Lab hub theme: Soft Iris light (default) ↔ Navy & Lavender dark.
// The <head> snippet applies the stored theme before first paint; this binds
// the floating toggle and keeps the theme-color meta and button labels in sync.
(() => {
  const STORAGE_KEY = 'hd2-theme';
  const root = document.documentElement;
  const toggle = document.querySelector('#theme-toggle');
  if (!toggle) return;

  const icon = toggle.querySelector('.theme-toggle-icon');
  const label = toggle.querySelector('.theme-toggle-label');
  const meta = document.querySelector('meta[name="theme-color"]');

  const apply = theme => {
    const dark = theme === 'dark';
    root.dataset.theme = dark ? 'dark' : 'light';
    if (meta) meta.setAttribute('content', dark ? '#0B1020' : '#FAFAFD');
    toggle.setAttribute('aria-pressed', String(dark));
    toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    if (icon) icon.textContent = dark ? '☀️' : '🌙';
    if (label) label.textContent = dark ? 'Light' : 'Dark';
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
