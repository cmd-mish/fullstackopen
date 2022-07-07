import { connect } from 'react-redux'
import { updateFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={(event) => props.updateFilter(event.target.value)} />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    updateFilter: value => {
      dispatch(updateFilter(value))
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(Filter)