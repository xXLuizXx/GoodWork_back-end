import { Request, Response } from "express";
import { container } from "tsyringe";
import { MarkAllAsReadUseCase } from "./MarkAllAsReadUseCase";

class MarkAllAsReadController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.user;
        const useCase = container.resolve(MarkAllAsReadUseCase);
        await useCase.execute(id);
        return response.status(204).send();
    }
}

export { MarkAllAsReadController };
