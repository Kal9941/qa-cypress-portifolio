Feature: Checkout Journey Tests
  As an authenticated user of SauceDemo
  I want to complete the checkout process
  So that I can successfully purchase my selected items

  Background:
    Given the user is logged in and on the inventory page
    And the user adds the backpack to the cart
    And the user navigates to the checkout page

  Scenario: Should complete a purchase successfully from cart to order confirmation
    When the user fills the checkout information with dynamic valid data
    And the user finishes the checkout process
    Then a confirmation message "Thank you for your order!" should be displayed

  Scenario: Should display an error message when submitting empty personal info in checkout
    When the user tries to continue without filling the information
    Then an error message containing "Error: First Name is required" should be displayed on the checkout page