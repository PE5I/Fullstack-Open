import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    setUserNull(state, action) {
      action.payload = null
      return action.payload
    }
  }
})

export const { setUser, setUserNull } = userSlice.actions

export const createUser = (userObject) => {
  return async dispatch => {
    blogService.setToken(userObject.token)
    dispatch(setUser(userObject))
  }
}

export const removeUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)
    dispatch(setUserNull())
  }
}

export default userSlice.reducer