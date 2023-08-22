import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692630693856 implements MigrationInterface {
    name = 'Migration1692630693856'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" ALTER COLUMN "dayId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "days_options" ALTER COLUMN "optionId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e"`);
        await queryRunner.query(`ALTER TABLE "days_options" ALTER COLUMN "optionId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "days_options" ALTER COLUMN "dayId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_9fdf630601febaea2d2e7cc474e" FOREIGN KEY ("dayId") REFERENCES "days"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
