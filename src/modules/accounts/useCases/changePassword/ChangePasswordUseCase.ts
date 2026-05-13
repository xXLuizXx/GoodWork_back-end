import { inject, injectable } from "tsyringe";
import { compare, hash } from "bcrypt";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    user_id: string;
    current_password: string;
    new_password: string;
}

@injectable()
class ChangePasswordUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, current_password, new_password }: IRequest): Promise<void> {
        if (!current_password || !new_password) {
            throw new AppError("Preencha todos os campos.", 400);
        }

        if (new_password.length < 6) {
            throw new AppError("A nova senha deve ter no mínimo 6 caracteres.", 400);
        }

        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        const passwordMatch = await compare(current_password, user.password);

        if (!passwordMatch) {
            throw new AppError("Senha atual incorreta.", 401);
        }

        const sameAsCurrentPassword = await compare(new_password, user.password);

        if (sameAsCurrentPassword) {
            throw new AppError("A nova senha não pode ser igual à senha atual.", 422);
        }

        const passwordHash = await hash(new_password, 6);
        await this.usersRepository.updatePassword(user_id, passwordHash);
    }
}

export { ChangePasswordUseCase };
