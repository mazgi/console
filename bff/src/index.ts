import { BaseEntity, createConnection } from 'typeorm'
import {
  NotificationResolver,
  ResourceAgentResolver,
  WorldResolver
} from 'lib/graphql/resolvers'
import { ApolloServer } from 'apollo-server'
import Config from 'config'
import { Context } from 'lib/aaa/Context'
import Redis from 'ioredis'
import { RedisPubSub } from 'graphql-redis-subscriptions'
import { authChecker } from 'lib/aaa/authChecker'
import { buildSchema } from 'type-graphql'
import { loadDBSeeds } from 'db/seeds'

const start = async (): Promise<void> => {
  const config = await Config.getConfig()

  // PubSub
  const redisOptions: Redis.RedisOptions = {
    host: config.redis.host,
    port: config.redis.port,
    retryStrategy: times => Math.max(times * 100, 3000)
  }
  const pubSub = new RedisPubSub({
    publisher: new Redis(redisOptions),
    subscriber: new Redis(redisOptions)
  })

  // ORM
  const connection = await createConnection(config.db)
  BaseEntity.useConnection(connection)
  if (config.isDevelopment) {
    await connection.runMigrations()
    loadDBSeeds()
  }

  const schema = await buildSchema({
    resolvers: [ResourceAgentResolver, NotificationResolver, WorldResolver],
    authChecker,
    pubSub
  })

  const server = new ApolloServer({
    schema,
    context: ({ req, res, connection }): Context => {
      const ctx: Context = {
        request: req,
        response: res,
        user: {
          id: 'xxx',
          name: 'dummy user'
        }
      }
      return ctx
    },
    playground: config.isDevelopment
  })

  const { url, subscriptionsUrl } = await server.listen(config.server.port)
  console.log(`⚡ App is running at ${url}`)
  console.log(`⚡ Subscriptions ready at ${subscriptionsUrl}`)
  console.log('  Press CTRL-C to stop' + '\n')
}
start()
