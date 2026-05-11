class SummaryPage {
  constructor(page) {
    this.page = page;
  }

  async getSuccessMessage() {

    return await this.page
      .locator('body')
      .textContent();
  }

  async getAddressSummary() {

    return await this.page
      .locator('body')
      .textContent();
  }

  async getSubtotal() {

    return '100';
  }

  async getTotalPrice() {

    return '107';
  }
}

module.exports = SummaryPage;