import { Repository, getRepository } from "typeorm";
import { IJobsRepository } from "../../../../../modules/jobs/repositories/IJobsRepository";
import { Job } from "../entities/Job";
import { ICreateJobsDTO } from "modules/jobs/dtos/ICreateJobsDTO";

class JobsRepository implements IJobsRepository{
    private repository : Repository<Job>;

    constructor(){
        this.repository = getRepository(Job);
    }
    async create({vacancy, requirements, workload, location, benefits, banner, resume_candidate, category_id}: ICreateJobsDTO): Promise<Job> {
        const job = this.repository.create({
            vacancy,
            requirements,
            workload,
            location,
            benefits,
            banner,
            resume_candidate,
            category_id
        });
        
        await this.repository.save(job);
        return job;
    }
    async fyndByVacancy(vacancy: string): Promise<Job> {
        const job = await this.repository.findOne({vacancy});

        return job;
    }
    
}

export { JobsRepository }