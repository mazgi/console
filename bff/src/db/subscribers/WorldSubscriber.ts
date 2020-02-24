import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent'
import World from 'entities/World'

@EventSubscriber()
export class WorldSubscriber implements EntitySubscriberInterface<World> {
  listenTo: () => Function = () => {
    return World
  }

  afterLoad: (entity: World, event: LoadEvent<World>) => void = (
    entity,
    event
  ) => {
    entity.deserializeMetadata()
  }

  beforeInsert: (event: InsertEvent<World>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.serializeMetadata()
  }

  beforeUpdate: (event: UpdateEvent<World>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.serializeMetadata()
  }
}
