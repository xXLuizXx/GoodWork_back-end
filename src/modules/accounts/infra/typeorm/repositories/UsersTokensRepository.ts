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
  }: ICreateUserTokenDTO): Promise<UserToken> {
    const userToken = this.repository.create({
      expiresDate,
      refreshToken,
      userId,
    });

    await this.repository.save(userToken);

    return userToken;
  }

  async findByUserIdAndRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<UserToken> {
    const usersTokens = await this.repository.findOne({
      userId,
      refreshToken,
    });
    return usersTokens;
  }

  async findByRefreshToken(refreshToken: string): Promise<UserToken> {
    const userToken = await this.repository.findOne({
      refreshToken,
    });
    return userToken;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async deleteByUserId(userId: string): Promise<void> {
    await this.repository.delete({ userId });
  }
}

export { UsersTokensRepository };