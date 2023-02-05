import { Button, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Form } from 'react-router-dom'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const dispatch = useDispatch()

  const handleBlogSubmit = (e) => {
    // console.log(e)
    e.preventDefault()

    const newBlogObject = {
      title,
      author,
      url
    }

    dispatch(addBlog(newBlogObject))

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogSubmit}>
        <div>
          <TextField
            label="title"
            value={title}
            margin="dense"
            variant="outlined"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          <TextField
            label="author"
            value={author}
            variant="outlined"
            margin="dense"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          <TextField
            label="url"
            value={url}
            variant="outlined"
            margin="dense"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <Button variant="contained" color="primary" id="create-button" type="submit">
          create
        </Button>
      </form>
    </div>
  )
}

export default BlogForm
