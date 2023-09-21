import { getRepository, Repository } from "typeorm";
import { ICreateUsersDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;
    
    constructor(){
        this.repository = getRepository(User);
    }
    
    async create({ name, road, number, identifier, neighborhood, sex, telephone, is_employee, functionn, email, password, access_type, id, avatar }: ICreateUsersDTO): Promise<void> {
        const user = this.repository.create({
            name, 
            road, 
            number, 
            identifier,
            neighborhood, 
            sex, 
            telephone, 
            is_employee, 
            functionn,
            email, 
            password,
            access_type,
            id,
            avatar
        }); 

        await this.repository.save(user);
    }

    async findByEmail(email: string): Promise<User>{
        const user = await this.repository.findOne({email});

        return user;
    }

    async findById(id: string): Promise<User>{
        const user = await this.repository.findOne(id);
        return user;
    }
}

export { UsersRepository }