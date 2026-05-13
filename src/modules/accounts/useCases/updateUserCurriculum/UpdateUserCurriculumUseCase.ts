import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { deleteFile } from "../../../../utils/file";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    user_id: string;
    curriculum_file: string;
}

@injectable()
class UpdateUserCurriculumUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository
    ) {}

    async execute({ user_id, curriculum_file }: IRequest): Promise<void> {
        const user = await this.usersRepository.findById(user_id);

        if (!user) {
            await deleteFile(`./tmp/curriculums/curriculums_user_profile/${curriculum_file}`);
            throw new AppError("Usuário não encontrado.", 404);
        }

        if (user.user_type !== "individual") {
            await deleteFile(`./tmp/curriculums/curriculums_user_profile/${curriculum_file}`);
            throw new AppError("Apenas usuários do tipo individual podem atualizar o currículo.", 403);
        }

        if (user.individualData?.curriculum) {
            await deleteFile(`./tmp/curriculums/curriculums_user_profile/${user.individualData.curriculum}`);
        }

        await this.usersRepository.updateCurriculum(user_id, curriculum_file);
    }
}

export { UpdateUserCurriculumUseCase };
