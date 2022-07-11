import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'

import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

const App = () => {
  const [user, setUser] = useState(null)
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      dispatch(setNotification(`welcome, ${user.name}!`, 'success', 5000))
    } catch (exception) {
      dispatch(setNotification(exception.response.data.error, 'error', 5000))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    dispatch(setNotification(`see you, ${user.name}!`, 'success', 5000))
    setUser(null)
  }
  const blogFormRef = useRef()

  return (
    <div>
      <Notification />
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <LoginForm
            loginFunction={handleLogin}
          />
        </div> :
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={() => handleLogout()}>logout</button>
          </p>
          <div>
            <h2>create new blog</h2>
            <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
              <BlogForm
                visibility={blogFormRef}
              />
            </Togglable>
          </div>
          {blogs
            .slice()
            .sort((a, b) =>
              b.likes - a.likes
            )
            .map(blog =>
              <Blog
                key={blog.id}
                blog={blog}
                currentUserId={user.id}
              />
            )
          }
        </div>
      }
    </div>
  )
}

export default App
