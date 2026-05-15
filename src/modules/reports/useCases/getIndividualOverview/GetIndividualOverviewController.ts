import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetIndividualOverviewUseCase } from "./GetIndividualOverviewUseCase";

class GetIndividualOverviewController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const useCase = container.resolve(GetIndividualOverviewUseCase);
        const data = await useCase.execute(id);
        return response.status(200).json(data);
    }
}

export { GetIndividualOverviewController };
