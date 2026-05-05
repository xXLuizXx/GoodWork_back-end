import { ICreateInterviewDTO } from "../dtos/ICreateInterviewDTO";
import { Interview } from "../infra/typeorm/entities/Interviews";

interface IInterviewApplicationJobRepository{
    create(data: ICreateInterviewDTO): Promise<void>;
    findByApplicationId(application_id: string): Promise<Interview | undefined>;
    findByApplicationIdWithDetails(application_id: string): Promise<Interview | undefined>;
    findAllByApplicationIdWithDetails(application_id: string): Promise<Interview[]>;
    findByInterview(interview_id: string): Promise<Interview>;
    findByInterviewAndCompany(interview_id: string, company_id: string): Promise<Interview | undefined>;
    rescheduleInterview(interview: Interview): Promise<void>;
    cancelInterview(interview_id: string, notice: string): Promise<void>;
}

export type { IInterviewApplicationJobRepository }