import { createSlice } from '@reduxjs/toolkit'

const flashSlice = createSlice({
  name: 'flash',
  initialState: '',
  reducers: {
    setFlash(state, action) {
      return action.payload
    },
    clearFlash(state, action) {
      action.payload = ''
      return action.payload
    }
  }
})

export const { setFlash, clearFlash } = flashSlice.actions

export const setFlashMessage = (message, timeout) => {
  return async dispatch => {
    dispatch(setFlash(message))
    setTimeout(() => {
      dispatch(clearFlash())
    }, timeout)
  }
}

export default flashSlice.reducer