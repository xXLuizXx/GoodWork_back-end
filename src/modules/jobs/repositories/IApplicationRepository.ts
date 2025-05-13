import { IApproveApplicationDTO } from "../dtos/IAprovedApplicationsDTO";
import { ICreateApplicationDTO } from "../dtos/ICreateApplicationDTO"
import { Application } from "../infra/typeorm/entities/Application";

interface IApplicationRepository{
    create(data: ICreateApplicationDTO): Promise<void>;
    listApplications(job_id: string): Promise<Application[]>;
    aproveApplication(id: string, data: IApproveApplicationDTO): Promise<void>;
}

export { IApplicationRepository }