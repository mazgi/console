import Config from 'config'
import crypto from 'crypto'

const Algorithm = 'aes-256-cbc'
export const encryptBySecret = async (text: string): Promise<string> => {
  const config = await Config.getConfig()
  const secret = config.secret
  config.isDevelopment && console.log(`secret: `, secret)
  const iv = crypto.randomBytes(16)
  const cipher = crypto.createCipheriv(
    Algorithm,
    Buffer.from(secret, 'base64'),
    iv
  )
  const encryptedText = cipher.update(text)
  const encrypted = Buffer.concat([encryptedText, cipher.final()])

  return `${iv.toString('hex')}:${encrypted.toString('hex')}`
}

export const decryptBySecret = async (
  encrypted: string
): Promise<string> => {
  const config = await Config.getConfig()
  const secret = config.secret
  const [ivHex, encryptedTextHex] = encrypted.split(':')
  const iv = Buffer.from(ivHex, 'hex')
  const encryptedText = Buffer.from(encryptedTextHex, 'hex')
  const decipher = crypto.createDecipheriv(
    Algorithm,
    Buffer.from(secret, 'base64'),
    iv
  )
  const decryptedText = decipher.update(encryptedText)
  const decrypted = Buffer.concat([decryptedText, decipher.final()])
  return decrypted.toString()
}
