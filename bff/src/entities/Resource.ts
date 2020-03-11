import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsJSON, IsNotEmpty, validateOrReject } from 'class-validator'
import ResourceControls, { defaultResourceControls } from './ResourceControls'
import ResourceMetadata, { defaultResourceMetadata } from './ResourceMetadata'
import ResourceStatus, { defaultResourceStatus } from './ResourceStatus'

@ObjectType()
@Entity()
class Resource {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  @IsNotEmpty()
  name!: string

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string

  @Field()
  controls!: ResourceControls

  @Field()
  status!: ResourceStatus

  @Column({ type: 'json' })
  @IsNotEmpty()
  @IsJSON()
  serializedMetadata!: string
  metadata!: ResourceMetadata

  validate: () => Promise<void> = async () => {
    await validateOrReject(this)
  }

  deserializeMetadata: () => Promise<void> = async () => {
    console.log('metadata: ', this.serializedMetadata)
    const metadata = {
      ...defaultResourceMetadata,
      ...JSON.parse(this.serializedMetadata)
    }
    this.metadata = metadata
    this.controls = {
      ...defaultResourceControls,
      ...this.metadata.controls
    }
    this.status = {
      ...defaultResourceStatus,
      ...this.metadata.status
    }
  }

  serializeMetadata: () => Promise<void> = async () => {
    const metadata = {
      ...defaultResourceMetadata,
      ...this.metadata
    }
    this.serializedMetadata = JSON.stringify(metadata)
  }
}
export default Resource
