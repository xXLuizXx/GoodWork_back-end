import { inject, injectable } from "tsyringe"
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase{
    
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

    async execute({ name, road, number, identifier, neighborhood, sex, telephone, is_employee, functionn, ability, email, password, isAdmin }: ICreateUsersDTO): Promise<void>{
        
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        const passwordHash = await hash(password, 8);
        
        if(userAlreadyExists){
            throw new AppError("User already exists");
        }
        await this.usersRepository.create({
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
            password: passwordHash,
        });
    }
}

export { CreateUserUseCase }