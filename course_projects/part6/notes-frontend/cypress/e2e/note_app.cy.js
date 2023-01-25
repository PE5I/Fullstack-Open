// import cy from 'cypress'

describe('Note app', function () {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Pesi',
      username: 'pesi',
      password: 'secret'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function() {
    cy.contains('Notes')
    cy.contains('Note app, Department of Computer Science, University of Helsinki')
  })

  // it('front page contains random text', function() {
  //   cy.visit('http://localhost:3000')
  //   cy.contains('wtf is this app?')
  // })
  it('login form can be opened', function() {
    cy.contains('login').click()
  })

  it('login fails with wrong password', function() {
    cy.contains('login').click()
    cy.get('#username').type('pesi')
    cy.get('#password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error').contains('Wrong credentials')
  })

  it('user can login', function() {
    cy.contains('login').click()
    // cy.get('input:first').type('admin')
    // cy.get('input:last').type('mypassword!')
    cy.get('#username').type('pesi')
    cy.get('#password').type('secret')
    cy.get('#login-button').click()

    cy.contains('pesi logged-in')
  })

  describe('when logged in', function() {
    beforeEach(function() {
      cy.contains('login').click()
      cy.get('#username').type('pesi')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('a new note can be created', function() {
      cy.contains('new note').click()
      cy.get('#createNote-button').type('a note created by cypress')
      cy.contains('save').click()
      cy.contains('a note created by cypress')
    })

    describe('and a note exists', function() {
      beforeEach(function() {
        cy.contains('new note').click()
        cy.get('#createNote-button').type('another note cypress')
        cy.contains('save').click()
      })

      it('it can be made important', function() {
        cy.contains('another note cypress')
          .contains('make important')
          .click()

        cy.contains('another note cypress')
          .contains('make not important')
      })
    })
  })
})