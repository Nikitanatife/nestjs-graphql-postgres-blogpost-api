import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1686922751102 implements MigrationInterface {
  name = 'Migration1686922751102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" ADD "token" character varying`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "token"`);
  }
}
