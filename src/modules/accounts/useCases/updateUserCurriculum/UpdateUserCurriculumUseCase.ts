import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IStorageProvider } from "../../../../shared/container/providers/StorageProvider/IStorageProvider";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    user_id: string;
    curriculum_file: string;
}

@injectable()
class UpdateUserCurriculumUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository,
        @inject("StorageProvider")
        private storageProvider: IStorageProvider
    ) {}

    async execute({ user_id, curriculum_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            await this.storageProvider.delete(curriculum_file, "curriculums/curriculums_user_profile");
            throw new AppError("Usuário não encontrado.", 404);
        }

        if (user.user_type !== "individual") {
            await this.storageProvider.delete(curriculum_file, "curriculums/curriculums_user_profile");
            throw new AppError("Apenas usuários do tipo individual podem atualizar o currículo.", 403);
        }

        if (user.individualData?.curriculum) {
            await this.storageProvider.delete(user.individualData.curriculum, "curriculums/curriculums_user_profile");
        }

        await this.usersRepository.updateCurriculum(user_id, curriculum_file);
    }
}

export { UpdateUserCurriculumUseCase };
