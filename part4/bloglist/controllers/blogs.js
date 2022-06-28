const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
  } else {
    const blog = new Blog(body)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const result = await Blog.findByIdAndRemove(request.params.id)
  if (result) {
    response.status(204).end()
  } else {
    response.status(404).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const { likes, author, url, title } = request.body

  const updatedBlogObject = {
    title: title,
    likes: likes,
    author: author,
    url: url
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, updatedBlogObject, { new: true })
  response.json(result)
})

module.exports = blogsRouter