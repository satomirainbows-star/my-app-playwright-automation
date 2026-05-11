class CheckoutPage {
  constructor(page) {
    this.page = page;
  }

  async fillShippingForm(shippingData) {
    const inputs = await this.page.locator('input').all();

    // input[0] = Phone number
    // input[1] = Street
    // input[2] = City

    await inputs[0].fill('0999999999');
    await inputs[1].fill(shippingData.street);
    await inputs[2].fill(shippingData.city);

    await this.page
      .locator('select')
      .selectOption({
        label: shippingData.country
      });
  }

  async leaveFieldEmpty(fieldName) {
    const inputs = await this.page.locator('input').all();

    if (fieldName.toLowerCase() === 'street') {
      await inputs[1].fill('');
    }
  }

  async submitOrder() {
    await this.page
      .getByRole('button', {
        name: 'Submit Order'
      })
      .click();
  }

  async getValidationError() {
    return await this.page
      .locator('body')
      .textContent();
  }
}

module.exports = CheckoutPage;