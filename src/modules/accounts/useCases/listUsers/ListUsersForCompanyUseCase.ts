import { IDataUsersDTO } from "../../../../modules/accounts/dtos/IDataUsersDTO";
import { User } from "../../../../modules/accounts/infra/typeorm/entities/User";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { container, inject, injectable } from "tsyringe";


@injectable()
class ListUsersForCompanyUseCase{

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

    async listUsersForCompany(id: string): Promise<IDataUsersDTO[]>{
        const users = await this.usersRepository.listAllUsers(id);

        return users;
    }
}

export { ListUsersForCompanyUseCase }