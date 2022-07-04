describe('Bloglist app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    const newUser = {
      name: 'frontend test user',
      username: 'frontend',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3003/api/users/', newUser)
    cy.visit('http://localhost:3000')
  })


  it('login form is shown', function() {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('login', function() {
    it('success with correct user credentials', function() {
      cy.get('#login-form-username').type('frontend')
      cy.get('#login-form-password').type('test')
      cy.get('#login-form-sumbit-button').click()

      cy.get('html').should('contain', 'frontend test user is logged in')
    })

    it('failure with wrong credentials', function() {
      cy.get('#login-form-username').type('wronguser')
      cy.get('#login-form-password').type('test')
      cy.get('#login-form-sumbit-button').click()

      cy.get('.error')
        .should('contain', 'invalid username or passowd')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})