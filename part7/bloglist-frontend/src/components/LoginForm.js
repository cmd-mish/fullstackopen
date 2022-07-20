import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { processLogin } from '../reducers/userReducer'

import { Form, Button, Row, Col } from 'react-bootstrap'

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
    <div className='container text-center'>
      <h2>log in to application</h2>
      <Form onSubmit={handleLogin} className="col-ml-7 bg-light p-3 border">
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Login</Form.Label>
          <Col sm={10}>
            <Form.Control
              id="login-form-username"
              type="text"
              value={username}
              name="Username"
              placeholder="enter username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Form.Label column sm={2}>Password</Form.Label>
          <Col sm={10}>
            <Form.Control
              id="login-form-password"
              type="password"
              value={password}
              name="Password"
              placeholder="enter password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </Col>

        </Form.Group>
        <Form.Group as={Row} className="mb-3">
          <Col className='d-grid col-3 mx-auto'>
            <Button variant="primary" type="submit" id="login-form-sumbit-button" className=''>login</Button>
          </Col>
        </Form.Group>
      </Form >
    </div >

  )
}

export default LoginForm