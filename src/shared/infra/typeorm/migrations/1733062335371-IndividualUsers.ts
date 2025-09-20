import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class IndividualUsers1733062335371 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "individual_users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "sex",
                        type: "varchar",
                    },
                    {
                        name: "functionn",
                        type: "varchar",
                    },
                    {
                        name: "ability",
                        type: "varchar",
                    },
                    {
                        name: "is_employee",
                        type: "boolean",
                        default: false,
                    },
                    {
                        name: "curriculum",
                        type: "varchar",
                    },
                    {
                        name: "categories_interest",
                        type: "varchar",
                    },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "individual_users",
            new TableForeignKey({
                columnNames: ["id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("individual_users");
    }
}
