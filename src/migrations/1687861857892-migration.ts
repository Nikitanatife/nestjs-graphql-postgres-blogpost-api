import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1687861857892 implements MigrationInterface {
  name = 'Migration1687861857892';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "blog_post" (
                "id" SERIAL NOT NULL, 
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), 
                "title" character varying NOT NULL, 
                "description" character varying NOT NULL, 
                "content" character varying NOT NULL, 
                "authorId" integer NOT NULL, 
                "blogId" integer NOT NULL, 
                CONSTRAINT "PK_694e842ad1c2b33f5939de6fede" PRIMARY KEY ("id")
                )`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" 
                ADD CONSTRAINT "FK_c3f99415cd68aa19b6c5ce4fde6" FOREIGN KEY ("blogId") 
                REFERENCES "blog"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" 
                ADD CONSTRAINT "FK_657e11001f05ef48b5383f5a637" FOREIGN KEY ("authorId") 
                REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_657e11001f05ef48b5383f5a637"`,
    );
    await queryRunner.query(
      `ALTER TABLE "blog_post" DROP CONSTRAINT "FK_c3f99415cd68aa19b6c5ce4fde6"`,
    );
    await queryRunner.query(`DROP TABLE "blog_post"`);
  }
}
