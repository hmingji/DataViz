import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'https://blood-donation-trend-git-test-hmingji.vercel.app',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
