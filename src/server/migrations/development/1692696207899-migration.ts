import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692696207899 implements MigrationInterface {
    name = 'Migration1692696207899'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_days" ADD "dayId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users_days" ADD CONSTRAINT "FK_e43bd327eed7f3d699ad7d8ea77" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users_days" DROP CONSTRAINT "FK_e43bd327eed7f3d699ad7d8ea77"`);
        await queryRunner.query(`ALTER TABLE "users_days" DROP COLUMN "dayId"`);
    }

}
