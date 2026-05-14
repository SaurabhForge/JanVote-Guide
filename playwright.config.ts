import { defineConfig, devices } from "@playwright/test";

/**
 * Playwright E2E Configuration for JanVote Guide
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  // Directory containing test files
  testDir: "./e2e",

  /* Run tests in files in parallel */
  fullyParallel: true,

  /* Fail the build on CI if you accidentally left test.only in the code */
  forbidOnly: !!process.env.CI,

  /* Retry failed tests on CI */
  retries: process.env.CI ? 2 : 0,

  /* Opt out of parallel tests on CI */
  workers: process.env.CI ? 1 : undefined,

  /* Reporter to use */
  reporter: [["html", { open: "never" }], ["list"]],

  /* Shared settings for all the projects below */
  use: {
    /* Base URL — point to deployed GCP URL or local dev server */
    baseURL:
      process.env.PLAYWRIGHT_BASE_URL ||
      "https://janvote-guide-444951391032.asia-south1.run.app",

    /* Collect trace when retrying the failed test */
    trace: "on-first-retry",

    /* Take screenshot on failure */
    screenshot: "only-on-failure",

    /* Set a reasonable action timeout */
    actionTimeout: 15_000,

    /* Navigation timeout */
    navigationTimeout: 30_000,
  },

  /* Test across Chromium and Firefox */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },
  ],

  /* Run your local dev server before starting the tests (optional) */
  // webServer: {
  //   command: "npm run dev",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },
});
