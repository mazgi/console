import { BaseEntity, createConnection } from 'typeorm'
import Config from 'config'
import cors from 'cors'
import express from 'express'
import { loadDBSeeds } from 'db/seeds'
import { setupGraphQLMiddleware } from 'lib/graphql/middleware'

const start = async (): Promise<void> => {
  const config = await Config.getConfig()

  // ORM
  const connection = await createConnection(config.db)
  BaseEntity.useConnection(connection)
  if (config.isDevelopment) {
    await connection.runMigrations()
    loadDBSeeds()
  }

  const app = express()
  app.set('port', config.server.port)
  // CORS
  app.use(
    cors({
      origin: config.server.origins,
      credentials: !config.server.origins.includes('*')
    })
  )

  // GraphQL & GraphiQL
  app.use('/graphql', async (req, res) => {
    const middleWare = await setupGraphQLMiddleware()
    middleWare(req, res)
  })

  app.listen(app.get('port'), () => {
    console.log(
      `⚡ App is running at :%d in %s mode`,
      app.get('port'),
      app.get('env')
    )
    console.log('  Press CTRL-C to stop' + '\n')
  })
}
start()
