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

const App = () => {
  const [page, setPage] = useState('authors')
  

  return (
    <Router>
      <div>
        <div>
          <ul>
            <li><Link to='/'>authors</Link></li>
            <li><Link to='/books'>books</Link></li>
            <li><Link to='/add'>add book</Link></li>
          </ul>
          
        </div>

      <Routes>
        <Route path="/" element={<Authors />} />
        <Route path="/books" element={<Books />} />
        <Route path="/add" element={<NewBook />} />
      </Routes>
      </div>
    </Router>
  )
}

export default App
