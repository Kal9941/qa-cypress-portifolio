class CheckoutPage {
  elements = {
    firstNameInput: () => cy.get('[data-test="firstName"]'),
    lastNameInput: () => cy.get('[data-test="lastName"]'),
    postalCodeInput: () => cy.get('[data-test="postalCode"]'),
    continueButton: () => cy.get('[data-test="continue"]'),
    finishButton: () => cy.get('[data-test="finish"]'),
    completeHeader: () => cy.get('[data-test="complete-header"]'),
    errorMessage: () => cy.get('[data-test="error"]')
  };

  fillInformation(firstName, lastName, postalCode) {
    this.elements.firstNameInput().type(firstName);
    this.elements.lastNameInput().type(lastName);
    this.elements.postalCodeInput().type(postalCode);
  }

  clickContinue() {
    this.elements.continueButton().click();
  }

  clickFinish() {
    this.elements.finishButton().click();
  }
}

export default new CheckoutPage();