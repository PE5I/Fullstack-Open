import { useState, useEffect, useRef } from 'react'
import Blog from './components/BlogList'
import Flash from './components/Flash'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'
import { createUser, removeUser } from './reducers/userReducer'

const App = () => {
  // const blogs = useSelector(state => state.blogs)
  // console.log(blogs)
  // const [user, setUser] = useState(null)

  const dispatch = useDispatch()
  const user = useSelector(state => state.user)

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initializeBlog())
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
    <div>
      <h1>Blogs</h1>
      <Flash />
      {user === null ? (
        <div>
          <h1>Login</h1>
          <LoginForm />
        </div>
      ) : (
        <div>
          <div className="login-user">
            {user.name ? user.name : user.username} logged in
            <button id="logout-button" onClick={handleLogout}>
              logout
            </button>
          </div>
          <Togglable buttonLabel="create" refs={blogFormRef}>
            <BlogForm />
          </Togglable>
          <Blog />
        </div>
      )}
    </div>
  )
}

export default App
