const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.title || !body.url) {
    response.status(400).end()
  } else {
    const user = await User.findOne({})

    const blog = new Blog({
      title: body.title,
      url: body.url,
      likes: body.likes,
      author: body.author,
      user: user
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    
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