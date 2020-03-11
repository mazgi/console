import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink, HttpLink } from 'apollo-link-http'
import { WebSocketLink } from 'apollo-link-ws'
import { split } from 'apollo-link'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { getMainDefinition } from 'apollo-utilities'
import { getEndpointWebSocket } from './getEndpointWebSocket'
import { getEndpointHttp } from './getEndpointHttp'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.isDev

export const getClient = (): ApolloClient<NormalizedCacheObject> => {
  console.log('getClient!!!')
  const endpointHttp = getEndpointHttp()
  const endpointWebSocket = getEndpointWebSocket()
  isDev && console.log(`endpoint: %s`, endpointHttp)
  const cache = new InMemoryCache()

  // Server
  if (!process.browser) {
    const link = createHttpLink({ uri: endpointHttp, fetch })
    const client = new ApolloClient({
      cache,
      link
    })
    return client
  }

  // Client
  // https://www.apollographql.com/docs/react/data/subscriptions/
  
  // Create an http link:
  const httpLink = new HttpLink({
    uri: endpointHttp,
    fetch
  })
  // Create a WebSocket link:
  const wsLink = new WebSocketLink({
    uri: endpointWebSocket,
    options: {
      reconnect: true
    }
  })
  // using the ability to split links, you can send data to each link
  // depending on what kind of operation is being sent
  const link = split(
    // split based on operation type
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    wsLink,
    httpLink,
  )

  const client = new ApolloClient({
    cache,
    link
  })
  return client
}
