import { inject, injectable } from "tsyringe";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository") 
        private usersRepository: IUsersRepository
    ) {}

    async execute({
        name,
        road,
        number,
        identifier,
        neighborhood,
        telephone,
        email,
        password,
        user_type,
        sex,
        is_employee,
        functionn,
        ability,
        curriculum,
        business_area,
    }: ICreateUsersDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        if (user_type === "individual") {
            console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>USUÁRIO PESSOAL<<<<<<<<<<<<<<<<<<<<<<<<<");
            console.log(user_type);
            if (!sex || !functionn || !ability) {
                throw new AppError("Missing required fields for individual user.");
            }
    
            await this.usersRepository.create({
                name,
                road,
                number,
                identifier,
                neighborhood,
                telephone,
                email,
                password: passwordHash,
                user_type,
                sex,
                is_employee,
                functionn,
                ability,
                curriculum,
            });
            
        } else if (user_type === "company") {
            console.log(" >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>USUÁRIO EMPRESA<<<<<<<<<<<<<<<<<<<<<<<<<");
            console.log(user_type);
            if (!business_area) {
                throw new AppError("Missing required fields for company user.");
            }
    
            await this.usersRepository.create({
                name,
                road,
                number,
                identifier,
                neighborhood,
                telephone,
                email,
                password: passwordHash,
                user_type,
                business_area,
            });
        } else {
            throw new AppError("Invalid user type");
        }
    }
    
}

export { CreateUserUseCase };
