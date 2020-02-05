import React, { Fragment } from 'react'
import { notificationState } from './NotificationStateContainer'

const Component: React.FC = () => {
  const notification = notificationState.useContainer()
  return (
    <Fragment>
      <div>(notification)</div>
      <button
        onClick={() => {
          notification.send(notification.message + ', hi!')
        }}
      >
        send hi!
      </button>
      <span>{notification.message}</span>
    </Fragment>
  )
}

export default Component
