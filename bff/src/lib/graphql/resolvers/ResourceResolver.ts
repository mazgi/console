import { Arg, Authorized, Mutation, Query, Resolver } from 'type-graphql'
import { Resource, ResourceMetadata, defaultResourceMetadata } from 'entities'
import { ResourceNotFoundError } from './ResourceNotFoundError'
import { getRepository } from 'typeorm'
import { ulid } from 'ulid'

@Resolver()
class ResourceResolver {
  repository = getRepository(Resource)

  // @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Resource)
  async createResource(
    @Arg('name') name: string,
    @Arg('description', { nullable: true }) description?: string
  ): Promise<Resource> {
    console.log('‼️ createResource: ', name)
    const resource = new Resource()
    resource.id = ulid()
    resource.name = name
    resource.description = description
    // TODO: metadata
    const metadata: ResourceMetadata = {
      ...defaultResourceMetadata,
      // TODO: set enable/disable by permissions
      controls: {
        startable: true,
        stoppable: true,
        deletable: true
      }
    }
    resource.metadata = metadata
    await this.repository.save(resource)
    return resource
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => Resource)
  async resource(@Arg('id') id: string): Promise<Resource> {
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
  async resources(): Promise<Resource[]> {
    const resources = await this.repository.find()
    return resources
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Resource)
  async updateResource(
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
  async deleteResource(@Arg('id') id: string): Promise<boolean> {
    const resource = await this.repository.findOneOrFail({ where: { id } })
    await this.repository.remove(resource)
    return true
  }
}
export default ResourceResolver
