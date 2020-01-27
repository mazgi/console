import { Arg, Query, Resolver } from 'type-graphql'
import World from 'entities/World'
import { getRepository } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(of => World)
class WorldResolver {
  repository = getRepository(World)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => World)
  async world(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('name', { nullable: true }) name?: string
  ): Promise<World> {
    const w = await this.repository.findOne({ where: { name } })
    if (!w) {
      throw new Error()
    }
    return w as World
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [World])
  async worlds(): Promise<World[]> {
    const ws = await this.repository.find()
    return ws
  }
}
export default WorldResolver
