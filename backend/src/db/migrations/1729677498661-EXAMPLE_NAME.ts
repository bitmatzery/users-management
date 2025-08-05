import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class EXAMPLENAME1729677498661 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('account', new TableColumn({
            name: 'example',
            type: 'varchar',
            isNullable: false, // Укажите, если поле должно быть обязательным
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('account', 'example');
    }

}
