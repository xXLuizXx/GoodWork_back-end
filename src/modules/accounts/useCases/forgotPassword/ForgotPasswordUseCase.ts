import { inject, injectable } from "tsyringe";
import path from "path";
import { v4 as uuidV4 } from "uuid";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

@injectable()
class ForgotPasswordUseCase {
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

    async execute(email: string): Promise<void> {
        const user = await this.usersRepository.findByEmail(email);

        if (!user) {
            return;
        }

        const token = uuidV4();
        const expiresDate = this.dateProvider.addHours(2);

        await this.usersTokensRepository.create({
            userId: user.id,
            refreshToken: token,
            expiresDate,
            type: "password_reset",
        });

        const resetLink = `${process.env.APP_WEB_URL}/reset-password?token=${token}`;
        const templatePath = path.resolve("src", "views", "emails", "forgot-password.hbs");

        await this.mailProvider.sendMail({
            to: user.email,
            subject: "Redefinição de senha — GoodWork",
            variables: { name: user.name, link: resetLink },
            path: templatePath,
        });
    }
}

export { ForgotPasswordUseCase };
