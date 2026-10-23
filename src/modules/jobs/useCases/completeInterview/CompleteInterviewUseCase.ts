import { inject, injectable } from "tsyringe";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { NotifyUserUseCase } from "../../../notifications/useCases/notifyUser/NotifyUserUseCase";

interface ICompleteInterviewDTO {
    interview_id: string;
    feedback?: string | null;
    hired?: boolean | null;
}

@injectable()
class CompleteInterviewUseCase {

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewApplicationJobRepository: IInterviewApplicationJobRepository,
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject(NotifyUserUseCase) private notifyUser: NotifyUserUseCase
    ) {};

    async execute({ interview_id, feedback, hired }: ICompleteInterviewDTO, company_id: string): Promise<void> {
        const interview = await this.interviewApplicationJobRepository.findByInterviewAndCompany(interview_id, company_id);

        if (!interview) {
            throw new AppError("Essa entrevista não existe!");
        }

        if (interview.status === "cancelled" || interview.status === "completed") {
            throw new AppError("Essa entrevista não pode ser marcada como concluída!");
        }

        await this.interviewApplicationJobRepository.completeInterview(interview_id, feedback ?? null);
        await this.applicationRepository.setHired(interview.application.id, hired ?? null);

        const { user, job } = interview.application;
        const variables = { name: user.name, vacancy_name: job.vacancy, feedback: feedback ?? null };

        if (hired === true) {
            await this.notifyUser.execute({
                user_id: user.id,
                type: "hired",
                title: "Você foi contratado!",
                body: `Parabéns! Você foi contratado para ${job.vacancy}.`,
                resource_id: interview.application.id,
                resource_type: "application",
                email: {
                    to: user.email,
                    subject: `Parabéns! Você foi contratado — ${job.vacancy}`,
                    template: "hired.hbs",
                    variables,
                },
            });
        }

        if (hired === false) {
            await this.notifyUser.execute({
                user_id: user.id,
                type: "not_hired",
                title: "Resultado do processo seletivo",
                body: `O processo seletivo para ${job.vacancy} foi concluído e você não foi selecionado desta vez.`,
                resource_id: interview.application.id,
                resource_type: "application",
                email: {
                    to: user.email,
                    subject: `Resultado do processo seletivo — ${job.vacancy}`,
                    template: "not-hired.hbs",
                    variables,
                },
            });
        }
    }
}

export { CompleteInterviewUseCase }
