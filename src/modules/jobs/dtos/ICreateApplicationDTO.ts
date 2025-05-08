import { User } from "../../../modules/accounts/infra/typeorm/entities/User";

interface ICreateApplicationDTO{
    user: User;
    job_id: string;
    curriculum_user: string;
}

export { ICreateApplicationDTO }