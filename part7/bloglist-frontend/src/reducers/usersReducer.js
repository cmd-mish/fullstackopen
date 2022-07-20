import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const usersSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const { setUsers } = usersSlice.actions

export const getUserList = () => {
  return async dispatch => {
    const result = await userService.getAll()
    dispatch(setUsers(result))
  }
}

export default usersSlice.reducer