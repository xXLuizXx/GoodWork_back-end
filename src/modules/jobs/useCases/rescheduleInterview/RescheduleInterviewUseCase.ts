import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { ICreateInterviewDTO } from "../../../../modules/jobs/dtos/ICreateInterviewDTO";
import { AppError } from "../../../../shared/errors/AppError";
import { NotifyUserUseCase } from "../../../notifications/useCases/notifyUser/NotifyUserUseCase";
import { parseDateTime } from "../../../../utils/parseDateTime";

@injectable()
class RescheduleInterviewUseCase{

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
        @inject(NotifyUserUseCase) private notifyUser: NotifyUserUseCase
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

        const scheduledDateInput = data.scheduled_date ? parseDateTime(data.scheduled_date) : null;

        if(scheduledDateInput && scheduledDateInput < new Date()){
            throw new AppError("A data da entrevista não pode ser no passado!");
        }

        interview.interview_type = data.interview_type ?? interview.interview_type;
        interview.scheduled_date = scheduledDateInput ?? interview.scheduled_date;
        interview.duration_minutes = data.duration_minutes ?? interview.duration_minutes;
        interview.location = data.location ?? interview.location;
        interview.meeting_link = data.meeting_link ?? interview.meeting_link;
        interview.interviewer_name = data.interviewer_name ?? interview.interviewer_name;
        interview.interviewer_email = data.interviewer_email ?? interview.interviewer_email;
        interview.notes = data.notes ?? interview.notes;
        interview.notice = data.notice;
        interview.status = "rescheduled";

        await this.interviewAppicationJobRepository.rescheduleInterview(interview);

        const scheduledDate = new Date(interview.scheduled_date).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" });

        await this.notifyUser.execute({
            user_id: interview.application.user.id,
            type: "interview_rescheduled",
            title: "Entrevista reagendada",
            body: `Sua entrevista para ${interview.application.job.vacancy} foi reagendada.`,
            resource_id: interview.application.id,
            resource_type: "application",
            email: {
                to: interview.application.user.email,
                subject: `Entrevista remarcada — ${interview.application.job.vacancy}`,
                template: "interview-rescheduled.hbs",
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
            },
        });
    }
}

export { RescheduleInterviewUseCase }
