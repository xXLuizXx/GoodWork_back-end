import { ICreateInterviewDTO } from "../dtos/ICreateInterviewDTO";
import { Interview } from "../infra/typeorm/entities/Interviews";

interface IInterviewApplicationJobRepository{
    create(data: ICreateInterviewDTO): Promise<void>;
    findByApplicationId(application_id: string): Promise<Interview | undefined>;
    findByApplicationIdWithDetails(application_id: string): Promise<Interview | undefined>;
    findAllByApplicationIdWithDetails(application_id: string): Promise<Interview[]>;
}

export type { IInterviewApplicationJobRepository }