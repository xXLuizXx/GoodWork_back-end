import cron from "node-cron";
import { container } from "tsyringe";
import { CloseExpiredVacanciesUseCase } from "../../../modules/jobs/useCases/closeExpiredVacancies/CloseExpiredVacanciesUseCase";

// Roda todo dia à meia-noite (00:00)
export function startVacancyCronJob(): void {
    cron.schedule("0 0 * * *", async () => {
        console.log("[Cron] Verificando vagas expiradas...");
        const closeExpiredVacanciesUseCase = container.resolve(CloseExpiredVacanciesUseCase);
        await closeExpiredVacanciesUseCase.execute();
    });

    console.log("[Cron] Job de vagas agendado — executa diariamente à meia-noite.");
}
