import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";

interface ICancelInterviewDTO {
    interview_id: string;
    notice: string;
    company_id: string;
}

@injectable()
class CancelInterviewUseCase {

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewApplicationJobRepository: IInterviewApplicationJobRepository
    ) {};

    async execute({ interview_id, notice, company_id }: ICancelInterviewDTO): Promise<void> {
        const interview = await this.interviewApplicationJobRepository.findByInterviewAndCompany(interview_id, company_id);

        if (!interview) {
            throw new AppError("Essa entrevista não existe!");
        }

        if (!notice) {
            throw new AppError("Favor inserir um aviso!");
        }

        await this.interviewApplicationJobRepository.cancelInterview(interview_id, notice);
    }
}

export { CancelInterviewUseCase }
