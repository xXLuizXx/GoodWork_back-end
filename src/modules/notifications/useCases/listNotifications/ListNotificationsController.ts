import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListNotificationsUseCase } from "./ListNotificationsUseCase";

class ListNotificationsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const useCase = container.resolve(ListNotificationsUseCase);
        const data = await useCase.execute(id);
        return response.status(200).json(data);
    }
}

export { ListNotificationsController };
