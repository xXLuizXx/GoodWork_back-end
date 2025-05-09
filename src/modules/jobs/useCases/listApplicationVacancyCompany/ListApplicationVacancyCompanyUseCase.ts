import { Application } from "../../../../modules/jobs/infra/typeorm/entities/Application";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { container, inject, injectable } from "tsyringe";

interface IApplication{
    user_id: string;
    job_id: string;
    curriculum_user: string;
    application_approved: boolean | null;
}

@injectable()
class ListApplicationVacancyCompanyUseCase{

    
    constructor(@inject("ApplicationRepository") private applicationRepository: IApplicationRepository){}

    async listAllApplicationJob(id: string): Promise<Application[]>{
        const applications = this.applicationRepository.listApplications(id);
        
        return await applications;
    }
}

export { ListApplicationVacancyCompanyUseCase }