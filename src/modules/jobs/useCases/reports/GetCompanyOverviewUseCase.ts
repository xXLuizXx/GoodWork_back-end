import { inject, injectable } from "tsyringe";
import { IJobsRepository } from "../../repositories/IJobsRepository";

@injectable()
class GetCompanyOverviewUseCase {
    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    async execute(company_id: string) {
        const stats = await this.jobsRepository.getCompanyJobsStats(company_id);
        return stats;
    }
}

export { GetCompanyOverviewUseCase };
