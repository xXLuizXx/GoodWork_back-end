import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IProfileUser{
    id: string;
    road: string; 
    number: string;
    neighborhood: string;
    telephone: string; 
    functionn: string;
    ability: string;
    is_employee: string;
}

@injectable()
class ProfileUserUseCase{
    constructor(@inject('UsersRepository') private usersRepository: IUsersRepository){}

    async execute({id}: IProfileUser): Promise<User>{
        const user = await this.usersRepository.findById(id);
        return user;
    }

    async updateProfile({id, road, number, neighborhood, telephone, functionn, ability, is_employee}:IProfileUser): Promise<void>{
        const user = await this.usersRepository.findById(id);

        if(user){
            user.road = road;
            user.number = number;
            user.neighborhood = neighborhood;
            user.telephone = telephone;
            user.functionn = functionn;
            user.ability = ability;
            user.is_employee = is_employee;
        }

        await this.usersRepository.update(user);
    }
    
}

export { ProfileUserUseCase }