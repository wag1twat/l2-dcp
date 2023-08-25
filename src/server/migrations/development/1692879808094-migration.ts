import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692879808094 implements MigrationInterface {
    name = 'Migration1692879808094'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "days" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "days" ADD CONSTRAINT "UQ_98537429ff3c3457f4bfebe466f" UNIQUE ("date")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days" DROP CONSTRAINT "UQ_98537429ff3c3457f4bfebe466f"`);
        await queryRunner.query(`ALTER TABLE "days" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "days" ADD "date" TIMESTAMP WITH TIME ZONE NOT NULL`);
    }

}
