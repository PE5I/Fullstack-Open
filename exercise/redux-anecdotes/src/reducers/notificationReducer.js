import { createSlice } from "@reduxjs/toolkit"

const initialState = ''


const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    removeNotification(state, action) {
      // state = ''
      return ''
    }
  }
})

export const { createNotification, removeNotification } = notificationSlice.actions

export const setNotification = (message, timeout) => {

  return async (dispatch, getState) => {
    // clearTimeout(timeoutID)
    let id = getState().notification.timeoutID
    clearTimeout(id)

    const timeoutID = setTimeout(() => {
      dispatch(removeNotification())
    }, timeout)

    dispatch(createNotification({ message, timeoutID }))

    
  }
}

export default notificationSlice.reducer