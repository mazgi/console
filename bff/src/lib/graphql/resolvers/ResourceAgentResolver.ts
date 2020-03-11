import {
  Arg,
  Authorized,
  Mutation,
  PubSub,
  PubSubEngine,
  Publisher,
  Query,
  Resolver,
  Root,
  Subscription
} from 'type-graphql'
import { getManager, getRepository } from 'typeorm'
import { Notification } from '@google-cloud/storage'
import { NotificationPayload } from 'entities/Notification'
import ResourceAgent from 'entities/ResourceAgent'
import { ResourceAgentGoogle } from 'entities'
import { ulid } from 'ulid'

@Resolver()
class ResourceAgentResolver {
  private readonly agentClasses = [ResourceAgentGoogle]
  private readonly entityManager = getManager()

  @Authorized()
  @Mutation(returns => ResourceAgentGoogle)
  async registerResourceAgentGoogle(
    @PubSub('RESOURCE_AGENTS') publish: Publisher<ResourceAgent>,
    @Arg('projectId') projectId: string,
    @Arg('credentials') credentials: string
  ): Promise<ResourceAgentGoogle> {
    const agent = new ResourceAgentGoogle()
    agent.id = ulid()
    agent.name = `${projectId} (default)`
    agent.projectId = projectId
    agent.credentials = credentials
    await this.entityManager.save(ResourceAgentGoogle, agent)
    await publish({
      id: agent.id,
      name: agent.name
    })
    return agent
  }

  // @Authorized()
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // @Query(returns => ResourceAgent)
  // async resourceAgent(
  //   @Arg('id', { nullable: true }) id?: string,
  //   @Arg('name', { nullable: true }) name?: string
  // ): Promise<ResourceAgent> {
  //   const condition = id ? { id } : { name }
  //   const agent = this.agentClasses.find(cls => {
  //     this.entityManager.findOne(cls, { where: { id }})
  //   })
  //   if (!agent) {
  //     throw new Error()
  //   }
  //   return agent as ResourceAgent
  // }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Query(returns => [ResourceAgent])
  async resourceAgents(): Promise<ResourceAgent[]> {
    // TODO: filter by logged-in user
    const resourceAgentList: ResourceAgent[] = []
    await Promise.all(
      this.agentClasses.map(async cls => {
        const agents = await this.entityManager.find(cls)
        agents.forEach(agent => {
          resourceAgentList.push(agent)
        })
      })
    )
    return resourceAgentList
  }

  @Authorized()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Subscription(returns => [ResourceAgent], { topics: 'RESOURCE_AGENTS' })
  async subscriptionResourceAgents(): Promise<ResourceAgent[]> {
    // TODO: filter by logged-in user
    const resourceAgentList: ResourceAgent[] = []
    await Promise.all(
      this.agentClasses.map(async cls => {
        const agents = await this.entityManager.find(cls)
        agents.forEach(agent => {
          resourceAgentList.push(agent)
        })
      })
    )
    return resourceAgentList
  }
}
export default ResourceAgentResolver
