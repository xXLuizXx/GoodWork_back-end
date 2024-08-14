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
        user_id
    }: IRequest): Promise<Job> {

        const vacancyAlreadyExists = await this.jobsRepository.fyndByVacancy(vacancy);

        if(vacancyAlreadyExists){
            throw new AppError("Vacancy already exists!");
        }

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
            user_id
        });
        return job;
    }
}

export { CreateJobUseCase }