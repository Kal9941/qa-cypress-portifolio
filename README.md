Cypress E2E Automation Portfolio
This repository contains an end-to-end (E2E) automated testing suite built with Cypress, JavaScript, and Mochawesome Reporter. The test suite validates critical user journeys and security scenarios for the SauceDemo e-commerce platform.

🚀 Features & Scope
Authentication Module: Validates successful logins, invalid credentials, empty fields, edge cases, and security vulnerabilities (SQL Injection, XSS, and boundary values).

Cart Module: Validates adding/removing single and multiple items, verifying cart badge counters, and button state transitions.

Automated Reporting: Generates clean HTML reports complete with visual charts and embedded failure/success screenshots.

Clean Workspace: Automated pre-test scripts that clear old evidence (screenshots, videos, reports) before every execution run.

🛠️ Tech Stack
Framework: Cypress (v15+)

Language: JavaScript

Reporting: cypress-mochawesome-reporter

Utility Tools: @faker-js/faker, dotenv, rimraf

Performance Testing: k6 (optional integration)

📁 Project Structure
Plaintext
├── cypress/
│   ├── e2e/
│   │   ├── auth/
│   │   │   └── login.cy.js       # Login & Security Tests
│   │   └── cart/
│   │       └── cart.cy.js        # Shopping Cart Tests
│   ├── fixtures/                 # Test Data
│   └── support/                  # Commands & Configuration
├── .gitignore                    # Excluded assets (screenshots, reports, node_modules)
├── cypress.config.js             # Cypress & Reporter Configurations
└── package.json                  # Dependencies & Executable Scripts
⚙️ Prerequisites & Installation
1. Prerequisites
Ensure you have Node.js (v18 or higher) installed on your machine.

2. Install Project Dependencies
Clone the repository and run:

npm install

🧪 Running the Tests
Execute in Headless Mode (CLI)
Runs all test suites, generates reports, and captures screenshots automatically.

npm test

Note: Running npm test automatically triggers a pre-test script (rimraf) that purges previous execution reports and screenshots to ensure a fresh environment.

Open Cypress Interactive Runner (UI)
If you prefer debugging tests visually within the Cypress browser wrapper:

npx cypress open

📊 Test Reports
After running npm test, the HTML test report including failure screenshots and execution metrics will be automatically generated inside:

Plaintext
cypress/reports/html/index.html
You can save this directly into your README.md file!

Would you like to add an About the Author or Future Improvements section to it as well?
