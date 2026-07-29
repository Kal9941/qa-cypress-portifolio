describe('Cart Tests', () => {
  beforeEach(() => {
    // arrange (global setup)
    cy.visit('/');
    cy.get('[data-test="username"]').type(Cypress.env('CURRENT_USER'));
    cy.get('[data-test="password"]').type(Cypress.env('DEFAULT_PASSWORD'));
    cy.get('[data-test="login-button"]').click();
  });

  it('should add item to cart', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('#shopping_cart_container').click();

    // assert
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '1');
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible');
    
    // evidence
    cy.screenshot('cart-item-added-successfully');
  });

  it('should remove item from cart', () => {
    // arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('#shopping_cart_container').click();

    // act
    cy.get('[id="remove-sauce-labs-backpack"]').click();

    // assert
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');

    // evidence
    cy.screenshot('cart-item-removed-from-cart-page');
  });

  it('should increment cart badge when adding multiple items', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // assert
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');

    // evidence
    cy.screenshot('cart-badge-multiple-items');
  });

  it('should change button text to "Remove" after adding item to cart', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // assert
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');

    // evidence
    cy.screenshot('cart-button-state-changed-to-remove');
  });

  it('should remove item directly from the product page', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="remove-sauce-labs-backpack"]').click();

    // assert
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('be.visible');

    // evidence
    cy.screenshot('cart-item-removed-from-products-page');
  });
});