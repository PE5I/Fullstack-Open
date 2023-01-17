import { createFilter } from '../reducers/filterReducer'
import { useDispatch, connect } from 'react-redux'

const Filter = (props) => {
  // const dispatch = useDispatch()
  
  const handleChange = (event) => {
    // dispatch(createFilter(event.target.value))
    props.createFilter(event.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input type='text' onChange={handleChange} />
    </div>
  )
}





export default connect(
  null,
  { createFilter }
)(Filter)