import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsEmail, validate } from 'class-validator'

@ObjectType()
@Entity()
class User {
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Field()
  @Column({
    unique: true
  })
  name: string

  @Field()
  @Column()
  @IsEmail()
  email: string

  // volatile field
  password: string

  @Column({
    nullable: true
  })
  hashedPassword: string
}
export default User
