import { NextPage } from 'next'
import Template from 'components/templates/default'
import { fetchGraphQLData } from 'lib/graphql/request'
import gql from 'graphql-tag'

type World = {
  id: string
  name: string
}
type Props = {
  worlds: World[]
}

const Page: NextPage<Props> = ({ worlds }: Props) => {
  return (
    <Template title="resource">
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
  const query = gql`
    query {
      worlds {
        id
        name
      }
    }
  `
  const result = await fetchGraphQLData(query, 'worlds')
  const worlds = result as World[]
  return { worlds }
}

export default Page
