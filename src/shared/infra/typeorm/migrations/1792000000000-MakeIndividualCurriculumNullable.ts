import { MigrationInterface, QueryRunner } from "typeorm";

// O currículo deixa de ser obrigatório no cadastro do candidato
export class MakeIndividualCurriculumNullable1792000000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "individual_users" ALTER COLUMN "curriculum" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "individual_users" SET "curriculum" = '' WHERE "curriculum" IS NULL`);
        await queryRunner.query(`ALTER TABLE "individual_users" ALTER COLUMN "curriculum" SET NOT NULL`);
    }
}
