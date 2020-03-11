import { NextPage, NextPageContext } from 'next'
import Template from 'components/templates/default'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import { GoogleCloudAgentRegisterForm } from 'components/organisms/google-cloud-agent/register'
import { GoogleCloudAgentList } from 'components/organisms/google-cloud-agent/list'

const Page: NextPage = () => {
  const query=gql`
    query {
      resourceAgents {
        id
        name
      }
    }
  `
  const { client, data, error, loading, networkStatus, called } = useQuery(
    query
  )
  return (
    <Template>
      <GoogleCloudAgentRegisterForm />
      <GoogleCloudAgentList resourceAgents={data && data.resourceAgents} />
    </Template>
  )
}

export default Page
