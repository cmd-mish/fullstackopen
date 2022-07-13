import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { processLogin } from '../reducers/userReducer'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()

    dispatch(processLogin({
      username, password
    }))
    setUsername('')
    setPassword('')
  }
  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="login-form-username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="login-form-password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit" id="login-form-sumbit-button">login</button>
    </form>
  )
}

export default LoginForm