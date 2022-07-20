import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  const interpretStyle = () => {
    if (notification.status === 'success') return 'alert-success'
    if (notification.status === 'error') return 'alert-danger'
  }

  return (
    <div className={`alert ${interpretStyle()} mt-1`} role='alert'>
      {notification.message}
    </div>
  )
}

export default Notification