import { useState } from 'react'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    // createBlog({
    //   title: title,
    //   author: author,
    //   url: url,
    // })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  // const addNewBlog = async (blogObject) => {
  //   try {
  //     dispatch(addBlog(blogObject))
  //     // setFlashMessage(`a new blog ${blog.title} by ${blog.author} added`)
  //     setFlashType('message')
  //     setTimeout(() => {
  //       setFlashMessage('')
  //       setFlashType('')
  //     }, 5000)
  //   } catch (exception) {
  //     console.log('exception: ', exception)
  //     setFlashMessage(exception.message)
  //     setFlashType('error')
  //     setTimeout(() => {
  //       setFlashMessage('')
  //       setFlashType('')
  //     }, 5000)
  //   }
  // }

  return (
    <form onSubmit={addBlog}>
      <div>
        title:
        <input
          id="title"
          placeholder="title"
          type="text"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author:
        <input
          id="author"
          placeholder="author"
          type="text"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url:
        <input
          id="url"
          placeholder="url"
          type="text"
          value={url}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-button" type="submit">
        create
      </button>
    </form>
  )
}

export default BlogForm
