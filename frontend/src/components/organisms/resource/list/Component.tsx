import {
  CircularProgress,
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

type Resource = {
  id: string
  name: string
}
type Props = {
  title?: string
  loading?: boolean
  resources?: Array<Resource>
}

const useStyles = makeStyles((theme: Theme) => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  }
}))

const Component: React.FC<Props> = (props: Props) => {
  const classes = useStyles('')
  const { title, loading, resources } = props

  return (
    <Paper>
      <Typography variant="h6">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <CircularProgress />
          ) : (
            resources.map(resource => (
              <TableRow key={resource.id}>
                <TableCell>{resource.name}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </Paper>
  )
}

Component.defaultProps = {
  title: 'Resources',
  resources: []
}

export default Component
