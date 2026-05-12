import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";

@injectable()
class CheckApplicationUseCase {
    constructor(
        @inject("ApplicationRepository")
        private applicationRepository: IApplicationRepository
    ) {}

    async execute(user_id: string, job_id: string): Promise<boolean> {
        if (!job_id) return false;
        const application = await this.applicationRepository.findByUserAndJob(user_id, job_id);
        return !!application;
    }
}

export { CheckApplicationUseCase };
