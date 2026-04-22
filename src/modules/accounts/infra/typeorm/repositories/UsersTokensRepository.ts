import { getRepository, Repository } from "typeorm";


import { UserToken } from "../entities/UserToken";
import { ICreateUserTokenDTO } from "modules/accounts/dtos/ICreateUserTokenDTO";
import { IUsersTokensRepository } from "modules/accounts/repositories/IUsersTokensRepository";

class UsersTokensRepository implements IUsersTokensRepository {
  private repository: Repository<UserToken>;

  constructor() {
    this.repository = getRepository(UserToken);
  }

  async create({
    expiresDate,
    refreshToken,
    userId,
    type,
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
      type: type ?? "refresh_token",
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({ userId, refreshToken });
    return usersTokens as UserToken;
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({ refreshToken });
    return userToken as UserToken;
  }

  async findByTokenAndType(token: string, type: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      refreshToken: token,
      type: type as UserToken["type"],
    });
    return userToken as UserToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}

export { UsersTokensRepository };