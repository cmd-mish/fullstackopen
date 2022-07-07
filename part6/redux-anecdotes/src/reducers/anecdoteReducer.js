import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(asObject(content))
    },
    vote(state, action) {
      const id = action.payload
      const anecdoteToVote = state.find(anectote => anectote.id === id)
      const votedAnecdote = {
        ...anecdoteToVote,
        votes: anecdoteToVote.votes + 1
      }
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote  
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { addAnecdote, vote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer