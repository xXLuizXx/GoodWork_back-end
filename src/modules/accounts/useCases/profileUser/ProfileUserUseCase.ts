import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IProfileUser{
    id: string;
}

@injectable()
class ProfileUserUseCase{
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository){}

    async execute({id}: IProfileUser): Promise<User>{
        const user = await this.usersRepository.findById(id);
        return user;
    }
    
}

export { ProfileUserUseCase }