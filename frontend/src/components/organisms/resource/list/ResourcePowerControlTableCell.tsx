import React, { useState } from 'react'
import { Switch, TableCell } from '@material-ui/core'
import { Resource } from 'lib/graphql/type'

type Props = {
  resource: Resource
  willTurnOnHandler: (resource: Resource) => void | Promise<void>
  willTurnOffHandler: (resource: Resource) => void | Promise<void>
}

const Component: React.FC<Props> = (props: Props) => {
  const { resource, willTurnOnHandler, willTurnOffHandler } = props
  const {
    status,
    controls: { startable, stoppable }
  } = resource
  const [turnedOn, turnOn] = useState(false)
  const enabled = (stoppable && turnedOn) || (startable && !turnedOn)
  const onChange: (
    event: React.ChangeEvent<HTMLElement>,
    checked: boolean
  ) => void = (event, checked) => {
    turnOn(checked)
    if (checked) {
      willTurnOnHandler(resource)
    } else {
      willTurnOffHandler(resource)
    }
  }

  return (
    <TableCell>
      <Switch
        disabled={!enabled}
        checked={turnedOn}
        onChange={onChange}
        inputProps={{ 'aria-label': 'secondary checkbox' }}
      />
    </TableCell>
  )
}

export default Component
