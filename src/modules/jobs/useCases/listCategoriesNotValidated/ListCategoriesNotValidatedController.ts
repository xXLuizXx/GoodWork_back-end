import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListCategoriesNotValidatedUseCase } from "./ListCategoriesNotValidatedUseCase";

class ListCategoriesNotValidatedController{

    async getCategoriesNotValidated(request: Request, response: Response): Promise<Response>{
        const listCategoriesNotValidatedUseCase = container.resolve(ListCategoriesNotValidatedUseCase);
        const categories = await listCategoriesNotValidatedUseCase.getCategories();

        return  response.json(categories);
    }
}

export { ListCategoriesNotValidatedController }