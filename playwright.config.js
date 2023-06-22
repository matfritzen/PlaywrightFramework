// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  timeout: 30 * 1000,
  expect:{
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  // retries: process.env.CI ? 2 : 0,
  retries: 2,
  /* Opt out of parallel tests on CI. */
  // workers: process.env.CI ? 1 : undefined,
  workers: 1, // workers define how many browsers will run parallelly 
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  // reporter: 'html'
  reporter: "allure-playwright",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    // browserName: 'chromium',
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    // trace: 'on-first-retry',
    // trace: 'on', // In this case the traces are generated for all test cases
    // trace: 'on', // In this case the traces are generated for the failure scenarios
    // screenshot: 'on' //on, off, only-on-failure

  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chrome',
      use: { 
        ...devices["Desktop Chrome"],
        browserName:'chromium',
       headless: false,
       ignoreHTTPSErrors: true, // to avoid SSL errors
       permissions:['geolocation'], // if the system request the user to allow to use the location
      trace:'on',
      screenshot: 'off',
      video:'retain-on-failure',
      // viewport: {width:720, height:720}
      }
    },
    // {
    //   name: 'firefox',
    //   use: { 
    //     ...devices['Desktop Firefox'],
    //     headless:false,
    //     trace:'on',
    //     screenshot: 'off'
    //   },
    // },

    {
      name: 'safari',
      use: { 
        ...devices["Desktop Safari"],
        browserName:'webkit',
        headless:false,
        trace:'retain-on-failure',
        screenshot: 'off',
        // ...devices['iPhone 11'] // select the device you want to have the specific width and height
        },
    },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ..devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});

