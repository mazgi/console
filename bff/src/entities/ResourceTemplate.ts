import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsJSON, IsNotEmpty, validateOrReject } from 'class-validator'

@ObjectType()
class ResourceTemplateMetadata {
  @Field()
  version!: string
}

const defaultMetadata: ResourceTemplateMetadata = {
  version: '2020.02.0'
}

@ObjectType()
@Entity()
class ResourceTemplate {
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
  @Field()
  metadata!: ResourceTemplateMetadata

  validate: () => Promise<void> = async () => {
    await validateOrReject(this)
  }

  deserializeMetadata: () => Promise<void> = async () => {
    const metadata = {
      ...defaultMetadata,
      ...this.deserializeMetadata
    }
    this.metadata = metadata
  }

  serializeMetadata: () => Promise<void> = async () => {
    const metadata = {
      ...defaultMetadata,
      ...this.metadata
    }
    this.serializedMetadata = JSON.stringify(metadata)
  }
}
export default ResourceTemplate
