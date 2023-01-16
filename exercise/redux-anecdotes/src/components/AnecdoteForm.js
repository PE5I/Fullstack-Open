import { createAnecdote } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import noteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const create = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // const newAnecdote = await noteService.create(content)
    // const anecdoteObject = {
    //   content: newAnecdote.content,
    //   id: newAnecdote.id,
    //   votes: 0
    // }
    dispatch(createAnecdote(content))
    dispatch(createNotification(`you created anecdote '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={create}>
        <div><input name="anecdote" /></div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm