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
    image.alt = `${app.title} — 미리보기 준비 중`;
  }, { once: true });
  picture.append(image, element('span', 'image-caption', app.imageKind === 'artwork' ? '공식 소개 이미지' : '실제 화면'));

  const body = element('div', 'card-body');
  const kicker = element('div', 'card-kicker');
  kicker.append(element('span', '', app.category.toUpperCase()), element('span', 'card-index', String(index + 1).padStart(2, '0')));

  const meta = element('div', 'card-meta');
  for (const tag of app.tags) meta.append(element('span', 'meta-pill', tag));
  meta.append(element('span', 'meta-pill', '브라우저에서 바로'));

  body.append(
    kicker,
    element('h3', 'card-title', app.title),
    element('p', 'card-subtitle', app.subtitle ?? ''),
    element('p', 'card-description', app.description),
    meta,
  );

  if (app.status === 'published' && safeUrl(app.launchUrl)) {
    const link = element('a', 'action-link', '앱 열기');
    link.href = app.launchUrl;
    link.setAttribute('aria-label', `${app.title} 열기`);
    const arrow = element('span', '', '↗');
    arrow.setAttribute('aria-hidden', 'true');
    link.append(arrow);
    body.append(link);
  } else {
    body.append(element('span', 'action-link unavailable', '지금은 점검 중이에요'));
  }

  article.append(picture, body);
  return article;
}

function renderFilters() {
  filters.replaceChildren();
  for (const category of ['', ...categories.filter(item => apps.some(app => app.category === item))]) {
    const button = element('button', 'filter-chip', category || '전체');
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
    element('h3', '', apps.length ? '아직 찾는 앱이 없어요.' : '새 앱을 준비하고 있어요.'),
    element('p', '', apps.length ? '다른 검색어를 입력하거나 필터를 초기화해 보세요.' : '곧 이 자리에 새 도구가 들어옵니다.'),
  );
  if (apps.length) {
    const button = element('button', 'primary', '전체 앱 보기');
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
    message.append(element('p', '', '앱 목록을 불러오지 못했어요. 연결을 확인하고 다시 시도해 주세요.'));
    const retry = element('button', '', '다시 불러오기');
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
