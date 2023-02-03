import { useState, useEffect, useRef } from 'react'
import Blog from './components/BlogList'
import Flash from './components/Flash'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'

const App = () => {
  // const blogs = useSelector(state => state.blogs)
  // console.log(blogs)
  const [user, setUser] = useState(null)

  const dispatch = useDispatch()

  useEffect(() => {
    // blogService.getAll().then((blogs) => setBlogs(blogs))
    dispatch(initializeBlog())
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const blogFormRef = useRef()

  const createNewForm = () => (
    <Togglable buttonLabel="create" refs={blogFormRef}>
      <BlogForm />
    </Togglable>
  )

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  return (
    <div>
      <h1>Blogs</h1>
      <Flash />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          {/* {loginForm()} */}
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
          {createNewForm()}
          <Blog />
        </div>
      )}
    </div>
  )
}

export default App
