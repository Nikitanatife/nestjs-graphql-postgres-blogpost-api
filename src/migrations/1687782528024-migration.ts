import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1687782528024 implements MigrationInterface {
  name = 'Migration1687782528024';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog" (
                "id" SERIAL NOT NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "title" character varying NOT NULL, 
                "description" character varying NOT NULL, 
                "content" character varying NOT NULL, 
                CONSTRAINT "PK_85c6532ad065a448e9de7638571" PRIMARY KEY ("id")
                )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "blog"`);
  }
}
