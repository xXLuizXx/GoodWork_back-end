import auth from "../../../../config/auth";
import { sign, verify } from "jsonwebtoken";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../../../modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/provider/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { DayjsDateProvider } from "../../../../shared/container/provider/DateProvider/implementations/DayjsDateProvider";

interface IPayload {
  sub: string;
  email: string;
}

interface ITokenResponse {
  token: string;
  refreshToken: string;
}

@injectable()
class RefreshTokenUseCase {
  constructor(
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    //@inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider,
  ) {}

  async execute(refreshToken: string): Promise<ITokenResponse> {
    try {
      const { sub, email } = verify(
        refreshToken,
        auth.secretRefreshToken,
      ) as IPayload;

      const userId = sub;

      const userToken =
        await this.usersTokensRepository.findByUserIdAndRefreshToken(
          userId,
          refreshToken,
        );

      if (!userToken) {
        throw new AppError("Refresh token não encontrado!", 401);
      }

      await this.usersTokensRepository.deleteById(userToken.id);

      const newRefreshToken = sign({ email }, auth.secretRefreshToken, {
        subject: sub,
        expiresIn: auth.expiresInRefreshToken,
      });

      const refreshTokenExpiresDate = this.dateProvider.addDays(
        auth.expiresRefreshTokenDays,
      );

      await this.usersTokensRepository.create({
        userId,
        refreshToken: newRefreshToken,
        expiresDate: refreshTokenExpiresDate,
      });

      const user = await this.usersRepository.findByEmail(email);

      const newToken = sign(
        { isAdmin: user.isAdmin },
        auth.secretToken,
        {
          subject: userId,
          expiresIn: auth.expiresInToken,
        },
      );

      return {
        token: newToken,
        refreshToken: newRefreshToken,
      };
    } catch {
      throw new AppError("Refresh token inválido!", 401);
    }
  }
}

export { RefreshTokenUseCase };