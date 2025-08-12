import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class UpdateStatusUserUseCase{
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

    async updateStatus(id: string, active: boolean): Promise<void>{
        const updateStatus = await this.usersRepository.updateUstatus(id, active);

        return updateStatus;
    }
}

export { UpdateStatusUserUseCase }