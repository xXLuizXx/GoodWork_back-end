import { User } from "../../../modules/accounts/infra/typeorm/entities/User";
import { Job } from "../infra/typeorm/entities/Job";

interface ICreateApplicationDTO{
    user: User;
    job: Job;
    curriculum_user: string;
}

export { ICreateApplicationDTO }