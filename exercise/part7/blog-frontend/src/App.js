import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Flash from './components/Flash'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import { useDispatch } from 'react-redux'
import { initializeBlog } from './reducers/blogReducer'

const App = () => {
  // const blogs = useSelector(state => state.blogs)
  // console.log(blogs)
  const [flashMessage, setFlashMessage] = useState('')
  const [flashType, setFlashType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      setFlashMessage('wrong username or password')
      setFlashType('error')
      setTimeout(() => {
        setFlashMessage('')
        setFlashType('')
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">
        login
      </button>
    </form>
  )

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
      <Flash message={flashMessage} type={flashType} />
      {user === null ? (
        <div>
          <h1>log in to application</h1>
          {loginForm()}
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
