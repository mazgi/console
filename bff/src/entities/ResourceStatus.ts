import { Field, ObjectType } from 'type-graphql'

enum Status {
  Creating = 'creating'
}

@ObjectType()
class ResourceStatus {
  static readonly Status = Status

  @Field({ nullable: true })
  name?: Status
}

export const defaultResourceStatus: ResourceStatus = {
  name: undefined
}

export default ResourceStatus
