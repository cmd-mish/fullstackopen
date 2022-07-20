import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return <h3>user not found</h3>
  }
  return (
    <div>
      <h2>blogs added by {user.name}</h2>
      {user.blogs.length > 0 ?
        <ul>
          {user.blogs.map(blog =>
            <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
          )}
        </ul> :
        <div>no blogs found</div>
      }
    </div>
  )
}

export default User