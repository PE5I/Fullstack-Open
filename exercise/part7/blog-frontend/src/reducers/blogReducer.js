import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload)
    },
    changeBlog(state, action) {
      const changedBlog = action.payload
      return state.map(blog => blog.id === changedBlog.id ? changedBlog : blog)
    },
    // incrementLike(state, action) {
    //   const id = action.payload
    //   const blogToChange = state.find(blog => blog.id === id)
    //   const changedBlog = {
    //     ...blogToChange,
    //     likes: blogToChange.likes + 1
    //   }
    //   return state.map(blog => blog.id !== id ? blog : changedBlog)
    // },
    deleteBlog(state, action) {
      const id = action.payload
      return state.filter(blog => blog.id !== id)
    },
    setBlog(state, action) {
      // state = action.payload
      // console.log(state, action)
      return action.payload
      // state = action.payload
      // console.log('state: ', state)
    }
  }
})

export const { appendBlog, changeBlog, deleteBlog, setBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const updateBlog = (id, blogObject) => {
  return async dispatch => {
    const changedBlog = await blogService.update(id, blogObject)
    dispatch(changeBlog(changedBlog))
  }
}

export const removeBlog = (id) => {
  return async dispatch => {
    await blogService.deleteBlog(id)
    dispatch(deleteBlog(id))
  }
}

export const addBlog = (newBlogObject) => {
  return async dispatch => {
    const newBlog = await blogService.create(newBlogObject)
    dispatch(appendBlog(newBlog))
  }
}

// export const handleLike = (id, blogObject) => {
//   return async dispatch => {
//     await blogService.update(id, blogObject)
//     dispatch(incrementLike(id))
//   }
// }

export default blogSlice.reducer