import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetAdminJobsByCategoryUseCase } from "./GetAdminJobsByCategoryUseCase";

class GetAdminJobsByCategoryController {
    async handle(request: Request, response: Response): Promise<Response> {
        const useCase = container.resolve(GetAdminJobsByCategoryUseCase);
        const data = await useCase.execute();
        return response.status(200).json(data);
    }
}

export { GetAdminJobsByCategoryController };
