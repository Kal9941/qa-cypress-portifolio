Feature: REST API - Users Endpoint Tests
  As an API client
  I want to interact with the users endpoint
  So that I can fetch, create, update, and delete user records securely

  Scenario: Should fetch list of users successfully (GET)
    When the client sends a GET request to fetch all users
    Then the response status code should be 200
    And the response should contain a non-empty list of valid user objects

  Scenario: Should create a new user successfully (POST)
    When the client sends a POST request to create a user with dynamic data
    Then the response status code should be 201
    And the response body should match the created user data

  Scenario: Should update user information successfully (PUT)
    When the client sends a PUT request to update user 1 with new dynamic data
    Then the response status code should be 200
    And the response body should reflect the updated username

  Scenario: Should delete a user successfully (DELETE)
    When the client sends a DELETE request to remove user 1
    Then the response status code should be 200