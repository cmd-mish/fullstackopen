import { useDispatch } from 'react-redux'
import { processLogout } from '../reducers/userReducer'

const UserInfo = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <div>
      <h2>blogs</h2>
      <p>
        {user.name} is logged in
        <button onClick={() => dispatch(processLogout(user.name))}>logout</button>
      </p>
    </div>
  )
}

export default UserInfo