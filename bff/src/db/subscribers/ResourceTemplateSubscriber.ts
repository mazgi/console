import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent'
import ResourceTemplate from 'entities/ResourceTemplate'

@EventSubscriber()
export class ResourceTemplateSubscriber
  implements EntitySubscriberInterface<ResourceTemplate> {
  listenTo: () => Function = () => {
    return ResourceTemplate
  }

  afterLoad: (
    entity: ResourceTemplate,
    event: LoadEvent<ResourceTemplate>
  ) => void = (entity, event) => {
    entity.deserializeMetadata()
  }

  beforeInsert: (event: InsertEvent<ResourceTemplate>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.serializeMetadata()
  }

  beforeUpdate: (event: UpdateEvent<ResourceTemplate>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.serializeMetadata()
  }
}
