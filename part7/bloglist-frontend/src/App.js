import { useEffect } from 'react'
import {
  Routes, Route, useMatch, Navigate
} from 'react-router-dom'

import UserInfo from './components/UserInfo'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
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

  const matchUser = useMatch('/users/:id')
  const individualUser = matchUser
    ? userList.find(user => user.id === (matchUser.params.id))
    : null

  const matchBlog = useMatch('/blogs/:id')
  const individualBlog = matchBlog
    ? blogs.find(blog => blog.id === (matchBlog.params.id))
    : null

  return (
    <div>
      <Notification />
      {user === null ?
        <LoginForm /> :
        <div>
          <UserInfo user={user} />
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
