import { MigrationInterface, QueryRunner } from 'typeorm'

export class RelationUserToClan1583222666320 implements MigrationInterface {
  name = 'RelationUserToClan1583222666320'

  public async up(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'CREATE TABLE `user_clans_clan` (`userId` varchar(36) NOT NULL, `clanId` varchar(36) NOT NULL, INDEX `IDX_d8ea517cbff150db57c1c73ac2` (`userId`), INDEX `IDX_b98cd75674d091647b79e10987` (`clanId`), PRIMARY KEY (`userId`, `clanId`)) ENGINE=InnoDB',
      undefined
    )
    await queryRunner.query(
      'ALTER TABLE `user_clans_clan` ADD CONSTRAINT `FK_d8ea517cbff150db57c1c73ac24` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined
    )
    await queryRunner.query(
      'ALTER TABLE `user_clans_clan` ADD CONSTRAINT `FK_b98cd75674d091647b79e109871` FOREIGN KEY (`clanId`) REFERENCES `clan`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION',
      undefined
    )
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await queryRunner.query(
      'ALTER TABLE `user_clans_clan` DROP FOREIGN KEY `FK_b98cd75674d091647b79e109871`',
      undefined
    )
    await queryRunner.query(
      'ALTER TABLE `user_clans_clan` DROP FOREIGN KEY `FK_d8ea517cbff150db57c1c73ac24`',
      undefined
    )
    await queryRunner.query(
      'DROP INDEX `IDX_b98cd75674d091647b79e10987` ON `user_clans_clan`',
      undefined
    )
    await queryRunner.query(
      'DROP INDEX `IDX_d8ea517cbff150db57c1c73ac2` ON `user_clans_clan`',
      undefined
    )
    await queryRunner.query('DROP TABLE `user_clans_clan`', undefined)
  }
}
