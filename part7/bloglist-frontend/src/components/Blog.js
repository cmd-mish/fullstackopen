import { useDispatch } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useNavigate, Link } from 'react-router-dom'

const Blog = ({ blog, currentUserId }) => {
  if (!blog) {
    return <h3>blog not found</h3>
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

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
          navigate('/blogs')
        })
        .catch((error) => {
          dispatch(setNotification(error.message, 'error', 5000))
        })
    }
  }

  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        <i>url:</i> <a href={blog.url}>{blog.url}</a><br />
        <i>likes:</i> {blog.likes} <button onClick={addLike}>like</button><br />
        <i>author:</i> {blog.author}<br />
        <i>added by:</i> <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link><br />
        {(currentUserId === blog.user.id || currentUserId === blog.user) ?
          <button onClick={removeThisBlog}>remove</button>
          : ''
        }
      </div>
    </div>
  )
}

export default Blog