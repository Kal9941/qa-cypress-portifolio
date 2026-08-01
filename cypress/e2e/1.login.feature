Feature: Authentication & Security Tests
  As a user of SauceDemo
  I want to interact with the login interface
  So that I can access the system securely and handle edge/security cases appropriately

  Background:
    Given the user navigates to the login page

  Scenario: Should login successfully with valid credentials
    When the user enters valid credentials
    Then the user should be redirected to the inventory page

  Scenario: Should display an error message when logging in with invalid credentials
    When the user enters invalid credentials "invalid_user" and "invalid_password"
    Then an error message containing "Username and password do not match any user in this service" should be displayed

  Scenario: Should display an error message when submitting empty credentials
    When the user clicks the login button without entering credentials
    Then an error message containing "Epic sadface: Username is required" should be displayed

  Scenario: Should display an error message when submitting only the username
    When the user enters only username "standard_user"
    Then an error message containing "Epic sadface: Password is required" should be displayed

  Scenario: Should display an error message when submitting only the password
    When the user enters only password "secret_sauce"
    Then an error message containing "Epic sadface: Username is required" should be displayed

  Scenario: Should handle special characters input gracefully without breaking the UI
    When the user enters special characters payload "!@#$%^&*()_+-=[]{}|;:,.<>?"
    Then an error message should be visible on the login page

  Scenario: Should prevent SQL Injection attempts and show authorization error
    When the user enters SQL injection payload "' OR '1'='1"
    Then an error message should be visible on the login page

  Scenario: Should prevent XSS attacks and render script tags as plain text
    When the user enters XSS payload "<script>alert('XSS')</script>"
    Then an error message should be visible on the login page

  Scenario: Should handle excessively long input payloads gracefully
    When the user enters an excessively long string payload of 100 characters
    Then an error message should be visible on the login page

  Scenario: Should reject inputs containing only white spaces
    When the user enters blank space payload "     "
    Then an error message should be visible on the login page