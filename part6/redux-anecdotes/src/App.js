import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import anecdoteService from './services/anecdotes'
import Notification from './components/Notification'

import { useDispatch } from 'react-redux'
import { setAnecdotes } from './reducers/anecdoteReducer'
import { displayNotification, removeNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdoteService
      .getAll()
      .then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  }, [dispatch])

  const showNotification = (message) => {
    dispatch(displayNotification(message))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      <Filter />
      <AnecdoteList notification={showNotification} />
      <AnecdoteForm notification={showNotification} />
    </div>
  )
}

export default App