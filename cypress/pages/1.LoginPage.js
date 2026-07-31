class LoginPage {
  elements = {
    usernameInput: () => cy.get('[data-test="username"]'),
    passwordInput: () => cy.get('[data-test="password"]'),
    loginButton: () => cy.get('[data-test="login-button"]'),
    errorMessage: () => cy.get('[data-test="error"]')
  };

  visit() {
    cy.visit('/');
  }

  login(username, password) {
    this.elements.usernameInput().clear().type(username);
    // Avoid printing passwords in Cypress command log
    this.elements.passwordInput().clear().type(password, { log: false });
    this.elements.loginButton().click();
  }
}

export default new LoginPage();