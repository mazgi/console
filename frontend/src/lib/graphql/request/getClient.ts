import { InMemoryCache, NormalizedCacheObject } from 'apollo-cache-inmemory'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import fetch from 'isomorphic-unfetch'
import getConfig from 'next/config'
import { getEndpoint } from './getEndpoint'

const { publicRuntimeConfig } = getConfig()
const isDev = publicRuntimeConfig.isDev

export const getClient = (): ApolloClient<NormalizedCacheObject> => {
  const endpoint = getEndpoint()
  isDev && console.log(`endpoint: %s`, endpoint)
  const link = createHttpLink({ uri: endpoint, fetch })
  const cache = new InMemoryCache()
  const client = new ApolloClient({
    cache,
    link
  })
  // TODO: ssr
  if (process.browser) {
    return client
  } else {
    return client
  }
}
