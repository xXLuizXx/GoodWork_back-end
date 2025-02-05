import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CompanyUsers1733062372014 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "company_users",
                columns: [
                {
                    name: "id",
                    type: "uuid",
                    isPrimary: true,
                },
                {
                    name: "business_area",
                    type: "varchar",
                },
                ],
            })
        );
    
        await queryRunner.createForeignKey(
            "company_users",
            new TableForeignKey({
                columnNames: ["id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }
    
    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("company_users");
    }
}
