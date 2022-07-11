import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogForm = ({ visibility }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const addBlog = (event) => {
    event.preventDefault()
    const newBlogObject = {
      title: title,
      author: author,
      url: url
    }


    dispatch(createBlog(newBlogObject))
      .then(() => {
        dispatch(setNotification(`a new blog "${newBlogObject.title}" added`, 'success', 5000))
        visibility.current.toggleVisibility()
        setTitle('')
        setAuthor('')
        setUrl('')
      })
      .catch((error) => {
        dispatch(setNotification(error.message, 'error', 5000))
      })
  }
  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type='text'
          value={title}
          name='title'
          onChange={({ target }) => setTitle(target.value)}
          id='blog-form-title'
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='author'
          onChange={({ target }) => setAuthor(target.value)}
          id='blog-form-author'
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='url'
          onChange={({ target }) => setUrl(target.value)}
          id='blog-form-url'
        />
      </div>
      <button type='submit' id='blog-form-submit-button'>create</button>
    </form>
  )
}

export default BlogForm