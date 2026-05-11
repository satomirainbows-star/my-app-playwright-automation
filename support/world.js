const { setWorldConstructor } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

class CustomWorld {

  constructor() {
    this.browser = null;
    this.context = null;
    this.page = null;

    // API response storage
    this.response = null;

    // Request body storage
    this.requestBody = null;
  }

  async launchBrowser() {

    this.browser = await chromium.launch({
      headless: true
    });

    this.context = await this.browser.newContext();
    this.page = await this.context.newPage();
  }

  async closeBrowser() {

    await this.page?.close();
    await this.context?.close();
    await this.browser?.close();
  }
}

setWorldConstructor(CustomWorld);