import Resource from 'entities/Resource'
import { getRepository } from 'typeorm'
import { plainToClass } from 'class-transformer'

export const loadResources = async (): Promise<void> => {
  const repository = getRepository(Resource)
  const count = await repository.count()
  if (count > 0) {
    return
  }

  console.log('load seeds for %s', repository.metadata.tableName)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const seeds = require('./resources.seed.json')
  const resources = plainToClass(Resource, seeds)
  await repository.save(resources)
  console.log('loaded resources: %s', await repository.find())
}
