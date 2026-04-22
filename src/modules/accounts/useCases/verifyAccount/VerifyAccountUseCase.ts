import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class VerifyAccountUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository,
        @inject("DayjsDateProvider")
        private dateProvider: DayjsDateProvider,
    ) {}

    async execute(token: string): Promise<void> {
        const userToken = await this.usersTokensRepository.findByTokenAndType(token, "email_verification");

        if (!userToken) {
            throw new AppError("Token inválido ou expirado.", 400);
        }

        const tokenExpired = this.dateProvider.compareIfBefore(userToken.expiresDate, this.dateProvider.dateNow());

        if (tokenExpired) {
            await this.usersTokensRepository.deleteById(userToken.id);
            throw new AppError("Token expirado. Solicite um novo e-mail de verificação.", 400);
        }

        await this.usersRepository.updateUstatus(userToken.userId, true);
        await this.usersTokensRepository.deleteById(userToken.id);
    }
}

export { VerifyAccountUseCase };
