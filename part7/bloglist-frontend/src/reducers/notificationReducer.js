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
    removeNotification() {
      return null
    }
  }
})

export const { displayNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, status, timeout) => {
  return dispatch => {
    clearTimeout(timeoutId)

    const notificationObject = {
      message,
      status
    }

    dispatch(displayNotification(notificationObject))
    timeoutId = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)
  }
}

export default notificationSlice.reducer