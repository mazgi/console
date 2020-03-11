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

export const authChecker: AuthChecker<Context, RoleDefinition> = async (
  { context },
  roles
) => {
  const config = await Config.getConfig()
  const repository = getRepository(User)
  let token = context.request.cookies.token
  if (!token) {
    // TODO: i18n w/ gettext like system
    //  1. read accept-lang header
    //  2. choose a message from message table
    //  3. set the message to error object
    // const e = new AuthenticationError('The token is null.')
    const e = new AuthenticationError('トークンが空です')
    console.log(e)
    // throw e
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
    throw e
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
