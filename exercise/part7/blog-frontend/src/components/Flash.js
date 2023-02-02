const Flash = ({ message, type }) => {
  if (message === '') {
    return
  }

  return (
    <div className={type}>
      { message }
    </div>
  )
}

export default Flash