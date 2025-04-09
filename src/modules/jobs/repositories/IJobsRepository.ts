import { ICreateJobsDTO } from "../dtos/ICreateJobsDTO"
import { Job } from "../infra/typeorm/entities/Job";

interface IJobsRepository{
    create(data: ICreateJobsDTO): Promise<Job>;
    fyndByVacancy(vacancy: string): Promise<Job>;
    list(): Promise<Job[]>;
    listByCategory(category_id: string): Promise<Job[]>;
    findVacancysNotValidated(): Promise<number>;
    listVacancyNotValidated(): Promise<Job[]>;
    aproveJob(job: Job, valid: boolean):  Promise<void>;
}

export type { IJobsRepository }