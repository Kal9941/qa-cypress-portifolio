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
      reportFilename: 'report_[datetime]',
      timestamp: 'yyyy-mm-dd_HH-MM-ss',
    },
  },
  chromeWebSecurity: false,
  video: false,
  screenshotOnRunFailure: false, // Prevents duplicate screenshot capturing on test failures
  screenshotsFolder: 'cypress/screenshots',
  e2e: {
    baseUrl: process.env.BASE_URL || 'https://www.saucedemo.com',
    env: {
      CURRENT_USER: process.env.CURRENT_USER || 'standard_user',
      DEFAULT_PASSWORD: process.env.DEFAULT_PASSWORD || 'secret_sauce'
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
  }, 
});