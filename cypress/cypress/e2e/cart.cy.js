describe('cart', () => {
  it('should add item to cart', () => {
    //arrange
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="username"]').type('standard_user');
    cy.get('[data-test="password"]').type('secret_sauce');
    cy.get('[data-test="login-button"]').click();
    //act
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    //assert
    cy.get('[data-test="shopping-cart-badge"]')
    .should('contain', '1')
    .should('be.visible');

    cy.get('[id=shopping_cart_container]').click();

    // Find a specific item when the cart contains multiple items
    cy.get('[data-test="inventory-item-name"]').contains('Sauce Labs Backpack').should('be.visible');

  });
});