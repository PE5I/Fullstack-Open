import { createSlice } from '@reduxjs/toolkit'

const flashSlice = createSlice({
  name: 'flash',
  initialState: '',
  reducers: {
    setFlash(state, action) {
      return action.payload
    },
    clearFlash() {
      return ''
    }
  }
})

export const { setFlash, clearFlash } = flashSlice.actions

export const createFlashNotification = (message, timeout) => {
  if (!timeout) { timeout = 5000 }

  return async dispatch => {
    dispatch(setFlash(message))
    console.log("timeout=>", timeout)
    setTimeout(() => {
      dispatch(clearFlash())
    }, timeout)
  }
}

export default flashSlice.reducer