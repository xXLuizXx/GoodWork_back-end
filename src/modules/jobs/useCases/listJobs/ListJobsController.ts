import { Request, Response } from "express";
import { ListJobsUseCase } from "./ListJobsUseCase";
import { container } from "tsyringe";

class ListJobsController{
    async handler(request: Request, response: Response):Promise<Response> {
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const allJobs = await listJobsUseCase.execute();

        return response.json(allJobs);
    }

    async listJobsCategories(request: Request, response: Response):Promise<Response>{
        const { category_id } = request.query;
        const lisJobs = container.resolve(ListJobsUseCase);

        const jobsCategory = await lisJobs.executeCat(category_id);

        return response.json(jobsCategory);
    }

    async listJobsVacancy(request: Request, response: Response):Promise<Response>{
        const { vacancy } = request.query;
        const listJobs = container.resolve(ListJobsUseCase);

        const jobsVacancy = await listJobs.executeVacancy(vacancy);

        return response.json(jobsVacancy);
    }

    async listJobsVacancyNotValidated(request: Request, response: Response):Promise<Response>{
        const countJobsNotValidated = container.resolve(ListJobsUseCase);
        const jobsVacancyNotValidated = await countJobsNotValidated.executeCountVacancy();

        return response.json(jobsVacancyNotValidated);
    }
}

export { ListJobsController }