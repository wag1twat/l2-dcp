import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692695022186 implements MigrationInterface {
    name = 'Migration1692695022186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users_days_users_days" ("usersId" uuid NOT NULL, "usersDaysId" uuid NOT NULL, CONSTRAINT "PK_ca454c21b855ceaa38766d9f43f" PRIMARY KEY ("usersId", "usersDaysId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_67d67b5762aad603254a12820d" ON "users_days_users_days" ("usersId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5206295c8e010de86abc85d574" ON "users_days_users_days" ("usersDaysId") `);
        await queryRunner.query(`ALTER TABLE "users_days_users_days" ADD CONSTRAINT "FK_67d67b5762aad603254a12820d7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "users_days_users_days" ADD CONSTRAINT "FK_5206295c8e010de86abc85d574b" FOREIGN KEY ("usersDaysId") REFERENCES "users_days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_days_users_days" DROP CONSTRAINT "FK_5206295c8e010de86abc85d574b"`);
        await queryRunner.query(`ALTER TABLE "users_days_users_days" DROP CONSTRAINT "FK_67d67b5762aad603254a12820d7"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5206295c8e010de86abc85d574"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_67d67b5762aad603254a12820d"`);
        await queryRunner.query(`DROP TABLE "users_days_users_days"`);
    }

}
