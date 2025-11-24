import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './src',
  timeout: 30000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
});