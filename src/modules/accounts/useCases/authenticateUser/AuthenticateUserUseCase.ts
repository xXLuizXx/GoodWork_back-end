import { compare } from "bcrypt";
import auth from "../../../../config/auth";
import { sign } from "jsonwebtoken";
import { IUsersRepository } from "../../../../modules/accounts/repositories/IUsersRepository";
import { IUsersTokensRepository } from "../../../../modules/accounts/repositories/IUsersTokensRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { inject, injectable } from "tsyringe";
import { DayjsDateProvider } from "../../../../shared/container/providers/DateProvider/implementations/DayjsDateProvider";


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string;
    email: string;
    avatar: string;
    avatarUrl: string;
    isAdmin: boolean;
    user_type: string;
  };
  token: string;
  refreshToken: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("UsersTokensRepository")
    private usersTokensRepository: IUsersTokensRepository,
    @inject("DayjsDateProvider")
    private dateProvider: DayjsDateProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);
    const {
      expiresInToken,
      secretRefreshToken,
      secretToken,
      expiresInRefreshToken,
      expiresRefreshTokenDays,
    } = auth;

    if (!user) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("E-mail ou senha incorretos!", 401);
    }

    const token = sign({ accessLevel: user.user_type, isAdmin: user.isAdmin}, secretToken, {
      subject: user.id,
      expiresIn: expiresInToken,
    });

    const refreshToken = sign({ email }, secretRefreshToken, {
      subject: user.id,
      expiresIn: expiresInRefreshToken,
    });

    const refreshTokenExpiresDate = this.dateProvider.addDays(
      expiresRefreshTokenDays,
    );

    await this.usersTokensRepository.create({
      userId: user.id,
      refreshToken,
      expiresDate: refreshTokenExpiresDate,
    });

    const tokenReturn: IResponse = {
      user: {
        name: user.name,
        email: user.email,
        avatar: user.avatar,
        avatarUrl: user.getAvatarUrl(),
        isAdmin: user.isAdmin,
        user_type: user.user_type
      },
      token,
      refreshToken,
    };

    return tokenReturn;
  }
}

export { AuthenticateUserUseCase };