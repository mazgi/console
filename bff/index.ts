import 'reflect-metadata'
import { BaseEntity, createConnection } from 'typeorm'
import Config from 'config'
import { UserResolver } from 'lib/graphql/resolver'
import { buildSchema } from 'type-graphql'
import errorHandler from 'errorhandler'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import { loadDBSeeds } from 'db/seeds'
import logger from 'morgan'

async function start(): Promise<void> {
  const config = await Config.getConfig()

  const app = express()
  app.set('port', config.server.port)
  app.use(errorHandler())
  if (config.isDevelopment) {
    app.use(logger('dev'))
  }

  // ORM
  const connection = await createConnection(config.db)
  config.isDevelopment && (await connection.runMigrations())
  BaseEntity.useConnection(connection)
  await loadDBSeeds()

  // GraphQL
  const schema = await buildSchema({
    resolvers: [UserResolver]
  })

  app.use(
    '/graphql',
    graphqlHTTP({
      schema,
      graphiql: config.isDevelopment
    })
  )

  app.listen(app.get('port'), () => {
    console.log(
      '  App is running at http://localhost:%d in %s mode',
      app.get('port'),
      app.get('env')
    )
    console.log('  Press CTRL-C to stop\n')
  })
}
start()
