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
            .leftJoin("application.interview", "interview")
            .select([
                "application.id",
                "application.user",
                "application.job_id",
                "application.application_approved",
                "application.hired",
                "application.curriculum_user",
                "user.name",
                "user.avatar",
                "user.email",
                "user.telephone",
                "individualData.functionn",
                "job.amount_vacancy",
                "job.vacancy_available",
                "application.created_at",
                "interview.id",
                "interview.status",
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

    async findById(id: string): Promise<Application | undefined>{
        const application = await this.repository.createQueryBuilder("application")
            .leftJoinAndSelect("application.user", "user")
            .leftJoinAndSelect("application.job", "job")
            .leftJoin("job.user", "jobUser")
            .select([
                "application.id",
                "application.application_approved",
                "application.hired",
                "application.job_id",
                "user.id",
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
                "job.id",
                "job.vacancy",
                "job.contractor",
                "job.amount_vacancy",
                "job.vacancy_available",
                "jobUser.name",
                "interview.id",
                "interview.status",
                "interview.scheduled_date",
                "interview.interview_type",
                "interview.duration_minutes",
                "interview.location",
                "interview.meeting_link",
                "interview.notice",
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

    async findByUserAndJob(user_id: string, job_id: string): Promise<Application | undefined> {
        return this.repository
            .createQueryBuilder("application")
            .where("application.user_id = :user_id", { user_id })
            .andWhere("application.job_id = :job_id", { job_id })
            .getOne();
    }

    async delete(id: string): Promise<void> {
        await this.repository.delete(id);
    }

    async countApplicationStats(): Promise<{ total: number; hired: number; hiredRate: number }> {
        const total = await this.repository.createQueryBuilder("application").getCount();
        const hired = await this.repository.createQueryBuilder("application")
            .where("application.hired = true")
            .getCount();
        const hiredRate = total > 0 ? Math.round((hired / total) * 1000) / 10 : 0;
        return { total, hired, hiredRate };
    }

    async getFunnelByJob(job_id: string): Promise<{ emTriagem: number; aprovados: number; reprovados: number; contratados: number }> {
        const base = () => this.repository.createQueryBuilder("application")
            .where("application.job_id = :job_id", { job_id });

        const [emTriagem, aprovados, reprovados, contratados] = await Promise.all([
            base().andWhere("application.application_approved IS NULL").getCount(),
            base().andWhere("application.application_approved = true").andWhere("application.hired IS NULL").getCount(),
            base().andWhere("application.application_approved = false").getCount(),
            base().andWhere("application.hired = true").getCount(),
        ]);

        return { emTriagem, aprovados, reprovados, contratados };
    }

    async getIndividualStats(user_id: string): Promise<{ total: number; emTriagem: number; aprovados: number; reprovados: number; contratados: number; approvalRate: number }> {
        const total = await this.repository.createQueryBuilder("application")
            .where("application.user_id = :user_id", { user_id })
            .getCount();

        const emTriagem = await this.repository.createQueryBuilder("application")
            .where("application.user_id = :user_id", { user_id })
            .andWhere("application.application_approved IS NULL")
            .getCount();

        const aprovados = await this.repository.createQueryBuilder("application")
            .where("application.user_id = :user_id", { user_id })
            .andWhere("application.application_approved = true")
            .andWhere("application.hired IS NULL")
            .getCount();

        const reprovados = await this.repository.createQueryBuilder("application")
            .where("application.user_id = :user_id", { user_id })
            .andWhere("application.application_approved = false")
            .getCount();

        const contratados = await this.repository.createQueryBuilder("application")
            .where("application.user_id = :user_id", { user_id })
            .andWhere("application.hired = true")
            .getCount();

        const approvalRate = total > 0 ? Math.round((aprovados / total) * 1000) / 10 : 0;

        return { total, emTriagem, aprovados, reprovados, contratados, approvalRate };
    }

}

export { ApplicationRepository }