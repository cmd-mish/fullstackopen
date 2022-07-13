import { useEffect } from 'react'

import UserInfo from './components/UserInfo'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLogin } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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
          <Blogs user={user} blogs={blogs} />
        </div>
      }
    </div>
  )
}

export default App
