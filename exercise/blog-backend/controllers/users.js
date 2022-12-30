// we need to get user list (with expanded notes)
// and be able to create a new user
const { response } = require('../app')
const User = require('../models/user')
const userRouter = require('express').Router()

userRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs')

  response.json(users)
})

userRouter.post('/', async (request, response)) => {
  const { username, name, password } = request.body
  // check username for uniqueness
  const existingUser = User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username is taken'
    })
  }

  const saltRounds = 10
  const passwordHash = bcrypt.hash(password, saltRounds)

  const newUser = new User({
    username,
    password,
    name
  })

  const savedUser = await newUser.save()
  response.status(201).json(savedUser)
}

module.exports = usersRouter
