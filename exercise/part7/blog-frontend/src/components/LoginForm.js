import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createFlashNotification } from '../reducers/flashReducer'
import { createUser } from '../reducers/loggedInUserReducer'
import loginService from '../services/login'


const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      // blogService.setToken(user.token)
      dispatch(createUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(createFlashNotification('wrong username or password', 5000))
    }
  }

  return (
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
}

export default LoginForm