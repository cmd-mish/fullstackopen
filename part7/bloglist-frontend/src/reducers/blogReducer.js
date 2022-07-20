import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      state.push(action.payload)
    },
    updateBlog(state, action) {
      const updateBlog = action.payload
      const id = updateBlog.id
      return state.map(blog =>
        blog.id !== id ? blog : updateBlog
      )
    },
    removeBlog(state, action) {
      const id = action.payload
      return state.filter(blog =>
        blog.id !== id
      )
    }
  }
})

export const { setBlog, addBlog, updateBlog, removeBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const createBlog = blogObject => {
  return async dispatch => {
    const newBlog = await blogService.create(blogObject)
    dispatch(addBlog(newBlog))
  }
}

export const likeBlog = blogObject => {
  return async dispatch => {
    const updatedBlog = await blogService.update(blogObject.id, blogObject)
    dispatch(updateBlog(updatedBlog))
  }
}

export const commentBlog = (id, commentObject) => {
  return async dispatch => {
    const updatedBlog = await blogService.createComment(id, commentObject)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlog(id))
  }
}

export default blogSlice.reducer