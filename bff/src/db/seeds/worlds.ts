import World from 'entities/World'
import { getRepository } from 'typeorm'
import { plainToClass } from 'class-transformer'

export const loadWorlds = async (): Promise<void> => {
  const repository = getRepository(World)
  const count = await repository.count()
  if (count > 0) {
    return
  }

  console.log('load seeds for %s', repository.metadata.tableName)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const seeds = require('./worlds.seed.json')
  const worlds = plainToClass(World, seeds)
  await repository.save(worlds).catch(reason => {
    console.log('cannot load seed: ', reason)
  })
  console.log('loaded worlds: %s', await repository.find())
}
