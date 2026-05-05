import path from "path";
import { inject, injectable } from "tsyringe";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

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
        @inject("MailRepository") private mailProvider: IMailProvider
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

        if (hired === true) {
            const templatePath = path.resolve("src", "views", "emails", "hired.hbs");
            await this.mailProvider.sendMail({
                to: interview.application.user.email,
                subject: `Parabéns! Você foi contratado — ${interview.application.job.vacancy}`,
                variables: {
                    name: interview.application.user.name,
                    vacancy_name: interview.application.job.vacancy,
                    feedback: feedback ?? null,
                },
                path: templatePath,
            });
        }

        if (hired === false) {
            const templatePath = path.resolve("src", "views", "emails", "not-hired.hbs");
            await this.mailProvider.sendMail({
                to: interview.application.user.email,
                subject: `Resultado do processo seletivo — ${interview.application.job.vacancy}`,
                variables: {
                    name: interview.application.user.name,
                    vacancy_name: interview.application.job.vacancy,
                    feedback: feedback ?? null,
                },
                path: templatePath,
            });
        }
    }
}

export { CompleteInterviewUseCase }
