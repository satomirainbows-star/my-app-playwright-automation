
const {
  Before,
  After,
  setDefaultTimeout
} = require('@cucumber/cucumber');

// increase cucumber timeout
setDefaultTimeout(60000);


Before(async function ({ pickle }) {

  // =========================
  // OPEN BROWSER FOR UI TEST
  // =========================

  if (
    pickle.tags.some(
      tag => tag.name === '@UI'
    )
  ) {

    await this.launchBrowser();
  }
});

After(async function ({ result, pickle }) {

  // =========================
  // TAKE SCREENSHOT ON FAILURE
  // =========================

  if (
    result.status === 'FAILED' &&
    this.page
  ) {

    const screenshotName =
      pickle.name
        .replace(/[^a-zA-Z0-9]/g, '_');

    await this.page.screenshot({

      path:
        `reports/screenshots/${screenshotName}.png`,

      fullPage: true
    });
  }

  // =========================
  // CLOSE BROWSER
  // =========================

  if (this.browser) {

    await this.closeBrowser();
  }
});

