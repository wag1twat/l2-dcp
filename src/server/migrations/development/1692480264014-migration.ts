import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1692480264014 implements MigrationInterface {
  name = 'Migration1692480264014';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "cost_in_points" smallint NOT NULL, "cost_in_adenas" integer NOT NULL, CONSTRAINT "UQ_978b2789483dfa1d7373db1cd42" UNIQUE ("name"), CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "options"`);
  }
}
