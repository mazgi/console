import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent'
import { ResourceAgentGoogle } from 'entities'

@EventSubscriber()
export class ResourceAgentGoogleSubscriber
  implements EntitySubscriberInterface<ResourceAgentGoogle> {
  listenTo: () => Function = () => {
    return ResourceAgentGoogle
  }

  afterLoad: (
    entity: ResourceAgentGoogle,
    event: LoadEvent<ResourceAgentGoogle>
  ) => void = async (entity, event) => {
    await entity.decryptCredentials()
  }

  beforeInsert: (
    event: InsertEvent<ResourceAgentGoogle>
  ) => void = async event => {
    const entity = event.entity
    await entity.encryptCredentials()
  }

  beforeUpdate: (
    event: UpdateEvent<ResourceAgentGoogle>
  ) => void = async event => {
    const entity = event.entity
    await entity.encryptCredentials()
  }
}
