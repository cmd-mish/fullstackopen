const blogsRouter = require('express').Router()
const userExtractor = require('../utils/middleware').userExtractor
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog
    .findById(request.params.id)
  response.json(blog)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
  } else {
    const user = request.user

    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes,
      author: body.author,
      user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog) {
    if (blog.user.toString() === user.id) {
      await Blog.findByIdAndRemove(blog.id)
      response.status(204).end()
    } else {
      response.status(401).json({
        error: 'to delete a blog login with the creator\'s id'
      })
    }
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', userExtractor, async (request, response) => {
  const { likes, author, url, title, user } = request.body
  const loggedInUser = request.user

  if (!loggedInUser) {
    return response.status(401).json({
      error: 'log in to like posts'
    })
  }

  if (likes && author && url && title && user) {
    const updatedBlogObject = {
      title: title,
      likes: likes,
      author: author,
      url: url,
      user: user.id
    }

    const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlogObject, { new: true })
    response.json(result)
  } else {
    response.status(400).end()
  }
})

module.exports = blogsRouter