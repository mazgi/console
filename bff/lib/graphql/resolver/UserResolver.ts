import { Arg, Query, Resolver } from 'type-graphql'
import User from 'entities/User'
import faker from 'faker'

@Resolver(of => User)
class UserResolver {
  @Query(returns => User, { nullable: true })
  user(@Arg('userId', type => String) userId: string): User {
    const u = new User()
    u.name = faker.internet.userName()
    return u
  }
}
export default UserResolver
