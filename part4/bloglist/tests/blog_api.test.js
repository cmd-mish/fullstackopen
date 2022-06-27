const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('blog posts are returned in the JSON format', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('unique identifier is named "id"', async () => {
  const response = await api.get('/api/blogs')
  
  response.body.forEach(blog => {
    expect(blog.id).toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})