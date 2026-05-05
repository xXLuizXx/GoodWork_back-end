import path from "path";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../shared/errors/AppError";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

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
        @inject("MailRepository") private mailProvider: IMailProvider
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

        const templatePath = path.resolve("src", "views", "emails", "not-hired.hbs");

        await this.mailProvider.sendMail({
            to: interview.application.user.email,
            subject: `Resultado do processo seletivo — ${interview.application.job.vacancy}`,
            variables: {
                name: interview.application.user.name,
                vacancy_name: interview.application.job.vacancy,
                feedback: notice,
            },
            path: templatePath,
        });
    }
}

export { CancelInterviewUseCase }
