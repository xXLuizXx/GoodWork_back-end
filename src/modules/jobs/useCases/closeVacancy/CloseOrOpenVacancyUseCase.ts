import { Job } from "../../../../modules/jobs/infra/typeorm/entities/Job";
import { JobsRepository } from "../../../../modules/jobs/infra/typeorm/repositories/JobsRepository";
import { inject, injectable } from "tsyringe";

@injectable()
class CloseOrOpenVacancyUseCase{

    constructor(@inject("JobsRepository") private jobsRepository: JobsRepository){}

    async execute(id: string, valid: boolean): Promise<Job> {
        const job = await this.jobsRepository.findById(id);
        
        if(!job) {
            throw new Error("Vaga não encontrada!");
        }
        
        await this.jobsRepository.closeOrOpen(id, valid);
        const jobUpdate = await this.jobsRepository.findById(id);
        
        if(!jobUpdate) {
            throw new Error("Falha ao atualizar status da vaga!");
        }
        
        return jobUpdate;
    }
}

export { CloseOrOpenVacancyUseCase }