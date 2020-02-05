import { Grid } from '@material-ui/core'
import { NextPage } from 'next'
import ResourceList from 'components/organisms/resource/list'
import Template from 'components/templates/default'
import { fetchGraphQLData } from 'lib/graphql/request'
import gql from 'graphql-tag'
import { notificationState } from 'components/templates/default/NotificationStateContainer'

type World = {
  id: string
  name: string
}
type Props = {
  worlds: World[]
  error?: Error
}

const Page: NextPage<Props> = (props: Props) => {
  const { worlds, error } = props
  const resources = worlds
  const notification = notificationState.useContainer()
  notification.send(error)

  return (
    <Template title="dashboard">
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
    worlds: [],
    error: null
  }
  const query = gql`
    query {
      worlds {
        id
        name
      }
    }
  `
  await fetchGraphQLData(query, 'worlds')
    .then(worlds => {
      props.worlds = worlds as World[]
    })
    .catch(reason => {
      props.error = reason
    })
  return props
}

export default Page
