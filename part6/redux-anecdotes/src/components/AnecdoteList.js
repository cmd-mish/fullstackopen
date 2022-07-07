import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteList = ({ notification }) => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const search = useSelector(state => state.filter)

  const filtered = anecdotes
    .filter(anecdote => anecdote.content.toLowerCase().indexOf(search.toLowerCase()) !== -1)

  const voteAnecdote = async (anecdote) => {
    dispatch(vote(anecdote.id))
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(anecdote.id, newObject)
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
              <button onClick={() => voteAnecdote(anecdote)}>vote</button>
            </div>
          </div>
        )}
    </div>
  )
}

export default AnecdoteList