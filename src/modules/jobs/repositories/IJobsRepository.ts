import { ICreateJobsDTO } from "../dtos/ICreateJobsDTO"
import { Job } from "../infra/typeorm/entities/Job";

interface IJobsRepository{
    create(data: ICreateJobsDTO): Promise<Job>;
    list(): Promise<Job[]>;
    listByCategory(category_id: string): Promise<Job[]>;
    findByVacancy(vacancy: string): Promise<Job[]>;
    findVacancysNotValidated(): Promise<number>;
    listVacancyNotValidated(): Promise<Job[]>;
    findById(id: string): Promise<Job>;
    aproveJob(id: string, valid: boolean):  Promise<boolean>;
    allJobsCompany(id: string): Promise<Job[]>;
    getJob(id: string): Promise<Job>;
    updateJob(id: string, job: Job): Promise<void>;
    closeOrOpen(id: string, valid: boolean): Promise<void>;
}

export type { IJobsRepository }