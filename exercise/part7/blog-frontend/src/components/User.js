import { useSelector } from "react-redux"


const User = ({ user }) => {

  return (
    <tr>
      <td>{user.name ? user.name : user.username}</td>
      <td>{user.blogs.length}</td>
    </tr>
  )
}

const Users = () => {
  const users = useSelector(state => state.users)

  console.log("users=>", users)

  return (
    <div>
      <h1>Users</h1>
      <table>
        <tr>
          <th></th>
          <th><b>blogs created</b></th>
        </tr>
        {users.map(user => <User key={user.id} user={user}/>)}
      </table>
    </div>
  )
}

export default Users