import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  const [notification, setNotification] = useState(null)
  const [notificationStatus, setNotificationStatus] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

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

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        displayNotification(`a new blog "${blogObject.title}" added`, 'success')
      })
      .catch(error => {
        displayNotification(error.response.statusText, "error")
      })
  }

  const changeLikes = (id, updatedBlogObject) => {
    blogService
      .update(id, updatedBlogObject)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
      .catch(error => {
        displayNotification(error.response.statusText, "error")
      })
  }

  const removeBlog = (id) => {
    blogService
      .remove(id)
      .then(() => {
        setBlogs(blogs.filter(blog => blog.id !== id))
        displayNotification(`blog remove successfully`, 'success')
      })
      .catch(error => {
        displayNotification(error.response.data.error, "error")
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
      displayNotification(`welcome, ${user.name}!`, 'success')
    } catch (exception) {
      displayNotification(exception.response.data.error, 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    displayNotification(`see you, ${user.name}!`, 'success')
    setUser(null)
  }

  const displayNotification = (message, status) => {
    setNotification(message)
    setNotificationStatus(status)
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const blogFormRef = useRef()

  return (
    <div>
      <Notification message={notification} status={notificationStatus} />
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
          <h2>create a new blog</h2>
          <Togglable buttonLabel='create a new blog' ref={blogFormRef}>
            <BlogForm
              createBlog={addBlog}
            />
          </Togglable>
        </div>
        {blogs
          .sort((a, b) =>  
            b.likes - a.likes
          )
          .map(blog =>
            <Blog 
              key={blog.id} 
              blog={blog} 
              changeLikes={changeLikes} 
              currentUserId={user.id}
              removeBlog={removeBlog} />
          )
        }
      </div>
      }
    </div>
  )
}

export default App
