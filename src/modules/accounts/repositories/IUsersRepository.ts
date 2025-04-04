import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository{
    create(data: ICreateUsersDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    update(user: User, profileData): Promise<void>;
}

export { IUsersRepository }