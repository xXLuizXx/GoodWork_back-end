import { MigrationInterface, QueryRunner } from "typeorm";

// A data de encerramento é um dia do calendário, não um instante: passa de "timestamp" para "date".
// O ::date mantém o dia gravado (o seed usa 23:59:59 e o front gravava 00:00 do dia escolhido).
export class ClosingDateAsDate1792300000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "closing_date" TYPE date USING "closing_date"::date`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "jobs" ALTER COLUMN "closing_date" TYPE timestamp USING "closing_date" + time '23:59:59'`);
    }
}
