import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateWorld1581866646881 implements MigrationInterface {
  name = 'CreateWorld1581866646881'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `world` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `serializedMetadata` json NOT NULL, UNIQUE INDEX `IDX_9aa9325530beea5c1fdf1791f3` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'DROP INDEX `IDX_9aa9325530beea5c1fdf1791f3` ON `world`',
      undefined
    )
    await queryRunner.query('DROP TABLE `world`', undefined)
  }
}
