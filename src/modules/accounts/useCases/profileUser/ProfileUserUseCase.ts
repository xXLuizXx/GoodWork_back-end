import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { IndividualUser } from "../../../../modules/accounts/infra/typeorm/entities/IndividualUser";
import { CompanyUser } from "../../../../modules/accounts/infra/typeorm/entities/CompanyUser";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

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

        // Mesmas regras do cadastro: o perfil não pode ficar com campos obrigatórios em branco
        const text = (value: unknown) => (value ?? "").toString().trim();
        const road = text(profileData.road);
        const number = text(profileData.number);
        const neighborhood = text(profileData.neighborhood);
        const telephone = text(profileData.telephone);

        if (!road || !number || !neighborhood || !telephone) {
            throw new AppError("Preencha rua, número, bairro e telefone.");
        }

        user.road = road;
        user.number = number;
        user.neighborhood = neighborhood;
        user.telephone = telephone;

        if(user.user_type === "individual"){
            const functionn = text(profileData.functionn);
            const ability = text(profileData.ability);

            if (!functionn || !ability) {
                throw new AppError("Preencha função e habilidades.");
            }

            individualUser.functionn = functionn;
            individualUser.ability = ability;
            individualUser.is_employee = profileData.is_employee;

            await this.usersRepository.update(user, individualUser);
        }else if(user.user_type === "company"){
            const business_area = text(profileData.business_area);

            if (!business_area) {
                throw new AppError("Informe a área de atuação da empresa.");
            }

            companyUser.business_area = business_area;

            await this.usersRepository.update(user, companyUser);
        }

        return user;
    }
}

export { ProfileUserUseCase };
