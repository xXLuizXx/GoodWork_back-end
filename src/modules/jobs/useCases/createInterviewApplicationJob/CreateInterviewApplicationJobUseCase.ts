import { ICreateInterviewDTO } from "modules/jobs/dtos/ICreateInterviewDTO";
import { IInterviewApplicationJobRepository } from "../../../../modules/jobs/repositories/IInterviewApplicationJobRepository";
import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../../../modules/jobs/repositories/IApplicationRepository";

@injectable()
class CreateInterviewApplicationJobUseCase{
    constructor(
        @inject("InterviewApplicationJobRepository") private interviewAppicationJobRepository: IInterviewApplicationJobRepository,
        @inject("ApplicationRepository") private applicationRepository: IApplicationRepository
    ){};

    async execute(interviews: ICreateInterviewDTO[], batchSize: number = 10): Promise<void> {
        console.log(`>>>>>>>>>> Processando ${interviews.length} entrevistas em lotes de ${batchSize}`);
        
        for (let i = 0; i < interviews.length; i += batchSize) {
            const batch = interviews.slice(i, i + batchSize);
            
            await Promise.all(
                batch.map(interview => {

                    //this.interviewAppicationJobRepository.create(interview)
                })
            );
            
            console.log(`Lote ${Math.floor(i/batchSize) + 1} concluído`);
        }
    }
    
}

export { CreateInterviewApplicationJobUseCase }