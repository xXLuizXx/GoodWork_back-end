import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO";
import { UserToken } from "../infra/typeorm/entities/UserToken";

interface IUsersTokensRepository {
  create({
    expiresDate,
    refreshToken,
    userId,
  }: ICreateUserTokenDTO): Promise<UserToken>;

  findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken>;

  findByRefreshToken(refreshToken: string): Promise<UserToken>;

  deleteById(id: string): Promise<void>;

  deleteByUserId(id: string): Promise<void>;
}

export type{ IUsersTokensRepository };