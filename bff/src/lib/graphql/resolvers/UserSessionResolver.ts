import {
  Arg,
  Authorized,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql'
import { CannotSignInError } from './CannotSignInError'
import Config from 'config'
import { Context } from 'lib/aaa/Context'
import { SignInResultMiddleware } from 'lib/graphql/middleware'
import User from 'entities/User'
import { getRepository } from 'typeorm'

@Resolver()
class UserSessionResolver {
  repository = getRepository(User)

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => User)
  async authenticated(@Ctx() context: Context): Promise<User> {
    const id = context.user.id
    const u = await this.repository.findOne({ where: { id } })
    if (!u) {
      throw new Error()
    }
    return u as User
  }

  @UseMiddleware(SignInResultMiddleware)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Mutation(returns => User, { nullable: true })
  async signIn(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<User> {
    const config = await Config.getConfig()
    console.log(
      `signIn: email: %s, password: %s`,
      email,
      config.isDevelopment ? password : '****'
    )
    const user = await this.repository.findOne({ where: { email } })
    if (!user) {
      throw new CannotSignInError(
        `Cannot sign in as a valid user. Please check the email and password that your input.`
      )
    }
    if (!(await user.comparePassword(password))) {
      throw new CannotSignInError(
        `Cannot sign in as a valid user. Please check the email and password that your input.`
      )
    }
    return user
  }
}

export default UserSessionResolver
