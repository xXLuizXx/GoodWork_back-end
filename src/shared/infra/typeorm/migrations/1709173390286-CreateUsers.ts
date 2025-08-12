import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1670000000000 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
            {
                name: "id",
                type: "uuid",
                isPrimary: true,
            },
            {
                name: "name",
                type: "varchar",
            },
            {
                name: "email",
                type: "varchar",
                isUnique: true,
            },
            {
                name: "password",
                type: "varchar",
            },
            {
                name: "telephone",
                type: "varchar",
            },
            {
                name: "isAdmin",
                type: "boolean",
                default: false,
            },
            {
                name: "avatar",
                type: "varchar",
                isNullable: true,
            },
            {
                name: "road",
                type: "varchar",
            },
            {
                name: "number",
                type: "varchar",
            },
            {
                name: "neighborhood",
                type: "varchar",
            },
            {
                name: "identifier",
                type: "varchar",
            },
            {
                name: "user_type",
                type: "varchar",
            },
            {
                name: "active",
                type: "boolean",
                default: false,
            },
            {
                name: "created_at",
                type: "timestamp",
                default: "now()",
            },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
