import {
  MiddlewareFn,
  MiddlewareInterface,
  NextFn,
  ResolverData
} from 'type-graphql'
import { Context } from 'lib/aaa/Context'
import User from 'entities/User'
import { generateToken } from 'lib/jwt'
import { saveTokenToResponseCookie } from 'lib/aaa/saveTokenToResponseCookie'

// https://typegraphql.ml/docs/middlewares.html#class-based-middleware
export class SignInResultMiddleware implements MiddlewareInterface<Context> {
  async use(
    { context, info }: ResolverData<Context>,
    next: NextFn
  ): Promise<MiddlewareFn<Context>> {
    const result = await next()
    if (
      info.path.key === 'signIn' &&
      info.returnType.toString() === User.name
    ) {
      const user = result as User
      const newToken = await generateToken(user)
      await saveTokenToResponseCookie(context.response, newToken)
    }
    return result
  }
}

export default SignInResultMiddleware
