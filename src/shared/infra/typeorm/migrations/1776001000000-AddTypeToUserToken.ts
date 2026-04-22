import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddTypeToUserToken1776001000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            "user_token",
            new TableColumn({
                name: "type",
                type: "varchar",
                isNullable: false,
                default: "'refresh_token'",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("user_token", "type");
    }
}
