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
import { initializeBlogs, createBlog } from './reducers/blogReducer'

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

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(blogObject))
    dispatch(setNotification(`a new blog "${blogObject.title}" added`, 'success', 5000))
  }

  const changeLikes = (id, updatedBlogObject) => {
    blogService
      .update(id, updatedBlogObject)
      // .then(returnedBlog => {
      //   // setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      // })
      .catch(error => {
        dispatch(setNotification(error.response.statusText, 'error', 5000))
      })
  }

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        // setBlogs(blogs.filter(blog => blog.id !== id))
        dispatch(setNotification('blog removed successfully', 'success', 5000))
      })
      .catch(error => {
        dispatch(setNotification(error.response.statusText, 'error', 5000))
      })
  }

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
                createBlog={addBlog}
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
                changeLikes={changeLikes}
                currentUserId={user.id}
                removeBlog={removeBlog}
              />
            )
          }
        </div>
      }
    </div>
  )
}

export default App
