import { AppError } from "../../../../shared/errors/AppError";
import { IJobsRepository } from "../../../../modules/jobs/repositories/IJobsRepository";
import { Job } from "../../../../modules/jobs/infra/typeorm/entities/Job";
import { inject, injectable } from "tsyringe"

interface IRequest {
    vacancy: string;
    contractor: string;
    description_vacancy: string
    requirements: string;
    workload: string;
    location: string;
    benefits: string;
    banner: string;
    category_id: string;
    user_id: string;
    amount_vacancy: number
    closing_date: Date;
}


@injectable()
class CreateJobUseCase{

    constructor(
        @inject("JobsRepository")
        private jobsRepository: IJobsRepository
    ) {}

    async execute({ 
        vacancy,
        contractor,
        description_vacancy,
        requirements,
        workload,
        location, 
        benefits,
        banner,
        category_id,
        user_id,
        amount_vacancy,
        closing_date
    }: IRequest): Promise<Job> {
        const job = await this.jobsRepository.create({
            vacancy,
            contractor,
            description_vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            category_id,
            user_id,
            amount_vacancy,
            closing_date
        });

        return job;
    }
}

export { CreateJobUseCase }