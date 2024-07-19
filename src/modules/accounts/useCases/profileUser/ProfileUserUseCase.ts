import { User } from "modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IProfileUser{
    email: string;
}

@injectable()
class ProfileUserUseCase{
    constructor(@inject('IUsersRepository') private usersRepository: IUsersRepository){}
    async execute({email}: IProfileUser): Promise<User>{
        const user = await this.usersRepository.findByEmail(email);

        return user;
    }
    
}

export { ProfileUserUseCase }