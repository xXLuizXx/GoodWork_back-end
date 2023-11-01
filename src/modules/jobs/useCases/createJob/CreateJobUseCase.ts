import { AppError } from "../../../../shared/errors/AppError";
import { IJobsRepository } from "../../../../modules/jobs/repositories/IJobsRepository";
import { Job } from "../../../../modules/jobs/infra/typeorm/entities/Job";
import { inject, injectable } from "tsyringe"

interface IRequest {
   vacancy: string;
   requirements: string;
   workload: string;
   location: string;
   benefits: string;
   banner: string;
   resume_candidate: string;
   category_id: string;
}


@injectable()
class CreateJobUseCase{

    constructor(
        @inject("JobsRepository")
        private jobsRepository: IJobsRepository
    ) {}

    async execute({ 
        vacancy,
        requirements,
        workload,
        location, 
        benefits,
        banner,
        resume_candidate,
        category_id 
    }: IRequest): Promise<Job> {

        const vacancyAlreadyExists = await this.jobsRepository.fyndByVacancy(vacancy);

        if(vacancyAlreadyExists){
            throw new AppError("Vacancy already exists!");
        }

        const job = await this.jobsRepository.create({
            vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            resume_candidate,
            category_id
        });
        return job;
    }
}

export { CreateJobUseCase }