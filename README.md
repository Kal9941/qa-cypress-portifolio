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

This repository contains an end-to-end (E2E) automated testing suite built with **Cypress**, **JavaScript**, **cypress-mochawesome-reporter**, and **GitHub Actions**. The test suite validates critical user journeys, edge cases, and security scenarios for the [SauceDemo](https://www.saucedemo.com/) e-commerce platform.

---

## 🚀 Features & Scope

* **Authentication Module:** Validates successful logins, invalid credentials, empty fields, edge cases, and security vulnerabilities (SQL Injection, XSS, and long inputs).
* **Cart Module:** Validates adding/removing single and multiple items, verifying cart badge counters, and button state transitions.
* **Environment Configuration:** Centralized global environment variables (`baseUrl`, user profiles, credentials) configured directly within `cypress.config.js` for clean and maintainable test scripts.
* **Continuous Integration (CI/CD):** Automated pipeline running on **GitHub Actions** triggered on push and pull requests, pinned with Node.js v24 for optimal stability.
* **Automated Reporting & Artifacts:** Generates clean HTML/JUnit reports with visual charts and embedded screenshots for test execution evidence, automatically archived in GitHub Actions artifacts.
* **Clean Workspace:** Automated pre-test scripts (`rimraf`) that clear old evidence (screenshots, videos, reports) before every execution run.

---

## 🛠️ Tech Stack

* **Framework:** [Cypress](https://www.cypress.io/)
* **Language:** JavaScript
* **CI/CD:** GitHub Actions
* **Reporting:** `cypress-mochawesome-reporter`, `mocha-junit-reporter`
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
│   │   ├── auth/
│   │   │   └── login.cy.js        # Login & Security Tests
│   │   └── cart/
│   │       └── cart.cy.js         # Shopping Cart Tests
│   ├── fixtures/                  # Static Test Data
│   ├── reports/                   # Generated Execution Reports
│   └── support/                   # Commands & Configuration
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

### 2. Install Project Dependencies

Clone the repository and install the required dependencies:

```bash
git clone [https://github.com/Kal9941/qa-cypress-portfolio.git](https://github.com/Kal9941/qa-cypress-portfolio.git)
cd qa-cypress-portfolio
npm install

```

---

## 🧪 Running the Tests

### Execute in Headless Mode (CLI)

Runs all test suites, generates HTML reports, and captures screenshots automatically.

```bash
npm test

```

> **Note:** Running `npm test` automatically triggers a pre-test script (`rimraf`) that purges previous execution reports and screenshots to ensure a fresh environment.

### Run with Custom User Environment

You can overwrite the active user configured in `cypress.config.js` directly via the terminal:

```bash
npx cypress run --env CURRENT_USER=locked_out_user

```

### Open Cypress Interactive Runner (UI)

If you prefer debugging tests visually within the Cypress browser wrapper:

```bash
npx cypress open

```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

The repository uses GitHub Actions (`.github/workflows/cypress.yml`) to automatically execute the Cypress test suite upon every push or pull request to the `main`/`master` branch.

* **Node Version:** Pinned to `24` for runtime compatibility.
* **Artifact Retention:** Generates and uploads test reports under the Actions **Artifacts** section after every run.

---

## 📊 Test Reports

After running `npm test`, the HTML test report including screenshots and execution metrics will be automatically generated inside:

```text
cypress/reports/html/index.html

```

---

## 🔮 Future Improvements

* [ ] Add API test suite for SauceDemo endpoints
* [x] Integrate GitHub Actions for continuous testing (CI/CD pipeline)
* [ ] Add performance test scripts using `k6`
* [ ] Implement BDD scenarios using `@badeball/cypress-cucumber-preprocessor`

---

## 👤 Author

**Klismam Monteiro** — QA Automation Engineer

* **LinkedIn:** [klismam-monteiro](https://www.linkedin.com/in/klismam-monteiro-17bb37201)
* **GitHub:** [@Kal9941](https://www.google.com/search?q=https://github.com/Kal9941)

```

---