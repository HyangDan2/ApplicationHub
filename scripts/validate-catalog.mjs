import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import Ajv from 'ajv';
import { safeUrl } from '../js/catalog.js';

export const root = path.resolve(import.meta.dirname, '..');

export async function safeFile(relative, directory, base = root) {
  const allowed = await fs.realpath(path.join(base, directory));
  const actual = await fs.realpath(path.resolve(base, relative));
  if (!actual.startsWith(allowed + path.sep) || !(await fs.stat(actual)).isFile()) throw Error(`Disallowed path: ${relative}`);
  return actual;
}

const isRealDate = value => /^\d{4}-\d{2}-\d{2}$/.test(value)
  && !Number.isNaN(Date.parse(`${value}T00:00:00Z`))
  && new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10) === value;

export async function validateCatalog(catalog, base = root) {
  const schema = JSON.parse(await fs.readFile(path.join(root, 'schema/apps.schema.json'), 'utf8'));
  const validate = new Ajv({ allErrors: true }).compile(schema);
  if (!validate(catalog)) throw Error(JSON.stringify(validate.errors));

  const ids = new Set();
  const launchUrls = new Set();
  for (const app of catalog.apps) {
    if (ids.has(app.id)) throw Error(`Duplicate ID: ${app.id}`);
    ids.add(app.id);
    if (!safeUrl(app.launchUrl)) throw Error(`Unsafe launch URL: ${app.id}`);
    if (launchUrls.has(app.launchUrl)) throw Error(`Duplicate launch URL: ${app.id}`);
    launchUrls.add(app.launchUrl);
    if (app.repositoryUrl && !safeUrl(app.repositoryUrl)) throw Error(`Unsafe repository URL: ${app.id}`);
    if (!isRealDate(app.updatedAt)) throw Error(`Invalid date: ${app.id}`);
    if (app.status === 'published' && (app.imageKind === undefined)) throw Error(`Missing imageKind: ${app.id}`);
    if (!app.description.trim()) throw Error(`Empty description: ${app.id}`);
    await safeFile(app.thumbnail, 'assets/apps', base);
    await safeFile(app.evidencePath, 'docs/onboarding', base);
  }
  return catalog;
}

export async function loadCatalog() {
  return validateCatalog(JSON.parse(await fs.readFile(path.join(root, 'data/apps.json'), 'utf8')));
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const catalog = await loadCatalog();
  const published = catalog.apps.filter(app => app.status === 'published').length;
  console.log(`Validated ${catalog.apps.length} apps (${published} published).`);
}
