import { When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

// Variable to store dynamic data between steps in the same scenario
let dynamicUserData = {};

// ----------------------------------------
// GET Scenario
// ----------------------------------------
When('the client sends a GET request to fetch all users', () => {
  cy.request({
    method: 'GET',
    url: `${baseUrl}/users`
  }).as('apiResponse'); // Saves the response as an alias
});

Then('the response status code should be {int}', (statusCode) => {
  cy.get('@apiResponse').then((response) => {
    expect(response.status).to.eq(statusCode);
  });
});

Then('the response should contain a non-empty list of valid user objects', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.be.an('array').that.is.not.empty;
    expect(response.body[0]).to.have.property('id');
    expect(response.body[0]).to.have.property('name');
  });
});

// ----------------------------------------
// POST Scenario
// ----------------------------------------
When('the client sends a POST request to create a user with dynamic data', () => {
  // Generate random user payload
  // Note: faker.internet.username() uses lowercase 'n' in newer Faker versions
  dynamicUserData = {
    name: faker.person.fullName(),
    username: faker.internet.username(),
    email: faker.internet.email()
  };

  cy.request({
    method: 'POST',
    url: `${baseUrl}/users`,
    body: dynamicUserData
  }).as('apiResponse');
});

Then('the response body should match the created user data', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('name', dynamicUserData.name);
    expect(response.body).to.have.property('username', dynamicUserData.username);
    expect(response.body).to.have.property('id');
  });
});

// ----------------------------------------
// PUT Scenario
// ----------------------------------------
When('the client sends a PUT request to update user {int} with new dynamic data', (userId) => {
  // Generate random update payload with a specific QA suffix
  dynamicUserData = {
    name: faker.person.fullName(),
    username: `${faker.internet.username()}_qa`,
    email: faker.internet.email()
  };

  cy.request({
    method: 'PUT',
    url: `${baseUrl}/users/${userId}`,
    body: dynamicUserData
  }).as('apiResponse');
});

Then('the response body should reflect the updated username', () => {
  cy.get('@apiResponse').then((response) => {
    expect(response.body).to.have.property('username', dynamicUserData.username);
  });
});

// ----------------------------------------
// DELETE Scenario
// ----------------------------------------
When('the client sends a DELETE request to remove user {int}', (userId) => {
  cy.request({
    method: 'DELETE',
    url: `${baseUrl}/users/${userId}`
  }).as('apiResponse');
});