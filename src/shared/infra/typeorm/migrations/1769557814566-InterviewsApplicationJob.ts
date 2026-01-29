import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class InterviewsApplicationJob1769557814566 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "interviews",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "application_id",
                        type: "uuid",
                        isUnique: true
                    },
                    {
                        name: "interview_type",
                        type: "varchar",
                        default: "'presencial'"
                    },
                    {
                        name: "scheduled_date",
                        type: "timestamp",
                    },
                    {
                        name: "duration_minutes",
                        type: "integer",
                        default: 30
                    },
                    {
                        name: "location",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "meeting_link",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "interviewer_name",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "interviewer_email",
                        type: "varchar",
                        isNullable: true
                    },
                    {
                        name: "notes",
                        type: "text",
                        isNullable: true
                    },
                    {
                        name: "status",
                        type: "varchar",
                        default: "'scheduled'"
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
            "interviews",
            new TableForeignKey({
                columnNames: ["application_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "applications",
                onDelete: "CASCADE",
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("interviews");
    }

}


