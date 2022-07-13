import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    unsetUser() {
      return null
    }
  }
})

export const { setUser, unsetUser } = userSlice.actions

export const processLogin = userObject => {
  return async dispatch => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )
      blogService.setToken(user)
      dispatch(setUser(user))
      dispatch(setNotification(`welcome, ${user.name}!`, 'success', 5000))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5000))
    }
  }
}

export const setLogin = userObject => {
  return dispatch => {
    dispatch(setUser(userObject))
  }
}

export const processLogout = name => {
  return dispatch => {
    dispatch(unsetUser())
    window.localStorage.removeItem('loggedInUser')
    dispatch(setNotification(`see you, ${name}!`, 'success', 5000))
  }
}

export default userSlice.reducer