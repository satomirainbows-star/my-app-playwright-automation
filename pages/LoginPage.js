class LoginPage {

  constructor(page) {

    this.page = page;

    this.emailInput =
      page.locator('input[type="email"]');

    this.passwordInput =
      page.locator('input[type="password"]');

    this.submitButton =
      page.getByRole('button', {
        name: 'Submit'
      });
  }

  async navigate() {

    await this.page.goto(
      'https://qa-practice.razvanvancea.ro/auth_ecommerce.html'
    );
  }

  async login(email, password) {

    await this.emailInput.fill(email);

    await this.passwordInput.fill(password);

    await this.submitButton.click();
  }

  async getErrorMessage() {

    return await this.page
      .locator('body')
      .textContent();
  }
}

module.exports = LoginPage;

