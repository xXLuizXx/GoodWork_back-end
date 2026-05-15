import { getRepository, Not, Repository } from "typeorm";
import { Interview } from "../entities/Interviews";
import { ICreateInterviewDTO } from "../../../dtos/ICreateInterviewDTO";
import { IInterviewApplicationJobRepository } from "../../../repositories/IInterviewApplicationJobRepository";

class InterviewApplicationJobReposiory implements IInterviewApplicationJobRepository {
    private repository: Repository<Interview>;

    constructor(){
        this.repository = getRepository(Interview);
    }

    async create({ application, interview_type, scheduled_date, duration_minutes, location, meeting_link, interviewer_name, interviewer_email, notes, status }: ICreateInterviewDTO): Promise<void> {
        const interview = this.repository.create({
          application,
          interview_type,
          scheduled_date,
          duration_minutes,
          location,
          meeting_link,
          interviewer_name,
          interviewer_email,
          notes,
          status,
        });

        await this.repository.save(interview);
    }

    async findByApplicationId(application_id: string): Promise<Interview | undefined> {
        return this.repository.findOne({ where: { application: { id: application_id }, status: Not("cancelled") } });
    }

    async findByApplicationIdWithDetails(application_id: string): Promise<Interview | undefined> {
        return this.repository.createQueryBuilder("interview")
            .leftJoinAndSelect("interview.application", "application")
            .leftJoinAndSelect("application.job", "job")
            .where("application.id = :application_id", { application_id })
            .andWhere("interview.status != :status", { status: "cancelled" })
            .getOne();
    }

    async findAllByApplicationIdWithDetails(application_id: string): Promise<Interview[]> {
        const interviews = this.repository.createQueryBuilder("interview")
            .leftJoinAndSelect("interview.application", "application")
            .leftJoinAndSelect("application.job", "job")
            .where("application.id = :application_id", { application_id })
            .getMany();

        return interviews;
    }

    async findByInterview(interview_id: string): Promise<Interview | undefined>{
        return this.repository.createQueryBuilder("interview")
            .where("interview.id = :interview_id", {interview_id})
            .getOne();
    }

    async findByInterviewAndCompany(interview_id: string, company_id: string): Promise<Interview | undefined> {
        return this.repository.createQueryBuilder("interview")
            .leftJoinAndSelect("interview.application", "application")
            .leftJoinAndSelect("application.user", "user")
            .leftJoinAndSelect("application.job", "job")
            .where("interview.id = :interview_id", { interview_id })
            .andWhere("job.user_id = :company_id", { company_id })
            .getOne();
    }

    async findByApplicationIdAndCandidate(application_id: string, user_id: string): Promise<Interview | undefined> {
        return this.repository.createQueryBuilder("interview")
            .leftJoinAndSelect("interview.application", "application")
            .leftJoinAndSelect("application.job", "job")
            .leftJoin("application.user", "user")
            .where("application.id = :application_id", { application_id })
            .andWhere("user.id = :user_id", { user_id })
            .getOne();
    }

    async completeInterview(interview_id: string, feedback: string | null): Promise<void> {
        await this.repository.createQueryBuilder()
            .update(Interview)
            .set({ status: "completed", feedback })
            .where("id = :id", { id: interview_id })
            .execute();
    }

    async cancelInterview(interview_id: string, notice: string): Promise<void> {
        await this.repository.createQueryBuilder()
            .update(Interview)
            .set({ status: "cancelled", notice })
            .where("id = :id", { id: interview_id })
            .execute();
    }

    async rescheduleInterview(interview: Interview): Promise<void>{
        await this.repository.createQueryBuilder()
            .update(Interview)
            .set({
                interview_type: interview.interview_type,
                scheduled_date: interview.scheduled_date,
                duration_minutes: interview.duration_minutes,
                location: interview.location,
                meeting_link: interview.meeting_link,
                interviewer_name: interview.interviewer_name,
                interviewer_email: interview.interviewer_email,
                notes: interview.notes,
                status: interview.status,
                notice: interview.notice
            })
            .where("id = :id", { id: interview.id })
            .execute();
    }

    async countInterviewStatusByJob(job_id: string): Promise<{ scheduled: number; completed: number; cancelled: number; rescheduled: number }> {
        const count = (status: string) =>
            this.repository.createQueryBuilder("interview")
                .leftJoin("interview.application", "application")
                .where("application.job_id = :job_id", { job_id })
                .andWhere("interview.status = :status", { status })
                .getCount();

        const [scheduled, completed, cancelled, rescheduled] = await Promise.all([
            count("scheduled"), count("completed"), count("cancelled"), count("rescheduled")
        ]);

        return { scheduled, completed, cancelled, rescheduled };
    }

    async getInterviewsByUser(user_id: string): Promise<{ scheduled: number; completed: number; cancelled: number }> {
        const count = async (status: string) =>
            this.repository.createQueryBuilder("interview")
                .leftJoin("interview.application", "application")
                .where("application.user_id = :user_id", { user_id })
                .andWhere("interview.status = :status", { status })
                .getCount();

        const [scheduled, completed, cancelled] = await Promise.all([
            count("scheduled"), count("completed"), count("cancelled")
        ]);

        return { scheduled, completed, cancelled };
    }
}

export { InterviewApplicationJobReposiory }