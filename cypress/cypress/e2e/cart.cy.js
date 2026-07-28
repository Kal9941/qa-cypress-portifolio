describe('Cart Tests', () => {
  beforeEach(() => {
    // arrange (global setup)
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
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
  });

  it('should remove item from cart', () => {
    // arrange
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('#shopping_cart_container').click();

    // act
    cy.get('[id="remove-sauce-labs-backpack"]').click();

    // assert
    cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
  });

  it('should increment cart badge when adding multiple items', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    // assert
    cy.get('[data-test="shopping-cart-badge"]').should('have.text', '2');
  });

  it('should change button text to "Remove" after adding item to cart', () => {
    // arrange
    // (already performed in beforeEach)

    // act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // assert
    cy.get('[data-test="remove-sauce-labs-backpack"]').should('be.visible');
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
  })
});