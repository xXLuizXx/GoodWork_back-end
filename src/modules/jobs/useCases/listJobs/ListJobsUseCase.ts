import { JobsRepository } from "../../infra/typeorm/repositories/JobsRepository";
import {inject, injectable} from "tsyringe";
import {Job} from "../../infra/typeorm/entities/Job";

@injectable()
class ListJobsUseCase{
    constructor(@inject("JobsRepository" ) private jobsRepository: JobsRepository) {}

    async execute(): Promise<Job[]>{
        const jobs = await this.jobsRepository.list();

        return jobs;
    }

}

export { ListJobsUseCase }