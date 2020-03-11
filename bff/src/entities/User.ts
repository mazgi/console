import * as bcrypt from 'bcrypt'
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsEmail, IsJSON, IsNotEmpty, validateOrReject } from 'class-validator'
import UserControls, { defaultUserControls } from './UserControls'
import UserMetadata, { defaultUserMetadata } from './UserMetadata'
import Clan from './Clan'
import ValidationError from 'lib/validator/ValidationError'
import validatePassword from 'lib/validator/validatePassword'

@ObjectType()
@Entity()
class User {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

  @ManyToMany(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    type => Clan,
    clan => clan.users
  )
  @JoinTable()
  clans!: Clan[]

  @Field()
  @Column({
    unique: true
  })
  @IsNotEmpty()
  name!: string

  @Field()
  @Column({
    unique: true
  })
  @IsEmail()
  email!: string

  @Field()
  @Column({
    unique: true
  })
  @IsNotEmpty()
  displayName!: string

  @Column({
    nullable: true
  })
  hashedPassword?: string
  // volatile field
  password?: string

  @Column({ type: 'json' })
  @IsJSON()
  serializedMetadata!: string
  metadata!: UserMetadata

  @Field({ nullable: true })
  status?: string

  @Field()
  controls?: UserControls

  validate: () => Promise<void> = async () => {
    await validateOrReject(this)
  }

  deserializeMetadata: () => Promise<void> = async () => {
    const metadata = {
      ...defaultUserMetadata,
      ...this.deserializeMetadata
    }
    this.metadata = metadata
    this.controls = {
      ...defaultUserControls,
      ...this.metadata.controls
    }
  }

  serializeMetadata: () => Promise<void> = async () => {
    const metadata = {
      ...defaultUserMetadata,
      ...this.metadata
    }
    this.serializedMetadata = JSON.stringify(metadata)
  }

  alignEmailToLowerCase: () => void = () => {
    this.email = this.email.toLowerCase()
  }

  updatePassword: () => Promise<void> = async () => {
    if (!this.password) {
      return
    }
    const validationErrors = validatePassword(this.password)
    if (validationErrors.length > 0) {
      throw new ValidationError(
        `Validation failed. ${JSON.stringify(validationErrors)}`,
        validationErrors
      )
    }
    const hashedPassword = await bcrypt.hash(this.password, 10)
    this.hashedPassword = hashedPassword
  }

  comparePassword: (
    plainTextPassword: string
  ) => Promise<boolean> = async plainTextPassword => {
    const hashedPassword: string = this.hashedPassword || ''
    const match = await bcrypt.compare(plainTextPassword, hashedPassword)
    return match
  }
}
export default User
