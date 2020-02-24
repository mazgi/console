import AppQueue from './AppQueue'
import Config from 'config'
import { ulid } from 'ulid'

class ResourceManagementQueue implements AppQueue {
  private static queue: AppQueue | null = null

  enqueue = async (): Promise<string> => {
    // TODO:
    const jobId = ulid()
    console.log('enqueue: ', jobId)
    return jobId
  }

  constructor(connectionOption: { host: string; port: number }) {
    console.log(connectionOption)
  }

  static async getQueue(): Promise<AppQueue> {
    if (!this.queue) {
      const { redis } = await Config.getConfig()
      this.queue = new ResourceManagementQueue(redis)
    }
    return this.queue
  }
}

export default ResourceManagementQueue
