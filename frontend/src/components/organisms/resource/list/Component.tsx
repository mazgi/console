import {
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
  const { resources } = props

  return (
    <Paper>
      <Typography variant="h6">Your Resources</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {resources.map(resource => (
            <TableRow key={resource.id}>
              <TableCell>{resource.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

Component.defaultProps = {
  resources: []
}

export default Component
