describe('Login Tests', () => {
  beforeEach(() => {
    // arrange (global setup)
    cy.visit('https://www.saucedemo.com/');
  });

  it('should login with valid credentials', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.url().should('include', '/inventory.html');

    // evidence
    cy.screenshot('login-success');
  });

  it('should not login with invalid credentials', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('invalid_password');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]') 
      .should('contain', 'Username and password do not match any user in this service');

    // evidence
    cy.screenshot('login-error-invalid-credentials');
  });

  it('should not login with empty credentials', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-empty-credentials');
  });

  it('should not login with only username', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-missing-password');
  });

  it('should not login with only password', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-missing-username');
  });

  it('should not login with special characters', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('!@#$%^&*()');
    cy.get('[data-test="password"]').type('!@#$%^&*()');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-special-characters');
  });

  it('should not login with SQL injection', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type("' OR '1'='1");
    cy.get('[data-test="password"]').type("' OR '1'='1");
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-sql-injection');
  });

  it('should not login with XSS attack', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('<script>alert("XSS")</script>');
    cy.get('[data-test="password"]').type('<script>alert("XSS")</script>');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-xss-attack');
  });

  it('should not login with long credentials', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('a'.repeat(50));
    cy.get('[data-test="password"]').type('a'.repeat(50));
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-long-credentials');
  });

  it('should not login with empty spaces', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="username"]').type('     ');
    cy.get('[data-test="password"]').type('     ');
    cy.get('[data-test="login-button"]').click();

    // assert
    cy.get('[data-test="error"]').should('be.visible');

    // evidence
    cy.screenshot('login-error-empty-spaces');
  });
});