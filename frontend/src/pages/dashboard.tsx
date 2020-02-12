import { Grid } from '@material-ui/core'
import { NextPage } from 'next'
import ResourceList from 'components/organisms/resource/list'
import Template from 'components/templates/default'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'

const Page: NextPage = () => {
  const query = gql`
    {
      worlds {
        id
        name
      }
      resources {
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
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResourceList
            title="Your Worlds"
            loading={loading}
            resources={data && data.worlds}
          />
        </Grid>
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
