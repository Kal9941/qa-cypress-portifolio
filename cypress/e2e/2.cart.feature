Feature: Shopping Cart & Badge Management Tests
  As an authenticated user of SauceDemo
  I want to add and remove items from my cart
  So that I can manage my selected products before checkout

  Background:
    Given the user is logged in and on the inventory page

  Scenario: Should add an item to the cart and display it in the cart page
    When the user adds the backpack to the cart
    And the user opens the cart
    Then the cart badge should display "1"
    And the "Sauce Labs Backpack" should be visible in the cart

  Scenario: Should remove an item from inside the cart page and clear badge count
    When the user adds the backpack to the cart
    And the user opens the cart
    And the user removes the backpack from the cart page
    Then the cart badge should not exist
    And the item should be removed from the cart list

  Scenario: Should increment cart badge count accurately when adding multiple items
    When the user adds the backpack to the cart
    And the user adds the bike light to the cart
    Then the cart badge should display "2"

  Scenario: Should toggle button state to "Remove" after adding an item to the cart
    When the user adds the backpack to the cart
    Then the button for the backpack should change to "Remove"

  Scenario: Should remove an item directly from the inventory page and restore the Add to Cart button
    When the user adds the backpack to the cart
    And the user removes the backpack from the inventory page
    Then the cart badge should not exist
    And the button for the backpack should change back to "Add to cart"