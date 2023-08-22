import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692607753178 implements MigrationInterface {
    name = 'Migration1692607753178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "REL_9fdf630601febaea2d2e7cc474"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP COLUMN "dayId"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" ADD "dayId" uuid`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "REL_9fdf630601febaea2d2e7cc474" UNIQUE ("dayId")`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
