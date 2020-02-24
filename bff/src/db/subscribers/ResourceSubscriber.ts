import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent'
import Resource from 'entities/Resource'

@EventSubscriber()
export class ResourceSubscriber implements EntitySubscriberInterface<Resource> {
  listenTo: () => Function = () => {
    return Resource
  }

  afterLoad: (entity: Resource, event: LoadEvent<Resource>) => void = (
    entity,
    event
  ) => {
    entity.deserializeMetadata()
  }

  beforeInsert: (event: InsertEvent<Resource>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.serializeMetadata()
  }

  beforeUpdate: (event: UpdateEvent<Resource>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.serializeMetadata()
  }
}
