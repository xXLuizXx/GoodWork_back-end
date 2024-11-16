import { getRepository, Repository } from "typeorm";
import { ICreateUsersDTO } from "../../../dtos/ICreateUserDTO";
import { User } from "../entities/User";
import { IUsersRepository } from "../../../repositories/IUsersRepository";

class UsersRepository implements IUsersRepository{
    private repository: Repository<User>;
    
    constructor(){
        this.repository = getRepository(User);
    }
    
    async create({ name, road, number, identifier, neighborhood, sex, telephone, is_employee, functionn, ability, email, password, isAdmin, id, avatar }: ICreateUsersDTO): Promise<void> {
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
            ability,
            email, 
            password,
            isAdmin,
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

    async update(user: User): Promise<void>{
        await this.repository.createQueryBuilder('user')
        .update('users')
        .set({
            road: user.road,
            number: user.number,
            neighborhood: user.neighborhood,
            telephone: user.telephone,
            functionn: user.functionn,
            ability: user.ability,
            is_employee: user.is_employee
        })
        .where('id = :id', { id: user.id })
        .execute();
    }
}

export { UsersRepository }