import loginPage from '../pages/1.LoginPage';
import cartPage from '../pages/2.CartPage';
import checkoutPage from '../pages/3.CheckoutPage';

describe('Checkout Journey Tests', () => {
  beforeEach(() => {
    // Arrange: Perform session authentication and navigate to inventory page
    loginPage.visit();
    loginPage.login(Cypress.env('CURRENT_USER'), Cypress.env('DEFAULT_PASSWORD'));
    cy.url().should('include', '/inventory.html');
  });

  it('should complete a purchase successfully from cart to order confirmation', () => {
    // Arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cartPage.openCart();
    cartPage.clickCheckout();

    // Act
    checkoutPage.fillInformation('Klismam', 'Monteiro', '74000-000');
    checkoutPage.clickContinue();
    checkoutPage.clickFinish();

    // Assert
    checkoutPage.elements.completeHeader()
      .should('be.visible')
      .and('have.text', 'Thank you for your order!');
    cy.screenshot('checkout-complete-success');
  });

  it('should display an error message when submitting empty personal info in checkout', () => {
    // Arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cartPage.openCart();
    cartPage.clickCheckout();

    // Act
    checkoutPage.clickContinue();

    // Assert
    checkoutPage.elements.errorMessage()
      .should('be.visible')
      .and('contain.text', 'Error: First Name is required');
    cy.screenshot('checkout-error-empty-form');
  });
});