import { MigrationInterface, QueryRunner } from "typeorm";

// scheduled_date era "timestamp" e recebia o horário de Brasília como se fosse UTC (3h a menos que o real).
// Passa a ser "timestamptz" e os registros antigos são lidos como horário de Brasília na conversão.
export class FixInterviewScheduledDateTimezone1792200000000 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews" ALTER COLUMN "scheduled_date" TYPE timestamptz USING "scheduled_date" AT TIME ZONE 'America/Sao_Paulo'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "interviews" ALTER COLUMN "scheduled_date" TYPE timestamp USING "scheduled_date" AT TIME ZONE 'America/Sao_Paulo'`);
    }
}
