import { Request, Response } from "express";
import { container } from "tsyringe";
import { AproveApplicationsVacancyUseCase } from "./AproveApplicationsVacancyUseCase";
import { IApproveApplicationDTO } from "../../dtos/IAprovedApplicationsDTO";

class AproveApplicationsVacancyController {
    async aproveAppliations(request: Request, response: Response): Promise<Response> {
        const aproveApplicationsVacancyUseCase = container.resolve(AproveApplicationsVacancyUseCase);
        const payload = request.body;

        const applications: IApproveApplicationDTO[] = Object.entries(payload).map(
            ([id, data]: [string, any]) => ({
                id,
                application_approved: data.approved,
                job_id: data.job_id,
            })
        );

        try {
            await aproveApplicationsVacancyUseCase.aproveApplication(applications);

            return response.status(201).json({ message: "Processo de aprovação finalizado com sucesso" });
        } catch (error) {
            return response.status(400).json({ message: error.message });
        }
    }
}

export { AproveApplicationsVacancyController };
