import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateResourceTemplate1581867027142 implements MigrationInterface {
  name = 'CreateResourceTemplate1581867027142'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `resource_template` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` text NULL, `serializedMetadata` json NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `resource_template`', undefined)
  }
}
