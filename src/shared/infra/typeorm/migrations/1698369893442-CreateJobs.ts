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
                        name: "resume_candidate",
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
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("jobs");
    }

}
