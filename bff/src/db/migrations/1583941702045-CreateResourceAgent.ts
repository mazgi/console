import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateResourceAgent1583941702045 implements MigrationInterface {
  name = 'CreateResourceAgent1583941702045'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `resource_agent_google` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `projectId` varchar(255) NOT NULL, `encryptedCredentials` text NOT NULL, UNIQUE INDEX `IDX_61b98040af45bb5f139b069b06` (`name`), UNIQUE INDEX `IDX_32f21670e92979ae867034bbe1` (`projectId`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'DROP INDEX `IDX_32f21670e92979ae867034bbe1` ON `resource_agent_google`',
      undefined
    )
    await queryRunner.query(
      'DROP INDEX `IDX_61b98040af45bb5f139b069b06` ON `resource_agent_google`',
      undefined
    )
    await queryRunner.query('DROP TABLE `resource_agent_google`', undefined)
  }
}
