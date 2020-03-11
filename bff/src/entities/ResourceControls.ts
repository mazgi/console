import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class ResourceControls {
  @Field({ defaultValue: false })
  startable!: boolean

  @Field({ defaultValue: false })
  stoppable!: boolean

  @Field({ defaultValue: false })
  deletable!: boolean
}

export const defaultResourceControls: ResourceControls = {
  startable: false,
  stoppable: false,
  deletable: false
}

export default ResourceControls
