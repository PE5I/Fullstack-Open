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
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }

  return (
    <div className={'blog-post'}>
      <div className='headline'>
        <span className='title'>{blog.title} </span>
        <span className='author'>- {blog.author}</span>
        <span>
          <button className='visible-button' onClick={toggleView}>{view ? 'hide' : 'view'}</button>
        </span>
      </div>
      {view ?
        <div>
          <div className='url'>{blog.url}</div>
          <div>
            <span className='likes'>likes {blog.likes}</span>
            <button className='like-button' onClick={handleLikeClick}>like</button>
          </div>
          <div className='user'>
            {blog.user.name ? blog.user.name : blog.user.username}
          </div>
          <div className='remove-button'>
            <button onClick={handleRemoveClick}>remove</button>
          </div>
        </div>
        : ''}
      {/* <div style={hideWhenVisible}>
      <button onClick={toggleView}>view</button>
    </div> */}
    </div>
  )
}

export default Blog