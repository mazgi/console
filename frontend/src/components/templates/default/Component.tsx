import {
  AppBar,
  Container,
  CssBaseline,
  Drawer,
  Toolbar,
  Typography
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Theme, makeStyles } from '@material-ui/core/styles'
import AccountCircle from './AccountCircle'
import SideMenu from './SideMenu'
import { fetchGraphQLData } from 'lib/graphql/request'
import gql from 'graphql-tag'

type Props = {
  title?: string
  acceptAnonymous?: boolean
  children?: React.ReactNode
}

const drawerWidth = 160
const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
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
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { title, acceptAnonymous, children } = props
  const [user, setUser] = useState(null)
  const query = gql`
    {
      authenticated {
        id
        email
        displayName
      }
    }
  `

  useEffect(() => {
    ;(async (): Promise<void> => {
      // TODO: handle errors
      try {
        const user = await fetchGraphQLData(query, 'authenticated')
        console.log(user)
        setUser(user)
      } catch (e) {
        console.log(e)
        setUser(null)
      }
    })()
  }, [])

  return (
    <Container className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
          <AccountCircle user={user} />
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
