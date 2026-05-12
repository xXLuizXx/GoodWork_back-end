import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";
import { AppError } from "../../../../shared/errors/AppError";

interface IRequest {
    application_id: string;
    user_id: string;
}

@injectable()
class CancelApplicationUseCase {
    constructor(
        @inject("ApplicationRepository")
        private applicationRepository: IApplicationRepository
    ) {}

    async execute({ application_id, user_id }: IRequest): Promise<void> {
        const application = await this.applicationRepository.findById(application_id);

        if (!application) {
            throw new AppError("Candidatura não encontrada.", 404);
        }

        if (application.user.id !== user_id) {
            throw new AppError("Você não tem permissão para cancelar esta candidatura.", 403);
        }

        if (application.hired === true || application.hired === false) {
            throw new AppError("Não é possível cancelar: o processo seletivo desta vaga já foi concluído.", 422);
        }

        if (application.application_approved === false) {
            throw new AppError("Não é possível cancelar: esta candidatura já foi encerrada.", 422);
        }

        if (application.application_approved === true) {
            throw new AppError("Não é possível cancelar: sua candidatura já foi aprovada para entrevista.", 422);
        }

        await this.applicationRepository.delete(application_id);
    }
}

export { CancelApplicationUseCase };
