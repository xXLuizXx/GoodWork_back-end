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

    async executeCat(category_id: string): Promise<Job[]>{
        const jobs = await this.jobsRepository.listByCategory(category_id);

        return jobs;
    }

    async executeVacancy(vacancy: string): Promise<Job[]>{
        const jobs = await this.jobsRepository.findByVacancy(vacancy);

        return jobs;
    }
}

export { ListJobsUseCase }