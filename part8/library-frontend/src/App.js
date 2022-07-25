import { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  useEffect(() => {
    setToken(localStorage.getItem('library-user-token'))
  }, [])

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token ?
          <button onClick={() => setPage('login')}>login</button> :
          <span>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => logout()}>logout</button>
          </span>

        }
      </div>

      <Authors show={page === 'authors'} loggedin={token !== null} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} />
    </div>
  )
}

export default App
