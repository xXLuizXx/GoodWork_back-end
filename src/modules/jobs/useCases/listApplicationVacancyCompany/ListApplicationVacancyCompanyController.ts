import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListApplicationVacancyCompanyUseCase } from "./ListApplicationVacancyCompanyUseCase";


class ListApplicationVacancyCompanyController{
    async getAllApplicationsJob(request: Request, response: Response): Promise<Response>{
        const { job_id } = request.query;
        const listApplicationVacancyCompanyUseCase = container.resolve(ListApplicationVacancyCompanyUseCase);
        const application = await listApplicationVacancyCompanyUseCase.listAllApplicationJob(job_id);

        return response.json(application);
    }
}

export { ListApplicationVacancyCompanyController }