import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Flash from './components/Flash'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [flashMessage, setFlashMessage] = useState('')
  const [flashType, setFlashType] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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

  const blogApplication = () => (
    <div>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )

  const handleCreateNew = async event => {
    event.preventDefault()

    try {
      const blog = await blogService.create({ title, author, url })
      setBlogs(blogs.concat(blog))
      setTitle('')
      setAuthor('')
      setUrl('')
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
  

  const createNewForm = () => (
    <form onSubmit={handleCreateNew}>
      <div>
        title:
        <input
        type="text"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
        type="text"
        value={author}
        onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
        type="text"
        value={url}
        onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>create</button>
    </form>
  )

  

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
        {createNewForm()}
        {blogApplication()}
        </div>
    }

    </div>
  )
}

export default App
