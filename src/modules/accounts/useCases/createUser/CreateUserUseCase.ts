import { inject, injectable } from "tsyringe";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import { ICreateUsersDTO } from "../../dtos/ICreateUserDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";
import { hash } from "bcrypt";
import { AppError } from "../../../../shared/errors/AppError";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
        @inject("MailRepository")
        private mailProvider: IMailProvider,
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
        categories_interest,
        business_area,
    }: ICreateUsersDTO): Promise<void> {
        const userAlreadyExists = await this.usersRepository.findByEmail(email);
        
        if (userAlreadyExists) {
            throw new AppError("User already exists");
        }

        const passwordHash = await hash(password, 8);

        if (user_type === "individual") {
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
                categories_interest,
            });
            
        } else if (user_type === "company") {
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

        const user = await this.usersRepository.findByEmail(email);

        const token = uuidV4();
        const expiresDate = this.dateProvider.addHours(24);

        await this.usersTokensRepository.create({
            userId: user.id,
            refreshToken: token,
            expiresDate,
            type: "email_verification",
        });

        const verifyLink = `${process.env.APP_WEB_URL}/verify-account?token=${token}`;
        const templatePath = path.resolve("src", "views", "emails", "verify-account.hbs");

        await this.mailProvider.sendMail({
            to: user.email,
            subject: "Confirme seu e-mail — GoodWork",
            variables: { name: user.name, link: verifyLink },
            path: templatePath,
        });
    }

}

export { CreateUserUseCase };
