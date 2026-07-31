const { defineConfig } = require("cypress");

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
      // Generates reports using international ISO 8601 timestamp format (e.g., report_2026-07-31_14-30-00)
      reportFilename: 'report_[datetime]',
      timestamp: 'yyyy-mm-dd_HH-MM-ss',
    },
  },
  chromeWebSecurity: false,
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    env: {
      // Change here to activate the desired user:
      // Options: 'standard_user', 'locked_out_user', 'problem_user', 'performance_glitch_user'
      CURRENT_USER: "standard_user", 
      DEFAULT_PASSWORD: "secret_sauce"
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
    },
  },
});