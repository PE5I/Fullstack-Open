describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
  })

  it('front page can be opened', function () {
    cy.contains('Blogs')
    cy.contains('log in to application')
  })

  describe('Login', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Pesi',
        username: 'pesi',
        password: 'secret',
      })
      cy.visit('http://localhost:3000')
    })
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('pesi')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('Pesi logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Pesi',
        username: 'pesi',
        password: 'secret',
      })
      cy.visit('http://localhost:3000')
      cy.get('#username').type('pesi')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function () {
      cy.contains('create').click()
      cy.get('#title').type('New blog for a new day')
      cy.get('#author').type('New Author on the Blog')
      cy.get('#url').type('http://urlforatest')
      cy.get('#create-button').click()

      cy.contains('New blog for a new day')
      cy.contains('New Author on the Blog')
      cy.contains('view').click()
      cy.contains('http://urlforatest')
      cy.contains('likes')
      cy.contains('Pesi')
    })
  })

  describe('When user is logged in and creates a blog', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Pesi',
        username: 'pesi',
        password: 'secret',
      })
      cy.request('POST', 'http://localhost:3003/api/users', {
        name: 'Someone Else',
        username: 'someone',
        password: 'supersecret',
      })
      cy.visit('http://localhost:3000')
      cy.get('#username').type('pesi')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('create').click()
      cy.get('#title').type('New blog for a new day')
      cy.get('#author').type('New Author on the Blog')
      cy.get('#url').type('http://urlforatest')
      cy.get('#create-button').click()
    })

    it('user can like a blog', function () {
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('likes 1')
    })

    it('user who did not create blog cannot delete it', function () {
      cy.get('#logout-button').click()
      cy.get('#username').type('someone')
      cy.get('#password').type('supersecret')
      cy.get('#login-button').click()

      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('New blog for a new day')
    })

    it('user who owns the blog can delete it', function () {
      cy.contains('view').click()
      cy.get('#remove-button').click()
      cy.contains('Blog removed successfully')
    })

    it('when user adds another blog with more likes, that blog will be ordered first', function () {
      // like the initial post and hide it
      cy.contains('view').click()
      cy.get('#like-button').click()
      cy.contains('hide').click()

      // create a new post and like it twice
      cy.get('#title').type('Old blog I wrote yesterday')
      cy.get('#author').type('Good author')
      cy.get('#url').type('http://testforaurl')
      cy.get('#create-button').click()

      cy.get('.blog-post').eq(1).contains('view').click()
      cy.get('#like-button').click()
      cy.get('#like-button').click()

      cy.get('.blog-post').eq(0).contains('Old blog I wrote yesterday')
      cy.get('.blog-post').eq(1).contains('New blog for a new day')
    })
  })
})
