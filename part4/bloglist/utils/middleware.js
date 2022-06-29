const tokenExtractor = (request, response, next) => {
  const auth = request.get('authorization')
  console.log(auth)
  if (auth && auth.toLowerCase().startsWith('bearer ')) {
    const token = auth.substring(7)
    request.token = token
  }
  next()
}

module.exports = {
  tokenExtractor
}