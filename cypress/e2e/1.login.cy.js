describe('Authentication & Security Tests', () => {
  beforeEach(() => {
    // Arrange: Navigate to the login page before each test execution
    cy.visit('/');
  });

  it('should login successfully with valid credentials', () => {
    // Arrange
    const validUsername = Cypress.env('CURRENT_USER');
    const validPassword = Cypress.env('DEFAULT_PASSWORD');

    // Act
    cy.get('[data-test="username"]').type(validUsername);
    cy.get('[data-test="password"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.url().should('include', '/inventory.html');
    cy.screenshot('login-success-valid-credentials');
  });

  it('should display an error message when logging in with invalid credentials', () => {
    // Arrange
    const invalidUsername = 'invalid_user';
    const invalidPassword = 'invalid_password';

    // Act
    cy.get('[data-test="username"]').type(invalidUsername);
    cy.get('[data-test="password"]').type(invalidPassword);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Username and password do not match any user in this service');
    cy.screenshot('login-error-invalid-credentials');
  });

  it('should display an error message when submitting empty credentials', () => {
    // Arrange & Act
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
    cy.screenshot('login-error-empty-credentials');
  });

  it('should display an error message when submitting only the username', () => {
    // Arrange
    const usernameOnly = 'standard_user';

    // Act
    cy.get('[data-test="username"]').type(usernameOnly);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Password is required');
    cy.screenshot('login-error-missing-password');
  });

  it('should display an error message when submitting only the password', () => {
    // Arrange
    const passwordOnly = 'secret_sauce';

    // Act
    cy.get('[data-test="password"]').type(passwordOnly);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username is required');
    cy.screenshot('login-error-missing-username');
  });

  it('should handle special characters input gracefully without breaking the UI', () => {
    // Arrange
    const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    // Act
    cy.get('[data-test="username"]').type(specialChars);
    cy.get('[data-test="password"]').type(specialChars);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]').should('be.visible');
    cy.screenshot('login-error-special-characters');
  });

  it('should prevent SQL Injection attempts and show authorization error', () => {
    // Arrange
    const sqlInjectionPayload = "' OR '1'='1";

    // Act
    cy.get('[data-test="username"]').type(sqlInjectionPayload);
    cy.get('[data-test="password"]').type(sqlInjectionPayload);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]').should('be.visible');
    cy.screenshot('login-error-sql-injection');
  });

  it('should prevent XSS attacks and render script tags as plain text', () => {
    // Arrange
    const xssPayload = '<script>alert("XSS")</script>';

    // Act
    cy.get('[data-test="username"]').type(xssPayload);
    cy.get('[data-test="password"]').type(xssPayload);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]').should('be.visible');
    cy.screenshot('login-error-xss-attack');
  });

  it('should handle excessively long input payloads gracefully', () => {
    // Arrange
    const longString = 'a'.repeat(100);

    // Act
    cy.get('[data-test="username"]').type(longString);
    cy.get('[data-test="password"]').type(longString);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]').should('be.visible');
    cy.screenshot('login-error-long-credentials');
  });

  it('should reject inputs containing only white spaces', () => {
    // Arrange
    const emptySpaces = '     ';

    // Act
    cy.get('[data-test="username"]').type(emptySpaces);
    cy.get('[data-test="password"]').type(emptySpaces);
    cy.get('[data-test="login-button"]').click();

    // Assert
    cy.get('[data-test="error"]').should('be.visible');
    cy.screenshot('login-error-empty-spaces');
  });
});