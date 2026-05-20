import { injectable, inject } from "tsyringe";
import type { IJobsRepository } from "../../repositories/IJobsRepository";
import type { IPublicJobDTO } from "../../dtos/IPublicJobDTO";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class GetPublicJobUseCase {
    constructor(
        @inject("JobsRepository") private jobsRepository: IJobsRepository
    ) {}

    async execute(id: string): Promise<IPublicJobDTO> {
        const job = await this.jobsRepository.findPublicById(id);

        if (!job) {
            throw new AppError("Vaga não encontrada.", 404);
        }

        return job;
    }
}

export { GetPublicJobUseCase };
