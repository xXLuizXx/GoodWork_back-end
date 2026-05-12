import { Request, Response } from "express";
import { container } from "tsyringe";
import { CheckApplicationUseCase } from "./CheckApplicationUseCase";

class CheckApplicationController {
    async handle(request: Request, response: Response): Promise<Response> {
        const user_id = request.user.id;
        const { job_id } = request.query as { job_id: string };

        const checkApplicationUseCase = container.resolve(CheckApplicationUseCase);
        const hasApplied = await checkApplicationUseCase.execute(user_id, job_id);

        return response.status(200).json({ hasApplied });
    }
}

export { CheckApplicationController };
