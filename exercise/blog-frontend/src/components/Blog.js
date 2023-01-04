import { useState } from 'react'

const Blog = ({ blog, updateBlog, removeBlog }) => {
  const [view, setView] = useState(false)

  const toggleView = () => { setView(!view) }

  const handleLikeClick = () => {
    updateBlog(blog.id, {
      user: blog.user,
      likes: blog.likes += 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    })

    // updateBlog(updatedBlog)
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className={'blog-post'}>
      {blog.title} - {blog.author} <button onClick={toggleView}>{view ? 'hide' : 'view'}</button>
      {view ?
        <div>
          <div>{blog.url}</div>
          <div>
        likes {blog.likes}
            <button onClick={handleLikeClick} >like</button>
          </div>
          <div>{blog.user.name ? blog.user.name : blog.user.username}</div>
          <div>
            <button onClick={handleRemoveClick}>remove</button>
          </div>
        </div> : ''}
      {/* <div style={hideWhenVisible}>
      <button onClick={toggleView}>view</button>
    </div> */}
    </div>
  )
}

export default Blog