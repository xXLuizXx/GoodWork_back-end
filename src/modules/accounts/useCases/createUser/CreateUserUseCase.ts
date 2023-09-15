import { inject, injectable } from "tsyringe"
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { hash } from "bcrypt";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateUserUseCase{
    
    constructor(@inject("UsersRepository") private usersRepository: IUsersRepository){}

    async execute({ name, road, number, identifier, neighborhood, sex, telephone, is_employee, functionn, email, password, access_type }: ICreateUsersDTO): Promise<void>{
        
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
            email, 
            password: passwordHash,
            access_type
        });
    }
}

export { CreateUserUseCase }