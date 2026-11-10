import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { categories, filterApps, readState, safeUrl, sortApps, stateQuery, visibleApps } from '../js/catalog.js';
import { loadCatalog, safeFile, validateCatalog } from '../scripts/validate-catalog.mjs';

const catalog = await loadCatalog();

test('catalog satisfies the app schema and publishes a stable order', () => {
  assert.ok(catalog.apps.length >= 4);
  for (const app of catalog.apps) assert.ok(categories.includes(app.category), app.id);
  const visible = visibleApps(catalog);
  assert.deepEqual(visible.map(app => app.id), sortApps(visible).map(app => app.id));
  assert.ok(visible.every(app => safeUrl(app.launchUrl)));
});

test('Search matches title, subtitle, description, category, and tags with AND semantics', () => {
  const photo = filterApps(catalog.apps, { q: 'photo', category: '' });
  assert.ok(photo.some(app => app.id === 'photos'));
  assert.ok(photo.some(app => app.id === 'film-studio'));
  assert.equal(filterApps(catalog.apps, { q: 'photo', category: 'Learning' }).length, 0);
  assert.ok(filterApps(catalog.apps, { q: 'webgl2', category: '' }).some(app => app.id === 'film-studio'));
  assert.ok(filterApps(catalog.apps, { q: 'pwa', category: '' }).length >= 2);
  assert.ok(filterApps(catalog.apps, { q: 'LOCAL storage', category: 'Productivity' }).some(app => app.id === 'todo-master'));
  assert.deepEqual(filterApps(catalog.apps, { q: 'photo library', category: '' }).map(app => app.id), ['photos']);
  assert.equal(filterApps(catalog.apps, { q: 'nomatchterm', category: '' }).length, 0);
});

test('category state is validated against the catalog and round-trips through the query string', () => {
  assert.equal(readState('?category=Learning', catalog.apps).category, 'Learning');
  assert.equal(readState('?category=Unknown', catalog.apps).category, '');
  assert.equal(readState('', catalog.apps).category, '');
  const query = stateQuery({ q: 'film studio', category: 'Photo' });
  assert.equal(query, '?q=film+studio&category=Photo');
  assert.deepEqual(readState(query, catalog.apps), { q: 'film studio', category: 'Photo' });
  assert.equal(stateQuery({ q: '', category: '' }), '');
});

test('draft and maintenance apps stay out of the public list', () => {
  const clone = structuredClone(catalog);
  clone.apps[0].status = 'draft';
  clone.apps[1].status = 'maintenance';
  const visible = visibleApps(clone).map(app => app.id);
  assert.ok(!visible.includes(clone.apps[0].id));
  assert.ok(!visible.includes(clone.apps[1].id));
  assert.equal(filterApps(clone.apps, { q: '', category: '' }).length, catalog.apps.length - 2);
});

test('duplicate IDs, unsafe URLs, missing assets, and bad dates are rejected', async () => {
  const mutations = [
    value => value.apps.push(value.apps[0]),
    value => { value.apps[0].launchUrl = 'javascript:alert(1)'; },
    value => { value.apps[0].launchUrl = 'http://hyangdan2.github.io/AGPilot0002/'; },
    value => { value.apps[0].repositoryUrl = 'https://user:pass@example.com/repo'; },
    value => { value.apps[0].thumbnail = 'assets/apps/missing.jpg'; },
    value => { value.apps[0].thumbnail = '../package.json'; },
    value => { value.apps[0].updatedAt = '2026-02-30'; },
    value => { value.apps[0].tags = []; },
    value => { value.apps[0].status = 'live'; },
    value => { value.apps[0].evidencePath = 'docs/onboarding/missing.md'; },
    value => { value.apps[0].description = '   '; },
  ];
  for (const mutate of mutations) {
    const clone = structuredClone(catalog);
    mutate(clone);
    await assert.rejects(() => validateCatalog(clone), JSON.stringify(clone.apps[0]));
  }
});

test('two apps cannot share a launch destination', async () => {
  const clone = structuredClone(catalog);
  clone.apps[1].launchUrl = clone.apps[0].launchUrl;
  await assert.rejects(() => validateCatalog(clone), /Duplicate launch URL/);
});

test('unsafe external values are not treated as launchable', () => {
  assert.equal(safeUrl('https://hyangdan2.github.io/'), true);
  assert.equal(safeUrl('javascript:alert(1)'), false);
  assert.equal(safeUrl('http://example.com'), false);
  assert.equal(safeUrl('https://user:secret@example.com'), false);
  assert.equal(safeUrl('not a url'), false);
});

test('paths that escape the content directories are rejected', async () => {
  const temp = await fs.mkdtemp(path.join(os.tmpdir(), 'apphub-'));
  try {
    await fs.mkdir(path.join(temp, 'assets/apps'), { recursive: true });
    await fs.writeFile(path.join(temp, 'secret'), 'secret');
    await fs.symlink(path.join(temp, 'secret'), path.join(temp, 'assets/apps/link.jpg'));
    await assert.rejects(() => safeFile('assets/apps/link.jpg', 'assets/apps', temp));
  } finally {
    await fs.rm(temp, { recursive: true });
  }
});
