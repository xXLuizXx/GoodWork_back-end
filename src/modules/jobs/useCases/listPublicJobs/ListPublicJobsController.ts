import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPublicJobsUseCase } from "./ListPublicJobsUseCase";

class ListPublicJobsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { category_id } = request.query;

        const useCase = container.resolve(ListPublicJobsUseCase);
        const jobs = await useCase.execute(
            typeof category_id === "string" ? category_id : undefined
        );

        return response.json(jobs);
    }
}

export { ListPublicJobsController };
