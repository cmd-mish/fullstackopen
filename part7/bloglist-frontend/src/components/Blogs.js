import { useRef } from 'react'
import Togglable from './Togglable'
import BlogForm from './BlogForm'
import Blog from './Blog'

const Blogs = ({ user, blogs }) => {
  const blogFormRef = useRef()

  return (
    <div>
      <div>
        <h2>create new blog</h2>
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
          <Blog
            key={blog.id}
            blog={blog}
            currentUserId={user.id}
          />
        )
      }
    </div>
  )
}

export default Blogs