import { createSlice } from '@reduxjs/toolkit'
import { createFlashNotification } from './flashReducer'
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
    createComment(state, action) {
      const newComment = action.payload.newComment
      const blogToChangeId = action.payload.blogId

      const blogToChange = state.find(blog => blog.id === blogToChangeId)
      const changedBlog = {
        ...blogToChange,
        comments: blogToChange.comments.concat(newComment)
      }
      return state.map(blog => blog.id === blogToChangeId ? changedBlog : blog)
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

export const { appendBlog, changeBlog, createComment, deleteBlog, setBlog } = blogSlice.actions

export const initializeBlog = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlog(blogs))
  }
}

export const updateBlog = (id, blogObject) => {
  return async dispatch => {
    try {
      const changedBlog = await blogService.update(id, blogObject)
      dispatch(changeBlog(changedBlog))
      dispatch(createFlashNotification(`you liked ${blogObject.title}`, 5000))
    } catch (e) {
      dispatch(createFlashNotification(`error liking blog post ${blogObject.title}: ${e}`, 5000))
    }
  }
}

export const addComment = (blogId, comment) => {
  return async dispatch => {
    const newComment = await blogService.createComment(blogId, comment)
    dispatch(createComment({ blogId, newComment }))
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