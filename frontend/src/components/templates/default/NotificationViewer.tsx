import * as Icons from '@material-ui/icons'
import { Button, IconButton, Snackbar } from '@material-ui/core'
import React, { Fragment } from 'react'
import { TransitionProps } from '@material-ui/core/transitions/transition'
import { notificationState } from './NotificationStateContainer'

const Component: React.FC = () => {
  const notification = notificationState.useContainer()
  const [open, setOpen] = React.useState(false)
  const [transition, setTransition] = React.useState<
    React.ComponentType<TransitionProps> | undefined
  >(undefined)
  const handleClose = () => {
    // setOpen(false)
    notification.reset()
  }
  return (
    <Fragment>
      <div>(notification)</div>
      <button
        onClick={() => {
          notification.send(notification.message + ', hi!')
          console.log(notification.message)
        }}
      >
        send hi!
      </button>
      <span>{notification.message}</span>
      <Snackbar
        open={!!notification.message}
        // onClose={handleClose}
        TransitionComponent={transition}
        message={notification.message}
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <Icons.Close fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
    </Fragment>
  )
}

export default Component
