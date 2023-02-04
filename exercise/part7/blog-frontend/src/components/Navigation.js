import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { removeUser } from "../reducers/loggedInUserReducer"

const Navigation = () => {
  const loggedInUser = useSelector(state => state.loggedInUser)
  const dispatch = useDispatch()

  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch(removeUser())
  }

  return (
    <div>
      <ul>
        <li><Link to="/">blogs</Link></li>
        <li><Link to="/users">users</Link></li>
        <li>
          {loggedInUser.name ? loggedInUser.name : loggedInUser.username} logged in
          <button id="logout-button" onClick={handleLogout}>
            logout
          </button>
        </li>
      </ul>
    </div>
  )
}

export default Navigation