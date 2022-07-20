import { Link } from 'react-router-dom'
import UserInfo from './UserInfo'

const Navigation = ({ user, location }) => {
  return (
    <div className='container'>
      <header className='d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom'>
        <div className='d-flex align-items-center col-md-3 mb-2 mb-md-0 text-dark text-decoration-none'>
          <h1>BLOG APP</h1>
        </div>
        <ul className='nav col-12 col-md-auto mb-2 justify-content-center mb-md-0 nav-pills'>
          <li className='nav-item'>
            <Link to='/blogs' className={`nav-link px-2 ${location.includes('blogs') ? 'active' : ''}`}>blogs</Link>
          </li>
          <li className='nav-item'>
            <Link to='/users' className={`nav-link px-2 ${location.includes('users') ? 'active' : ''}`}>users</Link>
          </li>
        </ul>
        <div className='col-md-3 text-end'>
          <UserInfo user={user} />
        </div>
      </header>
    </div>
  )
}

export default Navigation