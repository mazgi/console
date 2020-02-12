import * as icons from '@material-ui/icons'
import { Avatar, Tooltip } from '@material-ui/core'
import React, { Fragment } from 'react'
import AvatarGroup from '@material-ui/lab/AvatarGroup'
import Link from 'next/link'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Component: React.FC = () => {
  const query = gql`
    {
      authenticated {
        id
        email
        displayName
      }
    }
  `
  const { client, data, error, loading, networkStatus, called } = useQuery(
    query
  )

  return (
    <Fragment>
      {data ? (
        <AvatarGroup>
          <Tooltip title={data.authenticated.displayName}>
            <Avatar
              alt={data.authenticated.displayName}
              src="/static/images/avatar/image.jpg"
            />
          </Tooltip>
        </AvatarGroup>
      ) : (
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
