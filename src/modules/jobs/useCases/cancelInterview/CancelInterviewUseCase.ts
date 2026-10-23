import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { NotifyUserUseCase } from "../../../notifications/useCases/notifyUser/NotifyUserUseCase";

interface ICancelInterviewDTO {
    interview_id: string;
    notice: string;
    company_id: string;
}

@injectable()
class CancelInterviewUseCase {

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewApplicationJobRepository: IInterviewApplicationJobRepository,
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject(NotifyUserUseCase) private notifyUser: NotifyUserUseCase
    ) {};

    async execute({ interview_id, notice, company_id }: ICancelInterviewDTO): Promise<void> {
        const interview = await this.interviewApplicationJobRepository.findByInterviewAndCompany(interview_id, company_id);

        if (!interview) {
            throw new AppError("Essa entrevista não existe!");
        }

        if(interview.status === "cancelled" || interview.status === "completed"){
            throw new AppError("Essa entrevista não pode ser cancelada!");
        }

        if (!notice) {
            throw new AppError("Favor inserir um aviso!");
        }

        await this.interviewApplicationJobRepository.cancelInterview(interview_id, notice);
        await this.applicationRepository.setHired(interview.application.id, false);

        // O cancelamento encerra o processo (hired = false acima), mas o aviso fala do cancelamento
        await this.notifyUser.execute({
            user_id: interview.application.user.id,
            type: "interview_cancelled",
            title: "Entrevista cancelada",
            body: `Sua entrevista para ${interview.application.job.vacancy} foi cancelada.`,
            resource_id: interview.application.id,
            resource_type: "application",
            email: {
                to: interview.application.user.email,
                subject: `Entrevista cancelada — ${interview.application.job.vacancy}`,
                template: "interview-cancelled.hbs",
                variables: {
                    name: interview.application.user.name,
                    vacancy_name: interview.application.job.vacancy,
                    notice,
                },
            },
        });
    }
}

export { CancelInterviewUseCase }
