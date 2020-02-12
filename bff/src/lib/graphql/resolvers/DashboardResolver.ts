import { Query, Resolver, createUnionType } from 'type-graphql'
import Resource from 'entities/Resource'
import World from 'entities/World'
import { getManager } from 'typeorm'

const DashboardUnion = createUnionType({
  name: 'Dashboard',
  // TODO: change the model
  types: () => [Resource, World]
})

@Resolver()
class DashboardResolver {
  entityManager = getManager()

  // @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [DashboardUnion])
  async dashboard(): Promise<Array<typeof DashboardUnion>> {
    const resources = await this.entityManager.find(Resource)
    // TODO: change the model
    const worlds = await this.entityManager.find(World)
    return [...resources, ...worlds]
  }
}
export default DashboardResolver
