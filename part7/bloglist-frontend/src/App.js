import { useEffect } from 'react'
import {
  Routes, Route, useMatch
} from 'react-router-dom'

import UserInfo from './components/UserInfo'
import Users from './components/Users'
import User from './components/User'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/userReducer'
import { getUserList } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const userList = useSelector(state => state.users)

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
      dispatch(getUserList())
    }
  }, [dispatch, user])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setLogin(user))
      blogService.setToken(user.token)
    }
  }, [])

  const match = useMatch('/users/:id')
  const individualUser = match
    ? userList.find(user => user.id === (match.params.id))
    : null

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <UserInfo user={user} />
          <Routes>
            <Route path='/' element={<Blogs user={user} blogs={blogs} />} />
            <Route path='/users' element={<Users users={userList} />} />
            <Route path='/users/:id' element={<User user={individualUser} />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App
