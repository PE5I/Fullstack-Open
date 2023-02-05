import { Paper, Table, TableBody, TableCell, TableContainer, TableRow } from "@mui/material"
import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const User = ({ user }) => {

  return (
    <TableRow>
      <TableCell>
        <Link to={`/users/${user.id}`}>
          {user.name ? user.name : user.username}
        </Link>
      </TableCell>
      <TableCell>{user.blogs.length}</TableCell>
    </TableRow>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>Users</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell><b>blogs created</b></TableCell>
            </TableRow>
            {users.map(user => <User key={user.id} user={user}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users