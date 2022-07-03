import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, changeLikes, currentUserId, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpansion = () => setExpanded(!expanded)

  const addLike = () => {
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1
    }

    changeLikes(blog.id, updatedBlogObject)
  }

  const removeThisBlog = () => {
    if (window.confirm(`Remove blog "${blog.title}"?`)) {
      removeBlog(blog.id)
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

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  changeLikes: PropTypes.func.isRequired,
  currentUserId: PropTypes.oneOfType([
    PropTypes.object.isRequired,
    PropTypes.string.isRequired
  ]),
  removeBlog: PropTypes.func.isRequired
}

export default Blog