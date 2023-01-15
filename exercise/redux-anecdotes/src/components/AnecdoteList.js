import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer.js'

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
      

  // const sortedAnecdotes = [...anecdotes]
  // console.log("anecdotes: ", anecdotes);

  return (
    <div>
      {processedAnecdotes
        .map(anecdote =>
          <Anecdote
            key={anecdote.id}
            anecdote={anecdote}
            handleClick={() => {
              dispatch(voteFor(anecdote.id))
              dispatch(createNotification(`you voted '${anecdote.content}'`))
              setTimeout(() => {
                dispatch(removeNotification())
              }, 5000)
            }} />
        )}
    </div>
  )
}

export default AnecdoteList