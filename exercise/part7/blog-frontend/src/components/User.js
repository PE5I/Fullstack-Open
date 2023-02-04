import { useSelector } from "react-redux"
import { Link } from 'react-router-dom'

const User = ({ user }) => {

  return (
    <tr>
      <td>
        <Link to={`/users/${user.id}`}>
          {user.name ? user.name : user.username}
        </Link>
      </td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th><b>blogs created</b></th>
          </tr>
          {users.map(user => <User key={user.id} user={user}/>)}
        </tbody>
      </table>
    </div>
  )
}

export default Users