import { verify } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import auth from "../../../../config/auth";
import { IUsersTokensRepository } from "../../repositories/IUsersTokensRepository";

@injectable()
class LogoutUseCase {
    constructor(
        @inject("UsersTokensRepository")
        private usersTokensRepository: IUsersTokensRepository
    ) {}

    async execute(refreshToken: string): Promise<void> {
        if (!refreshToken) return;

        try {
            verify(refreshToken, auth.secretRefreshToken);
        } catch {
            return;
        }

        const token = await this.usersTokensRepository.findByRefreshToken(refreshToken);

        if (!token) {
            return;
        }

        await this.usersTokensRepository.deleteById(token.id);
    }
}

export { LogoutUseCase };
