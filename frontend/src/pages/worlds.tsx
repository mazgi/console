import { NextPage } from 'next'
import Template from 'components/templates/default'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Page: NextPage = () => {
  const query = gql`
    query {
      worlds {
        id
        name
      }
    }
  `
  const { client, data, error, loading, networkStatus, called } = useQuery(
    query
  )

  return (
    <Template title="Worlds" loading={loading} error={error}>
      {!!data &&
        data.worlds.map(world => (
          <p key={world.id}>
            {world.id}: {world.name}
          </p>
        ))}
    </Template>
  )
}

export default Page
