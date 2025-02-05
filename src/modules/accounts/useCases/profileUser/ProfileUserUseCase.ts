import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { IndividualUser } from "../../../../modules/accounts/infra/typeorm/entities/IndividualUser";
import { CompanyUser } from "../../../../modules/accounts/infra/typeorm/entities/CompanyUser";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

interface IProfileUser {
    id: string;
    road?: string;
    number?: string;
    neighborhood?: string;
    telephone?: string;
    functionn?: string;
    ability?: string;
    is_employee?: boolean;
    business_area?: string;
}

@injectable()
class ProfileUserUseCase {
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository) {}

    async execute({ id }: IProfileUser): Promise<User> {
        const user = await this.usersRepository.findById(id);

        return user;
    }

    async updateProfile(profileData: IProfileUser): Promise<User> {
        const { id } = profileData;
        const user = await this.usersRepository.findById(id);
        const individualUser = new IndividualUser();
        const companyUser = new CompanyUser();

        user.road = profileData.road;
        user.number = profileData.number;
        user.neighborhood = profileData.neighborhood;
        user.telephone = profileData.telephone;

        if(user.user_type === "individual"){  
            individualUser.functionn = profileData.functionn;
            individualUser.ability = profileData.ability;
            individualUser.is_employee = profileData.is_employee;

            await this.usersRepository.update(user, individualUser);
        }else if(user.user_type === "company"){
            companyUser.business_area = profileData.business_area;

            await this.usersRepository.update(user, companyUser);
        }

        return user;
    }
}

export { ProfileUserUseCase };
