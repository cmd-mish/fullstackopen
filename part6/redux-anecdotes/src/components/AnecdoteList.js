import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ notification }) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)

  const filtered = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().indexOf(search.toLowerCase()) !== -1)

  const vote = async (anecdote) => {
    dispatch(voteAnecdote(anecdote))
    notification(`you voted for anecdote '${anecdote.content}'`)
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