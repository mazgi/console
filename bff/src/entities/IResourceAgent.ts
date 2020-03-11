import { Column, PrimaryGeneratedColumn } from 'typeorm'
import { Field, ID, InterfaceType } from 'type-graphql'
import { IsNotEmpty } from 'class-validator'

@InterfaceType({
  // workaround for bug: https://github.com/MichalLytek/type-graphql/issues/373
  resolveType: value => value.constructor.name
})
abstract class IResourceAgent {
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
}

export default IResourceAgent
