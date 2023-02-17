import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom"
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'

const App = () => {
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.removeItem('library-user-token')
    client.resetStore()
  }

  return (
    <Router>
      <div>
        <div>
            <button><Link to='/'>authors</Link></button>
            <button><Link to='/books'>books</Link></button>
            {token
              ? <>
                  <button><Link to='/add'>add book</Link></button>
                  <button onClick={logout}><Link to='/'>logout</Link></button>
                </>
              : <button><Link to='/login'>login</Link></button> }
            </div>
        </div>

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/login' element={<LoginForm setToken={setToken} />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
      </Routes>
      
    </Router>
  )
}

export default App
