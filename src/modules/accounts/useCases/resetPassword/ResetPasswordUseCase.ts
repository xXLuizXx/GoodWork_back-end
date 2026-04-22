import { inject, injectable } from "tsyringe";
import { hash } from "bcrypt";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    token: string;
    password: string;
}

@injectable()
class ResetPasswordUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
    ) {}

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokensRepository.findByTokenAndType(token, "password_reset");

        if (!userToken) {
            throw new AppError("Token inválido ou expirado.", 400);
        }

        const tokenExpired = this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.dateNow());

        if (tokenExpired) {
            await this.usersTokensRepository.deleteById(userToken.id);
            throw new AppError("Token expirado. Solicite uma nova redefinição de senha.", 400);
        }

        const passwordHash = await hash(password, 8);
        await this.usersRepository.updatePassword(userToken.userId, passwordHash);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { ResetPasswordUseCase };
