import { ICreateUsersDTO } from "../dtos/ICreateUserDTO";
import { IDataUsersDTO } from "../dtos/IDataUsersDTO";
import { User } from "../infra/typeorm/entities/User";

interface IUsersRepository{
    create(data: ICreateUsersDTO): Promise<void>;
    findByEmail(email: string): Promise<User>;
    findById(id: string): Promise<User>;
    update(user: User, profileData: any): Promise<void>;
    listAllUsers(id: string): Promise<IDataUsersDTO[]>;
    listAllUsersString(search: string, id: string): Promise<IDataUsersDTO[]>;
    updateUstatus(id: string, active: boolean): Promise<void>;
    updatePassword(id: string, passwordHash: string): Promise<void>;
    listAllUsersForGenerate(): Promise<IDataUsersDTO[]>;
    getCategoriesInterest(id: string): Promise<string>;
}

export { IUsersRepository }