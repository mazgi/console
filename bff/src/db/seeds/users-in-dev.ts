import * as fs from 'fs'
import Config from 'config'
import User from 'entities/User'
import faker from 'faker'
import { getRepository } from 'typeorm'

export const loadUsersInDev = async (): Promise<void> => {
  const config = await Config.getConfig()
  if (!config.isDevelopment) {
    return
  }

  const repository = getRepository(User)
  const count = await repository.count()
  if (count > 0) {
    return
  }

  const users = [...Array(8)].map(() => {
    const user = new User()
    user.name = faker.internet.userName().toLowerCase()
    user.email = faker.internet.email()
    user.displayName = faker.name.findName()
    user.password = faker.internet.password()
    return user
  })

  console.log('load seeds for %s', repository.metadata.tableName)
  await repository.save(users)
  // write out users information for developing
  fs.writeFileSync('users.dev.json', JSON.stringify(users, null, 2))
  console.log(`loaded %d users`, users.length)
}
