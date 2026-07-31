import loginPage from '../pages/1.LoginPage';
import cartPage from '../pages/2.CartPage';

describe('Shopping Cart & Badge Management Tests', () => {
  beforeEach(() => {
    // Arrange: Perform session authentication using POM
    loginPage.visit();
    loginPage.login(Cypress.env('CURRENT_USER'), Cypress.env('DEFAULT_PASSWORD'));
    cy.url().should('include', '/inventory.html');
  });

  it('should add an item to the cart and display it in the cart page', () => {
    // Arrange
    const backpackAddButton = '[data-test="add-to-cart-sauce-labs-backpack"]';

    // Act
    cy.get(backpackAddButton).click();
    cartPage.openCart();

    // Assert
    cartPage.elements.cartBadge().should('have.text', '1');
    cy.get('[data-test="inventory-item-name"]').should('contain.text', 'Sauce Labs Backpack').and('be.visible');
    cy.screenshot('cart-item-added-successfully');
  });

  it('should remove an item from inside the cart page and clear badge count', () => {
    // Arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cartPage.openCart();

    // Act
    cartPage.elements.removeBackpackButton().click();

    // Assert
    cartPage.elements.cartBadge().should('not.exist');
    cy.get('[data-test="inventory-item-name"]').should('not.exist');
    cy.screenshot('cart-item-removed-from-cart-page');
  });

  it('should increment cart badge count accurately when adding multiple items', () => {
    // Arrange
    const backpackSelector = '[data-test="add-to-cart-sauce-labs-backpack"]';
    const bikeLightSelector = '[data-test="add-to-cart-sauce-labs-bike-light"]';

    // Act
    cy.get(backpackSelector).click();
    cy.get(bikeLightSelector).click();

    // Assert
    cartPage.elements.cartBadge().should('have.text', '2');
    cy.screenshot('cart-badge-multiple-items-incremented');
  });

  it('should toggle button state to "Remove" after adding an item to the cart', () => {
    // Arrange
    const backpackAddButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
    const backpackRemoveButton = '[data-test="remove-sauce-labs-backpack"]';

    // Act
    cy.get(backpackAddButton).click();

    // Assert
    cy.get(backpackRemoveButton).should('be.visible').and('have.text', 'Remove');
    cy.screenshot('cart-button-state-changed-to-remove');
  });

  it('should remove an item directly from the inventory page and restore the Add to Cart button', () => {
    // Arrange
    const backpackAddButton = '[data-test="add-to-cart-sauce-labs-backpack"]';
    const backpackRemoveButton = '[data-test="remove-sauce-labs-backpack"]';

    // Act
    cy.get(backpackAddButton).click();
    cy.get(backpackRemoveButton).click();

    // Assert
    cartPage.elements.cartBadge().should('not.exist');
    cy.get(backpackAddButton).should('be.visible').and('have.text', 'Add to cart');
    cy.screenshot('cart-item-removed-from-products-page');
  });
});