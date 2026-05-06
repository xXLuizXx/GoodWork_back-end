import { Application } from "../entities/Application";
import { IApplicationRepository } from "../../../repositories/IApplicationRepository";
import { ICreateApplicationDTO } from "../../../../../modules/jobs/dtos/ICreateApplicationDTO";
import { getRepository, Repository } from "typeorm";

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
                "job.vacancy_available",
                "application.created_at"
            ])
            .where("application.job_id = :job_id", { job_id })
            //.andWhere("application.application_approved IS NULL")
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

    async findById(id: string): Promise<Application | undefined>{
        const application = await this.repository.createQueryBuilder("application")
            .leftJoinAndSelect("application.user", "user")
            .leftJoinAndSelect("application.job", "job")
            .leftJoin("job.user", "jobUser")
            .select([
                "application.id",
                "application.job_id",
                "user.name",
                "user.email",
                "job.vacancy",
                "job.contractor",
                "jobUser.name",
                "application.created_at"
            ])
            .where("application.id = :id", { id }).getOne()

        return application;
    }

    async findApplicationsByUser(id: string): Promise<Application[]>{
        const applications = await this.repository.createQueryBuilder("application")
            .leftJoinAndSelect("application.user", "user")
            .leftJoinAndSelect("user.individualData", "individualData")
            .leftJoinAndSelect("application.job", "job")
            .leftJoin("job.user", "jobUser")
            .leftJoin("application.interview", "interview")
            .select([
                "application.id",
                "application.application_approved",
                "application.hired",
                "application.curriculum_user",
                "application.created_at",
                "user.name",
                "user.avatar",
                "user.email",
                "user.telephone",
                "individualData.functionn",
                "job.vacancy",
                "job.contractor",
                "job.amount_vacancy",
                "job.vacancy_available",
                "jobUser.name",
                "interview.id",
                "interview.status",
                "interview.scheduled_date",
                "interview.interview_type",
                "interview.feedback",
            ])
            .where("application.user_id = :id", { id })
            .getMany();

        return applications;
    }

    async setHired(application_id: string, hired: boolean | null): Promise<void> {
        await this.repository.createQueryBuilder()
            .update("applications")
            .set({ hired })
            .where("id = :id", { id: application_id })
            .execute();
    }

}

export { ApplicationRepository }