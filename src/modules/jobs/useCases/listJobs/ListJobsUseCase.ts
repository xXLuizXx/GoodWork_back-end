import { JobsRepository } from "../../infra/typeorm/repositories/JobsRepository";
import {inject, injectable} from "tsyringe";
import {Job} from "../../infra/typeorm/entities/Job";

interface IJob {
    id: string;
    vacancy: string;
    contractor: string;
    description_vacancy: string;
    requirements: string;
    workload: string;
    location: string;
    category_id: string;
    benefits: string;
    vacancy_available: boolean;
    amount_vacancy: number;
    closing_date: Date;
    banner: string;
}
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

    async executeCountVacancy(): Promise<number>{
        const countJobsNotValidated = await this.jobsRepository.findVacancysNotValidated();

        return countJobsNotValidated;
    }

    async executeVacancyNotValidated(): Promise<Job[]>{
        const jobs = await this.jobsRepository.listVacancyNotValidated();

        return jobs;
    }

    async executeJobsCompany(user_id: string): Promise<Job[]>{
        const jobs = await this.jobsRepository.allJobsCompany(user_id);

        return jobs;
    }

    async executeJob(id: string): Promise<Job>{
        const job = await this.jobsRepository.getJob(id);

        return job;
    }

    async executeUpdateJob(jobData: IJob): Promise<Job>{
        const job = new Job()
 
        job.vacancy = jobData.vacancy;
        job.contractor = jobData.contractor;
        job.description_vacancy = jobData.description_vacancy;
        job.requirements = jobData.requirements;
        job.workload = jobData.workload;
        job.location =  jobData.location;
        job.category_id = jobData.category_id;
        job.benefits = jobData.benefits;
        job.vacancy_available = jobData.vacancy_available;
        job.amount_vacancy = jobData.amount_vacancy;
        job.closing_date = jobData.closing_date;
        job.banner = jobData.banner;

        await this.jobsRepository.updateJob(jobData.id, job);

        return await this.jobsRepository.findById(jobData.id);
    }

    async gelAllJobs(search: string): Promise<Job[]>{
        let jobs;
        
        if(search.length <= 0){
            jobs = await this.jobsRepository.listAllJobs();
        }else{
            jobs = await this.jobsRepository.listAllJobsSearch(search);
        }
        

        return jobs;
    }
}

export { ListJobsUseCase }