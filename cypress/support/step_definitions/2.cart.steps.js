import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../pages/1.LoginPage';
import cartPage from '../../pages/2.CartPage';

// Background
Given('the user is logged in and on the inventory page', () => {
  loginPage.visit();
  loginPage.login(Cypress.env('CURRENT_USER'), Cypress.env('DEFAULT_PASSWORD'));
  cy.url().should('include', '/inventory.html');
});

// Actions (When)
When('the user adds the backpack to the cart', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
});

When('the user adds the bike light to the cart', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
});

When('the user opens the cart', () => {
  cartPage.openCart();
});

When('the user removes the backpack from the cart page', () => {
  cartPage.elements.removeBackpackButton().click();
});

When('the user removes the backpack from the inventory page', () => {
  cy.get('[data-test="remove-sauce-labs-backpack"]').click();
});

// Assertions (Then)
Then('the cart badge should display {string}', (count) => {
  cartPage.elements.cartBadge().should('have.text', count);
});

Then('the {string} should be visible in the cart', (itemName) => {
  cy.get('[data-test="inventory-item-name"]')
    .should('contain.text', itemName)
    .and('be.visible');
});

Then('the cart badge should not exist', () => {
  cartPage.elements.cartBadge().should('not.exist');
});

Then('the item should be removed from the cart list', () => {
  cy.get('[data-test="inventory-item-name"]').should('not.exist');
});

Then('the button for the backpack should change to "Remove"', () => {
  cy.get('[data-test="remove-sauce-labs-backpack"]')
    .should('be.visible')
    .and('have.text', 'Remove');
});

Then('the button for the backpack should change back to "Add to cart"', () => {
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]')
    .should('be.visible')
    .and('have.text', 'Add to cart');
});