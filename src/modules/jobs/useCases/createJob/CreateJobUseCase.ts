import { IJobsRepository } from "modules/jobs/repositories/IJobsRepository";
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

    constructor(@inject("JobsRepository")private jobsRepository: IJobsRepository){}

    async execute({ vacancy, requirements, workload, location, 
                    benefits, banner, resume_candidate, category_id }: IRequest): Promise<void>{

        this.jobsRepository.create({
            vacancy,
            requirements,
            workload,
            location, 
            benefits,
            banner,
            resume_candidate,
            category_id});
    }
}

export { CreateJobUseCase }