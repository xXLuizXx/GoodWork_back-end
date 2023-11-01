import { ICreateJobsDTO } from "../dtos/ICreateJobsDTO"
import { Job } from "../infra/typeorm/entities/Job";

interface IJobsRepository{
    create(data: ICreateJobsDTO): Promise<Job>;
    fyndByVacancy(vacancy: string): Promise<Job>;
}

export { IJobsRepository }