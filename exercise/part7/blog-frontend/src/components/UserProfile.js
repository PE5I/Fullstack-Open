import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import users from "../services/users"

const UserBlogs = ({ blog }) => {
  return (
    <li>{blog.title}</li>
  )
}

const UserProfile = () => {
  const { id } = useParams()
  const user = useSelector(state => state.users.filter(user => user.id === id)[0])

  if (!user) {
    return null
  }

  return (
    <div>
      <h1>{user.username}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(blog => <UserBlogs key={blog.id} blog={blog} />)}
      </ul>
    </div>
  )
}

export default UserProfile