describe('API REST - Users Endpoint Tests', () => {
  const baseUrl = 'https://jsonplaceholder.typicode.com';

  it('should fetch list of users successfully (GET)', () => {
    // Arrange & Act
    cy.request({
      method: 'GET',
      url: `${baseUrl}/users`
    }).then((response) => {
      // Assert
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array').that.is.not.empty;
      expect(response.body[0]).to.have.property('id');
      expect(response.body[0]).to.have.property('name');
      cy.screenshot('api-get-users-success');
    });
  });

  it('should create a new user successfully (POST)', () => {
    // Arrange
    const userPayload = {
      name: 'Klismam Monteiro',
      username: 'klismam',
      email: 'klismam@example.com'
    };

    // Act
    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      body: userPayload
    }).then((response) => {
      // Assert
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property('name', userPayload.name);
      expect(response.body).to.have.property('username', userPayload.username);
      expect(response.body).to.have.property('id');
      cy.screenshot('api-post-user-success');
    });
  });

  it('should update user information successfully (PUT)', () => {
    // Arrange
    const updatePayload = {
      name: 'Klismam Monteiro',
      username: 'klismam_qa',
      email: 'klismam.qa@example.com'
    };

    // Act
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/1`,
      body: updatePayload
    }).then((response) => {
      // Assert
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('username', updatePayload.username);
      cy.screenshot('api-put-user-success');
    });
  });

  it('should delete a user successfully (DELETE)', () => {
    // Arrange & Act
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/1`
    }).then((response) => {
      // Assert
      expect(response.status).to.eq(200);
      cy.screenshot('api-delete-user-success');
    });
  });
});