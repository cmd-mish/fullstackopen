import { useQuery } from '@apollo/client'
import { useState } from 'react'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [genreFilter, setGenreFilter] = useState('all')

  if (!props.show) {
    return null
  }

  if (result.loading) {
    <div>loading...</div>
  }

  const books = result.data.allBooks
  const allGenres = result.data.allBooks.flatMap(book => book.genres)
  const uniqueGenres = [...new Set(allGenres)]

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
            .filter(book => genreFilter !== 'all' ? book.genres.includes(genreFilter) : true)
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
              onChange={({ target }) => setGenreFilter(target.value)}
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
            onChange={() => setGenreFilter('all')}
          />
          all genres
        </label>
      </form>


    </div >
  )
}

export default Books
