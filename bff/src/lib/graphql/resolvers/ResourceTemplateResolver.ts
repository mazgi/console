import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import Resource from 'entities/Resource'
import { ResourceNotFoundError } from './ResourceNotFoundError'
import { getRepository } from 'typeorm'

// TODO: replace the model

@Resolver()
class ResourceTemplateResolver {
  repository = getRepository(Resource)

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Resource)
  async createResourceTemplate(
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description?: string
  ): Promise<Resource> {
    const resource = new Resource()
    resource.name = name
    resource.description = description
    await this.repository.save(resource)
    return resource
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Resource)
  async resourceTemplate(@Arg('id') id: string): Promise<Resource> {
    const resource = await this.repository
      .findOneOrFail({ where: { id } })
      .catch(reason => {
        const e = new ResourceNotFoundError(reason)
        console.log(e)
        throw e
      })
    return resource
  }

  // @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [Resource])
  async resourceTemplates(): Promise<Resource[]> {
    const resources = await this.repository.find()
    return resources
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Resource)
  async updateResourceTemplate(
    @Arg('id') id: string,
    @Arg('name', { nullable: true }) name?: string,
    @Arg('description', { nullable: true }) description?: string,
    @Arg('deleteDescription', { defaultValue: false })
    deleteDescription?: boolean
  ): Promise<Resource> {
    const resource = await this.repository.findOneOrFail({ where: { id } })
    resource.name = name || resource.name
    resource.description = description || resource.description
    if (deleteDescription) {
      resource.description = undefined
    }
    await this.repository.save(resource)
    return resource
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Boolean)
  async deleteResourceTemplate(@Arg('id') id: string): Promise<boolean> {
    const resource = await this.repository.findOneOrFail({ where: { id } })
    await this.repository.remove(resource)
    return true
  }
}
export default ResourceTemplateResolver
