const app =  require('./app')
const http = require('http')

const server = http.createServer(app)

const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`)
})