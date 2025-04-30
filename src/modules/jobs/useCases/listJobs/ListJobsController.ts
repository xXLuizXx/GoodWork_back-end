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
        const listJobsUseCase = container.resolve(ListJobsUseCase);

        const jobsCategory = await listJobsUseCase.executeCat(category_id);

        return response.json(jobsCategory);
    }

    async listJobsVacancy(request: Request, response: Response):Promise<Response>{
        const { vacancy } = request.query;
        const listJobsUseCase = container.resolve(ListJobsUseCase);

        const jobsVacancy = await listJobsUseCase.executeVacancy(vacancy);

        return response.json(jobsVacancy);
    }

    async countJobsVacancyNotValidated(request: Request, response: Response):Promise<Response>{
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const jobsVacancyNotValidated = await listJobsUseCase.executeCountVacancy();

        return response.json(jobsVacancyNotValidated);
    }

    async listJobsVacancyNotValidated(request: Request, response: Response):Promise<Response>{
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const jobsVacancyNotValidated = await listJobsUseCase.executeVacancyNotValidated();

        return response.json(jobsVacancyNotValidated);
    }

    async getAllJobsCompany(request: Request, reponse: Response): Promise<Response>{
        const { id } = request.query;
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const allJobsCompany = await listJobsUseCase.executeJobsCompany(id);

        return reponse.json(allJobsCompany);
    }

    async getJob(request: Request, response: Response): Promise<Response>{
        const {id} = request.query;
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const job = await listJobsUseCase.executeJob(id);

        return response.json(job);
    }

    async updateJob(request: Request, response: Response): Promise<Response>{
        const listJobsUseCase = container.resolve(ListJobsUseCase);
        const { id, vacancy, contractor, description_vacancy, requirements, workload, location, category_id, benefits, vacancy_available, amount_vacancy} = request.body;

        try{
            const updateJob = await listJobsUseCase.executeUpdateJob({
                id,
                vacancy,
                contractor, 
                description_vacancy, 
                requirements, 
                workload, 
                location, 
                category_id, 
                benefits, 
                vacancy_available, 
                amount_vacancy
            });

            return response.status(200).json(updateJob);
        } catch(error){
            return response.status(400).json({ message: error.message });
        }
        
    }
}

export { ListJobsController }