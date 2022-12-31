// we need to get user list (with expanded notes)
// and be able to create a new user
const User = require('../models/user')
const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')
  response.json(users)
})

const passwordIsValid = (password) => {
  if (password.length < 3) {
    return false
  }
  return true
}

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  // check username for uniqueness
  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username is taken'
    })
  }
  if (!passwordIsValid(password)) {
    return response.status(400).json({
      error: 'password must be at least 3 characters'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    passwordHash,
    name
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
