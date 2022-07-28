require('dotenv').config()
const { UserInputError, AuthenticationError } = require('apollo-server')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const jwt = require('jsonwebtoken')
const JWT_PASS = process.env.JWT_PASS

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

      pubsub.publish('BOOK_ADDED', { bookAdded: book })

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
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

module.exports = resolvers