import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsJSON, IsNotEmpty, validateOrReject } from 'class-validator'
import Clan from './Clan'

@ObjectType()
class WorldMetadata {
  @Field()
  version!: string
}

const defaultMetadata: WorldMetadata = {
  version: '2020.02.0'
}

@ObjectType()
@Entity()
class World {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @OneToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Clan,
    clan => clan.world
  )
  clans!: Clan[]

  @Field()
  @Column({
    unique: true
  })
  @IsNotEmpty()
  name!: string

  @Column({ type: 'json' })
  @IsJSON()
  serializedMetadata!: string
  @Field()
  metadata!: WorldMetadata

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
export default World
