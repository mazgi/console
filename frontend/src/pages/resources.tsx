import { Grid } from '@material-ui/core'
import { NextPage } from 'next'
import ResourceList from 'components/organisms/resource/list'
import Template from 'components/templates/default'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Page: NextPage = () => {
  const query = gql`
    query {
      resources {
        id
        name
        description
        status
        controls {
          startable
          stoppable
        }
      }
    }
  `
  const { client, data, error, loading, networkStatus, called } = useQuery(
    query
  )

  return (
    <Template title="Resources" loading={loading} error={error}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResourceList
            title="Your Resources"
            loading={loading}
            resources={data && data.resources}
          />
        </Grid>
      </Grid>
    </Template>
  )
}

export default Page
