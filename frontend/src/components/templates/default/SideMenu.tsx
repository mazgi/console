import * as icons from '@material-ui/icons'
import {
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText
} from '@material-ui/core'
import React, { Fragment } from 'react'
import Link from 'next/link'
import SideMenuInDevelopment from './SideMenuInDevelopment'
import getConfig from 'next/config'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.isDev

const Component: React.FC = () => {
  return (
    <Fragment>
      <Link href="/">
        <ListItem button>
          <ListItemIcon>
            <icons.Dashboard />
          </ListItemIcon>
          <ListItemText primary="/" />
        </ListItem>
      </Link>
      <Link href="/resources">
        <ListItem button>
          <ListItemIcon>
            <icons.Link />
          </ListItemIcon>
          <ListItemText primary="resources" />
        </ListItem>
      </Link>
      <Divider />
      <Link href="/settings">
        <ListItem button>
          <ListItemIcon>
            <icons.Settings />
          </ListItemIcon>
          <ListItemText primary="settings" />
        </ListItem>
      </Link>
      {isDev && <SideMenuInDevelopment />}
    </Fragment>
  )
}

export default Component
