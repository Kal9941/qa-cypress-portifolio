# Cypress E2E Automation Portfolio

<p align="left">
  <a href="https://github.com/Kal9941/qa-cypress-portifolio/actions/workflows/cypress.yml" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/github/actions/workflow/status/Kal9941/qa-cypress-portifolio/cypress.yml?branch=main&label=Cypress%20Tests%20Pipeline&logo=github&style=for-the-badge" alt="Cypress Tests Pipeline Status" />
  </a>
</p>

> **How to trigger a new execution in GitHub Actions:**
> 1. Click the button above to go directly to the **[Actions/Cypress E2E Tests Pipeline](https://github.com/Kal9941/qa-cypress-portifolio/actions/workflows/cypress.yml)** tab.
> 2. On the right side of the page, click the **Run workflow** button.
> 3. Select the desired branch (`main`) and confirm by clicking **Run workflow**.

This repository contains a full-stack automated testing suite built with **Cypress**, **JavaScript**, **cypress-mochawesome-reporter**, and **GitHub Actions**. The suite validates critical user journeys, edge cases, security scenarios, and REST API endpoints using the **Page Object Model (POM)** architecture.

---

## 🚀 Features & Scope

* **Authentication Module:** Validates successful logins, invalid credentials, empty fields, edge cases, and security vulnerabilities (SQL Injection, XSS, and long inputs).
* **Cart Module:** Validates adding/removing single and multiple items, verifying cart badge counters, and button state transitions.
* **Checkout Module:** Validates complete e-commerce checkout flow from product selection to order confirmation and form validation errors.
* **REST API Module:** Validates HTTP CRUD methods (`GET`, `POST`, `PUT`, `DELETE`), response status codes, payload structures, and response headers on backend endpoints.
* **Page Object Model (POM):** Maintainable architecture separating UI element locators from test assertion logic inside dedicated page objects.
* **Global Evidence Lifecycle:** Automated `afterEach` hook captures viewport evidence for passed UI tests without polluting test files with manual `cy.screenshot()` commands.
* **Environment Configuration:** Centralized global environment variables (`baseUrl`, user profiles, credentials) configured directly within `cypress.config.js`.
* **Continuous Integration (CI/CD):** Automated pipeline running on **GitHub Actions** triggered on push, pull requests, or manual dispatches.
* **Automated ISO Timestamped Reporting:** Generates clean HTML/JUnit reports with ISO 8601 timestamps (`report_YYYY-MM-dd_HH-mm-ss`), visual charts, and embedded screenshots automatically archived in GitHub Actions artifacts.
* **Clean Workspace:** Automated pre-test scripts (`rimraf`) that clear old execution artifacts before every execution run.

---

## 🛠️ Tech Stack

* **Framework:** [Cypress](https://www.cypress.io/)
* **Architecture:** Page Object Model (POM)
* **Language:** JavaScript (Node.js)
* **CI/CD:** GitHub Actions
* **Reporting:** `cypress-mochawesome-reporter`, `mocha-junit-reporter`
* **Target Apps:** [SauceDemo](https://www.saucedemo.com/) (Web E2E) & [JSONPlaceholder](https://jsonplaceholder.typicode.com) (REST API)
* **Utility Tools:** `@faker-js/faker`, `dotenv`, `rimraf`
* **Performance Testing:** `k6` *(planned integration)*

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── cypress.yml            # GitHub Actions CI/CD Pipeline
├── cypress/
│   ├── e2e/
│   │   ├── 1.login.cy.js          # Authentication & Security Tests
│   │   ├── 2.cart.cy.js           # Shopping Cart Tests
│   │   ├── 3.checkout.cy.js       # End-to-End Checkout Tests
│   │   └── 4.user_api.cy.js       # REST API Integration Tests
│   ├── pages/                     # Page Object Model (POM) Classes
│   │   ├── 1.LoginPage.js
│   │   ├── 2.CartPage.js
│   │   └── 3.CheckoutPage.js
│   ├── fixtures/                  # Static Test Data
│   ├── reports/                   # Generated Execution Reports
│   └── support/                   # Commands & Global Screenshot Hook
│       └── e2e.js
├── .gitignore                     # Excluded assets (screenshots, reports, node_modules)
├── cypress.config.js              # Cypress & Reporter Configurations
├── package-lock.json
├── package.json                   # Dependencies & Executable Scripts
└── README.md

```

---

## ⚙️ Prerequisites & Installation

### 1. Prerequisites

Ensure you have **Node.js** (v18 or higher) and **Git** installed on your machine.

> **Windows Users Note:** To avoid file-locking timeouts during rapid headless PNG writing, consider adding the project folder as an exclusion in **Windows Defender** (*Virus & threat protection → Manage settings → Exclusions*).

### 2. Install Project Dependencies

Clone the repository and install the required dependencies:

```bash
git clone [https://github.com/Kal9941/qa-cypress-portifolio.git](https://github.com/Kal9941/qa-cypress-portifolio.git)
cd qa-cypress-portifolio
npm install

```

---

## 🧪 Running the Tests

### Execute All Test Suites (CLI)

Runs all test suites (Web E2E & REST API), generates timestamped HTML reports, and captures screenshots automatically:

```bash
npm test

```

> **Note:** Running `npm test` automatically triggers a pre-test script (`rimraf`) that purges previous execution reports and screenshots to ensure a fresh environment.

### Run Specific Test File

```bash
npx cypress run --spec "cypress/e2e/4.user_api.cy.js"

```

### Run with Custom User Environment

You can overwrite the active user configured in `cypress.config.js` directly via the terminal or by exporting environment variables.

Examples:

```bash
# Run with a different Saucedemo user
npx cypress run --env CURRENT_USER=locked_out_user

# Or export variables in your shell
export CURRENT_USER=standard_user
export DEFAULT_PASSWORD=secret_sauce
npx cypress run

```

### Open Cypress Interactive Runner (UI)

If you prefer debugging tests visually within the Cypress browser wrapper:

```bash
npx cypress open

```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

The repository uses GitHub Actions (`.github/workflows/cypress.yml`) to automatically execute the Cypress test suite upon every push or pull request to the `main` branch.

* **Artifact Retention:** Generates and uploads test reports and screenshots under the Actions **Artifacts** section after every run.

---

## 📊 Test Reports

After running `npm test`, individual HTML test reports with international ISO 8601 timestamps (e.g., `report_2026-07-31_14-30-00.html`), including embedded screenshots and execution metrics, will be automatically generated inside:

```text
cypress/reports/html/

```

---

## 🔮 Roadmap & Future Improvements

* [x] Complete Web E2E coverage (Login, Cart, Checkout) & REST API test suite (v1.0)
* [x] Implement Page Object Model (POM) architecture (v1.0)
* [x] Integrate GitHub Actions CI/CD pipeline (v1.0)
* [ ] Implement BDD scenarios using `@badeball/cypress-cucumber-preprocessor` (v2.0)
* [ ] Add dynamic test data generation using `@faker-js/faker` (v2.0)
* [ ] Add performance & load test scripts using `k6` (v3.0)

---

## 👤 Author

**Klismam Monteiro** — QA Automation Engineer

* **LinkedIn:** [klismam-monteiro](https://www.linkedin.com/in/klismam-monteiro-17bb37201)
* **GitHub:** [@Kal9941](https://github.com/Kal9941)

```