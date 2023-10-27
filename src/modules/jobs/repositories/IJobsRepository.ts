import { ICreateJobsDTO } from "../dtos/ICreateJobsDTO"

interface IJobsRepository{
    create(data: ICreateJobsDTO): Promise<void>;
}

export { IJobsRepository }