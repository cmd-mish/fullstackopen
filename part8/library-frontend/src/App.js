import { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { USER } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const user = useQuery(USER)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  useEffect(() => {
    if (!user.loading && user.data.me) {
      setCurrentUser(user.data)
      console.log(currentUser)
    }
  }, [user.data]) // eslint-disable-line

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
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={() => logout()}>logout</button>
          </span>

        }
      </div>

      <Authors show={page === 'authors'} loggedin={token !== null} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} setPage={setPage} />

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage} user={user} />

      <Recommendations show={page === 'recommend'} currentUser={currentUser} />
    </div>
  )
}

export default App
