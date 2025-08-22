import { Request, Response } from "express";
import { ListCategoriesUseCase } from "./ListCategoriesUseCase";
import { container } from "tsyringe";

class ListCategoriesController{
    async handle(request: Request, response: Response): Promise<Response>{
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const lista = await listCategoriesUseCase.execute();

        return response.status(200).json(lista);
    }
    
    async allCategories(request: Request, response: Response): Promise<Response>{
        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const lista = await listCategoriesUseCase.listAllCategories();

        return response.status(200).json(lista);
    }

    async searchCategories(request: Request, response: Response): Promise<Response>{
        const { search }  = request.query;

        const listCategoriesUseCase = container.resolve(ListCategoriesUseCase);
        const lista = await listCategoriesUseCase.searchCategories(search);

        return response.status(200).json(lista);
    }
}

export { ListCategoriesController };