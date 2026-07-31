class CartPage {
  elements = {
    cartBadge: () => cy.get('[data-test="shopping-cart-badge"]'),
    cartContainer: () => cy.get('#shopping_cart_container'),
    checkoutButton: () => cy.get('[data-test="checkout"]'),
    removeBackpackButton: () => cy.get('[id="remove-sauce-labs-backpack"]')
  };

  openCart() {
    this.elements.cartContainer().click();
  }

  clickCheckout() {
    this.elements.checkoutButton().click();
  }
}

export default new CartPage();