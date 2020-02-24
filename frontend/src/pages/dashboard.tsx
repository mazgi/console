import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core'
import { NextPage } from 'next'
import ResourceList from 'components/organisms/resource/list'
import Template from 'components/templates/default'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { useRouter } from 'next/router'

const Page: NextPage = () => {
  const query = gql`
    query {
      resourceTemplates {
        id
        name
        metadata {
          version
        }
      }
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
  const router = useRouter()

  return (
    <Template title="Dashboard" loading={loading} error={error}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Create a resource</Typography>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    VM
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Standard / Iowa
                  </Typography>
                  <Typography color="textSecondary">us-central1, N1</Typography>
                  <Typography variant="body2" component="p">
                    vCPUs 1-96, Mem / vCPU 0.95-6.5GB
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={(): void => {
                      const region = 'us-central1'
                      router.push(
                        `/resource/create?type=google-compute-engine&region=${region}`
                      )
                    }}
                  >
                    Create new one ...
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    VM
                  </Typography>
                  <Typography variant="h5" component="h2">
                    Standard / Tokyo
                  </Typography>
                  <Typography color="textSecondary">
                    asia-northeast1, N1
                  </Typography>
                  <Typography variant="body2" component="p">
                    vCPUs 1-96, Mem / vCPU 0.95-6.5GB
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={(): void => {
                      const region = 'asia-northeast1'
                      router.push(
                        `/resource/create?type=google-compute-engine&region=${region}`
                      )
                    }}
                  >
                    Create new one ...
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
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
