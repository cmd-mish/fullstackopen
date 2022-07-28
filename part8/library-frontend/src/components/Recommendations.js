import { useEffect, useState } from 'react'
import { ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'


const Recommendations = (props) => {
  const [favouriteGenre, setFavouriteGenre] = useState(null)

  useEffect(() => {
    if (props.currentUser && props.currentUser.me !== null) {
      setFavouriteGenre(props.currentUser.me.favouriteGenre)
    }
  }, [props.currentUser])

  const result = useQuery(ALL_BOOKS, {
    variables: { genre: favouriteGenre },
  })

  if (!props.show) {
    return null
  }

  if (result.loading) {
    <div>loading...</div>
  }

  const books = result.data.allBooks

  return (
    <div>
      <h2>recommendations</h2>
      books in your favourite genre <b>{favouriteGenre}</b>
      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .map(book => (
              <tr key={book.title}>
                <td>{book.title}</td>
                <td>{book.author.name}</td>
                <td>{book.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Recommendations