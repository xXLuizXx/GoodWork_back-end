import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { IDataUsersDTO } from "../../../../modules/accounts/dtos/IDataUsersDTO";
import { inject, injectable } from "tsyringe";

@injectable()
class ListUsersForStringUseCase{

    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){};

    async listAllUsersSearch(search: string, id: string): Promise<IDataUsersDTO[]>{
        const users = await this.usersRepository.listAllUsersString(search, id);

        return users;
    }
}

export { ListUsersForStringUseCase }