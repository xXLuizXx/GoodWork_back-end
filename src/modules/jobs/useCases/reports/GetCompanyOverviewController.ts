import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCompanyOverviewUseCase } from "./GetCompanyOverviewUseCase";

class GetCompanyOverviewController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const useCase = container.resolve(GetCompanyOverviewUseCase);
        const data = await useCase.execute(id);
        return response.status(200).json(data);
    }
}

export { GetCompanyOverviewController };
