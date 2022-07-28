import { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

let authors

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)

  if (!props.show) {
    return null
  }

  if (result.loading) {
    return <div>loading...</div>
  }

  authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <AuthorsForm loggedin={props.loggedin} />
    </div>
  )
}

const AuthorsForm = ({ loggedin }) => {
  const [name, setName] = useState(authors[0].name)
  const [bornString, setBornString] = useState('')

  const [changeBorn] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      console.log(error.graphQLErrors[0].message)
    }
  })

  const submit = async (event) => {
    event.preventDefault()
    const setBornTo = parseInt(bornString, 10)

    changeBorn({ variables: { name, setBornTo } })
    setBornString('')
  }

  if (!loggedin) {
    return null
  }

  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select onChange={({ target }) => setName(target.value)}>
            {authors.map(a => (
              <option value={a.name} key={a.name}>{a.name}</option>
            ))}
          </select >
        </div>
        <div>
          born
          <input
            value={bornString}
            onChange={({ target }) => setBornString(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )

}

export default Authors
