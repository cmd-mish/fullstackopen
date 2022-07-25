require('dotenv').config()
const { ApolloServer, UserInputError, gql, AuthenticationError } = require('apollo-server');
const mongoose = require('mongoose');
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')
const jwt = require('jsonwebtoken')

const JWT_PASS = process.env.JWT_PASS

const MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to ', MONGODB_URI)

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Book {
    title: String!
    author: Author!
    published: Int!
    genres: [String!]!
    id: ID!
  }

  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
    createUser(
      username: String!
      favouriteGenre: String!
    ): User
    login(
      username: String!
      password: String!
    ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Book.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let result

      if (args.genre) {
        result = await Book.find({ genres: args.genre }).populate('author')
      } else {
        result = await Book.find({}).populate('author')
      }

      if (args.author) {
        result = result.filter(book => book.author.name === args.author)
      }

      return result
    },
    allAuthors: async () => await Author.find({}),
    me: (root, args, context) => context.currentUser
  },
  Author: {
    bookCount: async (root) => {
      const author = await Author.find({ name: root.name })
      const bookAmount = await Book.countDocuments({ author: author })
      return bookAmount
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not logged in')
      }

      const existingAuthor = await Author.findOne({ name: args.author })
      let book

      if (!existingAuthor) {
        const newAuthor = new Author({ name: args.author })
        try {
          await newAuthor.save()
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        }

        book = new Book({ ...args, author: newAuthor })
      } else {
        book = new Book({ ...args, author: existingAuthor })
      }

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }
      return book
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError('not logged in')
      }

      const existingAuthor = await Author.findOne({ name: args.name })
      if (!existingAuthor) return null

      const updatedAuthor = { ...existingAuthor._doc, born: args.setBornTo }
      await Author.findByIdAndUpdate(existingAuthor._id, updatedAuthor, { new: true })
      return updatedAuthor
    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favouriteGenre: args.favouriteGenre })
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })

      if (!user || args.password !== 'password') {
        throw new UserInputError('wrong username and/or password')
      }

      const userForToken = {
        username: user.username,
        id: user.id
      }

      return { value: jwt.sign(userForToken, JWT_PASS) }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const token = jwt.verify(
        auth.substring(7), JWT_PASS
      )

      const currentUser = await User.findById(token.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})