import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const Flash = () => {
  const message = useSelector(state => state.flash)

  if (message === '') {
    return
  }

  return <div className="message">{message}</div>
}

export default Flash
