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
  })
})
