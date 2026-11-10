import { loadCatalog } from './validate-catalog.mjs';

const urls = new Set();
const catalog = await loadCatalog();
for (const app of catalog.apps.filter(app => app.status === 'published')) {
  urls.add(app.launchUrl);
  if (app.repositoryUrl) urls.add(app.repositoryUrl);
}
urls.add('https://hyangdan2.github.io/');
urls.add('https://hyangdan2.github.io/GameHub/');
urls.add('https://hyangdan2.github.io/TechnicalHub/');

for (const url of urls) {
  let error;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      let response = await fetch(url, { method: 'HEAD', signal: AbortSignal.timeout(8000) });
      if ([403, 405, 501].includes(response.status)) {
        response = await fetch(url, { headers: { Range: 'bytes=0-1023' }, signal: AbortSignal.timeout(8000) });
        await response.body?.cancel();
      }
      if (!response.ok) throw Error(`HTTP ${response.status}`);
      console.log(`OK ${url} → ${response.url}`);
      error = null;
      break;
    } catch (caught) {
      error = caught;
    }
  }
  if (error) { console.error(`FAIL ${url}: ${error.message}`); process.exitCode = 1; }
}
console.log(`${urls.size} external destinations checked. HTTP checks do not establish content accuracy.`);
