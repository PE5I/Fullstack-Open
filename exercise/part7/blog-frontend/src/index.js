import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import blogReducer from './reducers/blogReducer'
import flashReducer from './reducers/flashReducer'

const store = configureStore({
  reducer: {
    blogs: blogReducer,
    flash: flashReducer,
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
