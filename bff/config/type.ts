import { ConnectionOptions } from 'typeorm'
import NodeRSA from 'node-rsa'

export type ConfigType = {
  version: string
  baseVersion: string
  isDevelopment: boolean
  privateKey: NodeRSA
  db: ConnectionOptions
  email: {
    type: string
    address: string
    password?: string
  }
  server: {
    port: number
  }
  seeds: {
    users: {}
  }
}
