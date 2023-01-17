import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch, connect } from 'react-redux'
import noteService from '../services/anecdotes'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()

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
    props.createAnecdote(content)
    props.setNotification(`you created anecdote '${content}'`, 5000)
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

export default connect(
  null,
  { createAnecdote, setNotification }
)(AnecdoteForm)