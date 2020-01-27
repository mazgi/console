import World from 'entities/World'
import { getRepository } from 'typeorm'
import { plainToClass } from 'class-transformer'

export const loadWorlds = async (): Promise<void> => {
  const repository = getRepository(World)
  const count = await repository.count()
  if (count > 0) {
    return
  }

  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const seeds = require('./worlds.seed.json')
  const worlds = plainToClass(World, seeds)
  await repository.save(worlds)
  console.log('loaded worlds: %s', await repository.find())
}
