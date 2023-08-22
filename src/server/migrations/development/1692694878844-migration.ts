import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692694878844 implements MigrationInterface {
    name = 'Migration1692694878844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_days" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "points" smallint NOT NULL DEFAULT '0', "adenas" integer NOT NULL DEFAULT '0', "userId" uuid NOT NULL, CONSTRAINT "PK_60cab3f8fdd7d1640a5c241c500" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users_days" ADD CONSTRAINT "FK_92c019f64f4f124fd512fd35c07" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_days" DROP CONSTRAINT "FK_92c019f64f4f124fd512fd35c07"`);
        await queryRunner.query(`DROP TABLE "users_days"`);
    }

}
