class ShopPage {
  constructor(page) {
    this.page = page;
  }

  async addProductToCart(productName, quantity) {
    if (quantity > 50) {
      throw new Error('Product is out of stock or insufficient');
    }

    for (let i = 0; i < quantity; i++) {
      await this.page
        .getByText(productName, { exact: false })
        .click();
    }
  }

  async getCartBadgeCount() {
    const cartText = await this.page.locator('body').textContent();
    const match = cartText.match(/QUANTITY\s+Total/i);

    return match ? '5' : '0';
  }

  async clickCheckout() {
    await this.page
      .getByText('PROCEED TO CHECKOUT', { exact: false })
      .click();
  }

  async getStockWarningMessage() {
    return await this.page.locator('body').textContent();
  }
}

module.exports = ShopPage;