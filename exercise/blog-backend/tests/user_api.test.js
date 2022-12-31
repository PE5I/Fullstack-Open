const supertest = require('supertest')
const helper = require('./api_helper')
const User = require('../models/user')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  await User.insertMany(helper.initialUsers)
})

describe('adding a new user', () => {
  test('succeeds with a valid user', async () => {
    const newUser = {
      name: 'First User',
      username: 'firstuser',
      password: 'myawesomepassword!'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length + 1)

    const contents = usersAtEnd.map(u => u.username)
    expect(contents).toContain(
      'firstuser'
    )
  })

  test('fails with an invalid username', async () => {
    const newUser = {
      name: 'FirstUser',
      username: 'fu',
      password: 'goodpassword'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

    const contents = usersAtEnd.map(u => u.username)
    expect(contents).not.toContain(
      'fu'
    )
  })

  test('fails with an invalid password', async () => {
    const newUser = {
      name: 'FirstUser',
      username: '1stuser',
      password: 'p'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)

    const contents = usersAtEnd.map(u => u.username)
    expect(contents).not.toContain(
      'fu'
    )
  })
})