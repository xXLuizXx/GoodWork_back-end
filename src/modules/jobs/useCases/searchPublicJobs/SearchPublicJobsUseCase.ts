import { injectable, inject } from "tsyringe";
import type { IJobsRepository } from "../../repositories/IJobsRepository";
import type { IPublicJobDTO } from "../../dtos/IPublicJobDTO";

@injectable()
class SearchPublicJobsUseCase {
    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    async execute(term: string): Promise<IPublicJobDTO[]> {
        return this.jobsRepository.searchPublic(term);
    }
}

export { SearchPublicJobsUseCase };
