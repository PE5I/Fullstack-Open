import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer.js'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div key={anecdote.id}>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}
        <button onClick={handleClick}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  
  const anecdoteFilter = useSelector(state => state.filter)
  const anecdotes = useSelector(state => state.anecdotes)
  const processedAnecdotes = [...anecdotes]
    .filter(anecdote => anecdote.content.toLowerCase().includes(anecdoteFilter.toLowerCase()))
    .sort((a,b) => b.votes - a.votes)

  const handleLike = async (anecdote) => {
    // console.log(event)
    const updateObject = {
      content: anecdote.content,
      id: anecdote.id,
      votes: anecdote.votes + 1
    }
    const updatedNote = await anecdoteService.update(anecdote.id, updateObject)
    dispatch(voteFor(updatedNote.id))
    dispatch(createNotification(`you voted '${updatedNote.content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  // const sortedAnecdotes = [...anecdotes]
  // console.log("anecdotes: ", anecdotes);

  return (
    <div>
      {processedAnecdotes
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => handleLike(anecdote)}
              // () => {
              // dispatch(voteFor(anecdote.id))
              // dispatch(createNotification(`you voted '${anecdote.content}'`))
              // setTimeout(() => {
              //   dispatch(removeNotification())
              // }, 5000)
        /> )}
    </div>
  )
}

export default AnecdoteList