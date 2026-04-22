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
}

export { InterviewApplicationJobReposiory }