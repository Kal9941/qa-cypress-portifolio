# Cypress E2E Automation & Performance Portfolio (v3.0)

<p align="left">
  <a href="https://github.com/Kal9941/qa-cypress-portifolio/actions/workflows/cypress.yml" target="_blank" style="text-decoration: none;">
    <img src="https://img.shields.io/github/actions/workflow/status/Kal9941/qa-cypress-portifolio/cypress.yml?branch=main&label=Cypress%20Tests%20Pipeline&logo=github&style=for-the-badge" alt="Cypress Tests Pipeline Status" />
  </a>
  <img src="https://img.shields.io/badge/Node.js-v18%2B-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js Version" />
  <img src="https://img.shields.io/badge/Cypress-v13%2B-17202C?style=for-the-badge&logo=cypress&logoColor=white" alt="Cypress Version" />
  <img src="https://img.shields.io/badge/k6-Performance-7D64FF?style=for-the-badge&logo=k6&logoColor=white" alt="k6 Performance" />
</p>

> **How to trigger a new execution in GitHub Actions:**
> 1. Click the status badge above to go directly to the **[Actions/Cypress E2E Tests Pipeline](https://github.com/Kal9941/qa-cypress-portifolio/actions/workflows/cypress.yml)** tab.
> 2. On the right side of the page, click the **Run workflow** button.
> 3. Select the target branch (`main`) and confirm by clicking **Run workflow**.

This repository showcases an enterprise-grade automated testing framework engineered with **Cypress**, **JavaScript**, **k6**, **cypress-mochawesome-reporter**, and **GitHub Actions**. The solution provides complete quality assurance across critical Web E2E user journeys, edge cases, security vulnerabilities, REST API integration endpoints, and API performance/load testing under SLA thresholds using **Page Object Model (POM)** and **Behavior-Driven Development (BDD)** design patterns.

---

## 🚀 Features & Scope

* **Behavior-Driven Development (BDD):** Feature scenarios written in Gherkin (`.feature`) using `@badeball/cypress-cucumber-preprocessor`, bridging technical specifications with business domain rules.
* **API Performance & Load Testing:** Integrated **k6** engine executing load scenarios against REST endpoints, measuring response times, throughput, and evaluating strict SLA thresholds ($p(95) < 500\text{ms}$, error rate $< 1\%$).
* **Dynamic Test Data Generation:** Integration with `@faker-js/faker` for non-deterministic test data (names, emails, postal codes, usernames) across UI checkout forms and API mutation payloads (`POST`/`PUT`).
* **Authentication & Security Module:** Validates successful logins, locked/invalid credentials, empty inputs, edge cases, and security injection vectors (SQL Injection, XSS, payload length limits).
* **E-Commerce Cart Module:** Validates adding/removing single and multiple items, badge counter state synchronization, and button state toggling.
* **End-to-End Checkout Module:** Validates complete e-commerce flow from catalog selection to order placement and form validation errors.
* **REST API CRUD Module:** Full HTTP verb coverage (`GET`, `POST`, `PUT`, `DELETE`), response status codes, payload structures, headers, and state passing using Cypress aliases (`@apiResponse`).
* **Page Object Model (POM):** Clean separation of DOM element locators and page interaction mechanisms from assertion logic.
* **Global Evidence Lifecycle:** Automated `afterEach` hook capturing viewport evidence for passed UI tests without polluting spec code with manual `cy.screenshot()` invocations.
* **Automated ISO Timestamped Reporting:** Generates clean HTML/JUnit reports with ISO 8601 timestamps (`report_YYYY-MM-dd_HH-mm-ss`), visual charts, and embedded screenshots archived in GitHub Actions artifacts (Source code blocks disabled for executive scannability).
* **Workspace Housekeeping:** Automated pre-test scripts (`rimraf`) cleaning stale execution artifacts prior to new runs.

---

## 🛠️ Tech Stack

* **E2E & API Framework:** [Cypress](https://www.cypress.io/)
* **Performance & Load Testing:** [k6 (Grafana)](https://k6.io/)
* **Design Patterns:** Page Object Model (POM) & BDD (Cucumber / Gherkin)
* **Language & Runtime:** JavaScript (Node.js)
* **Continuous Integration (CI/CD):** GitHub Actions
* **Reporting Engines:** `cypress-mochawesome-reporter`, `mocha-junit-reporter`
* **Target Applications:** [SauceDemo](https://www.saucedemo.com/) (Web E2E) & [JSONPlaceholder](https://jsonplaceholder.typicode.com) (REST API)
* **Utilities & Tooling:** `@faker-js/faker`, `@badeball/cypress-cucumber-preprocessor`, `@bahmutov/cypress-esbuild-preprocessor`, `dotenv`, `rimraf`

---

## 📁 Project Structure

```text
├── .github/
│   └── workflows/
│       └── cypress.yml            # GitHub Actions CI/CD Pipeline
├── cypress/
│   ├── e2e/
│   │   ├── v1_legacy/             # Preserved v1.0 traditional Cypress specs (.cy.js)
│   │   ├── 1.login.feature        # BDD Authentication & Security Features
│   │   ├── 2.cart.feature         # BDD Shopping Cart Features
│   │   ├── 3.checkout.feature     # BDD End-to-End Checkout Features
│   │   └── 4.user_api.feature     # BDD REST API Integration Features
│   ├── pages/                     # Page Object Model (POM) Locator & Action Classes
│   │   ├── 1.LoginPage.js
│   │   ├── 2.CartPage.js
│   │   └── 3.CheckoutPage.js
│   ├── fixtures/                  # Static Test Data Fixtures
│   ├── reports/                   # Generated Execution Reports & HTML Assets
│   └── support/                   # Step Definitions & Framework Extensions
│       ├── step_definitions/      # Gherkin Step Definitions mapping to UI/API actions
│       └── e2e.js
├── performance/                   # k6 Load & Performance Test Scripts
│   └── user_api_load.js
├── .gitignore                     # Excluded workspace artifacts
├── .cucumberrc.json               # Cucumber Preprocessor Configuration
├── cypress.config.js              # Cypress & Reporter Configurations
├── package-lock.json
├── package.json                   # Project Dependencies & Executable Scripts
└── README.md

```

---

## ⚙️ Prerequisites & Installation

### 1. Prerequisites

Ensure you have **Node.js** (v18 or higher), **Git**, and **k6** installed on your machine.

* **k6 Installation (Windows Winget):**
```powershell
winget install k6 --source winget

```



> **Windows Users Note:** To prevent OS file-locking timeouts during rapid headless PNG writing, consider adding the project folder to **Windows Defender Exclusions**.

### 2. Install Dependencies

Clone the repository and install required npm packages:

```bash
git clone [https://github.com/Kal9941/qa-cypress-portifolio.git](https://github.com/Kal9941/qa-cypress-portifolio.git)
cd qa-cypress-portifolio
npm install

```

---

## 🧪 Executing Tests

### Execute All E2E & API BDD Test Suites (Headless CLI)

Triggers workspace cleanup, executes all BDD `.feature` specs, captures evidence, and builds timestamped HTML reports:

```bash
npm test

```

### Execute API Performance & Load Tests (k6)

Runs the k6 load simulation script measuring response latency, throughput, and SLA thresholds:

```bash
npm run test:performance

```

### Execute Specific Test Feature

```bash
npx cypress run --spec "cypress/e2e/4.user_api.feature"

```

### Execute Legacy v1.0 Suite

To run the traditional Cypress specification architecture preserved in `v1_legacy/`:

```bash
npx cypress run --spec "cypress/e2e/v1_legacy/*.cy.js"

```

### Open Cypress Interactive Test Runner (UI)

For visual debugging within the Cypress browser interface:

```bash
npx cypress open

```

---

## ⚙️ CI/CD Pipeline (GitHub Actions)

The repository integrates a GitHub Actions pipeline (`.github/workflows/cypress.yml`) that triggers automatically on every `push` or `pull_request` targeting `main`.

* **Headless Execution:** Runs the full suite in a containerized Linux environment.
* **Artifact Archiving:** Uploads Mochawesome HTML reports and failure screenshots directly to the Actions run summary.

---

## 📊 Test Reports

After executing `npm test`, individual HTML test reports featuring ISO 8601 timestamps (e.g., `report_2026-08-01_19-30-00.html`), visual execution graphs, and embedded screenshots are stored in:

```text
cypress/reports/html/

```

---

## 🔮 Roadmap & Project Evolution

* [x] **v1.0 — Architecture Foundation:** Complete Web E2E & REST API coverage with Page Object Model (POM) and GitHub Actions CI/CD.


* [x] **v2.0 — BDD & Dynamic Data:** Migration to Gherkin syntax (`.feature`) using Cucumber, Esbuild compilation, dynamic data with Faker.js, and clean reporting.


* [x] **v3.0 — Performance & Maturity:** Integration of k6 performance scripts, SLA thresholds, legacy preservation, and enterprise documentation.



---

## 👤 Author

**Klismam Monteiro** — QA Automation Engineer

* **LinkedIn:** [klismam-monteiro](https://www.linkedin.com/in/klismam-monteiro-17bb37201)
* **GitHub:** [@Kal9941](https://github.com/Kal9941)