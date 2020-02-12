import {
  AppBar,
  CircularProgress,
  Container,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography
} from '@material-ui/core'
import React, { useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import AccountCircle from './AccountCircle'
import SideMenu from './SideMenu'

type Props = {
  title?: string
  acceptAnonymous?: boolean
  children?: React.ReactNode
  error?: Error
  loading?: boolean
}

const drawerWidth = 160
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  title: {
    flexGrow: 1
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  appBarSpacer: {
    ...theme.mixins.toolbar
  },
  errorMessage: {
    color: '#f00'
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { title, acceptAnonymous, children, error, loading } = props

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            {title}
          </Typography>
          {loading && <CircularProgress color="secondary" />}
          <AccountCircle />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}
      >
        <Container className={classes.appBarSpacer} />
        <SideMenu />
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Typography noWrap className={classes.errorMessage}>
          {error ? error.message : '(no error)'}
        </Typography>
        {children}
      </main>
    </Container>
  )
}

Component.defaultProps = {
  title: '(default page)',
  children: <div>(children)</div>
}

export default Component
