import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ blog, currentUserId }) => {
  const [expanded, setExpanded] = useState(false)
  const dispatch = useDispatch()

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpansion = () => setExpanded(!expanded)

  const addLike = () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1
    }

    dispatch(likeBlog(updatedBlogObject))
  }

  const removeThisBlog = () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      dispatch(deleteBlog(blog.id))
        .then(() => {
          dispatch(setNotification(`blog "${blog.title}" removed`, 'success', 5000))
        })
        .catch((error) => {
          dispatch(setNotification(error.message, 'error', 5000))
        })
    }
  }

  const blogStyle = {
    margin: 5,
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    minWidth: '280px',
    width: 'fit-content'
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenExpanded} className='blog-default'>
        {blog.title}&nbsp;
        <button onClick={toggleExpansion}>view</button>
      </div>
      <div style={showWhenExpanded} className='blog-expanded'>
        {blog.title}&nbsp;
        <button onClick={toggleExpansion}>hide</button><br />
        <i>url:</i> <a href={blog.url}>{blog.url}</a><br />
        <i>likes:</i> {blog.likes} <button onClick={addLike}>like</button><br />
        <i>author:</i> {blog.author}<br />
        {(currentUserId === blog.user.id || currentUserId === blog.user) ?
          <button onClick={removeThisBlog}>remove</button>
          : ''
        }
      </div>
    </div>
  )
}

export default Blog