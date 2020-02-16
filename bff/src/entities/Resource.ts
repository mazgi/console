/* eslint-disable @typescript-eslint/no-unused-vars */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'

@ObjectType()
@Entity()
class Resource {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @Field()
  @Column()
  name!: string

  @Field({ nullable: true })
  @Column({ type: 'text', nullable: true })
  description?: string

  @Column({ type: 'json', nullable: true })
  data?: string
}
export default Resource
