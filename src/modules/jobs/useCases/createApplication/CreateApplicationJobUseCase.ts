import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IJobsRepository } from "../../../../modules/jobs/repositories/IJobsRepository";
import { deleteFile } from "../../../../utils/file";

interface IRequest{
    user_id: string;
    job_id: string;
    curriculum_user: string;
}

@injectable()
class CreateApplicationJobUseCase{

    constructor(@inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
                @inject("UsersRepository") private usersRepository: IUsersRepository,
                @inject("JobsRepository") private jobsRepository: IJobsRepository
                ) {};

    async execute({user_id, job_id, curriculum_user}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(user_id);
        const job = await this.jobsRepository.findById(job_id);

        if (!user) {
            throw new AppError("Usuário não encontrado!");
        }

        const existing = await this.applicationRepository.findByUserAndJob(user_id, job_id);
        if (existing) {
            await deleteFile(`./tmp/curriculums/curriculums_applications/${curriculum_user}`);
            throw new AppError("Você já se candidatou a esta vaga!");
        }

        await this.applicationRepository.create({
            user,
            job,
            curriculum_user
        });

    }

}

export { CreateApplicationJobUseCase }