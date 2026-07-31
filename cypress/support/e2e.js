// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
// Register the cypress-mochawesome-reporter plugin
import 'cypress-mochawesome-reporter/register';

// Global hook executed automatically after each individual test run
afterEach(function () {
  const testName = this.currentTest.title;
  const suiteName = this.currentTest.parent.title;

  // Capture evidence only for PASSED tests, excluding backend REST API suites
  if (this.currentTest.state === 'passed' && !suiteName.includes('API REST')) {
    
    // Short stabilization pause to allow I/O buffer clearance before file writing
    cy.wait(300);

    // Sanitize test title by replacing special characters
    const safeName = testName.replace(/[^a-zA-Z0-9]/g, '-').substring(0, 60);
    
    // Capture screenshot using lightweight viewport mode instead of fullPage
    cy.screenshot(`PASS-${safeName}`, {
      capture: 'viewport',
      overwrite: true,
    });
  }
});