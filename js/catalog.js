export const categories = ['Productivity', 'Photo', 'Learning', 'Utility'];

export function sortApps(apps) {
  return [...apps].sort((a, b) => a.sortOrder - b.sortOrder || a.id.localeCompare(b.id));
}

export function visibleApps(catalog) {
  return sortApps(catalog.apps.filter(app => app.status === 'published'));
}

export function safeUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function readState(search, apps) {
  const params = new URLSearchParams(search);
  const category = params.get('category') ?? '';
  return {
    q: (params.get('q') ?? '').slice(0, 200),
    category: categories.includes(category) && apps.some(app => app.category === category) ? category : '',
  };
}

export function stateQuery(state) {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.category) params.set('category', state.category);
  return params.size ? `?${params}` : '';
}

export function filterApps(apps, state) {
  const terms = state.q.normalize('NFC').toLocaleLowerCase().trim().split(/\s+/).filter(Boolean);
  return sortApps(apps.filter(app =>
    app.status === 'published'
    && (!state.category || app.category === state.category)
    && terms.every(term => [app.title, app.subtitle ?? '', app.description, app.category, ...app.tags]
      .join(' ').normalize('NFC').toLocaleLowerCase().includes(term))));
}
