import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateJobs1698369893442 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "jobs",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "vacancy",
                        type: "varchar"
                    },
                    {
                        name: "contractor",
                        type: "varchar"
                    },
                    {
                        name: "description_vacancy",
                        type: "Varchar"
                    },
                    {
                        name: "requirements",
                        type: "varchar"
                    },
                    {
                        name: "workload",
                        type: "varchar"
                    },
                    {
                        name: "location",
                        type: "varchar"
                    },
                    {
                        name: "benefits",
                        type: "varchar"
                    },
                    {
                        name: "banner",
                        type: "varchar"
                    },
                    {
                        name: "vacancy_available",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "category_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "valid_vacancy",
                        type: "boolean",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "amount_vacancy",
                        type: "integer",
                    },
                    {
                        name: "closing_date",
                        type: "timestamp"
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                        isNullable: true
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_jobs_category_id",
                        referencedTableName: "categories",
                        referencedColumnNames: ["id"],
                        columnNames: ["category_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                    {
                        name: "fk_jobs_user_id",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("jobs");
    }

}
