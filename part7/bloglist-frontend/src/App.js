import { useEffect } from 'react'
import {
  Routes, Route, useMatch, Navigate, useNavigate, useLocation
} from 'react-router-dom'

import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Blogs from './components/Blogs'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Navigation from './components/Navigation'

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
  const navigate = useNavigate()

  useEffect(() => {
    if (user !== null) {
      dispatch(initializeBlogs())
      dispatch(getUserList())
    } else {
      navigate('/')
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

  const matchUser = useMatch('/users/:id')
  const individualUser = matchUser
    ? userList.find(user => user.id === (matchUser.params.id))
    : null

  const matchBlog = useMatch('/blogs/:id')
  const individualBlog = matchBlog
    ? blogs.find(blog => blog.id === (matchBlog.params.id))
    : null

  const location = useLocation().pathname

  return (
    <div className='container'>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <Navigation user={user} location={location} />
          <Routes>
            <Route path='/' element={<Navigate replace to="/blogs" />} />
            <Route path='/blogs' element={<Blogs blogs={blogs} />} />
            <Route path='/blogs/:id' element={<Blog blog={individualBlog} currentUserId={user.id} />} />
            <Route path='/users' element={<Users users={userList} />} />
            <Route path='/users/:id' element={<User user={individualUser} />} />
          </Routes>
        </div>
      }
    </div>
  )
}

export default App
