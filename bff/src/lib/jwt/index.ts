import Config from 'config'
import User from 'entities/User'
import jwt from 'jsonwebtoken'
import validator from 'validator'

type TokenPayload = {
  id: string | null | undefined
}

export const generateToken = async (user: User): Promise<string> => {
  const config = await Config.getConfig()
  const payload: TokenPayload = {
    id: user.id
  }
  const generated = jwt.sign(payload, config.privateKey, {
    algorithm: 'RS256',
    expiresIn: '24h'
  })
  return generated
}

export const verifyToken = async (
  token: string
): Promise<[boolean, TokenPayload]> => {
  if (validator.isEmpty(token)) {
    console.log(`Token is empty.`)
    return [false, { id: null }]
  }
  const config = await Config.getConfig()
  let decoded = null
  try {
    decoded = jwt.verify(token, config.publicKey)
  } catch (e) {
    console.log(e)
  }
  if (!decoded) {
    console.log(`The token could not be verified.`)
    return [false, { id: null }]
  }
  const payload = decoded as TokenPayload
  console.log(`The token verified: `, payload)
  return [!!payload, payload]
}
