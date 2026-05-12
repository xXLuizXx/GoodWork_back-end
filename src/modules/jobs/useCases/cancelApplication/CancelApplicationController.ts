import { Request, Response } from "express";
import { container } from "tsyringe";
import { CancelApplicationUseCase } from "./CancelApplicationUseCase";

class CancelApplicationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { id } = request.params;

        const cancelApplicationUseCase = container.resolve(CancelApplicationUseCase);
        await cancelApplicationUseCase.execute({ application_id: id, user_id });

        return response.status(204).send();
    }
}

export { CancelApplicationController };
