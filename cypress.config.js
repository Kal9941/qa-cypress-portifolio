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