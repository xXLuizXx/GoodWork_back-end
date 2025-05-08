import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class ApplicationJobs1746654374932 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "applications",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_id",
                        type: "uuid",
                    },
                    {
                        name: "job_id",
                        type: "uuid",
                    },
                    {
                        name: "curriculum_user",
                        type: "varchar",
                    },
                    {
                        name: "application_approved",
                        type: "boolean",
                        isNullable: true,
                        default: null
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ],
            })
        );

        await queryRunner.createForeignKey(
            "applications",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createForeignKey(
            "applications",
            new TableForeignKey({
                columnNames: ["job_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "jobs",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("applications");
    }
}