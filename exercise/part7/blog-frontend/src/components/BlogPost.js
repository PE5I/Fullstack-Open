import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createFlashNotification } from "../reducers/flashReducer"
import { updateBlog } from "../reducers/blogReducer"

const BlogPost = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.filter(blog => blog.id === id)[0])

  const handleLikeClick = (blog) => {
    // console.log(e)
    // const blog = e.target
    dispatch(createFlashNotification(`you liked ${blog.title}`, 5000))
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }

    dispatch(updateBlog(blog.id, blogObject))
  }

  if (!blog) {
    return null
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes
        <button id="like-button" onClick={() => handleLikeClick(blog)}>
          like
        </button>
      </p>
    </div>
  )
}

export default BlogPost