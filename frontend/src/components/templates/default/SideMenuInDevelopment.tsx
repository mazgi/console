import * as icons from '@material-ui/icons'
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListSubheader
} from '@material-ui/core'
import React, { Fragment } from 'react'
import Link from 'next/link'

const Component: React.FC = () => {
  return (
    <Fragment>
      <Divider />
      <ListSubheader inset>(dev)</ListSubheader>
      <Link href="/dev">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="dev" />
        </ListItem>
      </Link>
      <Link href="/signin">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="signin" />
        </ListItem>
      </Link>
      <Link href="/resource-templates">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="resource templates" />
        </ListItem>
      </Link>
      <Link href="/worlds">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="worlds" />
        </ListItem>
      </Link>
      <Link href="/users">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="users" />
        </ListItem>
      </Link>
      <Link href="/user/create">
        <ListItem button>
          <ListItemIcon>
            <icons.Build />
          </ListItemIcon>
          <ListItemText primary="create a user" />
        </ListItem>
      </Link>
    </Fragment>
  )
}

export default Component
