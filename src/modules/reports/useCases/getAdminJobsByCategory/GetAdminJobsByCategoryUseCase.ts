import { inject, injectable } from "tsyringe";
import { IJobsRepository } from "../../../jobs/repositories/IJobsRepository";

@injectable()
class GetAdminJobsByCategoryUseCase {
    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    async execute() {
        const chart = await this.jobsRepository.countJobsByCategory();
        return { chart };
    }
}

export { GetAdminJobsByCategoryUseCase };
