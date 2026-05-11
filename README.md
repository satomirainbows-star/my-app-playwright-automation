# 🚀 Playwright Cucumber Automation Framework

UI Automation Testing Framework using **Playwright + Cucumber (BDD)** with **Page Object Model (POM)** architecture.

---

# 📌 Tech Stack

* Playwright
* Cucumber.js
* JavaScript
* Node.js
* GitHub Actions
* Page Object Model (POM)

---

# 📂 Project Structure

```my-app-playwright-automation/
│
├── features/
│   └── ui/
│       └── ecommerce.feature
│
├── pages/
│   ├── CheckoutPage.js
│   ├── LoginPage.js
│   ├── ShopPage.js
│   └── SummaryPage.js
│
├── step_definitions/
│   └── ui/
│       └── ecommerce.steps.js
│
├── support/
│   └── hooks.js
│
├── reports/
│
├── .github/
│   └── workflows/
│       └── playwright-cucumber.yml
│
├── package.json
├── package-lock.json
└── README.md
```

---

# ✨ Features

✅ UI Automation Testing
✅ BDD Testing with Cucumber
✅ Page Object Model (POM)
✅ Positive & Negative Scenarios
✅ Tag-based Test Execution
✅ GitHub Actions CI/CD
✅ Checkout & Cart Validation
✅ Shipping Form Validation
✅ Reusable Framework Structure

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone <repository-url>
cd my-app-playwright-automation
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Install Playwright Browsers

```bash
npx playwright install
```

---

# ▶️ Run Tests

## Run All Tests

```bash
npm run test:ui
```

---

# 🏷️ Run Tests by Tags

## Run Positive Tests

```bash
npm run test:positive
```

## Run Negative Tests

```bash
npm run test:negative
```

## Run Smoke Tests

```bash
npm run test:smoke
```

---

# 🧪 Example Tags

```gherkin
@positive
@negative
@smoke
@regression
@critical
```

---

# 📝 Example Feature

```gherkin
@positive @smoke

Scenario: Complete purchase with valid data

  Given I navigate to the login page

  When I login with username "admin@admin.com" and password "admin123"

  Then I should be redirected to the shop page
```

---

# 🏗️ Framework Architecture

## Page Object Model (POM)

The framework separates:

* Page Actions
* Locators
* Assertions
* Step Definitions
* Feature Files

### Benefits

* Better maintainability
* Reusable components
* Scalable automation framework
* Cleaner test scripts

---

# ✅ Test Scenarios

## Positive Scenarios

* Successful login
* Add products to cart
* Checkout process
* Address verification
* VAT calculation validation

---

## Negative Scenarios

* Invalid login
* Missing required fields
* Exceed stock quantity

---

# 🔄 CI/CD

GitHub Actions workflow file:

```bash
.github/workflows/playwright-cucumber.yml
```

CI/CD automatically runs:

* Positive Tests
* Negative Tests
* Smoke Tests

on:

* Push
* Pull Request

---

# ⚡ Example GitHub Actions Workflow

```yaml
name: Playwright Cucumber Tests

on:
  push:
    branches: [ main, master ]

  pull_request:
    branches: [ main, master ]

jobs:

  positive-tests:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright
        run: npx playwright install --with-deps

      - name: Run Positive Tests
        run: npm run test:positive
```

---

# 📦 NPM Scripts

```json
{
  "scripts": {
    "test:ui": "cucumber-js \"features/ui/**/*.feature\" --require \"step_definitions/**/*.js\" --require \"support/**/*.js\"",

    "test:positive": "cucumber-js \"features/ui/**/*.feature\" --tags \"@positive\" --require \"step_definitions/**/*.js\" --require \"support/**/*.js\"",

    "test:negative": "cucumber-js \"features/ui/**/*.feature\" --tags \"@negative\" --require \"step_definitions/**/*.js\" --require \"support/**/*.js\"",

    "test:smoke": "cucumber-js \"features/ui/**/*.feature\" --tags \"@smoke\" --require \"step_definitions/**/*.js\" --require \"support/**/*.js\""
  }
}
```

---

# 🚧 Future Improvements

* HTML Reports
* Allure Reports
* Parallel Execution
* Docker Integration
* Jenkins Integration
* Cross Browser Testing
* API Automation Testing

---

# 👨‍💻 Author

**Nutthanan**

QA Automation Engineer | System Analyst | Software Testing

---

# 📄 License

This project is created for learning and portfoli
