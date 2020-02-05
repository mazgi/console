import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateResource1580309144281 implements MigrationInterface {
  name = 'CreateResource1580309144281'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `resource` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `description` text NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query('DROP TABLE `resource`', undefined)
  }
}
