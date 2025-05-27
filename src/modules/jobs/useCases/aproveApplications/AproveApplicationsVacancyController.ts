import { Request, Response } from "express";
import { container } from "tsyringe";
import { AproveApplicationsVacancyUseCase } from "./AproveApplicationsVacancyUseCase";
import { IApproveApplicationDTO } from "../../dtos/IAprovedApplicationsDTO";
import { ListJobsUseCase } from "../listJobs/ListJobsUseCase";
import { CloseOrOpenVacancyUseCase } from "../closeVacancy/CloseOrOpenVacancyUseCase";

class AproveApplicationsVacancyController {
    async aproveAppliations(request: Request, response: Response): Promise<Response> {
        const aproveApplicationsVacancyUseCase = container.resolve(AproveApplicationsVacancyUseCase);
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const closeOrOpenVacancyUseCase = container.resolve(CloseOrOpenVacancyUseCase);
        let closeVacancy = false;
        let jobId = "";
        try {
            const payload = request.body;


            const applications: IApproveApplicationDTO[] = [];
            const selectedCount = payload.selected_count;

            for (const [applicationId, decisionData] of Object.entries(payload.decisions)) {
                const { amount_vacancy } = await listJobsUseCase.executeJob(decisionData.job_id)
                jobId = decisionData.job_id;

                if(selectedCount < amount_vacancy){
                    if(decisionData.approved){
                        applications.push({
                            id: applicationId,
                            application_approved: decisionData.approved,
                            job_id: decisionData.job_id
                        });
                    }
                } else {
                    closeVacancy = true;
                    applications.push({
                        id: applicationId,
                        application_approved: decisionData.approved,
                        job_id: decisionData.job_id
                    });
                }
            }
            
            if(closeVacancy){
                await closeOrOpenVacancyUseCase.execute(jobId, closeVacancy);
            }
            
            await aproveApplicationsVacancyUseCase.aproveApplication(applications);

            return response.status(201).json({ message: "Processo de aprovação finalizado com sucesso" });
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}

export { AproveApplicationsVacancyController };
