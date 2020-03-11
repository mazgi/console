import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import UserMetadata, { defaultUserMetadata } from 'entities/UserMetadata'
import Config from 'config'
import User from 'entities/User'
import { getRepository } from 'typeorm'
import { ulid } from 'ulid'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
@Resolver(of => User)
class UserResolver {
  repository = getRepository(User)

  // @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => User)
  async createUser(
    @Arg('name') name: string,
    @Arg('email') email: string,
    @Arg('displayName') displayName: string,
    @Arg('password') password: string
  ): Promise<User> {
    console.log('‼️ createUser: ', name)
    const user = new User()
    user.id = ulid()
    user.name = name
    user.email = email
    user.displayName = displayName
    user.password = password
    const metadata: UserMetadata = {
      ...defaultUserMetadata,
      controls: {
        deletable: true
      }
    }
    user.metadata = metadata
    await this.repository.save(user)
    return user
  }

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => User)
  async updateUserPassword(
    @Arg('id') id: string,
    @Arg('currentPassword') currentPassword: string,
    @Arg('newPassword') newPassword: string
  ): Promise<User> {
    const user = await this.repository.findOneOrFail({ where: { id } })
    if (!user.comparePassword(currentPassword)) {
      // TODO: error object
      throw new Error('current password is wrong')
    }
    user.password = newPassword
    await this.repository.save(user)
    return user
  }

  // @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => Boolean)
  async deleteUser(@Arg('id') id: string): Promise<boolean> {
    const user = await this.repository.findOneOrFail({ where: { id } })
    await this.repository.remove(user)
    return true
  }
}
export default UserResolver
