import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe";

class ListCategoriesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const lista = await listCategoriesUseCase.execute();

        return response.json(lista);
    }
}

export { ListCategoriesController };