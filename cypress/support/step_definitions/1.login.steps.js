import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../pages/1.LoginPage';

// Background step
Given('the user navigates to the login page', () => {
  loginPage.visit();
});

// Successful Login
When('the user enters valid credentials', () => {
  const validUsername = Cypress.env('CURRENT_USER');
  const validPassword = Cypress.env('DEFAULT_PASSWORD');
  loginPage.login(validUsername, validPassword);
});

Then('the user should be redirected to the inventory page', () => {
  cy.url().should('include', '/inventory.html');
});

// Invalid Credentials & Generic Text Validation
When('the user enters invalid credentials {string} and {string}', (username, password) => {
  loginPage.login(username, password);
});

Then('an error message containing {string} should be displayed', (expectedMessage) => {
  loginPage.elements.errorMessage()
    .should('be.visible')
    .and('contain', expectedMessage);
});

// Empty Fields & Single Field Scenarios
When('the user clicks the login button without entering credentials', () => {
  loginPage.elements.loginButton().click();
});

When('the user enters only username {string}', (username) => {
  loginPage.elements.usernameInput().clear().type(username);
  loginPage.elements.loginButton().click();
});

When('the user enters only password {string}', (password) => {
  loginPage.elements.passwordInput().clear().type(password, { log: false });
  loginPage.elements.loginButton().click();
});

// Security & Edge Cases
When('the user enters special characters payload {string}', (payload) => {
  loginPage.login(payload, payload);
});

When('the user enters SQL injection payload {string}', (payload) => {
  loginPage.login(payload, payload);
});

When('the user enters XSS payload {string}', (payload) => {
  loginPage.login(payload, payload);
});

When('the user enters an excessively long string payload of {int} characters', (length) => {
  const longString = 'a'.repeat(length);
  loginPage.login(longString, longString);
});

When('the user enters blank space payload {string}', (payload) => {
  loginPage.login(payload, payload);
});

Then('an error message should be visible on the login page', () => {
  loginPage.elements.errorMessage().should('be.visible');
});