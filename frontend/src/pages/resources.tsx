import { Grid } from '@material-ui/core'
import { NextPage } from 'next'
import { Resource } from 'lib/graphql/type'
import ResourceList from 'components/organisms/resource/list'
import Template from 'components/templates/default'
import { fetchGraphQLData } from 'lib/graphql/request'
import gql from 'graphql-tag'
import { notificationState } from 'components/templates/default/NotificationStateContainer'
import { useEffect } from 'react'

type Props = {
  resources: Resource[]
  error?: Error
}

const Page: NextPage<Props> = ({ resources, error }: Props) => {
  const notification = notificationState.useContainer()

  useEffect(() => {
    notification.send(error)
  }, [])

  return (
    <Template title="Resources">
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ResourceList resources={resources} />
        </Grid>
      </Grid>
    </Template>
  )
}

Page.getInitialProps = async (): Promise<Props> => {
  const props: Props = {
    resources: [],
    error: null
  }
  const query = gql`
    query {
      resources {
        id
        name
      }
    }
  `
  await fetchGraphQLData(query, 'resources')
    .then(resources => {
      props.resources = resources as Resource[]
    })
    .catch(reason => {
      props.error = reason
    })
  return props
}

export default Page
