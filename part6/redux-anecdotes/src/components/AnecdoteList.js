import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)

  const filtered = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().indexOf(search.toLowerCase()) !== -1)

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    dispatch(setNotification(`you voted for anecdote '${anecdote.content}'`, 5000))
  }

  return (
    <div>
      {filtered
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList