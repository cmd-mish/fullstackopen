const jwt = require('jsonwebtoken')
const User = require('../models/user')

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    })
  }
  next(error)
}

const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    request.token = auth.substring(7)
  }
  next()
}

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!decodedToken.id) {
    return response.status(401).json({ error: 'missing or invalid token' })
  }
  request.user  = await User.findById(decodedToken.id)
  next()
}

module.exports = {
  tokenExtractor, errorHandler, userExtractor
}