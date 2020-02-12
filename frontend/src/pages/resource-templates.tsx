import { NextPage } from 'next'
import Template from 'components/templates/default'
import { fetchGraphQLData } from 'lib/graphql/request'
import gql from 'graphql-tag'
import { notificationState } from 'components/templates/default/NotificationStateContainer'
import { useEffect } from 'react'

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
  const notification = notificationState.useContainer()

  useEffect(() => {
    notification.send(error)
  }, [])

  return (
    <Template title="Resource templates">
      <main>
        {worlds.map(world => (
          <p key={world.id}>
            {world.id}: {world.name}
          </p>
        ))}
      </main>
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
