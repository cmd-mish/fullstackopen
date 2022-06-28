const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, password, name } = request.body

  if (!username || !password) {
    return response.status(400).json({
      error: 'you must provide both username and password'
    })
  }

  if (username.length < 3 || password.length < 3) {
    return response.status(400).json({
      error: 'both username and password must be at least 3 characters long'
    })
  }

  const userExists = await User.findOne({ username })
  if (userExists) {
    return response.status(400).json({
      error: 'user with this username already exists'
    })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, 
    name, 
    passwordHash
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter