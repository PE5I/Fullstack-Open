import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Flash from './components/Flash'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [flashMessage, setFlashMessage] = useState('')
  const [flashType, setFlashType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])



  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

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
        type='text'
        value={username}
        name='username'
        onChange={({ target }) => setUsername(target.value)}/>
      </div>
      <div>
        password
        <input
        type='password'
        value={password}
        name='password'
        onChange={({ target }) => setPassword(target.value)}/>
      </div>
      <button type='submit'>login</button>
    </form>
  )

  const updateBlog = async (id, blogObject) => {

    try {
      const changedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs
        .map(blog => blog.id === changedBlog.id ? changedBlog : blog))
      console.log(blogs);
    } catch (exception) {
      setFlashMessage(exception.message)
      setFlashType('error')
      setTimeout(() => {
        setFlashMessage('')
        setFlashType('')
      }, 5000)
    }
  }

  const removeBlog = async (id) => {

    try {
      const changedBlog = await blogService.deleteBlog(id)
      setBlogs(blogs
        .filter(blog => blog.id !== id))
      // console.log(blogs);
    } catch (exception) {
      setFlashMessage(exception.message)
      setFlashType('error')
      setTimeout(() => {
        setFlashMessage('')
        setFlashType('')
      }, 5000)
    }
  }

  const blogApplication = () => (
    <div>
      {console.log(blogs)}
      {blogs
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map(blog =>
        <Blog key={blog.id} blog={blog} updateBlog={updateBlog} removeBlog={removeBlog}/>
      )}
    </div>
  )

  const addNewBlog = async (blogObject) => {
    try {
      const blog = await blogService.create(blogObject)
      // blogFormRef.current.toggleVisibility()

      setBlogs(blogs.concat(blog))
      setFlashMessage(`a new blog ${blog.title} by ${blog.author} added`)
      setFlashType('message')
      setTimeout(() => {
        setFlashMessage('')
        setFlashType('')
      }, 5000)
    } catch (exception) {
      console.log("exception: ", exception)
      setFlashMessage(exception.message)
      setFlashType('error')
      setTimeout(() => {
        setFlashMessage('')
        setFlashType('')
      }, 5000)
    }
  }

  const blogFormRef = useRef()

  const createNewForm = () => (
    <Togglable buttonLabel='create' refs={blogFormRef}>
      <BlogForm 
        createBlog={addNewBlog}
      />
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
      <h1>blogs</h1>
      <Flash message={flashMessage} type={flashType} />
      

      {user === null 
        ? <div>
          <h1>log in to application</h1>
          {loginForm()}
          </div>
        : <div>
          <div className='login-user'>
            {user.name ? user.name : user.username} logged in
            <button onClick={handleLogout}>logout</button>
          </div>
          {createNewForm()}
          {blogApplication()}
          </div>
      }
    </div>
  )
}

export default App
