import IResourceAgent from './IResourceAgent'
import { ObjectType } from 'type-graphql'

@ObjectType({ implements: IResourceAgent })
abstract class ResourceAgent implements IResourceAgent {
  id!: string
  name!: string
}

export default ResourceAgent
