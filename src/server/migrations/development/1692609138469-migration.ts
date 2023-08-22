import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1692609138469 implements MigrationInterface {
    name = 'Migration1692609138469'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "REL_30176b5d87d78606e62daa5d42"`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "days_options" DROP CONSTRAINT "FK_30176b5d87d78606e62daa5d427"`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "REL_30176b5d87d78606e62daa5d42" UNIQUE ("optionId")`);
        await queryRunner.query(`ALTER TABLE "days_options" ADD CONSTRAINT "FK_30176b5d87d78606e62daa5d427" FOREIGN KEY ("optionId") REFERENCES "options"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
