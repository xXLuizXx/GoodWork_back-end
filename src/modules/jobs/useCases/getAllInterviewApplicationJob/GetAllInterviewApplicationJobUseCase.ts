import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { Interview } from "../../../../modules/jobs/infra/typeorm/entities/Interviews";
import { AppError } from "../../../../shared/errors/AppError";

@injectable()
class GetAllInterviewApplicationJobUseCase{
    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
    ){};

    async execute(application_id: string, company_user_id: string): Promise<Interview[]>{
        const interviews = await this.interviewAppicationJobRepository.findAllByApplicationIdWithDetails(application_id);

        if (interviews.length === 0) {
            return [];
        }

        if (interviews[0].application.job.user_id !== company_user_id) {
            throw new AppError("Acesso não autorizado!", 403);
        }

        return interviews;
    }
}

export { GetAllInterviewApplicationJobUseCase }
