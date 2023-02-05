import { useState, useEffect, useRef, Fragment } from 'react'
import BlogList from './components/BlogList'
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
import UserProfile from './components/UserProfile'
import BlogPost from './components/BlogPost'
import Navigation from './components/Navigation'
import { Container } from '@mui/material'

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

  return (
    <Router>
      <Container>
        <h1>Blogs</h1>
        <Flash />
        {loggedInUser === null ? (
          <div>
            <h1>Login</h1>
            <LoginForm />
          </div>
        ) : (
          <div>
            <Navigation />
            <Routes>
              {/* from https://stackoverflow.com/a/69968312 */}
              <Route path="/"
                element={
                  <>
                    <Togglable buttonLabel="create" refs={blogFormRef}>
                      <BlogForm />
                    </Togglable>
                    <BlogList />
                  </>
                }
              />
              <Route path="/users" element={<Users />} />
              <Route path="/users/:id" element={<UserProfile />} />
              <Route path="/blogs/:id" element={<BlogPost />} />
            </Routes>
          </div>
        )}
      </Container>
    </Router>
  )
}

export default App
