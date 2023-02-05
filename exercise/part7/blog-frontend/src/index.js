import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import blogReducer from './reducers/blogReducer'
import flashReducer from './reducers/flashReducer'
import loggedInUserReducer from './reducers/loggedInUserReducer'
import userReducer from './reducers/userReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    users: userReducer,
    flash: flashReducer,
    loggedInUser: loggedInUserReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
