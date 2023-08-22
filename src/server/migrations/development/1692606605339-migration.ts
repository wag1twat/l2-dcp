import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692606605339 implements MigrationInterface {
    name = 'Migration1692606605339'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "cost_in_points" smallint NOT NULL DEFAULT '0', "cost_in_adenas" integer NOT NULL DEFAULT '0', "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_978b2789483dfa1d7373db1cd42" UNIQUE ("name"), CONSTRAINT "PK_d232045bdb5c14d932fba18d957" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "days" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "date" TIMESTAMP WITH TIME ZONE NOT NULL, "points" smallint NOT NULL DEFAULT '0', "adenas" integer NOT NULL DEFAULT '0', CONSTRAINT "PK_c2c66eb46534bea34ba48cc4d7f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "name" character varying NOT NULL, "points" smallint NOT NULL DEFAULT '0', "adenas" integer NOT NULL DEFAULT '0', "deleted" boolean NOT NULL DEFAULT false, CONSTRAINT "UQ_51b8b26ac168fbe7d6f5653e6cf" UNIQUE ("name"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "days_options" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "count" smallint NOT NULL DEFAULT '0', "dayId" uuid, "optionId" uuid, CONSTRAINT "REL_9fdf630601febaea2d2e7cc474" UNIQUE ("dayId"), CONSTRAINT "REL_30176b5d87d78606e62daa5d42" UNIQUE ("optionId"), CONSTRAINT "PK_c9d11313d1165d8c0343c9db515" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "days_options_days_options" ("daysId" uuid NOT NULL, "daysOptionsId" uuid NOT NULL, CONSTRAINT "PK_c8181c04fe1f7c463f2e8a78799" PRIMARY KEY ("daysId", "daysOptionsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6783f17d64966bc665c263018a" ON "days_options_days_options" ("daysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a17b7791f350adfa23fdf4a091" ON "days_options_days_options" ("daysOptionsId") `);
        await queryRunner.query(`CREATE TABLE "days_options_users_users" ("daysOptionsId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_eb3e2534aa35cc5f99892b3037b" PRIMARY KEY ("daysOptionsId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_28344e59053c435cfb50d30005" ON "days_options_users_users" ("daysOptionsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_61e7d1560ca13f6df45f01e615" ON "days_options_users_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "days_options_days_options" ADD CONSTRAINT "FK_6783f17d64966bc665c263018a8" FOREIGN KEY ("daysId") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "days_options_days_options" ADD CONSTRAINT "FK_a17b7791f350adfa23fdf4a0914" FOREIGN KEY ("daysOptionsId") REFERENCES "days_options"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "days_options_users_users" ADD CONSTRAINT "FK_28344e59053c435cfb50d30005d" FOREIGN KEY ("daysOptionsId") REFERENCES "days_options"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "days_options_users_users" ADD CONSTRAINT "FK_61e7d1560ca13f6df45f01e6159" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options_users_users" DROP CONSTRAINT "FK_61e7d1560ca13f6df45f01e6159"`);
        await queryRunner.query(`ALTER TABLE "days_options_users_users" DROP CONSTRAINT "FK_28344e59053c435cfb50d30005d"`);
        await queryRunner.query(`ALTER TABLE "days_options_days_options" DROP CONSTRAINT "FK_a17b7791f350adfa23fdf4a0914"`);
        await queryRunner.query(`ALTER TABLE "days_options_days_options" DROP CONSTRAINT "FK_6783f17d64966bc665c263018a8"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61e7d1560ca13f6df45f01e615"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_28344e59053c435cfb50d30005"`);
        await queryRunner.query(`DROP TABLE "days_options_users_users"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a17b7791f350adfa23fdf4a091"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6783f17d64966bc665c263018a"`);
        await queryRunner.query(`DROP TABLE "days_options_days_options"`);
        await queryRunner.query(`DROP TABLE "days_options"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "days"`);
        await queryRunner.query(`DROP TABLE "options"`);
    }

}
