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
import { Resource } from 'lib/graphql/type'
import ResourceControlTableCell from './ResourceControlTableCell'
import ResourcePowerControlTableCell from './ResourcePowerControlTableCell'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

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
  const deleteResourceMutation = gql`
    mutation DeleteResource($id: String!) {
      deleteResource(id: $id)
    }
  `
  const [deleteResource, record] = useMutation(deleteResourceMutation)
  const resourcePowerWillTurnOn: (resource: Resource) => void = resource => {
    // TODO: mutation
    console.log('turnOn: ', resource)
  }
  const resourcePowerWillTurnOff: (resource: Resource) => void = resource => {
    // TODO: mutation
    console.log('turnOff: ', resource)
  }
  const resourceWillDelete: (resource: Resource) => void = resource => {
    // TODO: mutation
    console.log('delete: ', resource)
    deleteResource({
      variables: {
        id: resource.id
      }
    })
  }

  return (
    <Paper>
      <Typography variant="h6">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Start / Stop</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {loading ? (
            <CircularProgress />
          ) : (
            resources.map(resource => (
              <TableRow key={resource.id}>
                <ResourcePowerControlTableCell
                  resource={resource}
                  willTurnOnHandler={resourcePowerWillTurnOn}
                  willTurnOffHandler={resourcePowerWillTurnOff}
                />
                <TableCell>{resource.name}</TableCell>
                <ResourceControlTableCell
                  resource={resource}
                  willDeleteHandler={resourceWillDelete}
                />
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
