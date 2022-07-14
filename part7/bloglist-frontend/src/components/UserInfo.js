import { useDispatch } from 'react-redux'
import { processLogout } from '../reducers/userReducer'

const UserInfo = ({ user }) => {
  const dispatch = useDispatch()
  return (
    <div>
      {user.name} is logged in
      <button onClick={() => dispatch(processLogout(user.name))}>logout</button>
    </div>
  )
}

export default UserInfo