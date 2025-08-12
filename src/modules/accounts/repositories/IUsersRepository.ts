import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { IDataUsersDTO } from "../dtos/IDataUsersDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository{
    create(data: ICreateUsersDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    update(user: User, profileData): Promise<void>;
    listAllUsers(id: string): Promise<IDataUsersDTO[]>;
    listAllUsersString(search: string, id: string): Promise<IDataUsersDTO[]>;
    updateUstatus(id: string, active: boolean): Promise<void>;
}

export { IUsersRepository }