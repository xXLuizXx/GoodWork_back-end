import { inject, injectable } from "tsyringe";
import { IJobsRepository } from "../../repositories/IJobsRepository";

@injectable()
class CloseExpiredVacanciesUseCase {
    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    async execute(): Promise<void> {
        const expiredJobs = await this.jobsRepository.findExpiredVacancies();

        for (const job of expiredJobs) {
            await this.jobsRepository.closeOrOpen(job.id, false);
        }

        if (expiredJobs.length > 0) {
            console.log(`[Cron] ${expiredJobs.length} vaga(s) encerrada(s) automaticamente.`);
        }
    }
}

export { CloseExpiredVacanciesUseCase };
