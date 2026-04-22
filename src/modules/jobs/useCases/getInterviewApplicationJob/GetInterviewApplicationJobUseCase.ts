import { inject, injectable } from "tsyringe";
import { Interview } from "../../../../modules/jobs/infra/typeorm/entities/Interviews";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class GetInterviewApplicationJobUseCase{
    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
    ){};

    async execute(application_id: string, company_user_id: string): Promise<Interview | undefined>{
        const interview = await this.interviewAppicationJobRepository.findByApplicationIdWithDetails(application_id);

        if (!interview) {
            return undefined;
        }

        if (interview.application.job.user_id !== company_user_id) {
            throw new AppError("Acesso não autorizado!", 403);
        }

        return interview;
    }
}

export { GetInterviewApplicationJobUseCase }