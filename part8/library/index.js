require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server');
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');
const Book = require('./models/book')
const Author = require('./models/author')

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
  }
`

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      let result = books.slice()

      if (args.author) {
        result = result.filter(book => book.author === args.author)
      }

      if (args.genre) {
        result = result.filter(book => book.genres.includes(args.genre))
      }
      return result
    },
    allAuthors: () => authors,
  },
  Author: {
    bookCount: (root) => {
      return books.filter(book => book.author === root.name).length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
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

      // const authorExists = authors.some(author => author.name === book.author)

      // if (!authorExists) {
      //   const newAuthor = {
      //     name: book.author,
      //     id: uuidv4(),
      //   }

      //   authors = authors.concat(newAuthor)
      // }

      // books = books.concat(book)
      // return book
    },
    editAuthor: (root, args) => {
      const existingAuthor = authors.find(author => author.name === args.name)
      if (!existingAuthor) return null

      const updatedAuthor = { ...existingAuthor, born: args.setBornTo }
      authors = authors.map(author => author.name === args.name ? updatedAuthor : author)
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})