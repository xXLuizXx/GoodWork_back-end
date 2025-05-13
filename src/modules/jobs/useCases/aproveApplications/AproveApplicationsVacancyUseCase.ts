import { inject, injectable } from "tsyringe";
import { IApplicationRepository } from "../../repositories/IApplicationRepository";
import { IApproveApplicationDTO } from "../../dtos/IAprovedApplicationsDTO";

@injectable()
class AproveApplicationsVacancyUseCase {
    constructor(@inject("ApplicationRepository") private applicationRepository: IApplicationRepository) {}

  async aproveApplication(applications: IApproveApplicationDTO[]): Promise<void> {
        for (const application of applications) {
            await this.applicationRepository.aproveApplication(application.id, {
                application_approved: application.application_approved,
                job_id: application.job_id,
            } as any);
        }
    }
}

export { AproveApplicationsVacancyUseCase };
