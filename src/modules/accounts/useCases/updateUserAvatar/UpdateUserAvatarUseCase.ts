import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";

interface IRequest{
    user_id: string;
    avatar_file: string;
}

@injectable()
class UpdateUserAvatarUseCase{
    constructor(@inject("UsersRepository") private usersRespository: IUsersRepository,
                @inject("StorageProvider") private storageProvider: IStorageProvider){}

    async execute({ user_id, avatar_file }: IRequest): Promise<void>{
        const user = await this.usersRespository.findById(user_id);

        if(user.avatar){
            await this.storageProvider.delete(user.avatar, "avatar");
        }
        user.avatar = avatar_file;

        await this.usersRespository.create(user);
    }
}

export { UpdateUserAvatarUseCase }