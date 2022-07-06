import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

const AnecdoteList = ({ notification }) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)

  const filtered = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().indexOf(search.toLowerCase()) !== -1)
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
              <button onClick={() => {
                dispatch(vote(anecdote.id))
                notification(`you voted for anecdote '${anecdote.content}'`)
              }}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList