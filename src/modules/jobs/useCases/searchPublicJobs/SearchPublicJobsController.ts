import { Request, Response } from "express";
import { container } from "tsyringe";
import { SearchPublicJobsUseCase } from "./SearchPublicJobsUseCase";
import { AppError } from "../../../../shared/errors/AppError";

class SearchPublicJobsController {
    async handle(request: Request, response: Response): Promise<Response> {
        const { q } = request.query;

        if (typeof q !== "string" || q.trim() === "") {
            throw new AppError("O parâmetro 'q' é obrigatório.", 400);
        }

        const term = q.trim();

        if (term.length > 100) {
            throw new AppError("O parâmetro 'q' deve ter no máximo 100 caracteres.", 400);
        }

        const useCase = container.resolve(SearchPublicJobsUseCase);
        const jobs = await useCase.execute(term);

        return response.json(jobs);
    }
}

export { SearchPublicJobsController };
