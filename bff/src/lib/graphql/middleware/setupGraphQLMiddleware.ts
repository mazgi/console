import { IncomingMessage, ServerResponse } from 'http'
import Config from 'config'
import { WorldResolver } from 'lib/graphql/resolvers'
import { buildSchema } from 'type-graphql'
import graphqlHTTP from 'express-graphql'

export const setupGraphQLMiddleware = async (): Promise<graphqlHTTP.Middleware> => {
  const config = await Config.getConfig()
  const schema = await buildSchema({
    resolvers: [WorldResolver]
  })

  return graphqlHTTP((request: IncomingMessage, response: ServerResponse) => {
    return {
      schema,
      context: { request, response, startTime: Date.now() },
      graphiql: config.isDevelopment
    }
  })
}
