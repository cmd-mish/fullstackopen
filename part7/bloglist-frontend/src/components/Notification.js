import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notification)

  if (notification === null) {
    return null
  }

  return (
    <div className={notification.status}>
      {notification.message}
    </div>
  )
}

export default Notification