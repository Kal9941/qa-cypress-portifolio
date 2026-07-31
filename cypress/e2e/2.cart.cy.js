describe('Shopping Cart & Badge Management Tests', () => {
  beforeEach(() => {
    // Arrange: Perform session authentication and navigate to inventory page before each test
    const validUsername = Cypress.env('CURRENT_USER');
    const validPassword = Cypress.env('DEFAULT_PASSWORD');

    cy.visit('/');
    cy.get('[data-test="username"]').type(validUsername);
    cy.get('[data-test="password"]').type(validPassword);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
  });

  it('should add an item to the cart and display it in the cart page', () => {
    // Arrange
    const backpackItemSelector = '[data-test="add-to-cart-sauce-labs-backpack"]';

    // Act
    cy.get(backpackItemSelector).click();
    cy.get('#shopping_cart_container').click();

    // Assert
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    cy.get('[data-test="inventory-item-name"]').should('contain.text', 'Sauce Labs Backpack').and('be.visible');
    cy.screenshot('cart-item-added-successfully');
  });

  it('should remove an item from inside the cart page and clear badge count', () => {
    // Arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('#shopping_cart_container').click();

    // Act
    cy.get('[id="remove-sauce-labs-backpack"]').click();

    // Assert
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
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
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
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
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get(backpackAddButton).should('be.visible').and('have.text', 'Add to cart');
    cy.screenshot('cart-item-removed-from-products-page');
  });
});