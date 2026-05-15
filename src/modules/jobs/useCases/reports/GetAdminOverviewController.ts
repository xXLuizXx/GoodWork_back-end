import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAdminOverviewUseCase } from "./GetAdminOverviewUseCase";

class GetAdminOverviewController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(GetAdminOverviewUseCase);
        const data = await useCase.execute();
        return response.status(200).json(data);
    }
}

export { GetAdminOverviewController };
