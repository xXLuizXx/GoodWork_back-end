import { ICreateInterviewDTO } from "modules/jobs/dtos/ICreateInterviewDTO";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";
import { AppError } from "../../../../shared/errors/AppError";
import { Application } from "modules/jobs/infra/typeorm/entities/Application";

@injectable()
class CreateInterviewApplicationJobUseCase{
    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository
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
                })
            );
        }
    }

    async getApplication(application_id: string): Promise<Application>{
        try {
            const application = await this.applicationRepository.findById(application_id);
            return application;
        } catch (error) {
            throw error;
        }
    }
    
}

export { CreateInterviewApplicationJobUseCase }