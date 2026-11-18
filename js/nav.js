// HD2Lab hub navigation: the desktop category tabs live in the title bar (the
// Diary tab opens its sections on hover/focus through CSS), and on small screens
// the ≡ button unfolds the right-hand drawer, where Diary is an accordion. The
// markup contract is shared by every hub (.menu-button, #mobile-drawer,
// .drawer-backdrop, .drawer-close, .drawer-group, .drawer-toggle, .drawer-sub),
// so this file is identical in Web-HQ, ApplicationHub, GameHub, and TechnicalHub.
(() => {
  const menuButton = document.querySelector('.menu-button');
  const drawer = document.getElementById('mobile-drawer');
  if (!menuButton || !drawer) return;

  // Diary accordion. Collapsed sections keep their height transition, so the
  // links inside must leave the tab order some other way than display:none.
  const group = drawer.querySelector('.drawer-group');
  const toggle = group && group.querySelector('.drawer-toggle');
  const panel = group && group.querySelector('.drawer-sub');
  if (group && toggle && panel) {
    const setOpen = open => {
      group.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      panel.inert = !open;
      if (open) panel.removeAttribute('aria-hidden');
      else panel.setAttribute('aria-hidden', 'true');
    };
    setOpen(toggle.getAttribute('aria-expanded') === 'true');
    toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  }

  const backdrop = document.querySelector('.drawer-backdrop');
  const closeButton = drawer.querySelector('.drawer-close');
  const isOpen = () => drawer.classList.contains('is-open');

  function openDrawer() {
    if (backdrop) {
      backdrop.hidden = false;
      requestAnimationFrame(() => backdrop.classList.add('is-visible'));
    }
    drawer.classList.add('is-open');
    drawer.setAttribute('aria-hidden', 'false');
    menuButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('drawer-open');
    if (closeButton) closeButton.focus();
  }

  function closeDrawer(restoreFocus = true) {
    if (!isOpen()) return;
    drawer.classList.remove('is-open');
    if (backdrop) backdrop.classList.remove('is-visible');
    drawer.setAttribute('aria-hidden', 'true');
    menuButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('drawer-open');
    if (backdrop) {
      setTimeout(() => {
        if (!isOpen()) backdrop.hidden = true;
      }, 280);
    }
    if (restoreFocus) menuButton.focus();
  }

  menuButton.addEventListener('click', () => (isOpen() ? closeDrawer() : openDrawer()));
  if (closeButton) closeButton.addEventListener('click', () => closeDrawer());
  if (backdrop) backdrop.addEventListener('click', () => closeDrawer());
  drawer.addEventListener('click', event => {
    if (event.target.closest('a')) closeDrawer(false);
  });
  document.addEventListener('keydown', event => {
    if (!isOpen()) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      closeDrawer();
    }
  });
  // Leaving the mobile breakpoint must not strand the page in the drawer state.
  const desktop = window.matchMedia('(min-width: 821px)');
  if (desktop.addEventListener) {
    desktop.addEventListener('change', event => {
      if (event.matches) closeDrawer(false);
    });
  }
})();
