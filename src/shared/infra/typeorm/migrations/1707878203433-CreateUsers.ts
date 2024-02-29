import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsers1678919331334 implements MigrationInterface {

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
                        type: "varchar"
                    },
                    {
                        name: "road",
                        type: "varchar"
                    },
                    {
                        name: "number",
                        type: "integer"
                    },
                    {
                        name: "identifier",
                        type: "varchar",
                        comment: "CPF, CNPJ"
                    },
                    {
                        name: "neighborhood",
                        type: "varchar"
                    },
                    {
                        name: "sex",
                        type: "varchar"
                    },
                    {
                        name: "telephone",
                        type: "varchar"
                    },
                    {
                        name: "is_employee",
                        type: "boolean"
                    },
                    {
                        name: "functionn",
                        type: "varchar"
                    },
                    {
                        name: "email",
                        type: "varchar"
                    },
                    {
                        name: "password",
                        type: "varchar"
                    },
                    {
                        name: "isAdmin",
                        type: "boolean"
                    },
                    {
                        name: "avatar",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
