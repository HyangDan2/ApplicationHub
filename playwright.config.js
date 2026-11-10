import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: true,
  use: { baseURL: 'http://127.0.0.1:4175/ApplicationHub/', browserName: 'chromium' },
  webServer: { command: 'PORT=4175 node scripts/serve.mjs', url: 'http://127.0.0.1:4175/ApplicationHub/', reuseExistingServer: false },
  reporter: 'list',
});
