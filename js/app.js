import { categories, filterApps, readState, safeUrl, stateQuery, visibleApps } from './catalog.js';

const grid = document.querySelector('#app-grid');
const search = document.querySelector('#search');
const filters = document.querySelector('#filters');
const reset = document.querySelector('#reset');
const count = document.querySelector('#app-count');

let apps = [];
let state = { q: '', category: '' };

const element = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function card(app, index) {
  const article = element('article', 'app-card');
  article.dataset.app = app.id;

  const picture = element('div', 'card-image');
  const image = element('img');
  image.src = `./${app.thumbnail}`;
  image.alt = app.thumbnailAlt;
  image.width = 960;
  image.height = 540;
  image.loading = 'lazy';
  image.decoding = 'async';
  image.addEventListener('error', () => {
    image.src = './assets/apps/placeholder.svg';
    image.alt = `${app.title} — preview coming soon`;
  }, { once: true });
  picture.append(image, element('span', 'image-caption', app.imageKind === 'artwork' ? 'Official Art' : 'Live UI'));

  const body = element('div', 'card-body');
  const kicker = element('div', 'card-kicker');
  kicker.append(element('span', '', app.category.toUpperCase()), element('span', 'card-index', String(index + 1).padStart(2, '0')));

  const meta = element('div', 'card-meta');
  for (const tag of app.tags) meta.append(element('span', 'meta-pill', tag));
  meta.append(element('span', 'meta-pill', 'Runs in browser'));

  body.append(
    kicker,
    element('h3', 'card-title', app.title),
    element('p', 'card-subtitle', app.subtitle ?? ''),
    element('p', 'card-description', app.description),
    meta,
  );

  if (app.status === 'published' && safeUrl(app.launchUrl)) {
    const link = element('a', 'action-link', 'Open App');
    link.href = app.launchUrl;
    link.setAttribute('aria-label', `Open ${app.title}`);
    const arrow = element('span', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(arrow);
    body.append(link);
  } else {
    body.append(element('span', 'action-link unavailable', 'Under maintenance right now'));
  }

  article.append(picture, body);
  return article;
}

function renderFilters() {
  filters.replaceChildren();
  for (const category of ['', ...categories.filter(item => apps.some(app => app.category === item))]) {
    const button = element('button', 'filter-chip', category || 'All');
    button.type = 'button';
    button.dataset.category = category;
    button.setAttribute('aria-pressed', String(state.category === category));
    button.addEventListener('click', () => {
      state.category = category;
      update();
    });
    filters.append(button);
  }
}

function emptyState() {
  const box = element('div', 'empty');
  box.append(
    element('span', 'empty-icon', '⌕'),
    element('h3', '', apps.length ? 'No app matches that yet.' : 'New apps are on the way.'),
    element('p', '', apps.length ? 'Try another search term or reset the filters.' : 'A new tool will land here soon.'),
  );
  if (apps.length) {
    const button = element('button', 'primary', 'Show all apps');
    button.type = 'button';
    button.addEventListener('click', resetAll);
    box.append(button);
  }
  return box;
}

function update(push = true) {
  const query = stateQuery(state);
  if (push && location.search !== query) history.pushState(null, '', location.pathname + query + '#apps');
  search.value = state.q;
  for (const chip of filters.children) chip.setAttribute('aria-pressed', String(chip.dataset.category === state.category));
  const matches = filterApps(apps, state);
  count.textContent = String(matches.length).padStart(2, '0');
  count.hidden = false;
  grid.replaceChildren();
  if (!matches.length) grid.append(emptyState());
  for (const [index, app] of matches.entries()) grid.append(card(app, index));
  reset.disabled = !state.q && !state.category;
}

function resetAll() {
  state = { q: '', category: '' };
  update();
}

async function load() {
  grid.setAttribute('aria-busy', 'true');
  try {
    const response = await fetch('./data/apps.json');
    if (!response.ok) throw new Error('Catalog unavailable');
    const catalog = await response.json();
    if (catalog.schemaVersion !== 1 || !Array.isArray(catalog.apps)) throw new Error('Invalid catalog');
    apps = visibleApps(catalog);
    state = readState(location.search, apps);
    renderFilters();
    update(false);
  } catch {
    const message = element('div', 'load-message');
    message.setAttribute('role', 'alert');
    message.append(element('p', '', 'Couldn’t load the app list. Check your connection and try again.'));
    const retry = element('button', '', 'Try again');
    retry.type = 'button';
    retry.addEventListener('click', load);
    message.append(retry);
    grid.replaceChildren(message);
    count.hidden = true;
  } finally {
    grid.setAttribute('aria-busy', 'false');
  }
}

document.querySelector('#search-form').addEventListener('submit', event => {
  event.preventDefault();
  state.q = search.value.trim();
  update();
});
search.addEventListener('input', event => {
  if (event.isComposing) return;
  state.q = search.value;
  update();
});
search.addEventListener('compositionend', () => {
  state.q = search.value;
  update();
});
reset.addEventListener('click', resetAll);
window.addEventListener('popstate', () => {
  state = readState(location.search, apps);
  update(false);
});
load();
