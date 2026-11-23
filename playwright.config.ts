import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './scripts', testMatch: '*.spec.ts', workers: 1,
  use: { browserName: 'chromium', channel: 'chrome', headless: true },
  webServer: [
    { command: 'npm run dev -- --host 127.0.0.1', url: 'http://127.0.0.1:5173', reuseExistingServer: true },
    { command: 'npm run storybook -- --ci', url: 'http://localhost:6006', reuseExistingServer: true },
  ],
});
