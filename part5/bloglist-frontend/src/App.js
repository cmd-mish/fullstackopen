import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        displayNotification(`a new blog "${blogObject.title}" added`, 'success')
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch(error => {
        displayNotification(error.response.statusText, "error")
      })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })
      
      window.localStorage.setItem(
        'loggedInUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      displayNotification(`welcome, ${user.name}!`, 'success')
      setUsername('')
      setPassword('')
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

  return (
    <div>
      <Notification message={notification} status={notificationStatus} />
      {user === null ?
       <div>
        <h2>log in to application</h2>
        <LoginForm 
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
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
          <BlogForm
            addBlog={addBlog}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </div>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
      }
    </div>
  )
}

export default App
