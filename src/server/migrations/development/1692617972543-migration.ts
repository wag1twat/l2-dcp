import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692617972543 implements MigrationInterface {
    name = 'Migration1692617972543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
