import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, ObjectType } from 'type-graphql'
import { IsJSON, IsNotEmpty } from 'class-validator'
import { decryptBySecret, encryptBySecret } from 'lib/cipher'
import ResourceAgent from './ResourceAgent'

@ObjectType()
@Entity()
class ResourceAgentGoogle extends ResourceAgent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @Field(type => ID)
  @PrimaryGeneratedColumn('uuid')
  id!: string

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
  @IsNotEmpty()
  projectId!: string

  @Column({
    type: 'text'
  })
  @IsNotEmpty()
  encryptedCredentials!: string
  // volatile field
  @Field()
  credentials!: string

  encryptCredentials: () => Promise<void> = async () => {
    if (!this.credentials) {
      return
    }
    const encryptedCredentials = await encryptBySecret(this.credentials)
    this.encryptedCredentials = encryptedCredentials
  }

  decryptCredentials: () => Promise<void> = async () => {
    const credentials = await decryptBySecret(this.encryptedCredentials)
    this.credentials = credentials
  }
}

export default ResourceAgentGoogle
