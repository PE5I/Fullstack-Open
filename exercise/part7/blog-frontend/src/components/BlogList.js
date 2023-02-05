import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { updateBlog, removeBlog } from '../reducers/blogReducer'
import { createFlashNotification } from '../reducers/flashReducer'

const Blog = ({ blog, handleLikeClick, handleRemoveClick }) => {
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

  return (
    <div className={'blog-post'}>
      <div className="headline">
        <span className="title"><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></span>
        <span className="author">- {blog.author}</span>
        <span>
          <button className="visible-button" onClick={toggleView}>
            {view ? 'hide' : 'view'}
          </button>
        </span>
      </div>
      {view ? (
        <div>
          <div className="url">{blog.url}</div>
          <div>
            <span className="likes">likes {blog.likes}</span>
            <button id="like-button" onClick={() => handleLikeClick(blog)}>
              like
            </button>
          </div>
          <div className="user">
            {blog.user.name ? blog.user.name : blog.user.username}
          </div>
          <div className="remove">
            <button id="remove-button" onClick={() => handleRemoveClick(blog)}>
              remove
            </button>
          </div>
        </div>
      ) : (
        ''
      )}
      {/* <div style={hideWhenVisible}>
      <button onClick={toggleView}>view</button>
    </div> */}
    </div>
  )
}

const BlogList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)

  console.log("blogs=> ", blogs)

  const handleLikeClick = (blog) => {
    // console.log(e)
    // const blog = e.target
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }

    dispatch(updateBlog(blog.id, blogObject))
  }

  const handleRemoveClick = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
      dispatch(createFlashNotification('Blog removed successfully', 5000))
    }
  }

  return (
    <div>
      {blogs
        .slice()
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleLikeClick={handleLikeClick}
            handleRemoveClick={handleRemoveClick}
          />
        ))}
    </div>
  )
}

export default BlogList
