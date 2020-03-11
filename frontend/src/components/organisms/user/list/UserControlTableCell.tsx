import * as icons from '@material-ui/icons'
import { IconButton, TableCell } from '@material-ui/core'
import React from 'react'
import { User } from 'lib/graphql/type'

type Props = {
  user: User
  willDeleteHandler: (user: User) => void | Promise<void>
}

const Component: React.FC<Props> = (props: Props) => {
  const { user, willDeleteHandler } = props
  const {
    status,
    controls: { deletable }
  } = user
  const onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = event => {
    const yes = window.confirm(
      'Are you sure you wish to delete "' + user.name + '" forever?'
    )
    if (yes) {
      willDeleteHandler(user)
    }
  }
  return (
    <TableCell>
      <IconButton
        disabled={!deletable}
        aria-label="delete-forever"
        onClick={onClick}
      >
        <icons.DeleteForever />
      </IconButton>
    </TableCell>
  )
}

export default Component
