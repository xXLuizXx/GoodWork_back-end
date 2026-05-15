import { IApproveApplicationDTO } from "../dtos/IAprovedApplicationsDTO";
import { ICreateApplicationDTO } from "../dtos/ICreateApplicationDTO"
import { Application } from "../infra/typeorm/entities/Application";

interface IApplicationRepository{
    create(data: ICreateApplicationDTO): Promise<void>;
    listApplications(job_id: string): Promise<Application[]>;
    aproveApplication(id: string, data: IApproveApplicationDTO): Promise<void>;
    findById(id: string): Promise<Application | undefined>;
    findApplicationsByUser(id: string): Promise<Application[]>;
    setHired(application_id: string, hired: boolean | null): Promise<void>;
    findByUserAndJob(user_id: string, job_id: string): Promise<Application | undefined>;
    delete(id: string): Promise<void>;
    countApplicationStats(): Promise<{ total: number; hired: number; hiredRate: number }>;
    getFunnelByJob(job_id: string): Promise<{ emTriagem: number; aprovados: number; reprovados: number; contratados: number }>;
    getIndividualStats(user_id: string): Promise<{ total: number; emTriagem: number; aprovados: number; reprovados: number; contratados: number; approvalRate: number }>;
}

export type { IApplicationRepository }