import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692716194064 implements MigrationInterface {
    name = 'Migration1692716194064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "days" ADD "points" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "options" DROP COLUMN "cost_in_points"`);
        await queryRunner.query(`ALTER TABLE "options" ADD "cost_in_points" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users_days" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "users_days" ADD "points" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "points" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "points" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "users_days" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "users_days" ADD "points" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "options" DROP COLUMN "cost_in_points"`);
        await queryRunner.query(`ALTER TABLE "options" ADD "cost_in_points" smallint NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "days" DROP COLUMN "points"`);
        await queryRunner.query(`ALTER TABLE "days" ADD "points" smallint NOT NULL DEFAULT '0'`);
    }

}
