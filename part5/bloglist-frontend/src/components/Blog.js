import { useState } from "react"

const Blog = ({ blog }) => {
  const [expanded, setExpanded] = useState(false)

  const hideWhenExpanded = { display: expanded ? 'none' : '' }
  const showWhenExpanded = { display: expanded ? '' : 'none' }

  const toggleExpansion = () => setExpanded(!expanded)

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
        <i>likes:</i> {blog.likes} <button>like</button><br />
        <i>author:</i> {blog.author}
      </div>
    </div>
  )
}

export default Blog