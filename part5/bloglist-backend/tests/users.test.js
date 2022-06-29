const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const app = require('../app')
const helper = require('./test_helper')
const api = supertest(app)

describe('user creation', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('hash', 10)
    const user = new User({ username: 'testuser', passwordHash })

    await user.save()
  })

  test('creating a new user with valid details', async () => {
    const usersAtStart = await helper.usersInDb()
    
    const newUser = {
      username: 'testuser1',
      name: 'test user one',
      password: '758349'
    }

    await api
      .post('/api/users/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(user => user.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creating a new user without a username', async () => {
    const newUser = {
      name: 'test user without a name',
      password: '123456'
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('you must provide both username and password')
  })

  test('creating a new user without a password', async () => {
    const newUser = {
      name: 'test user without a name',
      username: 'testuser2'
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('you must provide both username and password')
  })

  test('creating a user with too short username', async () => {
    const newUser = {
      username: "jj",
      name: 'test user without a name',
      password: '123456'
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('both username and password must be at least 3 characters long')
  })

  test('creating a user with existing username', async () => {
    const newUser = {
      username: "testuser",
      name: 'test user without a name',
      password: '123456'
    }

    const result = await api
      .post('/api/users/')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toBe('user with this username already exists')
  })
})