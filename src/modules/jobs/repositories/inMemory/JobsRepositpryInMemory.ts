import { Job } from "modules/jobs/infra/typeorm/entities/Job";
import { IJobsRepository } from "../IJobsRepository";
import { ICreateJobsDTO } from "modules/jobs/dtos/ICreateJobsDTO";

class JobsRepositoryInMemory implements IJobsRepository{
    jobs: Job[] = [];
    async create({vacancy, requirements, workload, location, benefits,
            banner, resume_candidate, category_id,}: ICreateJobsDTO): Promise<void>{
        const job = new Job();

        Object.assign(job,{
            vacancy, requirements, workload, location, benefits, banner, resume_candidate, category_id,
        });

        this.jobs.push(job);
    }
}

export { JobsRepositoryInMemory }