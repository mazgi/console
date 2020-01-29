import { Arg, Query, Resolver } from 'type-graphql'
import Config from 'config'
import User from 'entities/User'
import { getRepository } from 'typeorm'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(of => User)
class UserResolver {
  repository = getRepository(User)

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => User)
  async user(
    @Arg('id', { nullable: true }) id?: string,
    @Arg('email', { nullable: true }) email?: string
  ): Promise<User> {
    const config = await Config.getConfig()
    if (!config.isDevelopment) {
      throw new Error()
    }

    const condition = id ? { id } : { email }
    const u = await this.repository.findOne({ where: condition })
    if (!u) {
      throw new Error()
    }
    return u as User
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [User])
  async users(): Promise<User[]> {
    const config = await Config.getConfig()
    if (!config.isDevelopment) {
      throw new Error()
    }

    const us = await this.repository.find()
    return us
  }
}
export default UserResolver
