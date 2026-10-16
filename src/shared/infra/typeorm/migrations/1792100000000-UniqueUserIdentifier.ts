import { MigrationInterface, QueryRunner } from "typeorm";

// Garante no banco que não existam dois usuários com o mesmo CPF/CNPJ.
// O índice compara só os dígitos, como UsersRepository.findByIdentifier
export class UniqueUserIdentifier1792100000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "UQ_users_identifier_digits" ON "users" (regexp_replace("identifier", '[^0-9]', '', 'g'))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "UQ_users_identifier_digits"`);
    }
}
