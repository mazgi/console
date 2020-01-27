import { GraphQLResponseError } from './GraphQLResponseError'
import { Query } from './Query'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { getEndpoint } from './getEndpoint'
import { gqlToString } from './gqlToString'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.isDev

export const fetchGraphQLData = async (
  graphqlQuery: string | Query,
  key: string
): Promise<{}> => {
  const endpoint = getEndpoint()
  isDev && console.log(`endpoint: %s`, endpoint)
  const query = gqlToString(graphqlQuery)
  isDev && console.log(`query: %s`, query)
  const fetchOpts: RequestInit = {
    mode: 'cors',
    method: 'POST',
    credentials: 'include',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ query }, null, 2)
  }
  isDev && console.log(`fetchOpts: %s`, JSON.stringify(fetchOpts, null, 2))
  const parsedResponse = fetch(endpoint, fetchOpts)
    .then(response => {
      isDev && console.log(`response: `, JSON.stringify(response, null, 2))
      return response.json()
    })
    .then(body => {
      const errors = body.errors
      if (errors) {
        isDev && console.log(`errors: `, errors)
        throw new GraphQLResponseError(
          `Found ${errors.length} error(s) in the GraphQL response.`,
          query,
          errors
        )
      }
      isDev && console.log(`body: `, JSON.stringify(body, null, 2))
      return body.data
    })
    .then(data => {
      const result = data[key]
      if (!result) {
        isDev && console.log(`data: `, JSON.stringify(data, null, 2))
        throw new GraphQLResponseError(
          `Key ${key} is not found in the response data.`,
          query,
          []
        )
      }
      return result
    })

  return parsedResponse
}
