describe('Login', () => {
  it('should login with valid credentials', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.url().should('include', '/inventory.html');
  })
  it('should not login with invalid credentials', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('invalid_user');
    cy.get('[data-test="password"]').type('invalid_password');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with empty credentials', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with only username', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with only password', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with special characters', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('!@#$%^&*()');
    cy.get('[data-test="password"]').type('!@#$%^&*()');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with SQL injection', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type("' OR '1'='1");
    cy.get('[data-test="password"]').type("' OR '1'='1");
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with XSS attack', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('<script>alert("XSS")</script>');
    cy.get('[data-test="password"]').type('<script>alert("XSS")</script>');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with long credentials', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('a'.repeat(50));
    cy.get('[data-test="password"]').type('a'.repeat(50));
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
  it('should not login with empty spaces', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    //act
    cy.get('[data-test="username"]').type('     ');
    cy.get('[data-test="password"]').type('     ');
    cy.get('[data-test="login-button"]').click();
    //assert
    cy.get('[data-test="error"]').should('be.visible');
  })
});