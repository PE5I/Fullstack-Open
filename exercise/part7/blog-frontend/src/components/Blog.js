import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, removeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const [view, setView] = useState(false)

  const toggleView = () => {
    setView(!view)
  }

  const handleLikeClick = () => {
    const blogObject = {
      user: blog.user,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    dispatch(updateBlog(blog.id, blogObject))
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      dispatch(removeBlog(blog.id))
    //     setFlashMessage('Blog removed successfully')
    //     setFlashType('message')
    //     setTimeout(() => {
    //       setFlashMessage('')
    //       setFlashType('')
    //     }, 5000)
    //     // console.log(blogs);
    //   }
    // } catch (exception) {
    //   setFlashMessage(exception.message)
    //   setFlashType('error')
    //   setTimeout(() => {
    //     setFlashMessage('')
    //     setFlashType('')
    //   }, 5000)
    }
  }

  return (
    <div className={'blog-post'}>
      <div className="headline">
        <span className="title">{blog.title} </span>
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
            <button id="like-button" onClick={handleLikeClick}>
              like
            </button>
          </div>
          <div className="user">
            {blog.user.name ? blog.user.name : blog.user.username}
          </div>
          <div className="remove">
            <button id="remove-button" onClick={handleRemoveClick}>
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

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)

  // const changeTheBlog = async (id, blogObject) => {
  //   try {
  //     dispatch(updateBlog(id, blogObject))
  //   } catch (exception) {
  //     setFlashMessage(exception.message)
  //     setFlashType('error')
  //     setTimeout(() => {
  //       setFlashMessage('')
  //       setFlashType('')
  //     }, 5000)
  //   }
  // }

  // const deleteBlog = async (id) => {
  //   try {
  //     dispatch(removeBlog(id))
  //     setFlashMessage('Blog removed successfully')
  //     setFlashType('message')
  //     setTimeout(() => {
  //       setFlashMessage('')
  //       setFlashType('')
  //     }, 5000)
  //     // console.log(blogs);
  //   } catch (exception) {
  //     setFlashMessage(exception.message)
  //     setFlashType('error')
  //     setTimeout(() => {
  //       setFlashMessage('')
  //       setFlashType('')
  //     }, 5000)
  //   }
  // }

  return (
    <div>
      {blogs
        .slice()
        .sort((blogA, blogB) => blogB.likes - blogA.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
          />
        ))}
    </div>
  )
}

export default Blogs
