import { AppBar, Button, Toolbar } from "@mui/material"
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
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">Blogs</Button>
        <Button color="inherit" component={Link} to="/users">Users</Button>
        {loggedInUser.name ? loggedInUser.name : loggedInUser.username} logged in
        <Button color="inherit" onClick={handleLogout}>
          Logout
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation