import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { ICreateInterviewDTO } from "../../../../modules/jobs/dtos/ICreateInterviewDTO";
import { AppError } from "../../../../shared/errors/AppError";


@injectable()
class RescheduleInterviewUseCase{

    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository
    ){};

    async execute(data: ICreateInterviewDTO, interview_id: string, company_id: string): Promise<void>{

        const interview = await this.interviewAppicationJobRepository.findByInterviewAndCompany(interview_id, company_id);

        if(!interview){
            throw new AppError("Essa entrevista não existe!");
        }

        if(!data.notice){
            throw new AppError("Favor inserir um aviso!");
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
    }
}

export { RescheduleInterviewUseCase }
