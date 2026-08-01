import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';
import cartPage from '../../pages/2.CartPage';
import checkoutPage from '../../pages/3.CheckoutPage';

// Note: The steps "Given the user is logged in and on the inventory page"
// and "When the user adds the backpack to the cart" are automatically reused
// from the 2.cart.steps.js file.

// Background Navigation
Given('the user navigates to the checkout page', () => {
  cartPage.openCart();
  cartPage.clickCheckout();
});

// Successful Checkout Flow with dynamic data
When('the user fills the checkout information with dynamic valid data', () => {
  // Generate random dummy data using faker
  const dynamicFirstName = faker.person.firstName();
  const dynamicLastName = faker.person.lastName();
  const dynamicPostalCode = faker.location.zipCode();

  checkoutPage.fillInformation(dynamicFirstName, dynamicLastName, dynamicPostalCode);
  checkoutPage.clickContinue();
});

When('the user finishes the checkout process', () => {
  checkoutPage.clickFinish();
});

Then('a confirmation message {string} should be displayed', (expectedMessage) => {
  checkoutPage.elements.completeHeader()
    .should('be.visible')
    .and('have.text', expectedMessage);
});

// Error Handling Flow
When('the user tries to continue without filling the information', () => {
  checkoutPage.clickContinue();
});

Then('an error message containing {string} should be displayed on the checkout page', (expectedMessage) => {
  checkoutPage.elements.errorMessage()
    .should('be.visible')
    .and('contain.text', expectedMessage);
});