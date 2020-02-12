import * as icons from '@material-ui/icons'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'
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
            <icons.Link />
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
      {isDev && <SideMenuInDevelopment />}
    </Fragment>
  )
}

export default Component
