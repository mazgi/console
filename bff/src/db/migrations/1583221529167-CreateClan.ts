import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateClan1583221529167 implements MigrationInterface {
  name = 'CreateClan1583221529167'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `clan` (`id` varchar(36) NOT NULL, `name` varchar(255) NOT NULL, `worldId` varchar(36) NULL, UNIQUE INDEX `IDX_b394039ff70f0dfb0b89ec5123` (`name`), PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
    await queryRunner.query(
      'CREATE TABLE `resource_agent` (`id` varchar(36) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB',
      undefined
    )
    await queryRunner.query(
      'ALTER TABLE `clan` ADD CONSTRAINT `FK_e5e4293eee7b127b4883c0318a8` FOREIGN KEY (`worldId`) REFERENCES `world`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `clan` DROP FOREIGN KEY `FK_e5e4293eee7b127b4883c0318a8`',
      undefined
    )
    await queryRunner.query('DROP TABLE `resource_agent`', undefined)
    await queryRunner.query(
      'DROP INDEX `IDX_b394039ff70f0dfb0b89ec5123` ON `clan`',
      undefined
    )
    await queryRunner.query('DROP TABLE `clan`', undefined)
  }
}
