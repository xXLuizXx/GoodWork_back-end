import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateNotifications1778500000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "notifications",
                columns: [
                    { name: "id", type: "uuid", isPrimary: true },
                    { name: "user_id", type: "uuid" },
                    { name: "type", type: "varchar" },
                    { name: "title", type: "varchar" },
                    { name: "body", type: "varchar" },
                    { name: "resource_id", type: "uuid", isNullable: true },
                    { name: "resource_type", type: "varchar", isNullable: true },
                    { name: "is_read", type: "boolean", default: false },
                    { name: "read_at", type: "timestamp", isNullable: true },
                    { name: "created_at", type: "timestamp", default: "now()" },
                ],
            })
        );

        await queryRunner.createForeignKey(
            "notifications",
            new TableForeignKey({
                columnNames: ["user_id"],
                referencedColumnNames: ["id"],
                referencedTableName: "users",
                onDelete: "CASCADE",
            })
        );

        await queryRunner.createIndex(
            "notifications",
            new TableIndex({ name: "idx_notifications_user_unread", columnNames: ["user_id", "is_read"] })
        );

        await queryRunner.createIndex(
            "notifications",
            new TableIndex({ name: "idx_notifications_user_created", columnNames: ["user_id", "created_at"] })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("notifications");
    }
}
