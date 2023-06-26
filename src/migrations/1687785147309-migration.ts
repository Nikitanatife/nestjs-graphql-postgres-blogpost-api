import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1687785147309 implements MigrationInterface {
  name = 'Migration1687785147309';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "content"`);
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "authorId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog" ADD CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog" DROP CONSTRAINT "FK_a001483d5ba65dad16557cd6ddb"`,
    );
    await queryRunner.query(`ALTER TABLE "blog" DROP COLUMN "authorId"`);
    await queryRunner.query(
      `ALTER TABLE "blog" ADD "content" character varying NOT NULL`,
    );
  }
}
