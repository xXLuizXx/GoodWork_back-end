import { injectable, inject } from "tsyringe";
import type { IJobsRepository } from "../../repositories/IJobsRepository";
import type { IPublicJobDTO } from "../../dtos/IPublicJobDTO";

@injectable()
class ListPublicJobsUseCase {
    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    async execute(category_id?: string): Promise<IPublicJobDTO[]> {
        return this.jobsRepository.listPublic(category_id);
    }
}

export { ListPublicJobsUseCase };
