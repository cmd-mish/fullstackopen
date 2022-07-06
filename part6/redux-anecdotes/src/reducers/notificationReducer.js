import { createSlice } from '@reduxjs/toolkit'

const initialState = null

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
export default notificationSlice.reducer