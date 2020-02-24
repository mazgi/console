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
  startable: true,
  stoppable: true,
  deletable: true
}

export default ResourceControls
