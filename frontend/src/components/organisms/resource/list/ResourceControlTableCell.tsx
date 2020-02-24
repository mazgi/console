import * as icons from '@material-ui/icons'
import { IconButton, TableCell } from '@material-ui/core'
import React from 'react'
import { Resource } from 'lib/graphql/type'

type Props = {
  resource: Resource
  willDeleteHandler: (resource: Resource) => void | Promise<void>
}

const Component: React.FC<Props> = (props: Props) => {
  const { resource, willDeleteHandler } = props
  const {
    status,
    controls: { deletable }
  } = resource
  const onClick: (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void = event => {
    const yes = window.confirm(
      'Are you sure you wish to delete "' + resource.name + '" forever?'
    )
    if (yes) {
      willDeleteHandler(resource)
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
