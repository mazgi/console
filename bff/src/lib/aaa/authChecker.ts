import { generateToken, verifyToken } from 'lib/jwt'
import { AuthChecker } from 'type-graphql'
import { AuthenticationError } from './AuthenticationError'
import Config from 'config'
import { Context } from './Context'
import User from 'entities/User'
import { getRepository } from 'typeorm'
import { saveTokenToResponseCookie } from './saveTokenToResponseCookie'

type RoleDefinition = {
  requiredRoles: string[]
  targetResource: 'ALL' | 'ANY' | 'SELF' | string
}[]

const authChecker: AuthChecker<Context, RoleDefinition> = async (
  { context },
  roles
) => {
  const config = await Config.getConfig()
  const repository = getRepository(User)
  let token = context.request.cookies.token
  if (!token) {
    const e = new AuthenticationError('The token is null.')
    console.log(e)
    throw e
  }
  config.isDevelopment && console.log(`roles: `, roles, `, token: `, token)
  if (config.isDevelopment && !token) {
    const user = await repository.findOneOrFail()
    token = await generateToken(user)
    console.log(
      `🔥 Dummy user was selected because app runs under DEV mode and the token was undefined.`,
      user
    )
  }
  const [verified, payload] = await verifyToken(token)
  if (!verified) {
    const e = new AuthenticationError('The token cannot be verified.')
    console.log(e)
    return false
  }
  const user = await repository.findOneOrFail({
    where: { id: payload.id }
  })
  context.user = user

  //TODO: role

  const newToken = await generateToken(user)
  saveTokenToResponseCookie(context.response, newToken)
  return !!payload
}

export default authChecker
