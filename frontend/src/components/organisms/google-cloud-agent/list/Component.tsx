import {
  CircularProgress,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import { Theme, makeStyles } from '@material-ui/core/styles'
import React from 'react'

type Props = {
  title?: string
  loading?: boolean
  resourceAgents?: Array<{
    id: string
    name: string
  }>
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { title, loading, resourceAgents } = props

  return (
    <Paper>
      <Typography variant="h6">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <CircularProgress />
          ) : (
            resourceAgents.map(agent => (
              <TableRow key={agent.id}>
                <TableCell>
                  <p>{agent.name}</p>
                  {loading && <LinearProgress />}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

Component.defaultProps = {
  title: 'Google Cloud Projects',
  resourceAgents: []
}

export default Component
