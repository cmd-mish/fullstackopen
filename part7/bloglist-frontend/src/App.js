import { useEffect } from 'react'
import {
  Routes, Route
} from 'react-router-dom'

import UserInfo from './components/UserInfo'
import Users from './components/Users'
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
  const users = useSelector(state => state.users)

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

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <UserInfo user={user} />
          <Routes>
            <Route path='/' element={<Blogs user={user} blogs={blogs} />} />
            <Route path='/users' element={<Users users={users} />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App
