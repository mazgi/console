import * as icons from '@material-ui/icons'
import { Avatar, Tooltip } from '@material-ui/core'
import React, { Fragment } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import { User } from './User'

type Props = {
  user?: User
}

const Component: React.FC<Props> = (props: Props) => {
  const { user } = props

  return (
    <Fragment>
      {(user && user.id && (
        <AvatarGroup>
          <Tooltip title={user.displayName}>
            <Avatar
              alt={user.displayName}
              src="/static/images/avatar/image.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      )) || <p>Please sign-in</p>}
    </Fragment>
  )
}

Component.defaultProps = {}

export default Component
