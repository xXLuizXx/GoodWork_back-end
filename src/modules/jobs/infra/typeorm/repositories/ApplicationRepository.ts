import { Application } from "../entities/Application";
import { IApplicationRepository } from "../../../repositories/IApplicationRepository";
import { ICreateApplicationDTO } from "../../../../../modules/jobs/dtos/ICreateApplicationDTO";
import { getRepository, Repository } from "typeorm";

class ApplicationRepository implements IApplicationRepository {
    private repository: Repository<Application>;
    
    constructor(){
        this.repository = getRepository(Application);
    }
    
    async create({ user, job_id, curriculum_user }: ICreateApplicationDTO): Promise<void> {
        const application = this.repository.create({
          user,
          job_id,
          curriculum_user
        });
      
        await this.repository.save(application);
    }

    async listApplications(job_id: string): Promise<Application[]> {
        const applications = await this.repository.createQueryBuilder("application")
            .leftJoinAndSelect("application.user", "user")
            .leftJoinAndSelect("user.individualData", "individualData")
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
                "individualData.functionn"
            ])
            .where("application.job_id = :job_id", { job_id })
            .getMany();
    
        return applications;
    }
}

export { ApplicationRepository }