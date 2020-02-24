import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import ResourceTemplate from 'entities/ResourceTemplate'
import { ResourceTemplateNotFoundError } from './ResourceTemplateNotFoundError'
import { getRepository } from 'typeorm'

@Resolver()
class ResourceTemplateResolver {
  repository = getRepository(ResourceTemplate)

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => ResourceTemplate)
  async createResourceTemplate(
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description?: string
  ): Promise<ResourceTemplate> {
    const resourceTemplate = new ResourceTemplate()
    resourceTemplate.name = name
    resourceTemplate.description = description
    await this.repository.save(resourceTemplate)
    return resourceTemplate
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => ResourceTemplate)
  async resourceTemplate(@Arg('id') id: string): Promise<ResourceTemplate> {
    const resourceTemplate = await this.repository
      .findOneOrFail({ where: { id } })
      .catch(reason => {
        const e = new ResourceTemplateNotFoundError(reason)
        console.log(e)
        throw e
      })
    return resourceTemplate
  }

  // @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [ResourceTemplate])
  async resourceTemplates(): Promise<ResourceTemplate[]> {
    const resourceTemplates = await this.repository.find()
    return resourceTemplates
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => ResourceTemplate)
  async updateResourceTemplate(
    @Arg('id') id: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('description', { nullable: true }) description?: string,
    @Arg('deleteDescription', { defaultValue: false })
    deleteDescription?: boolean
  ): Promise<ResourceTemplate> {
    const resourceTemplate = await this.repository.findOneOrFail({
      where: { id }
    })
    resourceTemplate.name = name || resourceTemplate.name
    resourceTemplate.description = description || resourceTemplate.description
    if (deleteDescription) {
      resourceTemplate.description = undefined
    }
    await this.repository.save(resourceTemplate)
    return resourceTemplate
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Boolean)
  async deleteResourceTemplate(@Arg('id') id: string): Promise<boolean> {
    const resourceTemplate = await this.repository.findOneOrFail({
      where: { id }
    })
    await this.repository.remove(resourceTemplate)
    return true
  }
}
export default ResourceTemplateResolver
