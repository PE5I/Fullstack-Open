import { useState, useEffect, useRef, Fragment } from 'react'
import Blog from './components/BlogList'
import Flash from './components/Flash'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { createUser, removeUser } from './reducers/loggedInUserReducer'
import {
  BrowserRouter as Router,
  Routes, Route, Link
} from 'react-router-dom'

import { initializeUser } from './reducers/userReducer'
import Users from './components/User'

const App = () => {
  // const blogs = useSelector(state => state.blogs)
  // console.log(blogs)
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.loggedInUser)

  useEffect(() => {
    dispatch(initializeBlog())
    dispatch(initializeUser())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      // setUser(user)
      dispatch(createUser(user))
    }
  }, [])

  const blogFormRef = useRef()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }

  return (
    <Router>
      <div>
        <h1>Blogs</h1>
        <Flash />
        {loggedInUser === null ? (
          <div>
            <h1>Login</h1>
            <LoginForm />
          </div>
        ) : (
          <div>
            <div className="login-user">
              {loggedInUser.name ? loggedInUser.name : loggedInUser.username} logged in
              <button id="logout-button" onClick={handleLogout}>
                logout
              </button>
            </div>
            <Routes>
              {/* from https://stackoverflow.com/a/69968312 */}
              <Route path="/"
                element={
                  <>
                    <Togglable buttonLabel="create" refs={blogFormRef}>
                      <BlogForm />
                    </Togglable>
                    <Blog />
                  </>
                }
              />
              <Route path="/users" element={<Users />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  )
}

export default App
