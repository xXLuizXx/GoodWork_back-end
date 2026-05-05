import path from "path";
import { ICreateInterviewDTO } from "modules/jobs/dtos/ICreateInterviewDTO";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { Application } from "modules/jobs/infra/typeorm/entities/Application";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

@injectable()
class CreateInterviewApplicationJobUseCase{
    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository,
        @inject("MailRepository") private mailProvider: IMailProvider
    ){};

    async execute(data: ICreateInterviewDTO | ICreateInterviewDTO[], batchSize: number = 10): Promise<void> {
        const interviews = Array.isArray(data) ? data : [data];

        for (let i = 0; i < interviews.length; i += batchSize) {
            const batch = interviews.slice(i, i + batchSize);
            await Promise.all(
                batch.map(async (interview) => {
                    const application = await this.getApplication(interview.application_id);
                    if (!application) {
                        throw new AppError("Não existe nenhuma candidatura para a marcação dessa entrevista!");
                    }

                    const existingInterview = await this.interviewAppicationJobRepository.findByApplicationId(interview.application_id);

                    if (existingInterview) {
                        throw new AppError("Já existe uma entrevista marcada para essa candidatura!");
                    }

                    if (new Date(interview.scheduled_date) < new Date()) {
                        throw new AppError("A data da entrevista não pode ser no passado!");
                    }

                    if (!interview.interview_type) {
                        throw new AppError("Favor preencher o tipo da entrevista!");
                    }

                    if (interview.interview_type === 'presencial') {
                        if (!interview.location) {
                            throw new AppError("Favor inserir o local da entrevista!");
                        }
                    } else {
                        if (!interview.meeting_link) {
                            throw new AppError("Favor inserir o link para a video chamada!");
                        }
                    }

                    await this.interviewAppicationJobRepository.create({ ...interview, application });

                    const templatePath = path.resolve("src", "views", "emails", "interview-scheduled.hbs");
                    const scheduledDate = new Date(interview.scheduled_date).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

                    await this.mailProvider.sendMail({
                        to: application.user.email,
                        subject: `Entrevista agendada — ${application.job.vacancy}`,
                        variables: {
                            name: application.user.name,
                            vacancy_name: application.job.vacancy,
                            interview_type: interview.interview_type === "presencial" ? "Presencial" : "Online",
                            scheduled_date: scheduledDate,
                            duration_minutes: interview.duration_minutes ?? 30,
                            location: interview.location ?? null,
                            meeting_link: interview.meeting_link ?? null,
                            interviewer_name: interview.interviewer_name ?? null,
                            interviewer_email: interview.interviewer_email ?? null,
                            notes: interview.notes ?? null,
                        },
                        path: templatePath,
                    });
                })
            );
        }
    }

    async getApplication(application_id: string): Promise<Application | undefined>{
        return this.applicationRepository.findById(application_id);
    }

}

export { CreateInterviewApplicationJobUseCase }
