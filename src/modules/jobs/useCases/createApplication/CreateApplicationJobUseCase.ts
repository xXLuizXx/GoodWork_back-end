import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { Application } from "../../../../modules/jobs/infra/typeorm/entities/Application";
import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest{
    user_id: string;
    job_id: string;
    curriculum_user: string;
}

@injectable()
class CreateApplicationJobUseCase{

    constructor(@inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
                @inject("UsersRepository") private usersRepository: IUsersRepository
                ) {};

    async execute({user_id, job_id, curriculum_user}: IRequest): Promise<void>{
        const user = await this.usersRepository.findById(user_id);
    
        if (!user) {
          throw new AppError("Usuário não encontrado!");
        }
    
        await this.applicationRepository.create({
          user,
          job_id,
          curriculum_user
        });

    }

}

export { CreateApplicationJobUseCase }