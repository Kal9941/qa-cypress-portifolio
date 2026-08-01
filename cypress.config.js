const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, mocha-junit-reporter',
    mochaJunitReporterReporterOptions: {
      mochaFile: 'cypress/reports/junit/results-[hash].xml',
      toConsole: false,
    },
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
      reportPageTitle: 'Cypress Test Report',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      reportDir: 'cypress/reports/html',
      overwrite: false,
      html: true,
      json: true,
      reportFilename: 'report_[datetime]',
      timestamp: 'yyyy-mm-dd_HH-MM-ss',
      code: false, // Disable code snippets in the report
    },
  },
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: false, // Handled by our custom global hook
  screenshotsFolder: 'cypress/screenshots',
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    // Matches both BDD features and standard Cypress specs
    specPattern: ["cypress/e2e/*.feature", "cypress/e2e/*.cy.js"],
    // Excludes the v1_legacy folder from the default test run
    excludeSpecPattern: ["cypress/e2e/v1_legacy/**"],
    env: {
      CURRENT_USER: process.env.CURRENT_USER || 'standard_user',
      DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || 'secret_sauce'
    },
    async setupNodeEvents(on, config) {
      // 1. Initialize Cucumber plugin FIRST to prevent event conflicts
      await addCucumberPreprocessorPlugin(on, config);

      // 2. Configure Esbuild bundler for parsing .feature files
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // 3. Initialize Mochawesome reporter LAST
      // This ensures it successfully catches the 'after:run' event and builds the HTML report
      require('cypress-mochawesome-reporter/plugin')(on);

      return config;
    },
  }, 
});