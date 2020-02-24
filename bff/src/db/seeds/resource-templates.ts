import ResourceTemplate from 'entities/ResourceTemplate'
import { getRepository } from 'typeorm'
import { plainToClass } from 'class-transformer'

export const loadResourceTemplates = async (): Promise<void> => {
  const repository = getRepository(ResourceTemplate)
  const count = await repository.count()
  if (count > 0) {
    return
  }

  console.log('load seeds for %s', repository.metadata.tableName)
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const seeds = require('./resource-templates.seed.json')
  const resourceTemplates = plainToClass(ResourceTemplate, seeds)
  await repository.save(resourceTemplates)
  console.log('loaded resource-templates: %s', await repository.find())
}
