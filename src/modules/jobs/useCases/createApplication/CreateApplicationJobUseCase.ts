import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IJobsRepository } from "../../../../modules/jobs/repositories/IJobsRepository";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { INotificationsRepository } from "../../../notifications/repositories/INotificationsRepository";

interface IRequest{
    user_id: string;
    job_id: string;
    curriculum_user: string;
}

@injectable()
class CreateApplicationJobUseCase{

    constructor(@inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
                @inject("UsersRepository") private usersRepository: IUsersRepository,
                @inject("JobsRepository") private jobsRepository: IJobsRepository,
                @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository,
                @inject("StorageProvider") private storageProvider: IStorageProvider
                ) {};

    async execute({user_id, job_id, curriculum_user}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(user_id);
        const job = await this.jobsRepository.findById(job_id);

        if (!user) {
            throw new AppError("Usuário não encontrado!");
        }

        const existing = await this.applicationRepository.findByUserAndJob(user_id, job_id);
        if (existing) {
            await this.storageProvider.delete(curriculum_user, "curriculums/curriculums_applications");
            throw new AppError("Você já se candidatou a esta vaga!");
        }

        await this.applicationRepository.create({
            user,
            job,
            curriculum_user
        });

        await this.notificationsRepository.create({
            user_id: job.user_id,
            type: "application_received",
            title: "Nova candidatura recebida",
            body: `${user.name} se candidatou para ${job.vacancy}.`,
            resource_id: job.id,
            resource_type: "job",
        });

    }

}

export { CreateApplicationJobUseCase }