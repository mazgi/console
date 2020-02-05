import * as icons from '@material-ui/icons'
import { Avatar, Tooltip } from '@material-ui/core'
import React, { Fragment } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Link from 'next/link'
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
      )) || (
        <p>
          Please&nbsp;
          <Link href="/signin">
            <a>sign-in</a>
          </Link>
        </p>
      )}
    </Fragment>
  )
}

Component.defaultProps = {}

export default Component
