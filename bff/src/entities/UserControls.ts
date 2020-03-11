import { Field, ObjectType } from 'type-graphql'

@ObjectType()
class UserControls {
  @Field({ defaultValue: false })
  deletable!: boolean
}

export const defaultUserControls: UserControls = {
  deletable: true
}

export default UserControls
