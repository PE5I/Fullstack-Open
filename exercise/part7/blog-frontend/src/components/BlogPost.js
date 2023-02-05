import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { createFlashNotification } from "../reducers/flashReducer"
import { updateBlog, addComment } from "../reducers/blogReducer"
import { useState } from "react"
import blogService from '../services/blogs'

const Comment = ({ comment }) => {
  return (
    <li>{comment}</li>
  )
}

const CommentForm = ({ blogId }) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()

  const handleComment = (event) => {
    event.preventDefault()

    setComment(event.target.value)
  }

  const handleCommentSubmit = (e) => {
    e.preventDefault()

    dispatch(addComment(blogId, comment))
    setComment('')
  }

  return (
    <form onSubmit={handleCommentSubmit}>
      <input value={comment} onChange={handleComment}/>
      <button>add comment</button>
    </form>
  )
}

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
    console.log(blogObject)

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
      <p>added by {blog.user.username}</p>
      <h2>comments</h2>
      <CommentForm blogId={blog.id} />
      <ul>
        {blog.comments.map(comment => <Comment key={comment.id} comment={comment.content} />)}
      </ul>
    </div>
  )
}

export default BlogPost