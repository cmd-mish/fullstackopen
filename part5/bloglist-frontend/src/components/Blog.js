import { useState } from "react"

const Blog = ({ blog, changeLikes, currentUserId, removeBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpansion = () => setExpanded(!expanded)

  const addLike = () => {
    console.log('currentUserId Start', currentUserId)
    console.log('blog', blog)
    const updatedBlogObject = {
      ...blog,
      likes: blog.likes + 1
    }
    console.log('updatedBlogObject', updatedBlogObject)

    changeLikes(blog.id, updatedBlogObject)
    console.log('currentUserId End', currentUserId)
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
      <div style={hideWhenExpanded}>
        {blog.title}&nbsp;
        <button onClick={toggleExpansion}>view</button>
      </div>
      <div style={showWhenExpanded}>
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