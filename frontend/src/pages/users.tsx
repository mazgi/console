import { NextPage } from 'next'
import Template from 'components/templates/default'
import UserList from 'components/organisms/user/list'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Page: NextPage = () => {
  const query = gql`
    query {
      users {
        id
        name
        displayName
        email
        status
        controls {
          deletable
        }
      }
    }
  `
  const { client, data, error, loading, networkStatus, called } = useQuery(
    query
  )

  return (
    <Template title="Users" loading={loading} error={error}>
      <UserList
        title="All Users"
        loading={loading}
        users={data && data.users}
      />
    </Template>
  )
}

export default Page
