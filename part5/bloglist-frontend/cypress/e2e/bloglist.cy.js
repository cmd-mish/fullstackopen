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

  describe('when logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'frontend', password: 'test' })
    })

    it.only('a blog can be created', function() {
      cy.contains('create a new blog').click()

      cy.get('#blog-form-title').type('blog tittle added from cypress')
      cy.get('#blog-form-author').type('cypress author')
      cy.get('#blog-form-url').type('https://www.cypress.io/')
      cy.get('#blog-form-submit-button').click()

      cy.get('.blog-default').should('contain', 'blog tittle added from cypress')
    })
  })
})