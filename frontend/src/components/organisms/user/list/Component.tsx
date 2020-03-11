import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from '@material-ui/core'
import React from 'react'
import { User } from 'lib/graphql/type'
import UserControlTableCell from './UserControlTableCell'
import gql from 'graphql-tag'
import { useMutation } from '@apollo/react-hooks'

type Props = {
  title?: string
  loading?: boolean
  users?: Array<User>
}

const Component: React.FC<Props> = (props: Props) => {
  const { title, loading, users } = props
  const deleteUserMutation = gql`
    mutation DeleteUser($id: String!) {
      deleteUser(id: $id)
    }
  `
  const [deleteUser, record] = useMutation(deleteUserMutation)
  const userWillDelete: (user: User) => void = user => {
    console.log('delete: ', user)
    deleteUser({
      variables: {
        id: user.id
      }
    })
    // TODO
  }

  return (
    <Paper>
      <Typography variant="h6">{title}</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <UserControlTableCell
                user={user}
                willDeleteHandler={userWillDelete}
              />
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  )
}

Component.defaultProps = {
  title: 'Users',
  users: []
}

export default Component
