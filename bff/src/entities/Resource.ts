import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsJSON, IsNotEmpty, validateOrReject } from 'class-validator'
import ResourceControls, { defaultResourceControls } from './ResourceControls'
import ResourceMetadata, { defaultResourceMetadata } from './ResourceMetadata'

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

  @Column({ type: 'json' })
  @IsJSON()
  serializedMetadata!: string
  metadata?: ResourceMetadata

  @Field({ nullable: true })
  status?: string

  @Field()
  controls?: ResourceControls

  validate: () => Promise<void> = async () => {
    await validateOrReject(this)
  }

  deserializeMetadata: () => Promise<void> = async () => {
    const metadata = {
      ...defaultResourceMetadata,
      ...this.deserializeMetadata
    }
    this.metadata = metadata
    // TODO: status
    this.controls = {
      ...defaultResourceControls,
      ...this.metadata.controls
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
