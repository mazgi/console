import {
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  UpdateEvent
} from 'typeorm'
import { LoadEvent } from 'typeorm/subscriber/event/LoadEvent'
import User from 'entities/User'

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  listenTo: () => Function = () => {
    return User
  }

  afterLoad: (entity: User, event: LoadEvent<User>) => void = (
    entity,
    event
  ) => {
    entity.deserializeMetadata()
  }

  beforeInsert: (event: InsertEvent<User>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.alignEmailToLowerCase()
    entity.updatePassword()
    entity.serializeMetadata()
  }

  beforeUpdate: (event: UpdateEvent<User>) => void = event => {
    const entity = event.entity
    entity.validate()
    entity.alignEmailToLowerCase()
    entity.updatePassword()
    entity.serializeMetadata()
  }
}
