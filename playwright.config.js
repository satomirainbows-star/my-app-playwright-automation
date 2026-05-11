const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({

  // timeout ของแต่ละ test
  timeout: 30000,

  // report configuration
  reporter: [
    ['html', { outputFolder: 'reports/html' }],
    ['json', { outputFile: 'reports/json/report.json' }]
  ],

  use: {

    // base url ของระบบ
    baseURL: 'https://qa-practice.razvanvancea.ro',

    // screenshot เมื่อ fail
    screenshot: 'only-on-failure',

    // video เมื่อ fail
    video: 'retain-on-failure',

    // trace debugging
    trace: 'retain-on-failure',

    // browser viewport
    viewport: {
      width: 1440,
      height: 900
    },

    // headless mode
    headless: true
  }
});