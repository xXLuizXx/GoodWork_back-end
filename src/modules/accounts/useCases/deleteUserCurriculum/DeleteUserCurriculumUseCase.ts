import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class DeleteUserCurriculumUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    // Remove só o currículo do perfil: as candidaturas guardam a própria cópia e não são afetadas
    async execute(user_id: string): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            throw new AppError("Usuário não encontrado.", 404);
        }

        if (user.user_type !== "individual") {
            throw new AppError("Apenas usuários do tipo individual possuem currículo.", 403);
        }

        const curriculum = user.individualData?.curriculum;

        if (!curriculum) {
            throw new AppError("Você não possui currículo cadastrado.", 404);
        }

        await this.usersRepository.updateCurriculum(user_id, null);

        // O banco já não aponta para o arquivo; se apagar falhar, só fica um arquivo órfão no storage
        await this.storageProvider.delete(curriculum, "curriculums/curriculums_user_profile").catch((error) => {
            console.error("[DeleteUserCurriculum] Falha ao apagar o arquivo:", error);
        });
    }
}

export { DeleteUserCurriculumUseCase };
