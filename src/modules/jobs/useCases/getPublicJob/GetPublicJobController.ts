import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPublicJobUseCase } from "./GetPublicJobUseCase";
import { AppError } from "../../../../shared/errors/AppError";

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

class GetPublicJobController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { id } = request.params;

        if (!UUID_REGEX.test(id)) {
            throw new AppError("ID inválido.", 400);
        }

        const useCase = container.resolve(GetPublicJobUseCase);
        const job = await useCase.execute(id);

        return response.json(job);
    }
}

export { GetPublicJobController };
