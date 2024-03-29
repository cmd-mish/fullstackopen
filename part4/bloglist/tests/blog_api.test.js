const mongoose = require('mongoose')
const supertest = require('supertest')
const jwt = require('jsonwebtoken')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

let token, user

beforeAll(async () => {
  const loginDetails = {
    username: 'testuser',
    password: 'hash'
  }

  const login = await api
    .post('/api/login')
    .set('Content-Type', 'application/json')
    .send(loginDetails)

  token = login.body.token
  user = jwt.verify(token, process.env.SECRET)
})

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    blogObject.user = user.id
    await blogObject.save()
  }
})

describe('getting existing blogs', () => {
  test('blogs are returned in the JSON format', async () => {
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
})

describe('creating new blogs', () => {
  test('a new blog can be created with POST request', async () => {
    const newBlog = {
      title: "blog added from the test",
      author: "default author",
      url: "https://example.com/",
      likes: 2
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '.concat(token))
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain('blog added from the test')
  })

  test('unable to add a blog without a token', async () => {
    const newBlog = {
      title: "blog without a token",
      author: "default author",
      url: "https://example.com/",
      likes: 2
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })

  test('missing likes result in 0', async () => {
    const newBlog = {
      title: "blog with missing likes",
      author: "default author",
      url: "https://example.com/"
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '.concat(token))
      .send(newBlog)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const indexOfTest = blogsAtEnd.findIndex(blog => blog.title === 'blog with missing likes')
    expect(blogsAtEnd[indexOfTest].likes).toEqual(0)
  })

  test('400 Bad Request response to missing title and/or url', async () => {
    let newBlog = {
      author: "default author"
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '.concat(token))
      .send(newBlog)
      .expect(400)

    newBlog = {
      author: "default author",
      url: "https://example.com/"
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '.concat(token))
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: "blog with no url",
      author: "default author"
    }

    await api
      .post('/api/blogs')
      .set('Authorization', 'bearer '.concat(token))
      .send(newBlog)
      .expect(400)
  })
})

describe('deleting blogs', () => {
  test('deleting a single blog by id', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToBeDeleted = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToBeDeleted.id}`)
      .set('Authorization', 'bearer '.concat(token))
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).not.toContain(blogToBeDeleted.title)
  })

  test('deleting a blog with non-existing id results in 404', async () => {
    await api
      .delete('/api/blogs/5a422aa71b54a676234d17f3')
      .set('Authorization', 'bearer '.concat(token))
      .expect(404)
  })

  test('deleting a blog with id in a wrong format results in 500', async () => {
    await api
      .delete('/api/blogs/123')
      .set('Authorization', 'bearer '.concat(token))
      .expect(500)
  })
})

describe('updating a blog', () => {
  test('set a new amount of likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const indexOfBlog = blogsAtStart.findIndex(blog => blog.title === 'First class tests')
    const blogToEdit = blogsAtStart[indexOfBlog]

    const updatedBlog = {
      likes: 10
    }

    const result = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(updatedBlog)
    expect(result.body.likes).toEqual(10)
  })

  test('changing url and likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const indexOfBlog = blogsAtStart.findIndex(blog => blog.title === 'First class tests')
    const blogToEdit = blogsAtStart[indexOfBlog]

    const updatedBlog = {
      url: "https://example.com/",
      likes: 50
    }

    const result = await api
      .put(`/api/blogs/${blogToEdit.id}`)
      .send(updatedBlog)
    expect(result.body.likes).toEqual(50)
    expect(result.body.url).toBe('https://example.com/')
  })
})

afterAll(() => {
  mongoose.connection.close()
})