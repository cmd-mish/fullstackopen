import { createSlice } from '@reduxjs/toolkit'

const initialState = null
let timeoutId = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      return null
    }
  }
})

export const { displayNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {
  return dispatch => {
    clearTimeout(timeoutId)
    dispatch(displayNotification(message))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer