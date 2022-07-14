import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import { Link } from 'react-router-dom'

const Blogs = ({ blogs }) => {
  const blogFormRef = useRef()

  const blogItemStyle = {
    margin: 5,
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    minWidth: '280px',
    width: 'fit-content'
  }

  return (
    <div>
      <div>
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
          <div style={blogItemStyle} key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </div>
        )
      }
    </div>
  )
}

export default Blogs