import { useEffect, useRef } from 'react'

import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

import blogService from './services/blogs'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { setLogin, processLogout } from './reducers/userReducer'

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

  const blogFormRef = useRef()

  return (
    <div>
      <Notification />
      {user === null ?
        <div>
          <h2>log in to application</h2>
          <LoginForm />
        </div> :
        <div>
          <h2>blogs</h2>
          <p>
            {user.name} is logged in
            <button onClick={() => dispatch(processLogout(user.name))}>logout</button>
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
