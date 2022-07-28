import { useQuery, useSubscription } from '@apollo/client'
import { useState, useEffect } from 'react'
import { ALL_BOOKS, ALL_BOOKS_GENRES, BOOK_ADDED } from '../queries'

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState(null)
  const [books, setBooks] = useState(null)

  const genres = useQuery(ALL_BOOKS_GENRES)
  const result = useQuery(ALL_BOOKS, {
    variables: {
      genre: genreFilter
    },
    fetchPolicy: 'network-only'
  })

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks)
    }
  }, [result.data])

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      console.log(addedBook)
      window.alert('A new book has been added!')

      result.refetch({ query: ALL_BOOKS })
      genres.refetch({ query: ALL_BOOKS_GENRES })
    }
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    <div>loading...</div>
  }
  const allGenres = genres.data.allBooks.flatMap(book => book.genres)
  const uniqueGenres = [...new Set(allGenres)]

  const switchFilter = (value) => {
    setGenreFilter(value)
    genres.refetch({ query: ALL_BOOKS_GENRES })
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
            <th>genres</th>
          </tr>
          {books
            .map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
                <td>{book.genres.join(', ')}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <form>
        {uniqueGenres.map(genre => (
          <label key={genre}>
            <input
              type='radio'
              value={genre}
              name='genre-filter'
              onChange={({ target }) => switchFilter(target.value)}
            />
            {genre}
          </label>
        ))}
        <label>
          <input
            type='radio'
            key='all'
            value='all'
            name='genre-filter'
            defaultChecked={true}
            onChange={() => switchFilter(null)}
          />
          all genres
        </label>
      </form>


    </div >
  )
}

export default Books
