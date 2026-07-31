import loginPage from '../pages/1.LoginPage';

describe('Authentication & Security Tests', () => {
  beforeEach(() => {
    // Arrange: Navigate to login page
    loginPage.visit();
  });

  it('should login successfully with valid credentials', () => {
    // Arrange
    const validUsername = Cypress.env('CURRENT_USER');
    const validPassword = Cypress.env('DEFAULT_PASSWORD');

    // Act
    loginPage.login(validUsername, validPassword);

    // Assert
    cy.url().should('include', '/inventory.html');
    cy.screenshot('login-success-valid-credentials');
  });

  it('should display an error message when logging in with invalid credentials', () => {
    // Arrange
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';

    // Act
    loginPage.login(invalidUsername, invalidPassword);

    // Assert
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');
    cy.screenshot('login-error-invalid-credentials');
  });

  it('should display an error message when submitting empty credentials', () => {
    // Arrange & Act
    loginPage.elements.loginButton().click();

    // Assert
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
    cy.screenshot('login-error-empty-credentials');
  });

  it('should display an error message when submitting only the username', () => {
    // Arrange
    const usernameOnly = 'standard_user';

    // Act
    loginPage.elements.usernameInput().clear().type(usernameOnly);
    loginPage.elements.loginButton().click();

    // Assert
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Epic sadface: Password is required');
    cy.screenshot('login-error-missing-password');
  });

  it('should display an error message when submitting only the password', () => {
    // Arrange
    const passwordOnly = 'secret_sauce';

    // Act
    loginPage.elements.passwordInput().clear().type(passwordOnly, { log: false });
    loginPage.elements.loginButton().click();

    // Assert
    loginPage.elements.errorMessage()
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
    cy.screenshot('login-error-missing-username');
  });

  it('should handle special characters input gracefully without breaking the UI', () => {
    // Arrange
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Act
    loginPage.login(specialChars, specialChars);

    // Assert
    loginPage.elements.errorMessage().should('be.visible');
    cy.screenshot('login-error-special-characters');
  });

  it('should prevent SQL Injection attempts and show authorization error', () => {
    // Arrange
    const sqlInjectionPayload = "' OR '1'='1";

    // Act
    loginPage.login(sqlInjectionPayload, sqlInjectionPayload);

    // Assert
    loginPage.elements.errorMessage().should('be.visible');
    cy.screenshot('login-error-sql-injection');
  });

  it('should prevent XSS attacks and render script tags as plain text', () => {
    // Arrange
    const xssPayload = '<script>alert("XSS")</script>';

    // Act
    loginPage.login(xssPayload, xssPayload);

    // Assert
    loginPage.elements.errorMessage().should('be.visible');
    cy.screenshot('login-error-xss-attack');
  });

  it('should handle excessively long input payloads gracefully', () => {
    // Arrange
    const longString = 'a'.repeat(100);

    // Act
    loginPage.login(longString, longString);

    // Assert
    loginPage.elements.errorMessage().should('be.visible');
    cy.screenshot('login-error-long-credentials');
  });

  it('should reject inputs containing only white spaces', () => {
    // Arrange
    const emptySpaces = '     ';

    // Act
    loginPage.login(emptySpaces, emptySpaces);

    // Assert
    loginPage.elements.errorMessage().should('be.visible');
    cy.screenshot('login-error-empty-spaces');
  });
});