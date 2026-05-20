import { Request, Response } from "express";
import { container } from "tsyringe";
import { MarkAsReadUseCase } from "./MarkAsReadUseCase";

class MarkAsReadController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id: notification_id } = request.params;
        const { id: user_id } = request.user;
        const useCase = container.resolve(MarkAsReadUseCase);
        await useCase.execute(notification_id, user_id);
        return response.status(204).send();
    }
}

export { MarkAsReadController };
