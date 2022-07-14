import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

const Navigation = ({ user }) => {
  const menuStyle = {
    background: 'lightgray'
  }

  const menuItemStyle = {
    paddingRight: 10,
  }
  return (
    <div style={menuStyle}>
      <h2>Blog App</h2>
      <Link to='/blogs' style={menuItemStyle}>blogs</Link>
      <Link to='/users' style={menuItemStyle}>users</Link>
      <UserInfo user={user} />
    </div>
  )
}

export default Navigation