// The public path follows the repository name, so the site keeps working when the
// repository is renamed. GitHub App tokens without the `workflows` permission cannot edit
// .github/workflows/pages.yml, so a stale PUBLIC_URL is corrected (and reported) instead of
// failing the build.
export const HUB_BASES = ['/ApplicationHub/', '/EduHub/'];
export const repoName = (process.env.GITHUB_REPOSITORY ?? '').split('/')[1] || 'ApplicationHub';
export const BASE = `/${repoName}/`;

export function resolveOrigin(value) {
  if (!value) return undefined;
  if (!value.startsWith('https://')) throw new Error('PUBLIC_URL must be a confirmed HTTPS URL');
  const url = new URL(value);
  const current = url.pathname.endsWith('/') ? url.pathname : `${url.pathname}/`;
  if (current === BASE) return `${url.origin}${BASE}`;
  if (!HUB_BASES.includes(current)) throw new Error(`PUBLIC_URL must end with ${BASE}`);
  const corrected = `${url.origin}${BASE}`;
  console.warn(`PUBLIC_URL base ${current} does not match ${BASE}; using ${corrected}.`);
  return corrected;
}
