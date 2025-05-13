import { Application } from "../entities/Application";
import { IApplicationRepository } from "../../../repositories/IApplicationRepository";
import { ICreateApplicationDTO } from "../../../../../modules/jobs/dtos/ICreateApplicationDTO";
import { getRepository, Repository } from "typeorm";
import { application } from "express";
import { IApproveApplicationDTO } from "../../../../../modules/jobs/dtos/IAprovedApplicationsDTO";

class ApplicationRepository implements IApplicationRepository {
    private repository: Repository<Application>;
    
    constructor(){
        this.repository = getRepository(Application);
    }
    
    async create({ user, job, curriculum_user }: ICreateApplicationDTO): Promise<void> {
        const application = this.repository.create({
          user,
          job,
          curriculum_user
        });
      
        await this.repository.save(application);
    }

    async listApplications(job_id: string): Promise<Application[]> {
        const applications = await this.repository.createQueryBuilder("application")
            .leftJoinAndSelect("application.user", "user")
            .leftJoinAndSelect("user.individualData", "individualData")
            .leftJoinAndSelect("application.job", "job")
            .select([
                "application.id",
                "application.user",
                "application.job_id",
                "application.application_approved",
                "application.curriculum_user",
                "user.name",
                "user.avatar",
                "user.email",
                "user.telephone",
                "individualData.functionn",
                "job.amount_vacancy",
                "application.created_at"
            ])
            .where("application.job_id = :job_id", { job_id })
            .getMany();
    
        return applications;
    }

    async aproveApplication(id: string, data: IApproveApplicationDTO): Promise<void> {
        await this.repository
            .createQueryBuilder()
            .update("applications")
            .set({ application_approved: data.application_approved })
            .where("id = :id", { id })
            .execute();
    }
    
}

export { ApplicationRepository }