import path from "path";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { ICreateInterviewDTO } from "../../../../modules/jobs/dtos/ICreateInterviewDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { ISendMailDTO } from "../../../mailtrap/dtos/ISendMailDTO";
import { INotificationsRepository } from "../../../notifications/repositories/INotificationsRepository";

interface IMailProvider {
    sendMail(data: ISendMailDTO): Promise<void>;
}

@injectable()
class RescheduleInterviewUseCase{

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
        @inject("MailRepository") private mailProvider: IMailProvider,
        @inject("NotificationsRepository") private notificationsRepository: INotificationsRepository
    ){};

    async execute(data: ICreateInterviewDTO, interview_id: string, company_id: string): Promise<void>{

        const interview = await this.interviewAppicationJobRepository.findByInterviewAndCompany(interview_id, company_id);

        if(!interview){
            throw new AppError("Essa entrevista não existe!");
        }

        if(interview.status === "cancelled" || interview.status === "completed"){
            throw new AppError("Essa entrevista não pode ser remarcada!");
        }

        if(!data.notice){
            throw new AppError("Favor inserir um aviso!");
        }

        if(data.scheduled_date && new Date(data.scheduled_date) < new Date()){
            throw new AppError("A data da entrevista não pode ser no passado!");
        }

        interview.interview_type = data.interview_type ?? interview.interview_type;
        interview.scheduled_date = data.scheduled_date as unknown as Date ?? interview.scheduled_date;
        interview.duration_minutes = data.duration_minutes ?? interview.duration_minutes;
        interview.location = data.location ?? interview.location;
        interview.meeting_link = data.meeting_link ?? interview.meeting_link;
        interview.interviewer_name = data.interviewer_name ?? interview.interviewer_name;
        interview.interviewer_email = data.interviewer_email ?? interview.interviewer_email;
        interview.notes = data.notes ?? interview.notes;
        interview.notice = data.notice;
        interview.status = "rescheduled";

        await this.interviewAppicationJobRepository.rescheduleInterview(interview);

        await this.notificationsRepository.create({
            user_id: interview.application.user.id,
            type: "interview_rescheduled",
            title: "Entrevista reagendada",
            body: `Sua entrevista para ${interview.application.job.vacancy} foi reagendada.`,
            resource_id: interview.application.id,
            resource_type: "application",
        });

        const templatePath = path.resolve("src", "views", "emails", "interview-rescheduled.hbs");
        const scheduledDate = new Date(interview.scheduled_date).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

        await this.mailProvider.sendMail({
            to: interview.application.user.email,
            subject: `Entrevista remarcada — ${interview.application.job.vacancy}`,
            variables: {
                name: interview.application.user.name,
                vacancy_name: interview.application.job.vacancy,
                notice: data.notice,
                interview_type: interview.interview_type === "presencial" ? "Presencial" : "Online",
                scheduled_date: scheduledDate,
                duration_minutes: interview.duration_minutes,
                location: interview.location ?? null,
                meeting_link: interview.meeting_link ?? null,
                interviewer_name: interview.interviewer_name ?? null,
                interviewer_email: interview.interviewer_email ?? null,
            },
            path: templatePath,
        });
    }
}

export { RescheduleInterviewUseCase }
