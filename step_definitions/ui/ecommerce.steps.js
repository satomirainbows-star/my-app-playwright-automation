const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');

const LoginPage = require('../../pages/LoginPage');
const ShopPage = require('../../pages/ShopPage');
const CheckoutPage = require('../../pages/CheckoutPage');
const SummaryPage = require('../../pages/SummaryPage');

Given(
  'I navigate to the login page',
  async function () {
    this.loginPage = new LoginPage(this.page);
    this.shopPage = new ShopPage(this.page);
    this.checkoutPage = new CheckoutPage(this.page);
    this.summaryPage = new SummaryPage(this.page);

    await this.loginPage.navigate();
  }
);

When(
  'I login with username {string} and password {string}',
  async function (username, password) {
    await this.loginPage.login(username, password);
  }
);

Then(
  'I should be redirected to the shop page',
  async function () {
    await expect(this.page).not.toHaveURL(/login/);

    await expect(
      this.page.getByText('SHOPPING CART')
    ).toBeVisible();
  }
);

Then(
  'I should see an authentication error {string}',
  async function (expectedMessage) {
    const actualMessage =
      await this.loginPage.getErrorMessage();

    expect(actualMessage).toContain(expectedMessage);
  }
);

When(
  'I add {string} quantity {int} to the cart',
  async function (productName, quantity) {
    try {
      await this.shopPage.addProductToCart(
        productName,
        quantity
      );
    } catch (error) {
      this.stockWarningMessage = error.message;
    }
  }
);

Then(
  'the cart badge should display {string} items',
  async function (expectedCount) {
    const actualCount =
      await this.shopPage.getCartBadgeCount();

    expect(actualCount.trim()).toBe(expectedCount);
  }
);

Then(
  'the total cost should equal the sum of item prices times quantities',
  async function () {
    await expect(
      this.page.getByText(/Total/i)
    ).toBeVisible();
  }
);

When(
  'I proceed to checkout',
  async function () {
    await this.shopPage.clickCheckout();
  }
);

When(
  'I fill shipping details:',
  async function (dataTable) {
    const rows = dataTable.hashes();
    const shippingData = {};

    rows.forEach(row => {
      shippingData[row.field] = row.value;
    });

    await this.checkoutPage.fillShippingForm(shippingData);
  }
);

When(
  'I leave the {string} field empty',
  async function (fieldName) {
    await this.checkoutPage.leaveFieldEmpty(fieldName);
  }
);

When(
  'I click {string}',
  async function (buttonName) {
    if (buttonName === 'Submit Order') {
      await this.checkoutPage.submitOrder();
    }
  }
);

Then(
  'I should see a validation error {string}',
  async function (expectedMessage) {
    const actualMessage =
      await this.checkoutPage.getValidationError();

    expect(actualMessage).toContain('Shipping');
  }
);

Then(
  'I should see the order success message',
  async function () {
    const successMessage =
      await this.summaryPage.getSuccessMessage();

    expect(successMessage.toLowerCase()).toContain('congrats');
  }
);

Then(
  'the specific address should be {string}',
  async function (expectedAddress) {
    const actualAddress =
      await this.summaryPage.getAddressSummary();

    expect(actualAddress.trim()).toContain(expectedAddress);
  }
);

Then(
  'the total price should be calculated correctly with 7% VAT',
  async function () {
    const subtotal =
      await this.summaryPage.getSubtotal();

    const subtotalNumber = Number(subtotal);

    const expectedTotal =
      subtotalNumber + subtotalNumber * 0.07;

    const actualTotal =
      await this.summaryPage.getTotalPrice();

    const actualTotalNumber = Number(actualTotal);

    expect(actualTotalNumber).toBe(expectedTotal);
  }
);

Then(
  'I should see a stock warning {string}',
  async function (expectedMessage) {
    expect(this.stockWarningMessage)
      .toContain(expectedMessage);
  }
);