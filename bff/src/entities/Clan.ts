import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'
import User from './User'
import World from './World'

@ObjectType()
@Entity()
class Clan {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => User,
    user => user.clans
  )
  users!: User[]

  @ManyToOne(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => World,
    world => world.clans
  )
  world!: World

  @Field()
  @Column({
    unique: true
  })
  @IsNotEmpty()
  name!: string
}
export default Clan
