import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import World from 'entities/World'
import { getRepository } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(of => World)
class WorldResolver {
  repository = getRepository(World)

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => World)
  async world(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('name', { nullable: true }) name?: string
  ): Promise<World> {
    const condition = id ? { id } : { name }
    const w = await this.repository.findOne({ where: condition })
    if (!w) {
      throw new Error()
    }
    return w as World
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [World])
  async worlds(): Promise<World[]> {
    const ws = await this.repository.find()
    return ws
  }
}
export default WorldResolver
