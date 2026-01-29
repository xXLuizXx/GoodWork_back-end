import { ICreateInterviewDTO } from "../dtos/ICreateInterviewDTO";

interface IInterviewApplicationJobRepository{
    create(data: ICreateInterviewDTO): Promise<void>;
}

export { IInterviewApplicationJobRepository }