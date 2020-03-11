import Config from './Config'
import { ConfigType } from './ConfigType'

describe('ConfigType', () => {
  let config: ConfigType

  beforeAll(async () => {
    config = await Config.getConfig()
  })

  describe('Verify config object', () => {
    test('The version should be semantic version string', () => {
      expect(config.version).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+[0-9a-z-]*$/)
    })
    test('The base version should be semantic version string', () => {
      expect(config.baseVersion).toMatch(/^[0-9]+\.[0-9]+\.[0-9]+[0-9a-z-]*$/)
    })
    test('The private key should be PEM string.', () => {
      expect(typeof config.privateKey).toBe('string')
    })
    test('The public key should be string', () => {
      expect(typeof config.publicKey).toBe('string')
    })
    test('The secret string should be 256 bits (32 characters)', () => {
      expect(typeof config.secret).toBe('string')
      const len = Buffer.from(config.secret, 'base64').byteLength
      expect(len).toBe(32)
    })
  })
})
