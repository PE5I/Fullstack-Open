import { createSlice } from '@reduxjs/toolkit'

import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    voteFor(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : changedAnecdote)
    },
    appendAnecdote(state, action) {
      // const content = action.payload
      // const newAnecdoteObject = {
      //   content,
      //   votes: 0
      // }
      state.push(action.payload)
    },
    setAnecdote(state, action) {
      return action.payload
    }
  },
})

export const { voteFor, appendAnecdote, setAnecdote } = anecdoteSlice.actions

export const initializeAnecdote = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdote(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const upvote = anecdote => {
  const upvoteObject = {
    content: anecdote.content,
    id: anecdote.id,
    votes: anecdote.votes + 1
  }

  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, upvoteObject)
    dispatch(voteFor(updatedAnecdote.id))
  }
}

export default anecdoteSlice.reducer