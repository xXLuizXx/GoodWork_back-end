import { Job } from "modules/jobs/infra/typeorm/entities/Job";
import { JobsRepository } from "../../infra/typeorm/repositories/JobsRepository";
import { inject, injectable } from "tsyringe";

interface IJob {
    id: string;
    vacancy: string;
    contractor: string;
    description_vacancy: string;
    requirements: string;
    workload: string;
    location: string;
    benefits: string;
    banner: string;
    vacancy_available: boolean;
    category_id: string;
    user_id: string;
    created_at: Date;
    valid_vacancy: boolean;
}

@injectable()
class AproveJobsUseCase {
    constructor(@inject("JobsRepository" ) private jobsRepository: JobsRepository) {}

    async aproveJob(id: string, valid: boolean): Promise<void>{
        const job = await this.jobsRepository.findById(id);
        if (!job) {
            throw new Error("Vaga não encontrada");
        }
        await this.jobsRepository.aproveJob(job.id, valid);
    }
}

export { AproveJobsUseCase }