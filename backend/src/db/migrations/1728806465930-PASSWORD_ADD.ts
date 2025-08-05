import { MigrationInterface, QueryRunner } from "typeorm";

export class PASSWORDADD1728806465930 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" ADD "password" character varying`);
        await queryRunner.query(`UPDATE "account" SET "password" = 'default_password' WHERE "password" IS NULL`);
        await queryRunner.query(`ALTER TABLE "account" ALTER COLUMN "password" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "account" DROP COLUMN IF EXISTS "password"`);
    }

}
