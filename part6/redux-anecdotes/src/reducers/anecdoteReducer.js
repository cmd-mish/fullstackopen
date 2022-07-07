import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const updatedObject = action.payload
      const id = updatedObject.id
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : updatedObject
      )
    }
  }
})

export const { addAnecdote, setAnecdotes, updateAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const newObject = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(anecdote.id, newObject)
    dispatch(updateAnecdote(newObject))
  }
}

export default anecdoteSlice.reducer