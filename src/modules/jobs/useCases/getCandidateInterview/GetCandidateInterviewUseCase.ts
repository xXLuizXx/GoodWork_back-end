import { inject, injectable } from "tsyringe";
import { Interview } from "../../../../modules/jobs/infra/typeorm/entities/Interviews";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class GetCandidateInterviewUseCase {

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewApplicationJobRepository: IInterviewApplicationJobRepository
    ) {};

    async execute(application_id: string, user_id: string): Promise<Interview> {
        const interview = await this.interviewApplicationJobRepository.findByApplicationIdAndCandidate(application_id, user_id);

        if (!interview) {
            throw new AppError("Nenhuma entrevista encontrada para essa candidatura!", 404);
        }

        return interview;
    }
}

export { GetCandidateInterviewUseCase }
