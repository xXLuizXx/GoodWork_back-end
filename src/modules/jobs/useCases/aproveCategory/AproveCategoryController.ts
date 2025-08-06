import { Request, Response } from "express";
import { container } from "tsyringe";
import { AproveCategoryUseCase } from "./AproveCategoryUseCase";

class AproveCategoryController{

    async aproveCategory(request: Request, response: Response): Promise<Response>{
        const { id, aprove } = request.body;
        const aproveCategoryUseCase = container.resolve(AproveCategoryUseCase);

        await aproveCategoryUseCase.execute(id, aprove)

        return response.status(200).json({ message: "Categoria validada com sucesso!" })
    }
}

export { AproveCategoryController }